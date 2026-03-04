import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ThinIcon from '../../utils/ThinIcon';
import {
  faGlobe,
  faShieldHalved,
  faUserShield,
  faBriefcase,
  faChartLine,
} from '@fortawesome/pro-light-svg-icons';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import Container from '../../components/atoms/Container/Container';
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle';
import Text from '../../components/atoms/Text/Text';
import SectionDivider from '../../components/molecules/SectionDivider/SectionDivider';
import placeholders from '../../utils/placeholders';
import styles from './About.module.scss';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const STRENGTH_ICONS = {
  footprint: faGlobe,
  command: faChartLine,
  personnel: faUserShield,
  portfolio: faBriefcase,
  trusted: faShieldHalved,
};

const TIMELINE_KEYS = ['origins', 'armored', 'intelligent', 'cash'];

export default function About() {
  const { lang } = useParams();
  const { t } = useTranslation('about');

  useEffect(() => {
    document.title = t('hero.title') + ' | GSI';
  }, [t, lang]);

  return (
    <div className={styles.about}>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={placeholders.heroes.about}
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
            <Text variant="body1" color="secondary" className={styles.heroDescription}>
              {t('hero.description')}
            </Text>
            <SectionTitle title={t('intro.title')} />
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
            <SectionTitle title={t('history.sectionTitle')} />
          </motion.div>
          <div className={styles.timeline}>
            {TIMELINE_KEYS.map((key, i) => (
              <motion.div
                key={key}
                className={`${styles.timelineItem} ${i % 2 === 1 ? styles.timelineRight : styles.timelineLeft}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.timelineDot} aria-hidden="true" />
                <div className={styles.timelineContent}>
                  <Text variant="h5" className={styles.timelineTitle}>
                    {t(`timeline.${key}.title`)}
                  </Text>
                  <Text variant="body1" color="muted">
                    {t(`timeline.${key}.text`)}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
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
            <SectionTitle title={t('corporate.title')} />
          </motion.div>
            <div className={styles.corporateGrid}>
            <motion.div
              className={styles.corporateCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Text variant="body1" color="muted">
                {t('corporate.text')}
              </Text>
            </motion.div>
            <div className={styles.missionVision}>
              <motion.div
                className={styles.missionCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: 0.1 }}
              >
                <Text variant="h5" className={styles.cardTitle}>
                  {t('corporate.mission.title')}
                </Text>
                <Text variant="body1" color="muted">
                  {t('corporate.mission.text')}
                </Text>
              </motion.div>
              <motion.div
                className={styles.visionCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: 0.2 }}
              >
                <Text variant="h5" className={styles.cardTitle}>
                  {t('corporate.vision.title')}
                </Text>
                <Text variant="body1" color="muted">
                  {t('corporate.vision.text')}
                </Text>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider
        fallback={placeholders.dividers.infrastructure}
        alt="GSI operations infrastructure"
      />

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <SectionTitle title={t('strengths.title')} />
          </motion.div>
          <div className={styles.strengthsGrid}>
            {Object.keys(STRENGTH_ICONS).map((key, i) => (
              <motion.div
                key={key}
                className={styles.strengthCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.08 }}
              >
                <span className={styles.strengthIcon}>
                  <ThinIcon icon={STRENGTH_ICONS[key]} />
                </span>
                <Text variant="body1">{t(`strengths.items.${key}`)}</Text>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
