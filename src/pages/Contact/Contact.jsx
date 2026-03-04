import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ThinIcon from '../../utils/ThinIcon';
import { faPhone, faEnvelope } from '@fortawesome/pro-light-svg-icons';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import ContactForm from '../../components/organisms/ContactForm/ContactForm';
import StepProcess from '../../components/organisms/StepProcess/StepProcess';
import Container from '../../components/atoms/Container/Container';
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle';
import Text from '../../components/atoms/Text/Text';
import Button from '../../components/atoms/Button/Button';
import { getLocalizedPath } from '../../router/routes';
import placeholders from '../../utils/placeholders';
import styles from './Contact.module.scss';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  const { lang } = useParams();
  const { t } = useTranslation(['contact', 'common']);

  useEffect(() => {
    document.title = t('hero.title') + ' | GSI';
  }, [t, lang]);

  const nextSteps = ['step1', 'step2', 'step3', 'step4'].map((stepKey) => {
    const step = t(`nextSteps.steps.${stepKey}`, { returnObjects: true });
    return { title: step.title, description: step.text };
  });

  return (
    <div className={styles.contact}>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={placeholders.heroes.contact}
        fullHeight={false}
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
              {t('intro.text1')} {t('intro.text2')}
            </Text>
          </motion.div>

          <div className={styles.twoColumn}>
            <motion.div
              className={styles.formColumn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <ContactForm />
            </motion.div>
            <motion.div
              className={styles.directColumn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.directCard}>
                <Text variant="h5" className={styles.directTitle}>
                  {t('directContact.title')}
                </Text>
                <Text variant="body2" color="muted" className={styles.directSubtitle}>
                  {t('directContact.subtitle')}
                </Text>
                <div className={styles.directItems}>
                  <a href={`tel:${t('directContact.phone')}`} className={styles.directLink}>
                    <ThinIcon icon={faPhone} className={styles.directIcon} />
                    <span>
                      <strong>{t('directContact.phoneLabel')}:</strong>{' '}
                      {t('directContact.phone')}
                    </span>
                  </a>
                  <a href={`tel:${t('directContact.tollFree')}`} className={styles.directLink}>
                    <ThinIcon icon={faPhone} className={styles.directIcon} />
                    <span>
                      <strong>{t('directContact.tollFreeLabel')}:</strong>{' '}
                      {t('directContact.tollFree')}
                    </span>
                  </a>
                  <a href={`mailto:${t('directContact.email')}`} className={styles.directLink}>
                    <ThinIcon icon={faEnvelope} className={styles.directIcon} />
                    <span>
                      <strong>{t('directContact.emailLabel')}:</strong>{' '}
                      {t('directContact.email')}
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
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
              title={t('coverage.title')}
              subtitle={t('coverage.text')}
            />
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
            <SectionTitle title={t('nextSteps.title')} />
          </motion.div>
          <StepProcess steps={nextSteps} columns={4} />
        </Container>
      </section>

      <section className={`${styles.section} ${styles.sectionCta}`}>
        <Container size="lg">
          <motion.div
            className={styles.finalCtaContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Text variant="h3">{t('finalCta.title')}</Text>
            <Text variant="body1" color="muted">
              {t('finalCta.subtitle')}
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
