import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ThinIcon from '../../utils/ThinIcon';
import {
  faShieldHalved,
  faTruck,
  faUserShield,
  faSatelliteDish,
  faGlobe,
  faCog,
} from '@fortawesome/pro-light-svg-icons';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import ServiceCard from '../../components/molecules/ServiceCard/ServiceCard';
import StepProcess from '../../components/organisms/StepProcess/StepProcess';
import Container from '../../components/atoms/Container/Container';
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle';
import Text from '../../components/atoms/Text/Text';
import Button from '../../components/atoms/Button/Button';
import GlowCard from '../../components/atoms/GlowCard/GlowCard';
import placeholders from '../../utils/placeholders';
import { getLocalizedPath, routeConfig } from '../../router/routes';
import styles from './Home.module.scss';

const panelReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

const WHY_GSI_ICONS = {
  coverage: faGlobe,
  monitoring: faSatelliteDish,
  personnel: faUserShield,
  technology: faCog,
  trusted: faShieldHalved,
};

export default function Home() {
  const { lang } = useParams();
  const { t } = useTranslation(['home', 'common']);

  useEffect(() => {
    document.title = t('hero.title') + ' | GSI';
  }, [t, lang]);

  const heroCtaPrimary = {
    text: t('hero.ctaPrimary'),
    href: getLocalizedPath('services', lang),
  };
  const heroCtaSecondary = {
    text: t('hero.ctaSecondary'),
    href: getLocalizedPath('contact', lang),
  };

  const heroMetrics = [
    { value: '29,000+', label: t('hero.metrics.atms', { defaultValue: 'ATMs Managed' }) },
    { value: '50+', label: t('hero.metrics.years', { defaultValue: 'Years of Operations' }) },
    { value: '32', label: t('hero.metrics.states', { defaultValue: 'States Covered' }) },
    { value: '24/7', label: t('hero.metrics.monitoring', { defaultValue: 'Monitoring Active' }) },
  ];

  const coreServices = [
    { key: 'cit', icon: faTruck },
    { key: 'guards', icon: faUserShield },
  ];

  const advancedServices = [
    { key: 'technology', icon: faSatelliteDish },
    { key: 'cargo', icon: faTruck },
    { key: 'consulting', icon: faGlobe },
    { key: 'executive', icon: faUserShield },
  ];

  const whyGsiPoints = ['coverage', 'monitoring', 'personnel', 'technology', 'trusted'];

  const processSteps = ['step1', 'step2', 'step3', 'step4'].map((stepKey) => {
    const step = t(`process.steps.${stepKey}`, { returnObjects: true });
    return { title: step.title, description: step.description };
  });

  return (
    <div className={styles.home}>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaPrimary={heroCtaPrimary}
        ctaSecondary={heroCtaSecondary}
        backgroundVideo="/media/optimized/videos/hero-flag"
        backgroundImage={placeholders.heroes.home}
        fullHeight
        align="center"
        metrics={heroMetrics}
        statusLabel={t('hero.statusLabel', { defaultValue: 'Systems Operational' })}
      />

      <section className={styles.coreShowcase}>
        {/* Circuit board background */}
        <div className={styles.showcaseBg}>
          <div className={styles.showcaseGrid} />
          <div className={styles.showcaseTraceH} />
          <div className={styles.showcaseTraceH2} />
          <div className={styles.showcaseTraceV} />
          <div className={styles.showcaseTraceV2} />
          <div className={styles.showcaseOrb} />
          <div className={styles.showcaseOrb2} />
        </div>

        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle title={t('coreServices.sectionTitle')} />
          </motion.div>
        </Container>

        <Container size="lg">
          <div className={styles.showcaseServices}>
            {coreServices.map(({ key, icon }, i) => {
              const cardPhotos = {
                cit: '/media/optimized/services/cit-hero-lg.jpg',
                guards: '/media/optimized/services/tactical-officer-lg.jpg',
              };
              return (
                <GlowCard
                  key={key}
                  className={styles.showcaseCard}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={cardPhotos[key]}
                    alt=""
                    className={styles.showcaseCardPhoto}
                    loading="lazy"
                  />
                  <div className={styles.showcaseCardOverlay} />
                  {key === 'cit' && (
                    <>
                      <div className={styles.showcaseNode} style={{ top: '38%', left: '25%' }} />
                      <div className={styles.showcaseNode} style={{ top: '22%', right: '18%' }} />
                      <div className={`${styles.showcaseNode} ${styles.showcaseTruck}`}>
                        <ThinIcon icon={faTruck} />
                      </div>
                    </>
                  )}
                  <span className={styles.showcaseIdx}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.showcaseCardContent}>
                    <h3 className={styles.showcaseTitle}>
                      {t(`coreServices.${key}.title`)}
                    </h3>
                    <p className={styles.showcaseDesc}>
                      {t(`coreServices.${key}.description`)}
                    </p>
                    <Link
                      to={`/${lang}${routeConfig.serviceDetail[key][lang]}`}
                      className={styles.showcaseCta}
                    >
                      {t('common:cta.learnMore')}
                    </Link>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle title={t('advancedServices.sectionTitle')} />
          </motion.div>
          <div className={styles.serviceGrid}>
            {advancedServices.map(({ key, icon }, i) => (
              <ServiceCard
                key={key}
                title={t(`advancedServices.${key}.title`)}
                description={t(`advancedServices.${key}.description`)}
                icon={icon}
                image={placeholders.services[key]}
                href={`/${lang}${routeConfig.serviceDetail[key][lang]}`}
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
            variants={panelReveal}
          >
            <SectionTitle
              title={t('whyGsi.sectionTitle')}
              subtitle={t('whyGsi.subtitle')}
            />
          </motion.div>
          <div className={styles.whyGrid}>
            {whyGsiPoints.map((key, i) => (
              <GlowCard
                key={key}
                className={styles.whyCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={panelReveal}
              >
                <span className={styles.whyIcon}>
                  <ThinIcon icon={WHY_GSI_ICONS[key]} />
                </span>
                <Text variant="body1">{t(`whyGsi.points.${key}`)}</Text>
              </GlowCard>
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
            variants={panelReveal}
          >
            <SectionTitle
              title={t('process.sectionTitle')}
              subtitle={t('process.subtitle')}
            />
          </motion.div>
          <StepProcess steps={processSteps} columns={4} />
        </Container>
      </section>

      <section className={styles.section}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle title={t('testimonials.sectionTitle')} />
          </motion.div>
          <GlowCard
            className={styles.testimonialCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <Text variant="body1" color="muted" className={styles.quote}>
              &ldquo;{t('testimonials.quote1.text')}&rdquo;
            </Text>
            <Text variant="subheading" className={styles.author}>
              — {t('testimonials.quote1.author')}
            </Text>
          </GlowCard>
          <motion.div
            className={styles.testimonialCtaWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <Button variant="secondary" size="md" href={getLocalizedPath('about', lang)}>
              {t('testimonials.cta')}
            </Button>
          </motion.div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.sectionCta}`}>
        <div
          className={styles.ctaBgImage}
          style={{ backgroundImage: `url(${placeholders.sections.ctaBg})` }}
          aria-hidden="true"
        />
        <Container size="lg">
          <motion.div
            className={styles.quoteContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <Text variant="h3">{t('quoteSection.title')}</Text>
            <Text variant="body1" color="muted">
              {t('quoteSection.subtitle')}
            </Text>
            <Button variant="primary" size="lg" href={getLocalizedPath('contact', lang)}>
              {t('common:cta.requestQuote')}
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
