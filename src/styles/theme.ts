const headerHeight = '4.5rem'
const promoBarHeight = '2.25rem'
const altSubNavHeight = '2.75rem'

export const theme = {
  colors: {
    black: '#000000',
    surface: '#0a0a0a',
    surfaceRaised: '#111111',
    gold: '#eedc82',
    goldMuted: '#c9b56a',
    white: '#ffffff',
    text: '#ffffff',
    textMuted: 'rgba(255, 255, 255, 0.9)',
    textHeading: '#ffffff',
    background: '#000000',
    border: 'rgba(238, 220, 130, 0.35)',
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    pattern: 'rgba(255, 255, 255, 0.04)',
  },
  fonts: {
    display: "'Bebas Neue', 'Arial Narrow', sans-serif",
    sans: "'Montserrat', system-ui, sans-serif",
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  layout: {
    /** Aktin-style wide content area */
    maxWidth: '1600px',
    contentPadding: 'clamp(1.25rem, 5vw, 3.5rem)',
    sectionPaddingY: 'clamp(3rem, 7vw, 5rem)',
    headerHeight,
    promoBarHeight,
    altSubNavHeight,
    altStickyScrollMargin: `calc(${headerHeight} + ${altSubNavHeight} + 1rem)`,
    /** Alt homepage hero — below promo + main header + sub nav */
    altHeroMinHeight: `calc(100svh - ${headerHeight} - ${altSubNavHeight} - ${promoBarHeight})`,
    altHeroMinHeightDvh: `calc(100dvh - ${headerHeight} - ${altSubNavHeight} - ${promoBarHeight})`,
    /** Homepage hero: full viewport below promo + header */
    heroMinHeight: `calc(100svh - ${headerHeight} - ${promoBarHeight})`,
    heroMinHeightDvh: `calc(100dvh - ${headerHeight} - ${promoBarHeight})`,
  },
  radii: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    pill: '999px',
  },
} as const

export type AppTheme = typeof theme
