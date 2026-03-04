/**
 * FormField — Molecule wrapping Input atom with select dropdown support
 *
 * Wraps Input for text inputs, or renders a select for service selector.
 * Props: type, name, label, placeholder, required, error, value, onChange, options
 */

import Input from '../../atoms/Input/Input';
import styles from './FormField.module.scss';

function FormField({
  type = 'text',
  name,
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  options = [],
  ...rest
}) {
  const isSelect = type === 'select' || (options && options.length > 0);
  const inputId = name ? `field-${name}` : undefined;

  if (isSelect) {
    const hasError = Boolean(error);

    return (
      <div
        className={`${styles.wrapper} ${hasError ? styles.hasError : ''}`.trim()}
      >
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </label>
        )}
        <select
          id={inputId}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          className={styles.select}
        >
          <option value="">{placeholder || 'Select...'}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span id={inputId ? `${inputId}-error` : undefined} className={styles.error}>
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <Input
      type={type}
      name={name}
      label={label}
      placeholder={placeholder}
      required={required}
      error={error}
      value={value}
      onChange={onChange}
      id={inputId}
      textarea={type === 'textarea'}
      {...rest}
    />
  );
}

export default FormField;
