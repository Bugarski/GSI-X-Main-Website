/**
 * Header — Organism: Full responsive navbar with centered nav
 *
 * Desktop: Logo (left) + centered nav links + Language switcher + CTA (right)
 * Services link has a hover dropdown showing all 9 service detail pages.
 * Mobile: Logo + hamburger menu, slide-in overlay with accordion services.
 * Sticky on scroll with glassmorphism.
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedPath, SERVICE_KEYS, routeConfig } from '../../../router/routes';
import buttonStyles from '../../atoms/Button/Button.module.scss';
import LanguageSwitcher from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { key: 'home', routeKey: 'home' },
  { key: 'about', routeKey: 'about' },
  { key: 'services', routeKey: 'services', hasDropdown: true },
  { key: 'coverage', routeKey: 'coverage' },
  { key: 'careers', routeKey: 'careers' },
  { key: 'contact', routeKey: 'contact' },
];

function NavLink({ link, lang, currentPath }) {
  const { t } = useTranslation('common');
  const href = getLocalizedPath(link.routeKey, lang);
  const pathWithoutLang = currentPath.replace(new RegExp(`^/${lang}`), '') || '/';
  const routePath = href.replace(new RegExp(`^/${lang}`), '') || '/';
  const isActive = pathWithoutLang === routePath || (pathWithoutLang === '' && routePath === '/');

  return (
    <Link
      to={href}
      className={`${styles.navLink} ${isActive ? styles.active : ''}`}
    >
      {t(`nav.${link.key}`)}
    </Link>
  );
}

function ServicesDropdown({ lang, currentPath, onClose }) {
  const { t } = useTranslation(['common', 'services']);
  const servicesHref = getLocalizedPath('services', lang);
  const pathWithoutLang = currentPath.replace(new RegExp(`^/${lang}`), '') || '/';
  const servicesRoute = servicesHref.replace(new RegExp(`^/${lang}`), '') || '/';
  const isServicesActive = pathWithoutLang === servicesRoute;
  const isOnServicePage = pathWithoutLang.startsWith('/services') || pathWithoutLang.startsWith('/servicios');

  return (
    <div className={styles.dropdownWrap} onMouseLeave={onClose}>
      <Link
        to={servicesHref}
        className={`${styles.navLink} ${isServicesActive || isOnServicePage ? styles.active : ''} ${styles.dropdownTrigger}`}
      >
        {t('nav.services')}
        <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <div className={styles.dropdown}>
        <div className={styles.dropdownInner}>
          <Link to={servicesHref} className={styles.dropdownOverview}>
            {t('nav.services')} — {lang === 'es' ? 'Vista General' : 'Overview'}
          </Link>
          <div className={styles.dropdownDivider} />
          <div className={styles.dropdownGrid}>
            {SERVICE_KEYS.map((key) => {
              const detail = routeConfig.serviceDetail[key];
              if (!detail) return null;
              const href = `/${lang}${detail[lang]}`;
              const isItemActive = currentPath === href;
              return (
                <Link
                  key={key}
                  to={href}
                  className={`${styles.dropdownItem} ${isItemActive ? styles.dropdownItemActive : ''}`}
                >
                  {t(`cards.${key}.title`, { ns: 'services' })}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileServicesAccordion({ lang, currentPath }) {
  const { t } = useTranslation(['common', 'services']);
  const [open, setOpen] = useState(false);
  const servicesHref = getLocalizedPath('services', lang);

  return (
    <div className={styles.mobileAccordion}>
      <div className={styles.mobileAccordionHeader}>
        <Link to={servicesHref} className={styles.navLink}>
          {t('nav.services')}
        </Link>
        <button
          type="button"
          className={`${styles.mobileAccordionToggle} ${open ? styles.mobileAccordionOpen : ''}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle services submenu"
        >
          <svg width="12" height="7" viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {open && (
        <div className={styles.mobileAccordionBody}>
          {SERVICE_KEYS.map((key) => {
            const detail = routeConfig.serviceDetail[key];
            if (!detail) return null;
            const href = `/${lang}${detail[lang]}`;
            return (
              <Link key={key} to={href} className={styles.mobileSubLink}>
                {t(`cards.${key}.title`, { ns: 'services' })}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Header() {
  const { lang } = useParams();
  const location = useLocation();
  const { t } = useTranslation('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimer = useRef(null);

  const currentLang = lang || 'en';
  const currentPath = location.pathname;
  const quoteHref = getLocalizedPath('contact', currentLang);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [currentPath]);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${mobileMenuOpen ? styles.menuOpen : ''}`}
    >
      <div className={styles.inner}>
        <Link to={`/${currentLang}`} className={styles.logo}>
          <img
            src="/media/logos/gsi-logo-white.png"
            alt="GSI — Grupo Seguridad Integral"
            className={styles.logoImg}
          />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.key}
                className={`${styles.dropdownContainer} ${dropdownOpen ? styles.dropdownVisible : ''}`}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <ServicesDropdown
                  lang={currentLang}
                  currentPath={currentPath}
                  onClose={handleDropdownLeave}
                />
              </div>
            ) : (
              <NavLink
                key={link.key}
                link={link}
                lang={currentLang}
                currentPath={currentPath}
              />
            )
          )}
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <Link
            to={quoteHref}
            className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.sm}`}
          >
            <span className={buttonStyles.label}>{t('cta.requestQuote')}</span>
          </Link>
        </div>

        <button
          type="button"
          className={styles.hamburger}
          aria-label={t('accessibility.openMenu')}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </div>

      <div className={styles.mobileOverlay}>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <MobileServicesAccordion
                key={link.key}
                lang={currentLang}
                currentPath={currentPath}
              />
            ) : (
              <NavLink
                key={link.key}
                link={link}
                lang={currentLang}
                currentPath={currentPath}
              />
            )
          )}
          <LanguageSwitcher />
          <Link
            to={quoteHref}
            className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.md} ${buttonStyles.fullWidth}`}
          >
            <span className={buttonStyles.label}>{t('cta.requestQuote')}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
