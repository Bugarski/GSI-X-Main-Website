/**
 * GSI Design System — Breakpoint Tokens
 */

const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1440px',
};

export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  xxl: `@media (min-width: ${breakpoints.xxl})`,
};

export default breakpoints;
