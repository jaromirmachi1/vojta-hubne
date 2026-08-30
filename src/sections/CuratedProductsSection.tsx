import styled from 'styled-components'
import { PageContainer } from '../components/PageContainer'
import {
  curatedProductPicks,
  curatedProductPicksCopy,
} from '../data/curatedProductPicks'
import { eyebrowText } from '../styles/eyebrow'
import { getShopifyProductUrl } from '../utils/shopify'

const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(PageContainer)``

const Header = styled.header`
  max-width: 42rem;
  margin-bottom: clamp(2rem, 4vw, 2.75rem);
`

const Title = styled.h2`
  margin: 0 0 0.85rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  line-height: 0.95;
`

const Lead = styled.p`
  margin: 0;
  font-size: clamp(0.95rem, 2.2vw, 1.05rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }
`

const Card = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 100%;
  padding: clamp(1.25rem, 2.5vw, 1.5rem);
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-2px);
  }
`

const CardCategory = styled.h3`
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  line-height: 1.45;
`

const CardProduct = styled.p`
  margin: 0;
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.35rem, 3vw, 1.65rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 0.95;
  color: ${({ theme }) => theme.colors.white};
`

const CardCta = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  ${eyebrowText}
`

export function CuratedProductsSection() {
  return (
    <Section aria-labelledby="curated-products-title">
      <Inner>
        <Header>
          <Title id="curated-products-title">{curatedProductPicksCopy.title}</Title>
          <Lead>{curatedProductPicksCopy.lead}</Lead>
        </Header>

        <Grid>
          {curatedProductPicks.map((pick) => {
            const href =
              getShopifyProductUrl(pick.shopifyHandle) ?? '/collections'

            return (
              <Card
                key={pick.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardCategory>{pick.category}</CardCategory>
                <CardProduct>{pick.productName}</CardProduct>
                <CardCta>Zobrazit produkt →</CardCta>
              </Card>
            )
          })}
        </Grid>
      </Inner>
    </Section>
  )
}
