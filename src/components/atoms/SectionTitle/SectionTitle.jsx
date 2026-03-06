import Text from '../Text/Text';
import styles from './SectionTitle.module.scss';

function SectionTitle({
  label,
  title,
  subtitle,
  align = 'center',
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
