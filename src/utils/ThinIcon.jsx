/**
 * ThinIcon — Lightweight wrapper for FontAwesome icons.
 * Drop-in replacement used across pages and components.
 * Renders SVG icons via the npm FontAwesomeIcon component.
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ThinIcon({ icon, className = '', style }) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className || undefined}
      style={style}
    />
  );
}

export default ThinIcon;
