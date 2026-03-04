import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ThinIcon from '../../utils/ThinIcon';
import {
  faTruck,
  faUserShield,
  faSatelliteDish,
  faBriefcase,
  faChessKnight,
  faMoneyBillTransfer,
  faCog,
  faShieldHalved,
  faGlobe,
  faChartLine,
} from '@fortawesome/pro-light-svg-icons';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import ServiceCard from '../../components/molecules/ServiceCard/ServiceCard';
import Container from '../../components/atoms/Container/Container';
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle';
import Text from '../../components/atoms/Text/Text';
import { routeConfig } from '../../router/routes';
import SectionDivider from '../../components/molecules/SectionDivider/SectionDivider';
import placeholders from '../../utils/placeholders';
import styles from './Services.module.scss';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CORE_SERVICES = [
  { key: 'cit', icon: faTruck },
  { key: 'guards', icon: faUserShield },
];

const ADVANCED_SERVICES = [
  { key: 'technology', icon: faSatelliteDish },
  { key: 'cargo', icon: faTruck },
  { key: 'consulting', icon: faBriefcase },
  { key: 'executive', icon: faChessKnight },
];

const SPECIAL_OPERATIONS = [
  { key: 'executive', icon: faChessKnight },
  { key: 'atm', icon: faMoneyBillTransfer },
  { key: 'custom', icon: faShieldHalved },
];


const WHY_CHOOSE_ICONS = {
  coverage: faGlobe,
  monitoring: faSatelliteDish,
  personnel: faUserShield,
  technology: faCog,
  proven: faChartLine,
};

export default function Services() {
  const { lang } = useParams();
  const { t } = useTranslation('services');

  useEffect(() => {
    document.title = t('hero.title') + ' | GSI';
  }, [t, lang]);

  const getServiceHref = (serviceKey) =>
    `/${lang}${routeConfig.serviceDetail[serviceKey][lang]}`;

  return (
    <div className={styles.services}>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={placeholders.heroes.services}
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
            <SectionTitle title={t('core.sectionTitle')} />
          </motion.div>
          <div className={styles.serviceGrid}>
            {CORE_SERVICES.map(({ key, icon }, i) => (
              <ServiceCard
                key={key}
                title={t(`cards.${key}.title`)}
                description={t(`cards.${key}.description`)}
                icon={icon}
                href={getServiceHref(key)}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider
        fallback={placeholders.dividers.surveillanceRoom}
        alt="GSI surveillance operations"
      />

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <SectionTitle title={t('advanced.sectionTitle')} />
          </motion.div>
          <div className={styles.serviceGrid}>
            {ADVANCED_SERVICES.map(({ key, icon }, i) => (
              <ServiceCard
                key={key}
                title={t(`cards.${key}.title`)}
                description={t(`cards.${key}.description`)}
                icon={icon}
                href={getServiceHref(key)}
                index={i}
              />
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
            <SectionTitle title={t('special.sectionTitle')} />
          </motion.div>
          <div className={`${styles.serviceGrid} ${styles.specialGrid}`}>
            {SPECIAL_OPERATIONS.map(({ key, icon }, i) => (
              <ServiceCard
                key={key}
                title={t(`cards.${key}.title`)}
                description={t(`cards.${key}.description`)}
                icon={icon}
                href={getServiceHref(key)}
                index={i}
              />
            ))}
          </div>
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
            <SectionTitle
              title={t('whyChoose.title')}
              subtitle={t('whyChoose.subtitle')}
            />
          </motion.div>
          <div className={styles.whyGrid}>
            {Object.keys(WHY_CHOOSE_ICONS).map((key, i) => (
              <motion.div
                key={key}
                className={styles.whyCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.08 }}
              >
                <span className={styles.whyIcon}>
                  <ThinIcon icon={WHY_CHOOSE_ICONS[key]} />
                </span>
                <Text variant="body1">{t(`whyChoose.points.${key}`)}</Text>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
