import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    color-scheme: dark;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100svh;
  }

  h1,
  h2,
  h3 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textHeading};
  }

  #produkty,
  #porovnani,
  #pribeh {
    scroll-margin-top: calc(
      ${({ theme }) => theme.layout.promoBarHeight} +
        ${({ theme }) => theme.layout.headerHeight} + 0.5rem
    );
  }
`
