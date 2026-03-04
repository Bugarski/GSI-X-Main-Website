/**
 * HeroSection — Command Center hero with HUD overlay,
 * grid pattern, scan line, status readout, metrics strip,
 * and support for optimized background images and video loops.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OptimizedVideo from '../../atoms/OptimizedVideo/OptimizedVideo';
import buttonStyles from '../../atoms/Button/Button.module.scss';
import styles from './HeroSection.module.scss';

function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  align = 'center',
  fullHeight = false,
  metrics,
  statusLabel = 'Systems Operational',
}) {
  const CtaLink = ({ cta, variant = 'primary' }) => {
    if (!cta) return null;
    const isInternal = typeof cta.href === 'string' && cta.href.startsWith('/');
    const classNames = `${buttonStyles.button} ${buttonStyles[variant]} ${buttonStyles.lg}`;
    const content = <span className={buttonStyles.label}>{cta.text}</span>;
    if (isInternal) {
      return <Link to={cta.href} className={classNames}>{content}</Link>;
    }
    return (
      <a href={cta.href} className={classNames} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  };

  return (
    <section
      className={`${styles.hero} ${fullHeight ? styles.fullHeight : ''}`}
      style={backgroundImage && !backgroundVideo ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {backgroundVideo && (
        <OptimizedVideo
          basePath={backgroundVideo}
          alt=""
          className={styles.videoBg}
        />
      )}

      {overlay && <div className={styles.overlay} aria-hidden="true" />}

      <div className={styles.gridPattern} aria-hidden="true" />
      <div className={styles.scanLine} aria-hidden="true" />

      <div className={`${styles.cornerDecor} ${styles.topLeft}`} aria-hidden="true" />
      <div className={`${styles.cornerDecor} ${styles.topRight}`} aria-hidden="true" />
      <div className={`${styles.cornerDecor} ${styles.bottomLeft}`} aria-hidden="true" />
      <div className={`${styles.cornerDecor} ${styles.bottomRight}`} aria-hidden="true" />

      <div className={`${styles.hudLine} ${styles.hudLineTop}`} aria-hidden="true" />
      <div className={`${styles.hudLine} ${styles.hudLineBottom}`} aria-hidden="true" />

      <div className={styles.statusBar} aria-hidden="true">
        <span className={styles.statusDot} />
        <span>{statusLabel}</span>
      </div>

      <motion.div
        className={`${styles.content} ${styles[align] || styles.center}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {(ctaPrimary || ctaSecondary) && (
          <div className={styles.ctas}>
            {ctaPrimary && (
              <span className={styles.ctaPrimary}>
                <CtaLink cta={ctaPrimary} variant="primary" />
              </span>
            )}
            {ctaSecondary && (
              <span className={styles.ctaSecondary}>
                <CtaLink cta={ctaSecondary} variant="secondary" />
              </span>
            )}
          </div>
        )}

        {metrics && metrics.length > 0 && (
          <motion.div
            className={styles.metricsStrip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {metrics.map((m, i) => (
              <div key={i} className={styles.metric}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export default HeroSection;
