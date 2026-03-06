import { useRef, useCallback, forwardRef } from 'react';
import { motion } from 'framer-motion';
import styles from './GlowCard.module.scss';

const GlowCard = forwardRef(function GlowCard(
  { children, className = '', animate, ...motionProps },
  externalRef,
) {
  const innerRef = useRef(null);
  const ref = externalRef || innerRef;

  const handleMouseMove = useCallback((e) => {
    const el = typeof ref === 'function' ? null : ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(my, mx) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    el.style.setProperty('--start', angle + 60);
  }, [ref]);

  return (
    <motion.div
      ref={ref}
      className={`${styles.glowCard} ${className}`}
      onMouseMove={handleMouseMove}
      {...motionProps}
    >
      <span className={styles.glowBorder} />
      <span className={styles.glowBlur} />
      {children}
    </motion.div>
  );
});

export default GlowCard;
