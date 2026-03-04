import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { routeConfig } from './routes';
import PageLayout from '../components/templates/PageLayout';

const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Services = lazy(() => import('../pages/Services/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail/ServiceDetail'));
const Coverage = lazy(() => import('../pages/Coverage/Coverage'));
const Careers = lazy(() => import('../pages/Careers/Careers'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Legal = lazy(() => import('../pages/Legal/Legal'));

function LanguageWrapper({ children }) {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && ['en', 'es'].includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  if (!['en', 'es'].includes(lang)) {
    return <Navigate to="/es" replace />;
  }

  return children;
}

function LoadingFallback() {
  return (
    <div className="page-loader">
      <div className="page-loader__spinner" />
    </div>
  );
}

function LanguageRedirect() {
  const { i18n } = useTranslation();
  const detectedLang = ['en', 'es'].includes(i18n.language?.substring(0, 2))
    ? i18n.language.substring(0, 2)
    : 'es';

  return <Navigate to={`/${detectedLang}`} replace />;
}

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Root redirect based on browser language */}
        <Route path="/" element={<LanguageRedirect />} />

        {/* Language-prefixed routes */}
        <Route
          path="/:lang"
          element={
            <LanguageWrapper>
              <PageLayout />
            </LanguageWrapper>
          }
        >
          {/* Home */}
          <Route index element={<Home />} />

          {/* About — EN */}
          <Route path="about" element={<About />} />
          {/* About — ES */}
          <Route path="sobre-nosotros" element={<About />} />

          {/* Services Overview — EN */}
          <Route path="services" element={<Services />} />
          {/* Services Overview — ES */}
          <Route path="servicios" element={<Services />} />

          {/* Service Detail Pages — EN */}
          <Route path="services/cash-in-transit" element={<ServiceDetail serviceKey="cit" />} />
          <Route path="services/security-guard-services" element={<ServiceDetail serviceKey="guards" />} />
          <Route path="services/cargo-monitoring" element={<ServiceDetail serviceKey="cargo" />} />
          <Route path="services/technology-integration" element={<ServiceDetail serviceKey="technology" />} />
          <Route path="services/security-consulting" element={<ServiceDetail serviceKey="consulting" />} />
          <Route path="services/security-concept-design" element={<ServiceDetail serviceKey="conceptDesign" />} />
          <Route path="services/executive-protection" element={<ServiceDetail serviceKey="executive" />} />
          <Route path="services/atm-operations" element={<ServiceDetail serviceKey="atm" />} />
          <Route path="services/custom-projects" element={<ServiceDetail serviceKey="custom" />} />

          {/* Service Detail Pages — ES */}
          <Route path="servicios/transporte-de-valores" element={<ServiceDetail serviceKey="cit" />} />
          <Route path="servicios/guardias-de-seguridad" element={<ServiceDetail serviceKey="guards" />} />
          <Route path="servicios/monitoreo-de-carga" element={<ServiceDetail serviceKey="cargo" />} />
          <Route path="servicios/integracion-tecnologica" element={<ServiceDetail serviceKey="technology" />} />
          <Route path="servicios/consultoria-de-seguridad" element={<ServiceDetail serviceKey="consulting" />} />
          <Route path="servicios/diseno-conceptos-seguridad" element={<ServiceDetail serviceKey="conceptDesign" />} />
          <Route path="servicios/proteccion-ejecutiva" element={<ServiceDetail serviceKey="executive" />} />
          <Route path="servicios/operacion-cajeros" element={<ServiceDetail serviceKey="atm" />} />
          <Route path="servicios/proyectos-especiales" element={<ServiceDetail serviceKey="custom" />} />

          {/* Coverage */}
          <Route path="coverage" element={<Coverage />} />
          <Route path="cobertura" element={<Coverage />} />

          {/* Careers */}
          <Route path="careers" element={<Careers />} />
          <Route path="carreras" element={<Careers />} />

          {/* Contact */}
          <Route path="contact" element={<Contact />} />
          <Route path="contacto" element={<Contact />} />

          {/* Legal — EN */}
          <Route path="privacy-policy" element={<Legal page="privacy" />} />
          <Route path="terms" element={<Legal page="terms" />} />
          <Route path="legal-notice" element={<Legal page="legalNotice" />} />
          <Route path="compliance" element={<Legal page="compliance" />} />

          {/* Legal — ES */}
          <Route path="aviso-de-privacidad" element={<Legal page="privacy" />} />
          <Route path="terminos-y-condiciones" element={<Legal page="terms" />} />
          <Route path="aviso-legal" element={<Legal page="legalNotice" />} />
          <Route path="cumplimiento-y-etica" element={<Legal page="compliance" />} />
        </Route>

        {/* Catch-all: redirect to detected language home */}
        <Route path="*" element={<LanguageRedirect />} />
      </Routes>
    </Suspense>
  );
}
