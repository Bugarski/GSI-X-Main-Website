/**
 * LanguageSwitcher — Molecule for EN/ES toggle
 *
 * Shows current language, click toggles to alternate.
 * Uses getAlternateLanguagePath from router/routes.js.
 * Small, clean, fits in nav.
 */

import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAlternateLanguagePath } from '../../../router/routes';
import styles from './LanguageSwitcher.module.scss';

function LanguageSwitcher() {
  const { lang } = useParams();
  const location = useLocation();
  const { t } = useTranslation('common');

  const currentLang = lang || 'en';
  const alternatePath = getAlternateLanguagePath(location.pathname, currentLang);
  const displayLang = currentLang === 'en' ? 'ES' : 'EN';

  return (
    <Link
      to={alternatePath}
      className={styles.switcher}
      aria-label={t('language.switch')}
    >
      <span className={styles.current}>{currentLang.toUpperCase()}</span>
      <span className={styles.separator}>/</span>
      <span className={styles.alt}>{displayLang}</span>
    </Link>
  );
}

export default LanguageSwitcher;
