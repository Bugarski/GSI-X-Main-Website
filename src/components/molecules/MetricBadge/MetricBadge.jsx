/**
 * MetricBadge — Molecule for displaying stats (e.g. "38+ Years")
 *
 * Large bold value, smaller label below. Gold accent.
 */

import Icon from '../../atoms/Icon/Icon';
import styles from './MetricBadge.module.scss';

function MetricBadge({ value, label, icon }) {
  return (
    <div className={styles.badge}>
      {icon && (
        <span className={styles.icon}>
          <Icon icon={icon} size="lg" color="var(--color-accent-500)" />
        </span>
      )}
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default MetricBadge;
