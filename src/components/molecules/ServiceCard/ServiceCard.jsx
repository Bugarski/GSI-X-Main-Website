import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThinIcon from '../../../utils/ThinIcon';
import { motion } from 'framer-motion';
import styles from './ServiceCard.module.scss';

function ServiceCard({ title, description, icon, href, image, index = 0 }) {
  const { t } = useTranslation('common');
  const idx = String(index + 1).padStart(2, '0');
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(my, mx) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    el.style.setProperty('--start', angle + 60);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={styles.cardWrapper}
    >
      <Link
        to={href}
        className={styles.card}
        ref={cardRef}
        onMouseMove={handleMouseMove}
      >
        <span className={styles.glowBorder} />
        <span className={styles.glowBlur} />

        {image && (
          <div className={styles.imageWrap}>
            <img src={image} alt="" className={styles.image} loading="lazy" />
            <div className={styles.imageOverlay} />
            <span className={styles.imageScan} />
            <span className={styles.imageIdx}>{idx}</span>
          </div>
        )}

        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.signalRow}>
            <span className={styles.icon}>
              <ThinIcon icon={icon} />
            </span>
            <span className={styles.accentLine} />
            <span className={styles.cta}>
              {t('cta.learnMore')}
            </span>
          </div>
        </div>

        <span className={styles.cornerTL} />
        <span className={styles.cornerBR} />
      </Link>
    </motion.div>
  );
}

export default ServiceCard;
