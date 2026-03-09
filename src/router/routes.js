/**
 * GSI Route Configuration
 * Translated slugs for EN/ES with language prefix
 */

export const SERVICE_KEYS = [
  'cit',
  'guards',
  'cargo',
  'technology',
  'consulting',
  'conceptDesign',
  'executive',
  'atm',
  'custom',
];

export const routeConfig = {
  home: {
    en: '/',
    es: '/',
  },
  about: {
    en: '/about',
    es: '/sobre-nosotros',
  },
  services: {
    en: '/services',
    es: '/servicios',
  },
  serviceDetail: {
    cit: { en: '/services/cash-in-transit', es: '/servicios/transporte-de-valores' },
    guards: { en: '/services/security-guard-services', es: '/servicios/guardias-de-seguridad' },
    cargo: { en: '/services/cargo-monitoring', es: '/servicios/monitoreo-de-carga' },
    technology: { en: '/services/technology-integration', es: '/servicios/integracion-tecnologica' },
    consulting: { en: '/services/security-consulting', es: '/servicios/consultoria-de-seguridad' },
    conceptDesign: { en: '/services/security-concept-design', es: '/servicios/diseno-conceptos-seguridad' },
    executive: { en: '/services/executive-protection', es: '/servicios/proteccion-ejecutiva' },
    atm: { en: '/services/atm-operations', es: '/servicios/operacion-cajeros' },
    custom: { en: '/services/custom-projects', es: '/servicios/proyectos-especiales' },
  },
  coverage: {
    en: '/coverage',
    es: '/cobertura',
  },
  careers: {
    en: '/careers',
    es: '/carreras',
  },
  contact: {
    en: '/contact',
    es: '/contacto',
  },
  whistleblower: {
    en: '/whistleblower',
    es: '/denuncia-etica',
  },
  legal: {
    privacy: { en: '/privacy-policy', es: '/aviso-de-privacidad' },
    terms: { en: '/terms', es: '/terminos-y-condiciones' },
    legalNotice: { en: '/legal-notice', es: '/aviso-legal' },
    compliance: { en: '/compliance', es: '/cumplimiento-y-etica' },
  },
};

/**
 * Get a localized path with language prefix
 */
export function getLocalizedPath(routeKey, lang, subKey = null) {
  if (subKey) {
    const route = routeConfig[routeKey]?.[subKey];
    if (!route) return `/${lang}`;
    return `/${lang}${route[lang]}`;
  }

  const route = routeConfig[routeKey];
  if (!route) return `/${lang}`;
  return `/${lang}${route[lang]}`;
}

/**
 * Get the opposite language path for the current route
 */
export function getAlternateLanguagePath(currentPath, currentLang) {
  const targetLang = currentLang === 'en' ? 'es' : 'en';
  const pathWithoutLang = currentPath.replace(`/${currentLang}`, '');

  for (const [key, value] of Object.entries(routeConfig)) {
    if (key === 'serviceDetail' || key === 'legal') {
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subValue[currentLang] === pathWithoutLang) {
          return `/${targetLang}${subValue[targetLang]}`;
        }
      }
    } else {
      if (value[currentLang] === pathWithoutLang) {
        return `/${targetLang}${value[targetLang]}`;
      }
    }
  }

  return `/${targetLang}`;
}

/**
 * Resolve a service key from a URL slug
 */
export function getServiceKeyFromSlug(slug, lang) {
  for (const [key, routes] of Object.entries(routeConfig.serviceDetail)) {
    const path = routes[lang];
    if (path && path.endsWith(slug)) {
      return key;
    }
  }
  return null;
}
