/**
 * Badge — Metric numbers, tags, labels
 *
 * Sharp corners. Bold text.
 * Variants: gold (accent bg), blue (primary bg), outline
 *
 * @component
 */

import styles from './Badge.module.scss';

/**
 * @param {Object} props
 * @param {'gold'|'blue'|'outline'} [props.variant='gold']
 * @param {'sm'|'md'} [props.size='md']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
function Badge({
  variant = 'gold',
  size = 'md',
  children,
  className = '',
  ...rest
}) {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
