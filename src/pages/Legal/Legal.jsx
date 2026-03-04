import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import Container from '../../components/atoms/Container/Container';
import Text from '../../components/atoms/Text/Text';
import styles from './Legal.module.scss';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Legal({ page }) {
  const { lang } = useParams();
  const { t } = useTranslation('legal');

  useEffect(() => {
    const title = t(`${page}.title`, { defaultValue: 'Legal' });
    document.title = title + ' | GSI';
  }, [t, lang, page]);

  const pageTitle = t(`${page}.title`);
  const pagePlaceholder = t(`${page}.placeholder`);

  return (
    <div className={styles.legal}>
      <HeroSection
        title={pageTitle}
        subtitle=""
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
            className={styles.content}
          >
            <Text variant="body1" color="muted">
              {pagePlaceholder}
            </Text>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
