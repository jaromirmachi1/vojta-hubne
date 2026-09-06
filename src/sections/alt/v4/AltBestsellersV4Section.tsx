import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4BestsellersCopy,
} from '../../../data/altHomeV4'
import { useShopifyProducts } from '../../../hooks/useShopifyProducts'
import { altV4 } from '../../../styles/altV4'
import {
  getShopifyCatalogUrl,
  getShopifyProductUrl,
} from '../../../utils/shopify'
import {
  V4Eyebrow,
  V4Inner,
  V4Section,
  V4Title,
} from './shared'

const Grid = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Row = styled.article`
  display: flex;
  gap: 0.9rem;
  padding: 0.9rem;
  border-radius: 1.125rem;
  background: ${altV4.paper};
  border: 1px solid ${altV4.line};
`

const Open = styled.a`
  display: flex;
  gap: 0.9rem;
  flex: 1;
  min-width: 0;
  text-decoration: none;
  color: ${altV4.ink};
  text-align: left;
`

const Thumb = styled.img`
  width: 5.75rem;
  height: 5.75rem;
  object-fit: contain;
  border-radius: 0.85rem;
  background: ${altV4.paper2};
`

const Body = styled.span`
  flex: 1;
  min-width: 0;
`

const Badge = styled.span`
  display: inline-flex;
  margin-bottom: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: ${altV4.black};
  color: ${altV4.gold};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const Name = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  line-height: 1.05;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const Short = styled.span`
  display: block;
  margin-top: 0.2rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: ${altV4.ink2};
`

const Meta = styled.span`
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  flex-wrap: wrap;
  margin-top: 0.4rem;
`

const Unit = styled.span`
  font-size: 0.75rem;
  color: ${altV4.ink2};
`

const Add = styled.a`
  flex: none;
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  background: ${altV4.black};
  color: ${altV4.gold};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.6rem;
  line-height: 1;
  text-decoration: none;
`

export function AltBestsellersV4Section() {
  const { products } = useShopifyProducts()
  const items = products.map((p, index) => ({
    ...p,
    badge: index === 0 ? 'Bestseller' : index === 1 ? 'Novinka' : undefined,
    href: getShopifyProductUrl(p.shopifyHandle) ?? getShopifyCatalogUrl(),
  }))

  return (
    <V4Section
      $tone="paper2"
      id={ALT_V4_SECTION_IDS.bestsellers}
      aria-labelledby="alt-v4-bestsellers-title"
    >
      <V4Inner>
        <V4Eyebrow>{altV4BestsellersCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-bestsellers-title">
          {altV4BestsellersCopy.title}
        </V4Title>
        <Grid>
          {items.map((p) => (
            <Row key={p.id}>
              <Open href={p.href} rel="noopener noreferrer">
                <Thumb
                  src={p.image}
                  alt={p.name}
                  width={92}
                  height={92}
                />
                <Body>
                  {p.badge ? <Badge>{p.badge}</Badge> : null}
                  <Name>{p.name}</Name>
                  <Short>{p.description}</Short>
                  <Meta>
                    <Unit>{p.format}</Unit>
                  </Meta>
                </Body>
              </Open>
              <Add
                href={p.href}
                rel="noopener noreferrer"
                aria-label={`Zobrazit ${p.name}`}
              >
                +
              </Add>
            </Row>
          ))}
        </Grid>
      </V4Inner>
    </V4Section>
  )
}
