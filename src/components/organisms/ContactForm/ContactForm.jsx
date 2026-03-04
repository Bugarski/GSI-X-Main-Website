/**
 * ContactForm — Organism: Full contact form
 *
 * Fields: fullName, company, email, phone, country, service (select), message
 * Posts to /api/contact. States: idle, submitting, success, error.
 * i18n contact namespace. Dark card, gold submit button.
 */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SERVICE_KEYS } from '../../../router/routes';
import FormField from '../../molecules/FormField/FormField';
import { Button } from '../../atoms';
import styles from './ContactForm.module.scss';

function ContactForm() {
  const { lang } = useParams();
  const { t } = useTranslation(['contact', 'services']);
  const currentLang = lang || 'en';

  const [state, setState] = useState('idle'); // idle | submitting | success | error
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const serviceOptions = SERVICE_KEYS.map((key) => ({
    value: key,
    label: t(`cards.${key}.title`, { ns: 'services' }),
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState('submitting');
    setErrors({});

    try {
      const base = import.meta.env.BASE_URL || '';
      const apiUrl = `${base}api/contact`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang: currentLang }),
      });

      if (!res.ok) throw new Error('Request failed');
      setState('success');
      setFormData({ fullName: '', company: '', email: '', phone: '', country: '', service: '', message: '' });
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className={styles.card}>
        <div className={styles.successMessage}>
          <p className={styles.successText}>{t('form.success')}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.card}>
        <h3 className={styles.title}>{t('form.title')}</h3>
        <p className={styles.description}>{t('form.description')}</p>

        {state === 'error' && (
          <p className={styles.errorBanner}>{t('form.error')}</p>
        )}

        <div className={styles.fields}>
          <FormField
            type="text"
            name="fullName"
            label={t('form.fields.fullName')}
            placeholder={t('form.fields.fullName')}
            required
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <FormField
            type="text"
            name="company"
            label={t('form.fields.company')}
            placeholder={t('form.fields.company')}
            value={formData.company}
            onChange={handleChange}
            error={errors.company}
          />
          <FormField
            type="email"
            name="email"
            label={t('form.fields.email')}
            placeholder={t('form.fields.email')}
            required
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            type="tel"
            name="phone"
            label={t('form.fields.phone')}
            placeholder={t('form.fields.phone')}
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FormField
            type="text"
            name="country"
            label={t('form.fields.country')}
            placeholder={t('form.fields.country')}
            value={formData.country}
            onChange={handleChange}
            error={errors.country}
          />
          <FormField
            type="select"
            name="service"
            label={t('form.fields.service')}
            placeholder={t('form.fields.service')}
            value={formData.service}
            onChange={handleChange}
            options={serviceOptions}
            error={errors.service}
          />
          <FormField
            type="textarea"
            name="message"
            label={t('form.fields.message')}
            placeholder={t('form.fields.message')}
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            className={styles.messageField}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={state === 'submitting'}
          className={styles.submitBtn}
        >
          {state === 'submitting' ? '...' : t('form.submit')}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
