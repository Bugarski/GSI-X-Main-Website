/**
 * ServiceCard — Molecule for linking to a service detail page
 *
 * Dark elevated background, gold accent line on top, icon in gold,
 * title in white, description in muted gray.
 * Hover: subtle lift + gold border glow.
 * Fade-in on scroll with framer-motion.
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThinIcon from '../../../utils/ThinIcon';
import { motion } from 'framer-motion';
import styles from './ServiceCard.module.scss';

function ServiceCard({ title, description, icon, href, image, index = 0 }) {
  const { t } = useTranslation('common');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={styles.cardWrapper}
    >
      <Link to={href} className={styles.card}>
        {image && (
          <div className={styles.imageWrap}>
            <img src={image} alt="" className={styles.image} loading="lazy" />
            <div className={styles.imageOverlay} />
          </div>
        )}
        <div className={styles.body}>
          <span className={styles.accentLine} />
          <span className={styles.icon}>
            <ThinIcon icon={icon} />
          </span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <span className={styles.cta}>{t('cta.learnMore')}</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default ServiceCard;
