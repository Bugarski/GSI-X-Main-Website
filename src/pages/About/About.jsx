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
import styles from './About.module.scss';

const BASE = '/media/optimized/about';

const panelReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const STRENGTH_ICONS = {
  footprint: faGlobe,
  command: faChartLine,
  personnel: faUserShield,
  portfolio: faBriefcase,
  trusted: faShieldHalved,
};

const ERA_CONFIG = [
  {
    key: 'origins',
    images: [`${BASE}/origins-roman`, `${BASE}/origins-medieval`],
    crossfade: true,
  },
  {
    key: 'armored',
    images: [`${BASE}/armored-truck`, `${BASE}/armored-blueprints`],
    crossfade: true,
  },
  {
    key: 'intelligent',
    images: [`${BASE}/intelligent-hud`],
  },
  {
    key: 'cash',
    images: [`${BASE}/cash-freedom`],
  },
];

function EraImage({ src, className, alt = '' }) {
  return (
    <picture className={className}>
      <source srcSet={`${src}-lg.webp`} type="image/webp" />
      <img src={`${src}-lg.jpg`} alt={alt} loading="lazy" draggable="false" />
    </picture>
  );
}

function EraSection({ era, title, text, index, isLast }) {
  const isReversed = index % 2 === 1;
  const isCrossfade = era.crossfade && era.images.length === 2;
  const isSplit = era.split && era.images.length === 2;

  return (
    <motion.div
      className={`${styles.era} ${isReversed ? styles.eraReversed : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={panelReveal}
      custom={0}
    >
      {/* Image column */}
      <div className={styles.eraImageCol}>
        <div className={styles.eraImageWrap}>
          {isCrossfade ? (
            <>
              <EraImage src={era.images[0]} className={styles.eraImg} />
              <EraImage src={era.images[1]} className={`${styles.eraImg} ${styles.eraImgAlt}`} />
            </>
          ) : isSplit ? (
            <div className={styles.eraSplitStack}>
              <EraImage src={era.images[0]} className={styles.eraSplitImg} />
              <EraImage src={era.images[1]} className={styles.eraSplitImg} />
            </div>
          ) : (
            <EraImage src={era.images[0]} className={styles.eraImg} />
          )}
          <div className={styles.eraImageOverlay} />
        </div>
      </div>

      {/* Timeline column */}
      <div className={styles.timelineCol}>
        <div className={styles.timelineLine} />
        <div className={styles.timelineDot}>
          <span className={styles.timelineDotInner} />
        </div>
        {!isLast && <div className={styles.timelineLineBottom} />}
      </div>

      {/* Text column */}
      <motion.div className={styles.eraTextCol} variants={panelReveal} custom={1}>
        <span className={styles.eraIndex}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className={styles.eraTitle}>{title}</h3>
        <p className={styles.eraText}>{text}</p>
      </motion.div>
    </motion.div>
  );
}

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
        backgroundImage={`${BASE}/hero-evolution-lg.jpg`}
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
            <Text variant="body1" color="secondary" className={styles.heroDescription}>
              {t('hero.description')}
            </Text>
            <SectionTitle title={t('intro.title')} align="center" />
            <Text variant="body1" color="muted" className={styles.introText}>
              {t('intro.text')}
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* History — alternating left/right layout */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
            className={styles.historySectionTitle}
          >
            <SectionTitle title={t('history.sectionTitle')} align="center" />
          </motion.div>

          <div className={styles.eraStack}>
            {ERA_CONFIG.map((era, i) => (
              <EraSection
                key={era.key}
                era={era}
                title={t(`timeline.${era.key}.title`)}
                text={t(`timeline.${era.key}.text`)}
                index={i}
                isLast={i === ERA_CONFIG.length - 1}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Who We Are Today */}
      <section className={styles.section}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle title={t('corporate.title')} align="center" />
          </motion.div>

          {/* Lead text */}
          <motion.div
            className={styles.corporateLead}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
            custom={1}
          >
            <Text variant="body1" color="secondary">
              {t('corporate.text')}
            </Text>
          </motion.div>

          {/* Featured GSI collage image */}
          <motion.div
            className={styles.corporateImageWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
            custom={2}
          >
            <EraImage src={`${BASE}/who-we-are`} className={styles.corporateImage} />
          </motion.div>

          {/* Mission + Vision cards */}
          <div className={styles.mvGrid}>
            <motion.div
              className={styles.mvCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={panelReveal}
              custom={3}
            >
              <Text variant="h5" className={styles.cardTitle}>
                {t('corporate.mission.title')}
              </Text>
              <Text variant="body1" color="muted">
                {t('corporate.mission.text')}
              </Text>
            </motion.div>
            <motion.div
              className={styles.mvCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={panelReveal}
              custom={4}
            >
              <Text variant="h5" className={styles.cardTitle}>
                {t('corporate.vision.title')}
              </Text>
              <Text variant="body1" color="muted">
                {t('corporate.vision.text')}
              </Text>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Strengths */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle title={t('strengths.title')} align="center" />
          </motion.div>
          <div className={styles.strengthsGrid}>
            {Object.keys(STRENGTH_ICONS).map((key, i) => (
              <motion.div
                key={key}
                className={styles.strengthCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={panelReveal}
                custom={i}
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
