/**
 * Text — Versatile typography component with semantic HTML
 *
 * Maps variants to appropriate HTML tags and responsive font sizes.
 * Uses design system typography tokens.
 *
 * @component
 */

import styles from './Text.module.scss';

const VARIANT_TO_TAG = {
  display1: 'h1',
  display2: 'h1',
  display3: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subheading: 'p',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  caption1: 'span',
  caption2: 'span',
};

/**
 * @param {Object} props
 * @param {'display1'|'display2'|'display3'|'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'subheading'|'body1'|'body2'|'body3'|'caption1'|'caption2'} [props.variant='body1']
 * @param {string} [props.as] - Override HTML tag (e.g. 'span', 'div')
 * @param {string} [props.color] - CSS custom property or value for color
 * @param {string} [props.className]
 * @param {string} [props.weight] - Font weight: regular, medium, semibold, bold, extrabold
 * @param {React.ReactNode} props.children
 */
function Text({
  variant = 'body1',
  as,
  color,
  className = '',
  weight,
  children,
  ...rest
}) {
  const Tag = as ?? VARIANT_TO_TAG[variant];
  const style = { ...(color && { color }) };

  const classNames = [
    styles.text,
    styles[variant],
    weight && styles[`weight_${weight}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classNames} style={style} {...rest}>
      {children}
    </Tag>
  );
}

export default Text;
