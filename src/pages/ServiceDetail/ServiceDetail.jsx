import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServiceDetailLayout from '../../components/templates/ServiceDetailLayout';

export default function ServiceDetail({ serviceKey }) {
  const { lang } = useParams();
  const { t } = useTranslation('services');

  useEffect(() => {
    const title = t(`detail.${serviceKey}.hero.title`, { defaultValue: 'Service' });
    document.title = title + ' | GSI';
  }, [t, lang, serviceKey]);

  return <ServiceDetailLayout serviceKey={serviceKey} />;
}
