import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enServices from './locales/en/services.json';
import enContact from './locales/en/contact.json';
import enFooter from './locales/en/footer.json';
import enCoverage from './locales/en/coverage.json';
import enCareers from './locales/en/careers.json';
import enLegal from './locales/en/legal.json';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esAbout from './locales/es/about.json';
import esServices from './locales/es/services.json';
import esContact from './locales/es/contact.json';
import esFooter from './locales/es/footer.json';
import esCoverage from './locales/es/coverage.json';
import esCareers from './locales/es/careers.json';
import esLegal from './locales/es/legal.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    services: enServices,
    contact: enContact,
    footer: enFooter,
    coverage: enCoverage,
    careers: enCareers,
    legal: enLegal,
  },
  es: {
    common: esCommon,
    home: esHome,
    about: esAbout,
    services: esServices,
    contact: esContact,
    footer: esFooter,
    coverage: esCoverage,
    careers: esCareers,
    legal: esLegal,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    supportedLngs: ['en', 'es'],
    ns: ['common', 'home', 'about', 'services', 'contact', 'footer', 'coverage', 'careers', 'legal'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
