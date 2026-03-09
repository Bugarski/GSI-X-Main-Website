import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ThinIcon from '../../utils/ThinIcon';
import {
  faShieldCheck,
  faUserShield,
  faTriangleExclamation,
  faLock,
  faEye,
  faFileShield,
  faGavel,
  faPaperPlane,
  faCircleCheck,
} from '@fortawesome/pro-light-svg-icons';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import StepProcess from '../../components/organisms/StepProcess/StepProcess';
import Container from '../../components/atoms/Container/Container';
import GlowCard from '../../components/atoms/GlowCard/GlowCard';
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle';
import Text from '../../components/atoms/Text/Text';
import FormField from '../../components/molecules/FormField/FormField';
import { Button } from '../../components/atoms';
import placeholders from '../../utils/placeholders';
import styles from './Whistleblower.module.scss';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const protectionIcons = [faLock, faEye, faShieldCheck, faGavel];

export default function Whistleblower() {
  const { lang } = useParams();
  const { t } = useTranslation(['whistleblower', 'common']);

  useEffect(() => {
    document.title = t('meta.title') + ' | GSI';
  }, [t, lang]);

  const reportableItems = t('reportable.items', { returnObjects: true });
  const protectionItems = t('protection.items', { returnObjects: true });
  const reportTypes = t('form.reportTypes', { returnObjects: true });

  const processSteps = ['step1', 'step2', 'step3', 'step4'].map((key) => {
    const step = t(`process.steps.${key}`, { returnObjects: true });
    return { title: step.title, description: step.text };
  });

  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({
    reportType: '',
    location: '',
    incidentDate: '',
    description: '',
    peopleInvolved: '',
    anonymous: '',
    contactEmail: '',
  });

  const reportTypeOptions = reportTypes.map((label, i) => ({
    value: `type-${i}`,
    label,
  }));

  const anonymousOptions = [
    { value: 'yes', label: t('form.fields.anonymousYes') },
    { value: 'no', label: t('form.fields.anonymousNo') },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      const base = import.meta.env.BASE_URL || '';
      const res = await fetch(`${base}api/whistleblower`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang }),
      });
      if (!res.ok) throw new Error('Failed');
      setFormState('success');
      setFormData({ reportType: '', location: '', incidentDate: '', description: '', peopleInvolved: '', anonymous: '', contactEmail: '' });
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className={styles.whistleblower}>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={placeholders.heroes.whistleblower}
        ctaPrimary={{ text: t('hero.cta'), href: '#report-form' }}
        fullHeight={false}
        align="center"
      />

      {/* Intro — Shield Visual */}
      <section className={`${styles.section} ${styles.sectionIntro}`}>
        {/* Animated circuit background */}
        <div className={styles.introBg}>
          <div className={styles.introGrid} />
          <div className={styles.introTraceH} />
          <div className={styles.introTraceH2} />
          <div className={styles.introTraceV} />
          <div className={styles.introTraceV2} />
          <div className={styles.introOrb} />
          <div className={styles.introOrb2} />
        </div>

        <Container size="lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <SectionTitle title={t('meta.title')} />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Text variant="body1" color="muted" className={styles.introText}>
              {t('intro.text')}
            </Text>
          </motion.div>

          <div className={styles.introHighlights}>
            <GlowCard
              className={styles.introCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/media/optimized/services/guard-monitoring-lg.jpg"
                alt=""
                className={styles.introCardPhoto}
              />
              <div className={styles.introCardOverlay} />
              <div className={styles.introCardContent}>
                <span className={styles.introCardLabel}>
                  <ThinIcon icon={faLock} className={styles.introCardLabelIcon} />
                  Confidential
                </span>
                <Text variant="h4" className={styles.introCardHeading}>
                  Your Identity Is Safe
                </Text>
                <Text variant="body2" color="muted">{t('intro.confidential')}</Text>
              </div>
            </GlowCard>

            <GlowCard
              className={styles.introCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/media/optimized/services/security-tech-lg.jpg"
                alt=""
                className={styles.introCardPhoto}
              />
              <div className={styles.introCardOverlay} />
              <div className={styles.introCardContent}>
                <span className={styles.introCardLabel}>
                  <ThinIcon icon={faShieldCheck} className={styles.introCardLabelIcon} />
                  Protected
                </span>
                <Text variant="h4" className={styles.introCardHeading}>
                  Zero Retaliation Policy
                </Text>
                <Text variant="body2" color="muted">{t('intro.noRetaliation')}</Text>
              </div>
            </GlowCard>
          </div>
        </Container>
      </section>

      {/* What Can Be Reported */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <SectionTitle title={t('reportable.title')} subtitle={t('reportable.subtitle')} />
          </motion.div>
          <motion.div
            className={styles.reportGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {reportableItems.map((item, i) => (
              <motion.div key={i} className={styles.reportItem} variants={fadeIn}>
                <span className={styles.reportIdx}>{String(i + 1).padStart(2, '0')}</span>
                <Text variant="body2">{item}</Text>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Text variant="body2" color="muted" className={styles.unsureNote}>
              {t('reportable.unsure')}
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* Protection */}
      <section className={styles.section}>
        <Container size="lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <SectionTitle title={t('protection.title')} subtitle={t('protection.subtitle')} />
          </motion.div>
          <div className={styles.protectionLayout}>
            <motion.div
              className={styles.protectionPhoto}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <img
                src={placeholders.sections.guardAnonymous}
                alt=""
                className={styles.protectionImage}
              />
              <div className={styles.protectionImageOverlay} />
            </motion.div>
            <div className={styles.protectionContent}>
              <motion.div
                className={styles.protectionGrid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                {protectionItems.map((item, i) => (
                  <GlowCard key={i} className={styles.protectionCard} variants={fadeIn}>
                    <div className={styles.protectionIconWrap}>
                      <ThinIcon icon={protectionIcons[i]} className={styles.protectionIcon} />
                    </div>
                    <Text variant="body2">{item}</Text>
                  </GlowCard>
                ))}
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <div className={styles.warningNote}>
                  <div className={styles.warningBar} />
                  <div className={styles.warningBody}>
                    <div className={styles.warningHeader}>
                      <ThinIcon icon={faTriangleExclamation} className={styles.warningIcon} />
                      <span className={styles.warningLabel}>ZERO TOLERANCE</span>
                    </div>
                    <Text variant="body2" className={styles.warningText}>
                      {t('protection.warning')}
                    </Text>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section id="report-form" className={`${styles.section} ${styles.sectionForm}`}>
        <Container size="md">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <SectionTitle title={t('form.title')} subtitle={t('form.subtitle')} />
          </motion.div>

          {formState === 'success' ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <GlowCard className={styles.successCard}>
                <ThinIcon icon={faCircleCheck} className={styles.successIcon} />
                <Text variant="h5">{t('form.success')}</Text>
              </GlowCard>
            </motion.div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <GlowCard className={styles.formCard}>
                  <div className={styles.formHeader}>
                    <ThinIcon icon={faFileShield} className={styles.formHeaderIcon} />
                    <Text variant="h5">{t('meta.title')}</Text>
                  </div>

                  {formState === 'error' && (
                    <div className={styles.errorBanner}>
                      <Text variant="body2">{t('form.error')}</Text>
                    </div>
                  )}

                  <div className={styles.formFields}>
                    <FormField
                      type="select"
                      name="reportType"
                      label={t('form.fields.reportType')}
                      placeholder={t('form.fields.reportType')}
                      required
                      value={formData.reportType}
                      onChange={handleChange}
                      options={reportTypeOptions}
                    />
                    <div className={styles.formRow}>
                      <FormField
                        type="text"
                        name="location"
                        label={t('form.fields.location')}
                        placeholder={t('form.fields.location')}
                        value={formData.location}
                        onChange={handleChange}
                      />
                      <FormField
                        type="date"
                        name="incidentDate"
                        label={t('form.fields.incidentDate')}
                        value={formData.incidentDate}
                        onChange={handleChange}
                      />
                    </div>
                    <FormField
                      type="textarea"
                      name="description"
                      label={t('form.fields.description')}
                      placeholder={t('form.fields.description')}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className={styles.textareaField}
                    />
                    <FormField
                      type="text"
                      name="peopleInvolved"
                      label={t('form.fields.peopleInvolved')}
                      placeholder={t('form.fields.peopleInvolved')}
                      value={formData.peopleInvolved}
                      onChange={handleChange}
                    />
                    <div className={styles.formRow}>
                      <FormField
                        type="select"
                        name="anonymous"
                        label={t('form.fields.anonymous')}
                        placeholder={t('form.fields.anonymous')}
                        value={formData.anonymous}
                        onChange={handleChange}
                        options={anonymousOptions}
                      />
                      <FormField
                        type="email"
                        name="contactEmail"
                        label={t('form.fields.contactEmail')}
                        placeholder={t('form.fields.contactEmail')}
                        value={formData.contactEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles.formFooter}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={formState === 'submitting'}
                    >
                      <ThinIcon icon={faPaperPlane} style={{ marginRight: 8 }} />
                      {formState === 'submitting' ? '...' : t('form.submit')}
                    </Button>
                  </div>
                </GlowCard>
              </form>
            </motion.div>
          )}
        </Container>
      </section>

      {/* What Happens Next */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <SectionTitle title={t('process.title')} />
          </motion.div>
          <StepProcess steps={processSteps} columns={4} />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Text variant="body2" color="muted" className={styles.followUp}>
              {t('process.followUp')}
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* Emergency + Commitment */}
      <section className={styles.section}>
        <Container size="lg">
          <div className={styles.bottomCards}>
            <GlowCard className={styles.emergencyCard}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <div className={styles.emergencyHeader}>
                  <ThinIcon icon={faTriangleExclamation} className={styles.emergencyIcon} />
                  <Text variant="h5">{t('emergency.title')}</Text>
                </div>
                <Text variant="body2" color="muted">{t('emergency.text')}</Text>
              </motion.div>
            </GlowCard>
            <GlowCard className={styles.commitmentCard}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <div className={styles.commitmentHeader}>
                  <ThinIcon icon={faUserShield} className={styles.commitmentIcon} />
                  <Text variant="h5">{t('commitment.title')}</Text>
                </div>
                <Text variant="body2" color="muted">{t('commitment.text')}</Text>
              </motion.div>
            </GlowCard>
          </div>
        </Container>
      </section>
    </div>
  );
}
