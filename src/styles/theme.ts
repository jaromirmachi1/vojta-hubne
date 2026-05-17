export const theme = {
  colors: {
    black: '#000000',
    surface: '#0a0a0a',
    surfaceRaised: '#111111',
    gold: '#eedc82',
    goldMuted: '#c9b56a',
    white: '#ffffff',
    text: 'rgba(255, 255, 255, 0.72)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
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
    headerHeight: '4.5rem',
  },
} as const

export type AppTheme = typeof theme
