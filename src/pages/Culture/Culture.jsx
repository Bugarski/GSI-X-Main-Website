import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ThinIcon from '../../utils/ThinIcon';
import {
  faScaleBalanced,
  faBullseye,
  faMedal,
  faHandshake,
  faPeopleGroup,
  faLightbulb,
  faShieldCheck,
  faHeart,
  faLeaf,
  faFileContract,
  faLandmarkDome,
} from '@fortawesome/pro-light-svg-icons';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import Container from '../../components/atoms/Container/Container';
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle';
import Text from '../../components/atoms/Text/Text';
import Button from '../../components/atoms/Button/Button';
import GlowCard from '../../components/atoms/GlowCard/GlowCard';
import { getLocalizedPath } from '../../router/routes';
import placeholders from '../../utils/placeholders';
import styles from './Culture.module.scss';

const panelReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const VALUE_KEYS = [
  'integrity',
  'discipline',
  'excellence',
  'commitment',
  'teamwork',
  'innovation',
  'responsibility',
  'respect',
];

const VALUE_ICONS = {
  integrity: faScaleBalanced,
  discipline: faBullseye,
  excellence: faMedal,
  commitment: faHandshake,
  teamwork: faPeopleGroup,
  innovation: faLightbulb,
  responsibility: faShieldCheck,
  respect: faHeart,
};

export default function Culture() {
  const { lang } = useParams();
  const { t } = useTranslation(['culture', 'common']);

  useEffect(() => {
    document.title = t('hero.title') + ' | GSI';
  }, [t, lang]);

  return (
    <div className={styles.culture}>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={placeholders.heroes.about}
        align="center"
      />

      {/* Intro */}
      <section className={styles.section}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle
              title={t('intro.sectionTitle')}
              subtitle={t('intro.text')}
            />
          </motion.div>
        </Container>
      </section>

      {/* CSR */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle title={t('csr.sectionTitle')} />
          </motion.div>
          <motion.div
            className={styles.csrContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
            custom={1}
          >
            <GlowCard className={styles.csrCard}>
              <div className={styles.csrBadge}>
                <ThinIcon icon={faLeaf} />
                <span>{t('csr.badge')}</span>
              </div>
              <Text variant="body1" color="muted">
                {t('csr.text')}
              </Text>
            </GlowCard>
          </motion.div>
        </Container>
      </section>

      {/* Values */}
      <section className={styles.section}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle
              title={t('values.sectionTitle')}
              subtitle={t('values.subtitle')}
            />
          </motion.div>
          <div className={styles.valuesGrid}>
            {VALUE_KEYS.map((key, i) => (
              <GlowCard
                key={key}
                className={styles.valueCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={panelReveal}
              >
                <span className={styles.valueIcon}>
                  <ThinIcon icon={VALUE_ICONS[key]} />
                </span>
                <Text variant="h5" className={styles.valueTitle}>
                  {t(`values.${key}.title`)}
                </Text>
                <Text variant="body2" color="muted">
                  {t(`values.${key}.text`)}
                </Text>
              </GlowCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Ethics + Compliance — side by side */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <div className={styles.complianceGrid}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={panelReveal}
              custom={0}
            >
              <GlowCard className={styles.complianceCard}>
                <span className={styles.complianceIcon}>
                  <ThinIcon icon={faFileContract} />
                </span>
                <Text variant="h5" className={styles.complianceTitle}>
                  {t('ethics.sectionTitle')}
                </Text>
                <Text variant="body2" color="muted">
                  {t('ethics.text')}
                </Text>
              </GlowCard>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={panelReveal}
              custom={1}
            >
              <GlowCard className={styles.complianceCard}>
                <span className={styles.complianceIcon}>
                  <ThinIcon icon={faLandmarkDome} />
                </span>
                <Text variant="h5" className={styles.complianceTitle}>
                  {t('compliance.sectionTitle')}
                </Text>
                <Text variant="body2" color="muted">
                  {t('compliance.text')}
                </Text>
              </GlowCard>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className={`${styles.section} ${styles.sectionCta}`}>
        <Container size="lg">
          <motion.div
            className={styles.ctaContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle
              title={t('cta.title')}
              subtitle={t('cta.subtitle')}
            />
            <Button
              variant="primary"
              size="lg"
              href={getLocalizedPath('careers', lang)}
            >
              {t('common:nav.careers')}
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
