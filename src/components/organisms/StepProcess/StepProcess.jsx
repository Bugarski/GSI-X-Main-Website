import { motion } from 'framer-motion';
import StepCard from '../../molecules/StepCard/StepCard';
import styles from './StepProcess.module.scss';

function StepProcess({ steps = [], columns = 4 }) {
  const colClass = styles[`col${columns}`] || styles.col4;

  return (
    <div className={`${styles.process} ${colClass}`}>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <StepCard
            number={index + 1}
            title={step.title}
            description={step.description}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default StepProcess;
