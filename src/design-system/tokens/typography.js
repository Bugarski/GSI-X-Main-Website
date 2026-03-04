/**
 * GSI Design System — Typography Tokens
 * Font Family: Manrope (Google Fonts)
 * Format: fontSize / lineHeight (percentage)
 */

const typography = {
  fontFamily: {
    primary: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  styles: {
    display1: {
      fontSize: '96px',
      lineHeight: '120%',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    display2: {
      fontSize: '76px',
      lineHeight: '120%',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    display3: {
      fontSize: '64px',
      lineHeight: '120%',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h1: {
      fontSize: '56px',
      lineHeight: '140%',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '48px',
      lineHeight: '140%',
      fontWeight: 700,
    },
    h3: {
      fontSize: '40px',
      lineHeight: '140%',
      fontWeight: 700,
    },
    h4: {
      fontSize: '32px',
      lineHeight: '140%',
      fontWeight: 600,
    },
    h5: {
      fontSize: '24px',
      lineHeight: '140%',
      fontWeight: 600,
    },
    h6: {
      fontSize: '20px',
      lineHeight: '140%',
      fontWeight: 600,
    },
    subheading: {
      fontSize: '18px',
      lineHeight: '100%',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    body1: {
      fontSize: '18px',
      lineHeight: '160%',
      fontWeight: 400,
    },
    body2: {
      fontSize: '16px',
      lineHeight: '160%',
      fontWeight: 400,
    },
    body3: {
      fontSize: '14px',
      lineHeight: '160%',
      fontWeight: 400,
    },
    caption1: {
      fontSize: '12px',
      lineHeight: '140%',
      fontWeight: 400,
    },
    caption2: {
      fontSize: '10px',
      lineHeight: '140%',
      fontWeight: 400,
    },
    button: {
      fontSize: '18px',
      lineHeight: '100%',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    navigation: {
      fontSize: '16px',
      lineHeight: '100%',
      fontWeight: 500,
    },
  },

  responsive: {
    display1: { mobile: '48px', tablet: '72px', desktop: '96px' },
    display2: { mobile: '40px', tablet: '56px', desktop: '76px' },
    display3: { mobile: '36px', tablet: '48px', desktop: '64px' },
    h1: { mobile: '32px', tablet: '44px', desktop: '56px' },
    h2: { mobile: '28px', tablet: '36px', desktop: '48px' },
    h3: { mobile: '24px', tablet: '32px', desktop: '40px' },
    h4: { mobile: '22px', tablet: '28px', desktop: '32px' },
    h5: { mobile: '20px', tablet: '22px', desktop: '24px' },
    h6: { mobile: '18px', tablet: '20px', desktop: '20px' },
  },
};

export default typography;
