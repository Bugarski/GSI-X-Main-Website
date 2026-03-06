import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThinIcon from '../../../utils/ThinIcon';
import { motion } from 'framer-motion';
import styles from './ServiceCard.module.scss';

function ServiceCard({ title, description, icon, href, image, index = 0 }) {
  const { t } = useTranslation('common');
  const idx = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={styles.cardWrapper}
    >
      <Link to={href} className={styles.card}>
        {/* Animated conic gradient border */}
        <span className={styles.borderGlow} />

        {/* Image with overlays */}
        {image && (
          <div className={styles.imageWrap}>
            <img src={image} alt="" className={styles.image} loading="lazy" />
            <div className={styles.imageOverlay} />
            <span className={styles.imageScan} />
            <span className={styles.imageIdx}>{idx}</span>
          </div>
        )}

        {/* Content */}
        <div className={styles.body}>
          <div className={styles.bodyTop}>
            <span className={styles.icon}>
              <ThinIcon icon={icon} />
            </span>
            <span className={styles.accentLine} />
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <span className={styles.cta}>
            {t('cta.learnMore')}
            <span className={styles.ctaPulse} />
          </span>
        </div>

        {/* Corner accents */}
        <span className={styles.cornerTL} />
        <span className={styles.cornerBR} />
      </Link>
    </motion.div>
  );
}

export default ServiceCard;
