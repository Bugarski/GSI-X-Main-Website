/**
 * Footer — Organism: Full-width footer
 *
 * Sections: Brand, 24/7 Contact, Services, Company, Coverage, Legal
 * Bottom bar: trust line + copyright
 * All from i18n footer namespace. Responsive grid.
 */

import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedPath } from '../../../router/routes';
import styles from './Footer.module.scss';

function Footer() {
  const { lang } = useParams();
  const { t } = useTranslation('footer');

  const currentLang = lang || 'en';

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Link to={`/${currentLang}`} className={styles.logo}>
            <img
              src="/media/logos/gsi-logo-white.png"
              alt="GSI — Grupo Seguridad Integral"
              className={styles.logoImg}
            />
          </Link>
          <p className={styles.brandDesc}>{t('brand.description')}</p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>{t('operations.title')}</h4>
          <div className={styles.contactInfo}>
            <a href={`tel:${t('operations.phone').replace(/\D/g, '')}`} className={styles.link}>
              {t('operations.phone')}
            </a>
            <a href={`tel:${t('operations.tollFree').replace(/\D/g, '')}`} className={styles.link}>
              {t('operations.tollFree')}
            </a>
            <a href={`mailto:${t('operations.email')}`} className={styles.link}>
              {t('operations.email')}
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>{t('services.title')}</h4>
          <Link to={getLocalizedPath('services', currentLang)} className={styles.link}>
            {t('services.title')}
          </Link>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>{t('company.title')}</h4>
          <nav className={styles.links}>
            <Link to={getLocalizedPath('about', currentLang)} className={styles.link}>
              {t('company.about')}
            </Link>
            <Link to={getLocalizedPath('about', currentLang)} className={styles.link}>
              {t('company.whyGsi')}
            </Link>
            <Link to={getLocalizedPath('coverage', currentLang)} className={styles.link}>
              {t('company.coverage')}
            </Link>
            <Link to={getLocalizedPath('careers', currentLang)} className={styles.link}>
              {t('company.careers')}
            </Link>
            <Link to={getLocalizedPath('contact', currentLang)} className={styles.link}>
              {t('company.contact')}
            </Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>{t('coverageSection.title')}</h4>
          <div className={styles.coverageList}>
            <span className={styles.coverageItem}>{t('coverageSection.mexico')}</span>
            <span className={styles.coverageItem}>{t('coverageSection.centralAmerica')}</span>
            <span className={styles.coverageItem}>{t('coverageSection.brazil')}</span>
            <span className={styles.coverageItem}>{t('coverageSection.globalPartners')}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>{t('legal.title')}</h4>
          <nav className={styles.links}>
            <Link to={getLocalizedPath('legal', currentLang, 'privacy')} className={styles.link}>
              {t('legal.privacy')}
            </Link>
            <Link to={getLocalizedPath('legal', currentLang, 'terms')} className={styles.link}>
              {t('legal.terms')}
            </Link>
            <Link to={getLocalizedPath('legal', currentLang, 'legalNotice')} className={styles.link}>
              {t('legal.legalNotice')}
            </Link>
            <Link to={getLocalizedPath('legal', currentLang, 'compliance')} className={styles.link}>
              {t('legal.compliance')}
            </Link>
          </nav>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.trustLine}>{t('trustLine')}</p>
        <p className={styles.copyright}>{t('copyright')}</p>
      </div>
    </footer>
  );
}

export default Footer;
