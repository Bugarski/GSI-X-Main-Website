#!/usr/bin/env node

/**
 * GSI Media Optimization Script
 *
 * Compresses images and videos in public/media/ for production.
 *
 * Usage:
 *   node scripts/optimize-images.js           Process all media once
 *   node scripts/optimize-images.js --watch   Watch for new files and process on change
 *
 * Images:
 *   - Resizes to 4 breakpoints: 400, 800, 1400, 1920px
 *   - Outputs JPEG (q80 progressive), WebP (q80), AVIF (q65)
 *   - PNGs with transparency: outputs PNG + WebP + AVIF (preserves alpha)
 *   - Output: public/media/optimized/[subfolder]/[name]-[size].[ext]
 *
 * Videos:
 *   - Requires ffmpeg installed on the system
 *   - MP4: H.264 CRF 23, -preset slow, max 1920px width, faststart
 *   - WebM: VP9 CRF 30, max 1920px width
 *   - Poster: first frame as JPEG at 1920px
 *   - Output: public/media/optimized/videos/[name].(mp4|webm|poster.jpg)
 *
 * Manifest:
 *   - Generates public/media/optimized/media-manifest.json
 *   - Lists every optimized file with type, sizes, and formats available
 */

import sharp from 'sharp';
import { readdir, mkdir, stat, writeFile, watch as fsWatch } from 'fs/promises';
import { join, extname, basename, dirname, relative } from 'path';
import { execSync, exec } from 'child_process';
import { existsSync, watch } from 'fs';

const MEDIA_DIR = join(process.cwd(), 'public/media');
const OUTPUT_DIR = join(process.cwd(), 'public/media/optimized');

const SIZES = [
  { name: 'thumb', width: 400, suffix: '-thumb' },
  { name: 'md', width: 800, suffix: '-md' },
  { name: 'lg', width: 1400, suffix: '-lg' },
  { name: 'xl', width: 1920, suffix: '-xl' },
];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
const SKIP_DIRS = ['optimized', '.DS_Store'];

const manifest = { images: {}, videos: {} };

// ── Helpers ──────────────────────────────────────────────────

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true }).catch(() => {});
}

async function getFiles(dir, extensions) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory() && !SKIP_DIRS.includes(entry.name)) {
        files.push(...(await getFiles(fullPath, extensions)));
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) files.push(fullPath);
      }
    }
  } catch { /* dir may not exist */ }
  return files;
}

function hasFfmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function runCmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 50 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) reject(new Error(stderr || err.message));
      else resolve(stdout);
    });
  });
}

// ── Image Processing ─────────────────────────────────────────

async function optimizeImage(inputPath) {
  const relativePath = relative(MEDIA_DIR, inputPath);
  const name = basename(inputPath, extname(inputPath));
  const ext = extname(inputPath).toLowerCase();
  const subDir = dirname(relativePath);
  const outputBase = join(OUTPUT_DIR, subDir);
  const hasPngAlpha = ext === '.png';

  await ensureDir(outputBase);

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  console.log(`  [img] ${relativePath} (${metadata.width}x${metadata.height})`);

  const manifestKey = `${subDir}/${name}`;
  manifest.images[manifestKey] = { sizes: [], formats: [] };

  const formats = new Set();

  for (const size of SIZES) {
    if (metadata.width <= size.width && size.name !== 'thumb') continue;

    const resized = sharp(inputPath).resize(size.width, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });

    if (hasPngAlpha) {
      await resized.clone()
        .png({ compressionLevel: 9 })
        .toFile(join(outputBase, `${name}${size.suffix}.png`));
      formats.add('png');
    } else {
      await resized.clone()
        .jpeg({ quality: 80, progressive: true })
        .toFile(join(outputBase, `${name}${size.suffix}.jpg`));
      formats.add('jpg');
    }

    await resized.clone()
      .webp({ quality: 80 })
      .toFile(join(outputBase, `${name}${size.suffix}.webp`));
    formats.add('webp');

    await resized.clone()
      .avif({ quality: 65 })
      .toFile(join(outputBase, `${name}${size.suffix}.avif`));
    formats.add('avif');

    manifest.images[manifestKey].sizes.push(size.width);
  }

  manifest.images[manifestKey].formats = [...formats];
  manifest.images[manifestKey].basePath = `/media/optimized/${subDir}/${name}`;
}

// ── Video Processing ─────────────────────────────────────────

