/**
 * SectionDivider — Full-width cinematic image strip between sections.
 *
 * Renders a fixed-height band with a dark overlay and optional parallax feel.
 * Drop images into public/media/general/ and reference the optimized path.
 *
 * @param {string}  basePath    - Optimized image base path (no ext/suffix)
 * @param {string}  [fallback]  - Direct image URL fallback before optimization runs
 * @param {string}  [alt]       - Alt text
 * @param {number}  [height]    - CSS height in px, default 280
 */

import styles from './SectionDivider.module.scss';

function SectionDivider({
  basePath,
  fallback,
  alt = '',
  height = 280,
}) {
  const bgImage = fallback || (basePath ? `${basePath}-xl.jpg` : undefined);

  return (
    <div
      className={styles.divider}
      style={{ height, backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
      role="img"
      aria-label={alt}
    >
      <div className={styles.overlay} />
    </div>
  );
}

export default SectionDivider;
