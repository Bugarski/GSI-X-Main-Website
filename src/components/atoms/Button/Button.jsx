/**
 * Button — Atomic component for primary actions
 *
 * Renders as <a> when href is provided, otherwise <button>.
 * Variants: primary (gold), secondary (outlined), ghost (transparent)
 * Sharp corners. Bold, commanding appearance.
 *
 * @component
 */

import ThinIcon from '../../../utils/ThinIcon';
import styles from './Button.module.scss';

/**
 * @param {Object} props
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {React.ReactNode} props.children
 * @param {Function} [props.onClick]
 * @param {string} [props.href] - When provided, renders as anchor
 * @param {'button'|'submit'|'reset'} [props.type='button']
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.fullWidth=false]
 * @param {Object} [props.icon] - FontAwesome icon reference (e.g. faArrowRight)
 */
function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon,
  className = '',
  ...rest
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && (
        <span className={styles.icon}>
          <ThinIcon icon={icon} />
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classNames}
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
}

export default Button;
