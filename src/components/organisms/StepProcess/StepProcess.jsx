import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './StepProcess.module.scss';

const bootSequence = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function StepProcess({ steps = [] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const interval = setInterval(() => {
      setActiveStep(current);
      current++;
      if (current >= steps.length) clearInterval(interval);
    }, 250);
    return () => clearInterval(interval);
  }, [isInView, steps.length]);

  return (
    <div
      className={styles.pipeline}
      ref={ref}
      style={{ '--step-count': steps.length }}
    >
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className={`${styles.stepCol} ${activeStep >= index ? styles.stepActive : ''}`}
          variants={bootSequence}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={index}
        >
          {/* Node row: line — node — line */}
          <div className={styles.nodeRow}>
            <div className={styles.lineSegment}>
              {index === 0 ? (
                <span className={styles.lineBlank} />
              ) : (
                <motion.span
                  className={styles.lineFill}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </div>

            <div className={styles.node}>
              <span className={styles.nodeNumber}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.nodeRing} />
            </div>

            <div className={styles.lineSegment}>
              {index === steps.length - 1 ? (
                <span className={styles.lineBlank} />
              ) : (
                <motion.span
                  className={styles.lineFill}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.5, delay: (index + 0.5) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </div>
          </div>

          {/* Vertical connector */}
          <div className={styles.connector}>
            <motion.span
              className={styles.connectorLine}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.3, delay: index * 0.18 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Content card */}
          <div className={styles.stepContent}>
            <span className={styles.mobileIndex}>{String(index + 1).padStart(2, '0')}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StepProcess;
