import { useRef, useCallback, useEffect } from 'react';
import Text from '../Text/Text';
import styles from './SectionTitle.module.scss';

const LERP_SPEED = 0.045;

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
  const headerRef = useRef(null);
  const targetIntensity = useRef(0);
  const currentIntensity = useRef(0);
  const rafId = useRef(null);

  const tick = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;

    const diff = targetIntensity.current - currentIntensity.current;
    if (Math.abs(diff) < 0.002) {
      currentIntensity.current = targetIntensity.current;
      bar.style.setProperty('--glow-intensity', currentIntensity.current.toFixed(3));
      rafId.current = null;
      return;
    }

    currentIntensity.current += diff * LERP_SPEED;
    bar.style.setProperty('--glow-intensity', currentIntensity.current.toFixed(3));
    rafId.current = requestAnimationFrame(tick);
  }, []);

  const startLoop = useCallback(() => {
    if (!rafId.current) rafId.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  const handleMouseMove = useCallback((e) => {
    const bar = barRef.current;
    const header = headerRef.current;
    if (!bar || !header) return;

    const headerRect = header.getBoundingClientRect();
    const barRect = bar.getBoundingClientRect();

    const barCenterX = barRect.left + barRect.width / 2;
    const barCenterY = barRect.top + barRect.height / 2;

    const dx = e.clientX - barCenterX;
    const dy = e.clientY - barCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxDist = Math.max(headerRect.width, headerRect.height);
    targetIntensity.current = Math.max(0, 1 - distance / maxDist);
    startLoop();
  }, [startLoop]);

  const handleMouseLeave = useCallback(() => {
    targetIntensity.current = 0;
    startLoop();
  }, [startLoop]);

  const classNames = [
    styles.sectionTitle,
    styles[align],
    light && styles.light,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header
      ref={headerRef}
      className={classNames}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
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
      <div className={styles.glowBar} ref={barRef} />
      {subtitle && (
        <Text variant="body1" className={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </header>
  );
}

export default SectionTitle;
