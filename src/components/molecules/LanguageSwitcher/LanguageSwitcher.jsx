import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAlternateLanguagePath } from '../../../router/routes';
import styles from './LanguageSwitcher.module.scss';

const FLAG_MX = (
  <svg viewBox="0 0 640 480" className={styles.flag}>
    <path fill="#006847" d="M0 0h213.3v480H0z" />
    <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
    <path fill="#ce1126" d="M426.7 0H640v480H426.7z" />
  </svg>
);

const FLAG_US = (
  <svg viewBox="0 0 640 480" className={styles.flag}>
    <path fill="#bd3d44" d="M0 0h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640z" />
    <path fill="#fff" d="M0 37h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640zm0 74h640v37h-640z" />
    <path fill="#192f5d" d="M0 0h260v259H0z" />
  </svg>
);

function LanguageSwitcher() {
  const { lang } = useParams();
  const location = useLocation();
  const { t } = useTranslation('common');

  const currentLang = lang || 'en';
  const alternatePath = getAlternateLanguagePath(location.pathname, currentLang);
  const isEn = currentLang === 'en';

  return (
    <Link
      to={alternatePath}
      className={styles.switcher}
      aria-label={t('language.switch')}
      title={isEn ? 'Cambiar a Español' : 'Switch to English'}
    >
      {isEn ? FLAG_US : FLAG_MX}
    </Link>
  );
}

export default LanguageSwitcher;
