import { useRef, useCallback } from 'react';
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
  const barRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = barRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(my, mx) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    el.style.setProperty('--start', angle + 60);
  }, []);

  const classNames = [
    styles.sectionTitle,
    styles[align],
    light && styles.light,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classNames} onMouseMove={handleMouseMove} {...rest}>
      {label && (
        <div className={styles.labelWrapper}>
          <Text variant="subheading" className={styles.label}>
            {label}
          </Text>
        </div>
      )}
      <Text variant="h2" as="h2" className={styles.title}>
        {title}
      </Text>
      <div className={styles.glowBar} ref={barRef}>
        <span className={styles.glowBarBorder} />
        <span className={styles.glowBarBlur} />
      </div>
      {subtitle && (
        <Text variant="body1" className={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </header>
  );
}

export default SectionTitle;
