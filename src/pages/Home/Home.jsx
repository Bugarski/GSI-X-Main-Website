import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ThinIcon from '../../utils/ThinIcon';
import {
  faShieldHalved,
  faTruck,
  faUserShield,
  faSatelliteDish,
  faGlobe,
  faCog,
  faArrowUpRightFromSquare,
  faBuildingColumns,
  faBuildings,
  faLandmarkDome,
  faSignalStream,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const LOGO_BASE = '/media/optimized/logos/empresas';
const PHOTO_BASE = '/media/optimized/empresas';
const EMPRESAS_GSI = [
  { key: 'cometra', name: 'Cometra', fullName: 'Compañía Mexicana de Traslado de Valores, S.A. de C.V.', founded: '1976', logo: `${LOGO_BASE}/cometra.webp`, photo: `${PHOTO_BASE}/cometra.jpg` },
  { key: 'sepsa', name: 'Sepsa', fullName: 'Sepsa, S.A. de C.V.', founded: '1976', logo: `${LOGO_BASE}/sepsa.webp`, photo: `${PHOTO_BASE}/sepsa.jpg` },
  { key: 'seguritec', name: 'Seguritec', fullName: 'Seguritec Transporte de Valores, S.A. de C.V.', founded: '1984', logo: `${LOGO_BASE}/seguritec.webp`, photo: `${PHOTO_BASE}/seguritec.jpg` },
  { key: 'gsi-seguridad', name: 'GSI Seguridad Privada', fullName: 'GSI Seguridad Privada, S.A. de C.V.', founded: '2003', logo: `${LOGO_BASE}/gsi-seguridad.webp`, photo: `${PHOTO_BASE}/gsi-seguridad.jpg`, website: 'https://www.gsiseguridad.com.mx/' },
  { key: 'sepsa-custodias', name: 'Sepsa Custodias', fullName: 'Sepsa Custodias de Valores', founded: '1999', logo: `${LOGO_BASE}/sepsa-custodias.webp`, photo: `${PHOTO_BASE}/sepsa-custodias.jpg`, website: 'https://www.sepsacustodias.com.mx/' },
  { key: 'central-alarmas', name: 'Central de Alarmas', fullName: 'Central de Alarmas', logo: `${LOGO_BASE}/central-alarmas.webp` },
  { key: 'regio', name: 'Regio Traslados', fullName: 'Regio Translados, S.A. de C.V.', founded: '2001', logo: `${LOGO_BASE}/regio.webp` },
  { key: 'cinco-elementos', name: 'Cinco Elementos', fullName: 'Comercializadora Cinco Elementos, S.A. de C.V.', logo: `${LOGO_BASE}/cinco-elementos.webp`, photo: `${PHOTO_BASE}/cinco-elementos.jpg`, website: 'https://www.cincoelementos.mx/' },
  { key: 'ax-transporter', name: 'AX Transporter', fullName: 'AX Transporter', logo: `${LOGO_BASE}/ax-transporter.webp`, photo: `${PHOTO_BASE}/ax-transporter.jpg` },
  { key: 'gsi-fabril', name: 'GSI Fabril', fullName: 'Fabril, S.A. de C.V.', logo: `${LOGO_BASE}/gsi-fabril.webp`, photo: `${PHOTO_BASE}/gsi-fabril.jpg`, website: 'https://www.gsifabril.com/' },
  { key: 'grumer', name: 'Grumer', fullName: 'Grupo Mercurio de Transportes, S.A. de C.V.', logo: `${LOGO_BASE}/grumer.webp`, photo: `${PHOTO_BASE}/grumer.jpg`, website: 'https://grumer-mexico.com.mx/' },
  { key: 'impacto-total', name: 'Impacto Total', fullName: 'Impacto Total en Seguridad Privada Integral, S.A. de C.V.', logo: `${LOGO_BASE}/impacto-total.webp`, photo: `${PHOTO_BASE}/impacto-total.jpg`, website: 'http://impactototal.mx/' },
  { key: 'tameme', name: 'Tameme', fullName: 'Tameme', logo: `${LOGO_BASE}/tameme.webp`, photo: `${PHOTO_BASE}/tameme.jpg` },
  { key: 'tecnoval', name: 'Tecnoval', fullName: 'Tecnoval de México, S.A. de C.V.', founded: '1996', logo: `${LOGO_BASE}/tecnoval.webp`, photo: `${PHOTO_BASE}/tecnoval.jpg` },
  { key: 'cogar-trade', name: 'Cogar Trade', fullName: 'Cogar Trade, S.A. de C.V.', logo: `${LOGO_BASE}/cogar-trade.webp` },
];

const FV = '/media/favicons';
const CLIENT_SECTORS = [
  {
    key: 'financial',
    clients: [
      { name: 'Banjercito', icon: `${FV}/banjercito.png` },
      { name: 'BBVA', icon: `${FV}/bbva.png` },
      { name: 'Santander', icon: `${FV}/santander.png` },
      { name: 'Banco de México', icon: `${FV}/banxico.png` },
      { name: 'Citibanamex', icon: `${FV}/citibanamex.png` },
      { name: 'Scotiabank', icon: `${FV}/scotiabank.png` },
      { name: 'HSBC', icon: `${FV}/hsbc.png` },
      { name: 'Banorte', icon: `${FV}/banorte.png` },
      { name: 'Banco Bienestar', icon: `${FV}/gob.png` },
      { name: 'Banco Azteca', icon: `${FV}/bancoazteca.png` },
      { name: 'Banregio', icon: `${FV}/banregio.png` },
      { name: 'BanBajío', icon: `${FV}/banbajio.png` },
      { name: 'Compartamos Banco', icon: `${FV}/compartamos.png` },
    ],
  },
  {
    key: 'enterprise',
    clients: [
      { name: 'Telmex', icon: `${FV}/telmex.png` },
      { name: 'Grupo Bimbo', icon: `${FV}/grupobimbo.png` },
      { name: 'Walmart', icon: `${FV}/walmart.png` },
      { name: 'Sears', icon: `${FV}/sears.png` },
      { name: 'Elektra', icon: `${FV}/elektra.png` },
      { name: 'Soriana', icon: `${FV}/soriana.png` },
      { name: 'Sabritas', icon: `${FV}/sabritas.png` },
      { name: 'Grupo ADO', icon: `${FV}/ado.png` },
      { name: 'Chedraui', icon: `${FV}/chedraui.png` },
      { name: 'Telcel', icon: `${FV}/telcel.png` },
      { name: 'Liverpool', icon: `${FV}/liverpool.png` },
      { name: 'OXXO', icon: `${FV}/oxxo.png` },
      { name: '7-Eleven', icon: `${FV}/7eleven.png` },
      { name: 'El Palacio de Hierro', icon: `${FV}/palaciodehierro.png` },
      { name: 'Alsea', icon: `${FV}/alsea.png` },
      { name: 'Cinemex', icon: `${FV}/cinemex.png` },
      { name: 'Cinépolis', icon: `${FV}/cinepolis.png` },
      { name: 'Grupo Modelo', icon: `${FV}/grupomodelo.png` },
      { name: 'Coppel', icon: `${FV}/coppel.png` },
      { name: 'Costco', icon: `${FV}/costco.png` },
      { name: 'Danone', icon: `${FV}/danone.png` },
      { name: 'PepsiCo', icon: `${FV}/pepsico.png` },
    ],
  },
  {
    key: 'government',
    clients: [
      { name: 'Gobierno de la CDMX', icon: `${FV}/cdmx.png` },
      { name: 'STC Metro', icon: `${FV}/metro.png` },
      { name: 'Lotería Nacional', icon: `${FV}/lotenal.png` },
      { name: 'CFE', icon: `${FV}/cfe.png` },
      { name: 'SEP', icon: `${FV}/gob.png` },
      { name: 'ISSSTE', icon: `${FV}/gob.png` },
      { name: 'Capufe', icon: `${FV}/capufe.png` },
      { name: 'IMSS', icon: `${FV}/imss.png` },
      { name: 'DIF', icon: `${FV}/gob.png` },
      { name: 'INE', icon: `${FV}/ine.png` },
      { name: 'DICONSA', icon: `${FV}/gob.png` },
      { name: 'FONADIN', icon: `${FV}/fonadin.png` },
      { name: 'SEPOMEX', icon: `${FV}/gob.png` },
    ],
  },
];

const WHY_GSI_ICONS = {
  coverage: faGlobe,
  monitoring: faSatelliteDish,
  personnel: faUserShield,
  technology: faCog,
  trusted: faShieldHalved,
};

const SECTOR_ICONS = {
  financial: faBuildingColumns,
  enterprise: faBuildings,
  government: faLandmarkDome,
};

const TOTAL_CLIENTS = CLIENT_SECTORS.reduce((sum, s) => sum + s.clients.length, 0);

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  const onIntersect = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    },
    [target, duration],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [onIntersect]);

  return { ref, count };
}

