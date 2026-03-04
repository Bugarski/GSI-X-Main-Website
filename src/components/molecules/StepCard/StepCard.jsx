import styles from './StepCard.module.scss';

function StepCard({ number, title, description }) {
  return (
    <div className={styles.card}>
      <span className={styles.number}>{number}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default StepCard;
