/**
 * SectionTitle — Reusable section header with optional label
 *
 * Features optional uppercase label with gold accent bar,
 * title (h2), and subtitle (body1).
 * Supports light/dark section backgrounds.
 *
 * @component
 */

import Text from '../Text/Text';
import styles from './SectionTitle.module.scss';

/**
 * @param {Object} props
 * @param {string} [props.label] - Small uppercase text above title (e.g. "CORE SERVICES")
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {'left'|'center'} [props.align='left']
 * @param {boolean} [props.light=false] - For use on light background sections
 */
function SectionTitle({
  label,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
  ...rest
}) {
  const classNames = [
    styles.sectionTitle,
    styles[align],
    light && styles.light,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classNames} {...rest}>
      {label && (
        <div className={styles.labelWrapper}>
          <span className={styles.accentBar} aria-hidden="true" />
          <Text variant="subheading" className={styles.label}>
            {label}
          </Text>
        </div>
      )}
      <Text variant="h2" as="h2" className={styles.title}>
        {title}
      </Text>
      {subtitle && (
        <Text variant="body1" className={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </header>
  );
}

export default SectionTitle;
