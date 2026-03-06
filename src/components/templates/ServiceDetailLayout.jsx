import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import HeroSection from '../organisms/HeroSection/HeroSection';
import StepProcess from '../organisms/StepProcess/StepProcess';
import Container from '../atoms/Container/Container';
import Text from '../atoms/Text/Text';
import Button from '../atoms/Button/Button';
import { getLocalizedPath } from '../../router/routes';
import { motion, useInView, animate } from 'framer-motion';
import placeholders from '../../utils/placeholders';
import styles from './ServiceDetailLayout.module.scss';

/* ── Image maps ───────────────────────────────── */

const SERVICE_VALUE_IMAGES = {
  cit: placeholders.sections.mexicanPesos,
  guards: placeholders.sections.guardEquipment,
  cargo: placeholders.sections.radioOperator,
  technology: placeholders.sections.guardMonitoring,
  consulting: placeholders.sections.securityTech,
  conceptDesign: placeholders.sections.cctvMonitors,
  executive: placeholders.sections.tacticalOfficer,
  atm: placeholders.sections.cashCounting,
  custom: placeholders.sections.bodyguardRadio,
};

const SERVICE_DIFF_IMAGES = {
  cit: placeholders.sections.guardCheckpoint,
  guards: placeholders.sections.guardPortrait,
  cargo: placeholders.sections.guardRadioCap,
  technology: placeholders.sections.securityTech,
  consulting: placeholders.sections.guardProfile,
  conceptDesign: placeholders.sections.guardMonitoring,
  executive: placeholders.sections.bodyguardRadio,
  atm: placeholders.sections.atmOperation,
  custom: placeholders.sections.assetProtection,
};

const SERVICE_BREAK_IMAGES = {
  cit: placeholders.sections.guardMonitoring,
  guards: placeholders.sections.radioOperator,
  cargo: placeholders.sections.guardCheckpoint,
  technology: placeholders.sections.tacticalOfficer,
  consulting: placeholders.sections.cctvMonitors,
  conceptDesign: placeholders.sections.bodyguardRadio,
  executive: placeholders.sections.guardMonitoring,
  atm: placeholders.sections.guardEquipment,
  custom: placeholders.sections.securityTech,
};

const SERVICE_CTA_IMAGES = {
  cit: placeholders.sections.guardProfile,
  guards: placeholders.sections.guardCheckpoint,
  cargo: placeholders.sections.guardMonitoring,
  technology: placeholders.sections.cctvMonitors,
  consulting: placeholders.sections.guardCheckpoint,
  conceptDesign: placeholders.sections.securityTech,
  executive: placeholders.sections.guardProfile,
  atm: placeholders.sections.mexicanPesos,
  custom: placeholders.sections.assetProtection,
};

/* ── Animation Variants ─────────────────────────── */

const lineWipe = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const scaleReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

/* ── Metric Tile ──────────────────────────────── */

function parseMetric(value) {
  const m = value.match(/^([\d,.\/]+\+?)\s*(.*)/);
  if (m) return { num: m[1], label: m[2] };
  return { num: null, label: value };
}

function MetricTile({ value, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { num, label } = parseMetric(value);
  const [displayNum, setDisplayNum] = useState(num || '');
  const isNumeric = num !== null;

  useEffect(() => {
    if (!isInView || !isNumeric) return;
    const clean = num.replace(/[,+/]/g, '');
    const target = parseFloat(clean);
    if (isNaN(target) || target === 0) return;

    const hasPlus = num.endsWith('+');
    const hasComma = num.includes(',');
    const suffix = num.replace(/^[\d,.]+/, '');
    const motionVal = { val: 0 };

    const controls = animate(motionVal, { val: target }, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: () => {
        const r = Math.round(motionVal.val);
        const f = hasComma ? r.toLocaleString() : String(r);
        setDisplayNum(f + (hasPlus ? '+' : suffix));
      },
    });

    return () => controls.stop();
  }, [isInView, num, isNumeric]);

  const idx = String(index + 1).padStart(2, '0');

  if (isNumeric) {
    return (
      <motion.div
        ref={ref}
        className={styles.metricCard}
        variants={scaleReveal}
        custom={index}
      >
        <span className={styles.metricShimmer} />
        <span className={styles.metricIdx}>{idx}</span>
        <span className={styles.metricNumber}>{displayNum}</span>
        {label && <span className={styles.metricLabel}>{label}</span>}
        <span className={styles.metricPulse} />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`${styles.metricCard} ${styles.metricText}`}
      variants={scaleReveal}
      custom={index}
    >
      <span className={styles.metricShimmer} />
      <span className={styles.metricIdx}>{idx}</span>
      <span className={styles.metricTextValue}>{label}</span>
      <span className={styles.metricPulse} />
    </motion.div>
  );
}

/* ── Animated SVG Checkmark ───────────────────── */

