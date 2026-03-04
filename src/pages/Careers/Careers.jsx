import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ThinIcon from '../../utils/ThinIcon';
import {
  faCheck,
  faBriefcase,
  faChartLine,
  faShieldHalved,
  faUserTie,
} from '@fortawesome/pro-light-svg-icons';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import Container from '../../components/atoms/Container/Container';
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle';
import Text from '../../components/atoms/Text/Text';
import placeholders from '../../utils/placeholders';
import styles from './Careers.module.scss';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BENEFIT_KEYS = ['training', 'stability', 'growth', 'safety', 'benefits'];
const BENEFIT_ICONS = {
  training: faBriefcase,
  stability: faChartLine,
  growth: faUserTie,
  safety: faShieldHalved,
  benefits: faCheck,
};

export default function Careers() {
  const { lang } = useParams();
  const { t } = useTranslation('careers');

  useEffect(() => {
    document.title = t('hero.title') + ' | GSI';
  }, [t, lang]);

  const careersEmail = t('cta.email');

  return (
    <div className={styles.careers}>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={placeholders.heroes.careers}
        align="center"
      />

      <section className={styles.section}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Text variant="body1" color="muted" className={styles.introText}>
              {t('intro.text')}
            </Text>
          </motion.div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <SectionTitle title={t('openings.title')} />
            <Text variant="body1" color="muted" className={styles.placeholderText}>
              {t('openings.placeholder')}
            </Text>
          </motion.div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <SectionTitle title={t('benefits.title')} />
          </motion.div>
          <div className={styles.benefitsGrid}>
            {BENEFIT_KEYS.map((key, i) => (
              <motion.div
                key={key}
                className={styles.benefitCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.08 }}
              >
                <span className={styles.benefitIcon}>
                  <ThinIcon icon={BENEFIT_ICONS[key]} />
                </span>
                <Text variant="body1">{t(`benefits.items.${key}`)}</Text>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.sectionCta}`}>
        <Container size="lg">
          <motion.div
            className={styles.ctaContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Text variant="h3">{t('cta.title')}</Text>
            <Text variant="body1" color="muted">
              {t('cta.subtitle')}
            </Text>
            <a
              href={`mailto:${careersEmail}`}
              className={styles.emailLink}
            >
              {careersEmail}
            </a>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
