import styled from 'styled-components'

/** Centred page content — aktin-style wide layout */
export const PageContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.layout.contentPadding};
`