async function optimizeVideo(inputPath) {
  const relativePath = relative(MEDIA_DIR, inputPath);
  const name = basename(inputPath, extname(inputPath));
  const subDir = dirname(relativePath);
  const outputBase = join(OUTPUT_DIR, subDir);

  await ensureDir(outputBase);
  console.log(`  [vid] ${relativePath}`);

  const mp4Out = join(outputBase, `${name}.mp4`);
  const webmOut = join(outputBase, `${name}.webm`);
  const posterOut = join(outputBase, `${name}-poster.jpg`);

  // H.264 MP4 — high quality, web-optimized
  if (!existsSync(mp4Out)) {
    console.log(`        → H.264 MP4`);
    await runCmd(
      `ffmpeg -i "${inputPath}" -vf "scale='min(1920,iw)':-2" ` +
      `-c:v libx264 -crf 23 -preset slow -an -movflags +faststart ` +
      `-y "${mp4Out}"`
    );
  }

  // VP9 WebM — broader compat
  if (!existsSync(webmOut)) {
    console.log(`        → VP9 WebM`);
    await runCmd(
      `ffmpeg -i "${inputPath}" -vf "scale='min(1920,iw)':-2" ` +
      `-c:v libvpx-vp9 -crf 30 -b:v 0 -an ` +
      `-y "${webmOut}"`
    );
  }

  // Poster frame
  if (!existsSync(posterOut)) {
    console.log(`        → Poster frame`);
    await runCmd(
      `ffmpeg -i "${inputPath}" -vf "scale='min(1920,iw)':-2" ` +
      `-vframes 1 -q:v 2 -y "${posterOut}"`
    );
  }

  manifest.videos[`${subDir}/${name}`] = {
    basePath: `/media/optimized/${subDir}/${name}`,
    formats: ['mp4', 'webm'],
    poster: `/media/optimized/${subDir}/${name}-poster.jpg`,
  };
}

// ── Manifest ─────────────────────────────────────────────────

async function writeManifest() {
  const manifestPath = join(OUTPUT_DIR, 'media-manifest.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n  Manifest written → media-manifest.json`);
}

// ── Watch Mode ───────────────────────────────────────────────

function watchMode() {
  console.log('\n  Watching public/media/ for changes... (Ctrl+C to stop)\n');

  const dirsToWatch = ['heroes', 'services', 'about', 'team', 'logos', 'general', 'videos'];

  for (const dir of dirsToWatch) {
    const dirPath = join(MEDIA_DIR, dir);
    if (!existsSync(dirPath)) continue;

    watch(dirPath, { recursive: true }, async (eventType, filename) => {
      if (!filename || filename.startsWith('.')) return;
      const fullPath = join(dirPath, filename);
      if (!existsSync(fullPath)) return;

      const ext = extname(filename).toLowerCase();

      try {
        if (IMAGE_EXTENSIONS.includes(ext)) {
          await optimizeImage(fullPath);
          await writeManifest();
        } else if (VIDEO_EXTENSIONS.includes(ext)) {
          if (hasFfmpeg()) {
            await optimizeVideo(fullPath);
            await writeManifest();
          }
        }
      } catch (err) {
        console.error(`  Error: ${err.message}`);
      }
    });
  }
}

// ── Main ─────────────────────────────────────────────────────

async function main() {
  const isWatch = process.argv.includes('--watch');

  console.log('');
  console.log('  GSI Media Optimization');
  console.log('  ══════════════════════\n');

  await ensureDir(OUTPUT_DIR);

  // Process images
  const imageFiles = await getFiles(MEDIA_DIR, IMAGE_EXTENSIONS);
  if (imageFiles.length > 0) {
    console.log(`  Found ${imageFiles.length} image(s)\n`);
    for (const file of imageFiles) {
      try {
        await optimizeImage(file);
      } catch (err) {
        console.error(`  Error: ${file} — ${err.message}`);
      }
    }
  } else {
    console.log('  No images found. Drop files into public/media/ subfolders:');
    console.log('    heroes/ services/ about/ team/ logos/ general/\n');
  }

  // Process videos
  const videoFiles = await getFiles(MEDIA_DIR, VIDEO_EXTENSIONS);
  if (videoFiles.length > 0) {
    if (hasFfmpeg()) {
      console.log(`\n  Found ${videoFiles.length} video(s)\n`);
      for (const file of videoFiles) {
        try {
          await optimizeVideo(file);
        } catch (err) {
          console.error(`  Error: ${file} — ${err.message}`);
        }
      }
    } else {
      console.log('\n  ⚠ ffmpeg not found — skipping video optimization.');
      console.log('    Install: brew install ffmpeg\n');
    }
  }

  await writeManifest();

  console.log('\n  Done.\n');

  if (isWatch) watchMode();
}

main().catch(console.error);
