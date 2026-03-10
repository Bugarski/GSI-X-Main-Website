/**
 * Header — Full responsive navbar with centered nav + mega-menu
 *
 * Desktop: Logo + centered nav + Language switcher + CTA.
 * Services triggers a full-width mega-menu panel with a 3×3 grid.
 * Mobile: Hamburger overlay with accordion services sub-menu.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/pro-light-svg-icons';
import { getLocalizedPath, SERVICE_KEYS, routeConfig } from '../../../router/routes';
import buttonStyles from '../../atoms/Button/Button.module.scss';
import LanguageSwitcher from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.scss';

const PORTAL_URL = 'https://portal.gsi.com.mx';

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

function ServicesTrigger({ lang, currentPath, megaOpen, onEnter, onLeave }) {
  const { t } = useTranslation('common');
  const servicesHref = getLocalizedPath('services', lang);
  const pathWithoutLang = currentPath.replace(new RegExp(`^/${lang}`), '') || '/';
  const isOnServicePage = pathWithoutLang.startsWith('/services') || pathWithoutLang.startsWith('/servicios');

  return (
    <div
      className={styles.servicesTriggerWrap}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link
        to={servicesHref}
        className={`${styles.navLink} ${isOnServicePage ? styles.active : ''} ${megaOpen ? styles.megaActive : ''}`}
      >
        {t('nav.services')}
        <svg className={`${styles.chevron} ${megaOpen ? styles.chevronOpen : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

function MegaMenu({ lang, currentPath, open }) {
  const { t } = useTranslation(['common', 'services']);
  const servicesHref = getLocalizedPath('services', lang);

  return (
    <div className={`${styles.mega} ${open ? styles.megaOpen : ''}`}>
      <div className={styles.megaInner}>
        <div className={styles.megaHeader}>
          <Link to={servicesHref} className={styles.megaOverviewLink}>
            {t('nav.services', { ns: 'common' })}
            <span className={styles.megaOverviewArrow}>&rarr;</span>
          </Link>
          <span className={styles.megaTagline}>
            {lang === 'es' ? '9 líneas de servicio especializadas' : '9 specialized service lines'}
          </span>
        </div>
        <div className={styles.megaGrid}>
          {SERVICE_KEYS.map((key, i) => {
            const detail = routeConfig.serviceDetail[key];
            if (!detail) return null;
            const href = `/${lang}${detail[lang]}`;
            const isItemActive = currentPath === href;
            return (
              <Link
                key={key}
                to={href}
                className={`${styles.megaCard} ${isItemActive ? styles.megaCardActive : ''}`}
                style={{ transitionDelay: open ? `${i * 30}ms` : '0ms' }}
              >
                <span className={styles.megaCardIndex}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.megaCardTitle}>
                  {t(`cards.${key}.navTitle`, { ns: 'services' })}
                </span>
                <span className={styles.megaCardDesc}>
                  {t(`cards.${key}.navDesc`, { ns: 'services' })}
                </span>
              </Link>
            );
          })}
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
                {t(`cards.${key}.navTitle`, { ns: 'services' })}
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
  const [megaOpen, setMegaOpen] = useState(false);
  const leaveTimer = useRef(null);

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
    setMegaOpen(false);
  }, [currentPath]);

  const handleMegaEnter = useCallback(() => {
    clearTimeout(leaveTimer.current);
    setMegaOpen(true);
  }, []);

  const handleMegaLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setMegaOpen(false), 200);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${mobileMenuOpen ? styles.menuOpen : ''} ${megaOpen ? styles.megaVisible : ''}`}
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
                <ServicesTrigger
                  key={link.key}
                  lang={currentLang}
                  currentPath={currentPath}
                  megaOpen={megaOpen}
                  onEnter={handleMegaEnter}
                  onLeave={handleMegaLeave}
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
          </nav>

          <div className={styles.actions}>
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonStyles.button} ${buttonStyles.ghost} ${buttonStyles.sm}`}
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} className={buttonStyles.icon} />
              <span className={buttonStyles.label}>{t('cta.portalLogin')}</span>
            </a>
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
      </header>

      {/* Mega-menu panel — outside header for full-width positioning */}
      <div
        onMouseEnter={handleMegaEnter}
        onMouseLeave={handleMegaLeave}
      >
        <MegaMenu lang={currentLang} currentPath={currentPath} open={megaOpen} />
      </div>

      {/* Mega backdrop */}
      <div
        className={`${styles.megaBackdrop} ${megaOpen ? styles.megaBackdropVisible : ''}`}
        onClick={() => setMegaOpen(false)}
      />

      {/* Mobile overlay */}
      <div className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.mobileOverlayVisible : ''}`}>
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
          <NavLink
            link={{ key: 'whistleblower', routeKey: 'whistleblower' }}
            lang={currentLang}
            currentPath={currentPath}
          />
          <LanguageSwitcher />
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonStyles.button} ${buttonStyles.ghost} ${buttonStyles.md} ${buttonStyles.fullWidth}`}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} className={buttonStyles.icon} />
            <span className={buttonStyles.label}>{t('cta.portalLogin')}</span>
          </a>
          <Link
            to={quoteHref}
            className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.md} ${buttonStyles.fullWidth}`}
          >
            <span className={buttonStyles.label}>{t('cta.requestQuote')}</span>
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Header;
