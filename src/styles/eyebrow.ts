import { css } from 'styled-components'

/** Small gold label above section titles, stats, cards */
export const eyebrowText = css`
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`
