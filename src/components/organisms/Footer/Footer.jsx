import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedPath, SERVICE_KEYS, routeConfig } from '../../../router/routes';
import styles from './Footer.module.scss';

const SERVICE_FOOTER_KEYS = [
  'cit', 'guards', 'cargo', 'technology', 'consulting',
  'executive', 'atm', 'conceptDesign', 'custom',
];

function Footer() {
  const { lang } = useParams();
  const { t } = useTranslation('footer');

  const currentLang = lang || 'en';

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link to={`/${currentLang}`} className={styles.logo}>
            <img
              src="/media/logos/gsi-logo-white.png"
              alt="GSI"
              className={styles.logoImg}
            />
          </Link>
          <p className={styles.brandDesc}>{t('brand.description')}</p>
          <div className={styles.contactBlock}>
            <a href={`tel:${t('operations.phone').replace(/\D/g, '')}`} className={styles.contactLink}>
              {t('operations.phone')}
            </a>
            <a href={`tel:${t('operations.tollFree').replace(/\D/g, '')}`} className={styles.contactLink}>
              {t('operations.tollFree')}
            </a>
            <a href={`mailto:${t('operations.email')}`} className={styles.contactLink}>
              {t('operations.email')}
            </a>
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t('services.title')}</h4>
            <nav className={styles.colLinks}>
              {SERVICE_FOOTER_KEYS.map((key) => (
                <Link
                  key={key}
                  to={`/${currentLang}${routeConfig.serviceDetail[key][currentLang]}`}
                  className={styles.colLink}
                >
                  {t(`services.${key}`)}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t('company.title')}</h4>
            <nav className={styles.colLinks}>
              <Link to={getLocalizedPath('about', currentLang)} className={styles.colLink}>
                {t('company.about')}
              </Link>
              <Link to={getLocalizedPath('coverage', currentLang)} className={styles.colLink}>
                {t('company.coverage')}
              </Link>
              <Link to={getLocalizedPath('careers', currentLang)} className={styles.colLink}>
                {t('company.careers')}
              </Link>
              <Link to={getLocalizedPath('contact', currentLang)} className={styles.colLink}>
                {t('company.contact')}
              </Link>
              <Link to={getLocalizedPath('whistleblower', currentLang)} className={styles.colLink}>
                {t('company.whistleblower')}
              </Link>
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t('legal.title')}</h4>
            <nav className={styles.colLinks}>
              <Link to={getLocalizedPath('legal', currentLang, 'privacy')} className={styles.colLink}>
                {t('legal.privacy')}
              </Link>
              <Link to={getLocalizedPath('legal', currentLang, 'terms')} className={styles.colLink}>
                {t('legal.terms')}
              </Link>
              <Link to={getLocalizedPath('legal', currentLang, 'legalNotice')} className={styles.colLink}>
                {t('legal.legalNotice')}
              </Link>
              <Link to={getLocalizedPath('legal', currentLang, 'compliance')} className={styles.colLink}>
                {t('legal.compliance')}
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.trustLine}>{t('trustLine')}</p>
        <p className={styles.copyright}>{t('copyright')}</p>
      </div>
    </footer>
  );
}

export default Footer;
