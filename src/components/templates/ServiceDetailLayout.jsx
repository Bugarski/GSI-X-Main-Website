import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import HeroSection from '../organisms/HeroSection/HeroSection';
import StepProcess from '../organisms/StepProcess/StepProcess';
import Container from '../atoms/Container/Container';
import SectionTitle from '../atoms/SectionTitle/SectionTitle';
import Text from '../atoms/Text/Text';
import MetricBadge from '../molecules/MetricBadge/MetricBadge';
import Button from '../atoms/Button/Button';
import { getLocalizedPath } from '../../router/routes';
import { motion } from 'framer-motion';
import placeholders from '../../utils/placeholders';
import styles from './ServiceDetailLayout.module.scss';

const panelReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ServiceDetailLayout({ serviceKey }) {
  const { t } = useTranslation('services');
  const { lang } = useParams();
  const detail = t(`detail.${serviceKey}`, { returnObjects: true });

  if (!detail || !detail.hero) return null;

  const capabilities = detail.capabilities || {};
  const process = detail.process || {};
  const metrics = detail.metrics || {};
  const industries = detail.industries || [];

  const processSteps = Object.values(process).map((step) => ({
    title: step.title,
    description: step.text,
  }));

  return (
    <div className={styles.servicePage}>
      {/* Hero */}
      <HeroSection
        title={detail.hero.title}
        subtitle={detail.hero.subtitle}
        backgroundImage={placeholders.services[serviceKey]}
        align="center"
      />

      {/* Problem Statement */}
      <section className={styles.section}>
        <Container size="lg">
          <motion.div variants={panelReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionTitle title={detail.problem.title} />
            <Text variant="body1" color="muted" className={styles.problemText}>
              {detail.problem.text}
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* Value Proposition */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div variants={panelReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionTitle title={detail.value.title} />
            <Text variant="body1" color="muted">{detail.value.text1}</Text>
            {detail.value.text2 && (
              <Text variant="body1" color="muted" className={styles.mt4}>{detail.value.text2}</Text>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className={styles.section}>
        <Container size="lg">
          <div className={styles.capabilitiesGrid}>
            {Object.entries(capabilities).map(([key, cap], index) => (
              <motion.div
                key={key}
                className={styles.capabilityCard}
                variants={panelReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Text variant="h5" className={styles.capTitle}>{cap.title}</Text>
                <Text variant="body3" color="muted">{cap.text}</Text>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      {processSteps.length > 0 && (
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <Container size="lg">
            <StepProcess steps={processSteps} />
          </Container>
        </section>
      )}

      {/* Metrics */}
      {Object.keys(metrics).length > 0 && (
        <section className={styles.section}>
          <Container size="lg">
            <div className={styles.metricsGrid}>
              {Object.values(metrics).map((metric, i) => (
                <MetricBadge key={i} value={metric} label="" />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Industries */}
      {industries.length > 0 && (
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <Container size="lg">
            <motion.div variants={panelReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className={styles.industriesGrid}>
                {industries.map((industry, i) => (
                  <div key={i} className={styles.industryTag}>
                    <Text variant="body3">{industry}</Text>
                  </div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className={styles.ctaSection}>
        <Container size="lg">
          <motion.div
            className={styles.ctaContent}
            variants={panelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Text variant="h3">{detail.cta.title}</Text>
            <Text variant="body1" color="muted">{detail.cta.text}</Text>
            <Button
              variant="primary"
              size="lg"
              href={getLocalizedPath('contact', lang)}
            >
              {t('common:cta.requestQuote', { ns: 'common' })}
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