function AnimatedCheck({ delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <svg
      ref={ref}
      className={styles.diffCheckSvg}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <circle
        cx="11"
        cy="11"
        r="10"
        stroke="var(--color-electric-dim)"
        strokeWidth="1"
        className={styles.diffCircle}
        style={{
          strokeDasharray: 63,
          strokeDashoffset: isInView ? 0 : 63,
          transition: `stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      />
      <path
        d="M7 11.5L10 14.5L15.5 8.5"
        stroke="var(--color-electric)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.diffCheckPath}
        style={{
          strokeDasharray: 16,
          strokeDashoffset: isInView ? 0 : 16,
          transition: `stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay + 0.3}s`,
        }}
      />
    </svg>
  );
}

/* ── Main Layout ──────────────────────────────── */

export default function ServiceDetailLayout({ serviceKey }) {
  const { t } = useTranslation('services');
  const { lang } = useParams();
  const detail = t(`detail.${serviceKey}`, { returnObjects: true });

  if (!detail || !detail.hero) return null;

  const capabilities = detail.capabilities || {};
  const process = detail.process || {};
  const metrics = detail.metrics || {};
  const differentiators = detail.differentiators || [];
  const industries = detail.industries || [];

  const processSteps = Object.values(process).map((step) => ({
    title: step.title,
    description: step.text,
  }));

  const valueImage = SERVICE_VALUE_IMAGES[serviceKey];
  const diffImage = SERVICE_DIFF_IMAGES[serviceKey];
  const capEntries = Object.entries(capabilities);
  const [activeCap, setActiveCap] = useState(0);

  const capImagePool = [
    valueImage,
    SERVICE_DIFF_IMAGES[serviceKey],
    SERVICE_BREAK_IMAGES[serviceKey],
    SERVICE_CTA_IMAGES[serviceKey],
    placeholders.services[serviceKey],
  ].filter(Boolean);

  return (
    <div className={styles.servicePage}>
      {/* Hero */}
      <HeroSection
        title={detail.hero.title}
        subtitle={detail.hero.subtitle}
        backgroundImage={placeholders.services[serviceKey]}
        backgroundPosition={detail.hero.bgPosition || 'center'}
        align="center"
      />

      {/* ── Briefing: Problem → Value ── */}
      <section className={styles.briefingSection}>
        <div className={styles.circuitBoard}>
          <div className={styles.circuitGrid} />
          <div className={styles.circuitTraceH} />
          <div className={styles.circuitTraceH2} />
          <div className={styles.circuitTraceV} />
          <div className={styles.circuitTraceV2} />
          <div className={styles.circuitNode} style={{ top: '18%', left: '12%' }} />
          <div className={styles.circuitNode} style={{ top: '45%', left: '88%' }} />
          <div className={styles.circuitNode} style={{ top: '72%', left: '35%' }} />
          <div className={styles.circuitNode} style={{ top: '30%', left: '65%' }} />
          <div className={styles.circuitNode} style={{ top: '80%', left: '78%' }} />
          <div className={styles.circuitNode} style={{ top: '55%', left: '20%' }} />
          <div className={styles.circuitPulse} />
          <div className={styles.circuitPulse2} />
          <div className={styles.circuitGlow} />
        </div>

        <Container size="lg">
          <motion.div
            className={styles.briefingInner}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Problem row */}
            <motion.div className={styles.briefingProblem} variants={slideUp} custom={0}>
              <span className={styles.briefingTag}>
                {t('common:labels.challenge', { defaultValue: 'The Challenge' })}
              </span>
              <h2 className={styles.briefingTitle}>{detail.problem.title}</h2>
              <p className={styles.briefingText}>{detail.problem.text}</p>
            </motion.div>

            <motion.div className={styles.briefingDivider} variants={lineWipe} />

            {/* Value row */}
            <motion.div className={styles.briefingValue} variants={slideUp} custom={2}>
              <span className={styles.briefingTag}>
                {t('common:labels.solution', { defaultValue: 'GSI Response' })}
              </span>
              <h2 className={styles.briefingTitle}>{detail.value.title}</h2>
              <div className={styles.briefingCards}>
                <div className={styles.briefingCard}>
                  <span className={styles.briefingCardNum}>01</span>
                  <p className={styles.briefingCardText}>{detail.value.text1}</p>
                </div>
                {detail.value.text2 && (
                  <div className={styles.briefingCard}>
                    <span className={styles.briefingCardNum}>02</span>
                    <p className={styles.briefingCardText}>{detail.value.text2}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Capabilities: Preview + List ── */}
      {capEntries.length > 0 && (
        <section className={styles.capSection}>
          <Container size="lg">
            <div className={styles.capGrid}>
              {/* Large preview card — crossfading backgrounds */}
              <motion.div
                className={styles.capPreview}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {capEntries.map(([, ], i) => (
                  <div
                    key={i}
                    className={styles.capPreviewBg}
                    style={{
                      backgroundImage: `url(${capImagePool[i % capImagePool.length]})`,
                      opacity: i === activeCap ? 1 : 0,
                    }}
                  />
                ))}
                <div className={styles.capPreviewOverlay} />
                <div className={styles.capPreviewScan} />
                <div className={styles.capPreviewContent}>
                  <span className={styles.capPreviewIdx}>
                    {String(activeCap + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.capPreviewTitle}>
                    {capEntries[activeCap][1].title}
                  </h3>
                  <div className={styles.capPreviewDivider} />
                  <p className={styles.capPreviewText}>
                    {capEntries[activeCap][1].text}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    to={getLocalizedPath('contact', lang)}
                    className={styles.capPreviewCta}
                  >
                    {t('common:cta.requestQuote', { defaultValue: 'Request a Quote' })}
                  </Button>
                </div>
              </motion.div>

              {/* Item list */}
              <div className={styles.capList}>
                {capEntries.map(([key, cap], i) => (
                  <motion.div
                    key={key}
                    className={`${styles.capItem} ${i === activeCap ? styles.capItemActive : ''}`}
                    onMouseEnter={() => setActiveCap(i)}
                    onClick={() => setActiveCap(i)}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className={styles.capItemIdx}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.capItemBody}>
                      <h4 className={styles.capItemTitle}>{cap.title}</h4>
                      <p className={styles.capItemText}>{cap.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── Process ── */}
      {processSteps.length > 0 && (
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <Container size="lg">
            <StepProcess steps={processSteps} />
          </Container>
        </section>
      )}

      {/* ── Visual Break ── */}
      {SERVICE_BREAK_IMAGES[serviceKey] && (
        <div className={styles.photoBreak}>
          <div
            className={styles.photoBreakImg}
            style={{ backgroundImage: `url(${SERVICE_BREAK_IMAGES[serviceKey]})` }}
          />
          <div className={styles.photoBreakOverlay} />
          <div className={styles.photoBreakScan} />
          <div className={styles.photoBreakContent}>
            <motion.span
              className={styles.photoBreakLabel}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {detail.hero.title}
            </motion.span>
            <motion.div
              className={styles.photoBreakLine}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.h3
              className={styles.photoBreakQuote}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {detail.value.title}
            </motion.h3>
          </div>
        </div>
      )}

      {/* ── Metrics ── */}
      {Object.keys(metrics).length > 0 && (
        <section className={styles.metricsSection}>
          <Container size="lg">
            <motion.div
              className={styles.metricsGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {Object.values(metrics).map((metric, i) => (
                <MetricTile key={i} value={metric} index={i} />
              ))}
            </motion.div>
          </Container>
        </section>
      )}

      {/* ── Differentiators: Split with photo ── */}
      {differentiators.length > 0 && (
        <section className={styles.diffSection}>
          <Container size="lg">
            <div className={styles.diffSplit}>
              <motion.div
                className={styles.diffPhotoCol}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {diffImage && (
                  <div className={styles.diffPhotoWrap}>
                    <img src={diffImage} alt="" className={styles.diffPhoto} loading="lazy" />
                    <div className={styles.diffPhotoOverlay} />
                  </div>
                )}
              </motion.div>

              <div className={styles.diffListCol}>
                {differentiators.map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.diffItem}
                    variants={slideInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-30px' }}
                    custom={i}
                  >
                    <AnimatedCheck delay={i * 0.12} />
                    <Text variant="body2">{item}</Text>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── Industries: Dual Marquee ── */}
      {industries.length > 0 && (() => {
        const mid = Math.ceil(industries.length / 2);
        const row1 = industries.slice(0, mid);
        const row2 = industries.slice(mid);
        const r1 = [...row1, ...row1, ...row1, ...row1];
        const r2 = [...row2, ...row2, ...row2, ...row2];

        return (
          <section className={styles.industriesSection}>
            <motion.h3
              className={styles.industriesTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('common:labels.industries', { defaultValue: 'Industries We Serve' })}
            </motion.h3>

            <div className={styles.marqueeWrap}>
              <div className={styles.marqueeFade} />
              <div className={styles.marqueeTrack}>
                <div className={styles.marqueeRow} style={{ '--marquee-dir': 'normal' }}>
                  {r1.map((item, i) => (
                    <span key={i} className={styles.industryTag}>{item}</span>
                  ))}
                </div>
              </div>
              {row2.length > 0 && (
                <div className={styles.marqueeTrack}>
                  <div className={styles.marqueeRow} style={{ '--marquee-dir': 'reverse' }}>
                    {r2.map((item, i) => (
                      <span key={i} className={styles.industryTag}>{item}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className={styles.marqueeScan} />
            </div>
          </section>
        );
      })()}

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        {SERVICE_CTA_IMAGES[serviceKey] && (
          <div
            className={styles.ctaBgImage}
            style={{ backgroundImage: `url(${SERVICE_CTA_IMAGES[serviceKey]})` }}
            aria-hidden="true"
          />
        )}
        <Container size="lg">
          <motion.div
            className={styles.ctaContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.ctaLine} variants={lineWipe} />
            <motion.div variants={slideUp} custom={0}>
              <Text variant="h3">{detail.cta.title}</Text>
            </motion.div>
            <motion.div variants={slideUp} custom={1}>
              <Text variant="body1" color="muted">{detail.cta.text}</Text>
            </motion.div>
            <motion.div variants={slideUp} custom={2}>
              <Button
                variant="primary"
                size="lg"
                href={getLocalizedPath('contact', lang)}
              >
                {t('common:cta.requestQuote', { ns: 'common' })}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
