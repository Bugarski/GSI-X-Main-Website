/**
 * OptimizedVideo — Muted autoplay loop for hero backgrounds.
 *
 * Expects videos processed by scripts/optimize-images.js which outputs:
 *   [name].mp4           H.264 with faststart
 *   [name].webm          VP9 for broader compat
 *   [name]-poster.jpg    First frame as fallback
 *
 * Falls back to poster image if video cannot play (low-power mode, unsupported).
 *
 * @param {string}  basePath   - Path without extension, e.g. "/media/optimized/videos/hero-loop"
 * @param {string}  [poster]   - Override poster path; defaults to basePath + "-poster.jpg"
 * @param {string}  [alt]      - Alt text for poster fallback
 * @param {string}  [className]
 */

import { useRef, useEffect, useState } from 'react';
import styles from './OptimizedVideo.module.scss';

function OptimizedVideo({
  basePath,
  poster,
  alt = '',
  className = '',
}) {
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(true);
  const posterSrc = poster || `${basePath}-poster.jpg`;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setCanPlay(false);
      });
    }
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={{ backgroundImage: `url(${posterSrc})` }}
    >
      {canPlay && (
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          aria-hidden="true"
        >
          <source src={`${basePath}.webm`} type="video/webm" />
          <source src={`${basePath}.mp4`} type="video/mp4" />
        </video>
      )}
      {!canPlay && (
        <img
          src={posterSrc}
          alt={alt}
          className={styles.poster}
          loading="eager"
        />
      )}
    </div>
  );
}

export default OptimizedVideo;
