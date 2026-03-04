/**
 * Input — Dark-themed form control (input or textarea)
 *
 * Dark background, white text, gold accent on focus.
 * Sharp corners. Supports error state.
 *
 * @component
 */

import styles from './Input.module.scss';

/**
 * @param {Object} props
 * @param {string} [props.type='text']
 * @param {string} [props.name]
 * @param {string} [props.label]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.required=false]
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.value]
 * @param {Function} [props.onChange]
 * @param {boolean} [props.textarea=false] - Render as textarea
 * @param {string} [props.className]
 * @param {string} [props.id]
 */
function Input({
  type = 'text',
  name,
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  textarea = false,
  className = '',
  id,
  ...rest
}) {
  const inputId = id ?? (name ? `input-${name}` : undefined);
  const hasError = Boolean(error);

  const classNames = [
    styles.wrapper,
    hasError && styles.hasError,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputProps = {
    id: inputId,
    name,
    placeholder,
    required,
    value,
    onChange,
    'aria-invalid': hasError,
    'aria-describedby': hasError ? `${inputId}-error` : undefined,
    ...rest,
  };

  return (
    <div className={classNames}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      {textarea ? (
        <textarea
          className={styles.input}
          rows={4}
          {...inputProps}
        />
      ) : (
        <input
          type={type}
          className={styles.input}
          {...inputProps}
        />
      )}
      {error && (
        <span id={inputId ? `${inputId}-error` : undefined} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
