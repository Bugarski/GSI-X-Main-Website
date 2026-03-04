# GSI Media Assets

Drop your original photos and videos into the subfolders below. The optimization script will compress, resize, and generate multi-format variants for production.

## Folder Structure

```
public/media/
  heroes/         Hero section backgrounds (full-width, dark/moody)
  services/       Service-specific imagery (one per service detail page)
  about/          Corporate, team, timeline, milestone photos
  team/           Individual portraits (square or 3:4 ratio)
  logos/          Client logos, partner logos, certifications (PNG with transparency)
  general/        Section dividers, textures, ambient strips
  videos/         Video source files (MP4, MOV)
```

## Naming Conventions

Use lowercase, hyphen-separated names that match the page or section:

### Heroes (one per page)
```
heroes/home.jpg              Home page hero
heroes/about.jpg             About page hero
heroes/services.jpg          Services overview hero
heroes/coverage.jpg          Coverage page hero
heroes/careers.jpg           Careers page hero
heroes/contact.jpg           Contact page hero
```

### Services (one per service detail page)
```
services/cit.jpg                     Cash-in-Transit
services/guards.jpg                  Security Guard Services
services/cargo.jpg                   Cargo Monitoring & Secure Logistics
services/technology.jpg              Technology Integration & Surveillance
services/consulting.jpg              Security Consulting & Risk Strategy
services/concept-design.jpg          Security Concept Design & Implementation
services/executive-protection.jpg    Executive Protection
services/atm.jpg                     ATM Operations & Secure Cash Management
services/custom-projects.jpg         Custom High-Security Projects
```

### General (section dividers, ambient strips)
```
general/fleet-convoy.jpg       Armored vehicle convoy (Home page divider)
general/surveillance-room.jpg  Operations/monitoring center (Services page divider)
general/infrastructure.jpg     Fleet yard, comms tower, facilities (About page divider)
```

### Videos
```
videos/hero-loop.mp4           Home hero background loop (8-15s, muted)
videos/corporate-overview.mp4  About page corporate video (30-60s)
```

## Recommended Dimensions

| Type | Min Width | Aspect Ratio | Notes |
|------|-----------|--------------|-------|
| Hero background | 3000px | 16:9 or 21:9 | Will be cropped/covered, center the subject |
| Section divider | 3000px | 3:1 or 4:1 | Horizontal strip, subject in center third |
| Service image | 2400px | 16:9 | Dark, moody, professional |
| Team portrait | 800px | 1:1 or 3:4 | Neutral background, uniform preferred |
| Client logo | 400px | any | PNG with transparent background |
| Hero video | 1920px | 16:9 | 8-15s loop, no audio, dark/cinematic |

## Optimization

Run the optimization script after dropping files:

```bash
npm run optimize-media          # Process all media once
npm run optimize-media:watch    # Watch mode (auto-process on file drop)
```

This generates:

### Images
- 4 sizes: 400px, 800px, 1400px, 1920px wide
- 3 formats per size: JPEG (q80), WebP (q80), AVIF (q65)
- PNGs preserve transparency
- Output: `public/media/optimized/[folder]/[name]-[size].[format]`

### Videos (requires ffmpeg)
- MP4: H.264, CRF 23, max 1920px, faststart
- WebM: VP9, CRF 30, max 1920px
- Poster: first frame as JPEG
- Output: `public/media/optimized/videos/[name].(mp4|webm|-poster.jpg)`

Install ffmpeg: `brew install ffmpeg`

## Manifest

After optimization, a `media-manifest.json` is generated at:
```
public/media/optimized/media-manifest.json
```

This lists all optimized files with their available sizes and formats.

## AWS Deployment

The deploy scripts handle media separately with optimized caching:

- **Images**: `Cache-Control: max-age=31536000, immutable` (1 year)
- **Videos**: `Cache-Control: max-age=2592000, public` (30 days)
- **AVIF**: Synced with explicit `Content-Type: image/avif`
- **WebM**: Synced with explicit `Content-Type: video/webm`
- **HTML**: No cache (always fresh)

Run full deploy:
```bash
npm run deploy
```

## Tips

- Shoot or source dark, cinematic, high-contrast imagery
- Subjects: armored vehicles, operations centers, security teams, infrastructure
- Avoid bright, colorful, consumer-friendly stock photos
- The overlay + grid pattern will darken heroes further — account for this
- Test hero images at both mobile (portrait) and desktop (landscape) crops
- Keep video files under 15MB for the hero loop (aim for 5-8MB)
