/**
 * OptimizedImage — Responsive picture element with AVIF/WebP/JPEG fallback.
 *
 * Expects images processed by scripts/optimize-images.js which outputs:
 *   [name]-thumb.(jpg|webp|avif)  400w
 *   [name]-md.(jpg|webp|avif)     800w
 *   [name]-lg.(jpg|webp|avif)     1400w
 *   [name]-xl.(jpg|webp|avif)     1920w
 *
 * @param {string}  basePath  - Path without size suffix or extension, e.g. "/media/optimized/heroes/operations"
 * @param {string}  alt       - Descriptive alt text (required for accessibility)
 * @param {string}  [sizes]   - Responsive sizes attribute, default "100vw"
 * @param {boolean} [eager]   - Use eager loading for above-the-fold images (heroes)
 * @param {string}  [className]
 * @param {object}  [style]
 */

import styles from './OptimizedImage.module.scss';

const WIDTHS = [
  { suffix: '-thumb', w: 400 },
  { suffix: '-md', w: 800 },
  { suffix: '-lg', w: 1400 },
  { suffix: '-xl', w: 1920 },
];

function buildSrcSet(basePath, ext) {
  return WIDTHS.map(({ suffix, w }) => `${basePath}${suffix}.${ext} ${w}w`).join(', ');
}

function OptimizedImage({
  basePath,
  alt,
  sizes = '100vw',
  eager = false,
  className = '',
  style,
}) {
  const loading = eager ? 'eager' : 'lazy';
  const fetchPriority = eager ? 'high' : undefined;

  return (
    <picture className={`${styles.picture} ${className}`}>
      <source
        type="image/avif"
        srcSet={buildSrcSet(basePath, 'avif')}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={buildSrcSet(basePath, 'webp')}
        sizes={sizes}
      />
      <img
        src={`${basePath}-lg.jpg`}
        srcSet={buildSrcSet(basePath, 'jpg')}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchpriority={fetchPriority}
        className={styles.img}
        style={style}
      />
    </picture>
  );
}

export default OptimizedImage;
