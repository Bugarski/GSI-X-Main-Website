import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ThinIcon from '../../utils/ThinIcon';
import { faMapMarkerAlt, faGlobe } from '@fortawesome/pro-light-svg-icons';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import Container from '../../components/atoms/Container/Container';
import GlowCard from '../../components/atoms/GlowCard/GlowCard';
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle';
import Text from '../../components/atoms/Text/Text';
import Button from '../../components/atoms/Button/Button';
import { getLocalizedPath } from '../../router/routes';
import placeholders from '../../utils/placeholders';
import styles from './Coverage.module.scss';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const REGION_KEYS = ['mexico', 'centralAmerica', 'brazil', 'global'];
const REGION_ICONS = {
  mexico: faMapMarkerAlt,
  centralAmerica: faMapMarkerAlt,
  brazil: faMapMarkerAlt,
  global: faGlobe,
};

export default function Coverage() {
  const { lang } = useParams();
  const { t } = useTranslation(['coverage', 'common']);

  useEffect(() => {
    document.title = t('hero.title') + ' | GSI';
  }, [t, lang]);

  return (
    <div className={styles.coverage}>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={placeholders.heroes.coverage}
        align="center"
      />

      <section className={styles.section}>
        <Container size="lg">
          <div className={styles.regionGrid}>
            {REGION_KEYS.map((key, i) => (
              <GlowCard
                key={key}
                className={styles.regionCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.1 }}
              >
                <span className={styles.regionIcon}>
                  <ThinIcon icon={REGION_ICONS[key]} />
                </span>
                <Text variant="h5" className={styles.regionTitle}>
                  {t(`regions.${key}.title`)}
                </Text>
                <Text variant="body1" color="muted">
                  {t(`regions.${key}.description`)}
                </Text>
              </GlowCard>
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
            <Button variant="primary" size="lg" href={getLocalizedPath('contact', lang)}>
              {t('common:cta.contactTeam')}
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
