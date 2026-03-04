/**
 * Icon — Wrapper for FontAwesome icons
 *
 * Provides consistent sizing and optional color override.
 * Uses design system tokens for dimensions.
 *
 * @component
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

/**
 * @param {Object} props
 * @param {Object} props.icon - FontAwesome icon reference (e.g. faArrowRight)
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {string} [props.color] - CSS color value or custom property
 * @param {string} [props.className]
 */
function Icon({ icon, size = 'md', color, className = '', ...rest }) {
  const style = { ...(color && { color }) };

  const classNames = [
    styles.icon,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} style={style} {...rest}>
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}

export default Icon;