export default function Home() {
  const { lang } = useParams();
  const { t } = useTranslation(['home', 'common']);
  const [activeEmpresa, setActiveEmpresa] = useState(EMPRESAS_GSI[0].key);
  const { ref: counterRef, count: clientCount } = useCountUp(TOTAL_CLIENTS);

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

      <section className={styles.networkVideo}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.networkVideoEl}
        >
          <source src="/media/videos/map-network.mp4" type="video/mp4" />
        </video>
        <div className={styles.networkVideoOverlay} />
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

      {/* Empresas GSI */}
      <section className={`${styles.section} ${styles.sectionEmpresas}`}>
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle
              title={t('empresas.sectionTitle')}
              subtitle={t('empresas.subtitle')}
            />
          </motion.div>

          <div className={styles.empresasBrowser}>
            <div className={styles.empresasGrid}>
              {EMPRESAS_GSI.map((empresa, i) => (
                <motion.button
                  key={empresa.key}
                  type="button"
                  className={`${styles.empresasTile} ${activeEmpresa === empresa.key ? styles.empresasTileActive : ''}`}
                  onClick={() => setActiveEmpresa(empresa.key)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.empresasTileLogoWrap}>
                    <img src={empresa.logo} alt={empresa.name} className={styles.empresasTileGhost} loading="lazy" />
                    <img src={empresa.logo} alt="" className={styles.empresasTileColor} aria-hidden="true" loading="lazy" />
                  </div>
                  <span className={styles.empresasTileName}>{empresa.name}</span>
                </motion.button>
              ))}
            </div>

            <div className={styles.empresasPanel}>
              <AnimatePresence mode="wait">
                {(() => {
                  const emp = EMPRESAS_GSI.find((e) => e.key === activeEmpresa);
                  if (!emp) return null;
                  return (
                    <motion.div
                      key={emp.key}
                      className={styles.empresasPanelContent}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={styles.empresasPanelPhoto}>
                        {emp.photo && <img src={emp.photo} alt={emp.name} loading="lazy" />}
                      </div>
                      <div className={styles.empresasPanelBody}>
                        <div className={styles.empresasPanelLogo}>
                          <img src={emp.logo} alt={emp.name} />
                        </div>
                        <div className={styles.empresasPanelInfo}>
                          <div className={styles.empresasPanelNameRow}>
                            <h3 className={styles.empresasPanelName}>{emp.name}</h3>
                            {emp.founded && (
                              <span className={styles.empresasPanelBadge}>{emp.founded}</span>
                            )}
                          </div>
                          <span className={styles.empresasPanelFullName}>{emp.fullName}</span>
                        </div>
                      </div>
                      <div className={styles.empresasPanelDesc}>
                        <p>{t(`empresas.companies.${emp.key}`)}</p>
                        {emp.website && (
                          <a
                            href={emp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.empresasPanelLink}
                          >
                            <span>Website</span>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      {/* Clients — Active Connections Feed */}
      <section className={`${styles.section} ${styles.sectionClients}`}>
        <div className={styles.clientsGrid} aria-hidden="true" />
        <div className={styles.clientsScanline} aria-hidden="true" />
        <Container size="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <SectionTitle
              title={t('clients.sectionTitle')}
              subtitle={t('clients.subtitle')}
            />
          </motion.div>

          <motion.div
            ref={counterRef}
            className={styles.clientsCounter}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={panelReveal}
          >
            <FontAwesomeIcon icon={faSignalStream} className={styles.clientsCounterIcon} />
            <span className={styles.clientsCounterNum}>{clientCount}</span>
            <span className={styles.clientsCounterLabel}>{t('clients.counter')}</span>
          </motion.div>
        </Container>

        <div className={styles.clientFeed}>
          {CLIENT_SECTORS.map((sector, si) => (
            <div key={sector.key} className={styles.clientRow}>
              <div className={styles.clientRowLabel}>
                <span className={styles.clientSectorPulse} />
                <FontAwesomeIcon
                  icon={SECTOR_ICONS[sector.key]}
                  className={styles.clientSectorIcon}
                />
                <span className={styles.clientSectorLabel}>
                  {t(`clients.${sector.key}`)}
                </span>
              </div>
              <div className={styles.clientTickerWrap}>
                <div
                  className={`${styles.clientTicker} ${si % 2 !== 0 ? styles.clientTickerReverse : ''}`}
                  style={{ '--ticker-duration': `${30 + si * 8}s` }}
                >
                  {[0, 1].map((copy) => (
                    <div key={copy} className={styles.clientTickerTrack} aria-hidden={copy === 1}>
                      {sector.clients.map((client) => (
                        <span key={client.name} className={styles.clientChip}>
                          <img
                            src={client.icon}
                            alt=""
                            className={styles.clientChipIcon}
                            width="16"
                            height="16"
                          />
                          {client.name}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
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
            <SectionTitle
              title={t('quoteSection.title')}
              subtitle={t('quoteSection.subtitle')}
            />
            <Button variant="primary" size="lg" href={getLocalizedPath('contact', lang)}>
              {t('common:cta.requestQuote')}
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
