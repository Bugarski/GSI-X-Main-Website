import { motion } from 'framer-motion';
import styles from './StepCard.module.scss';

function StepCard({ number, title, description, isActive }) {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''}`}>
      <div className={styles.header}>
        <span className={styles.number}>{String(number).padStart(2, '0')}</span>
        <span className={styles.statusDot} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.bottomLine} />
    </div>
  );
}

export default StepCard;
