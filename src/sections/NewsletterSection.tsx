import styled from 'styled-components'
import { PageContainer } from '../components/PageContainer'
import { getShopifyCatalogUrl } from '../utils/shopify'

const Section = styled.section`
  padding-block: clamp(3rem, 7vw, 4rem);
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.black} 100%
  );
`

const Inner = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: min(${({ theme }) => theme.layout.maxWidth}, 40rem);
  text-align: center;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

const Cta = styled.a`
  display: inline-flex;
  padding: 1rem 2rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
`

export function NewsletterSection() {
  const catalogUrl = getShopifyCatalogUrl()

  return (
    <Section>
      <Inner>
        <Title>Vyberte si produkt</Title>
        <Text>
          Katalog, košík a bezpečný checkout běží na Shopify. Homepage slouží jako
          prémiový vstup do značky, nákup probíhá v e-shopu.
        </Text>
        <Cta href={catalogUrl}>Otevřít e-shop</Cta>
      </Inner>
    </Section>
  )
}
