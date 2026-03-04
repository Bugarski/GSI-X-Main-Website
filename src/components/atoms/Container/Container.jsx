/**
 * Container — Layout wrapper with max-width and responsive padding
 *
 * Centers content with configurable width.
 * Use for consistent page/section boundaries.
 *
 * @component
 */

import styles from './Container.module.scss';

/**
 * @param {Object} props
 * @param {'sm'|'md'|'lg'|'xl'|'full'} [props.size='lg']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 * @param {string} [props.as='div'] - HTML tag to render
 */
function Container({
  size = 'lg',
  className = '',
  children,
  as: Component = 'div',
  ...rest
}) {
  const classNames = [
    styles.container,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
}

export default Container;
