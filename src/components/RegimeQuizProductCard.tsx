import styled from 'styled-components'
import type { ShopifyProductListNode } from '../utils/mergeShopifyProducts'
import { formatShopifyPrice } from '../utils/shopifyFormat'
import { getShopifyProductUrl } from '../utils/shopify'
import { altMobileImage, altMobileImageFrame } from '../sections/alt/shared'

const Card = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 20rem;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const ImageWrap = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: clamp(9rem, 24vw, 11.5rem);
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  ${altMobileImageFrame}
`

const Image = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  ${altMobileImage}
`

const Placeholder = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.45rem;
  min-height: 6.5rem;
  padding: 0.9rem 1rem 1rem;
`

const Name = styled.h3`
  margin: 0;
  min-height: 2.2em;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(0.95rem, 1.75vw, 1.1rem);
  line-height: 1.1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`

const Price = styled.p`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`

const Cta = styled.span`
  margin-top: auto;
  padding-top: 0.55rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

type RegimeQuizProductCardProps = {
  product: ShopifyProductListNode
}

export function RegimeQuizProductCard({ product }: RegimeQuizProductCardProps) {
  const shopUrl = getShopifyProductUrl(product.handle)
  const price = formatShopifyPrice(product.priceRange.minVariantPrice)
  const image = product.featuredImage?.url
  const alt = product.featuredImage?.altText ?? product.title

  if (!shopUrl) {
    return null
  }

  return (
    <Card href={shopUrl} aria-label={`${product.title} — zobrazit v e-shopu`}>
      <ImageWrap>
        {image ? (
          <Image src={image} alt={alt} loading="lazy" />
        ) : (
          <Placeholder aria-hidden />
        )}
      </ImageWrap>
      <Body>
        <Name>{product.title}</Name>
        <Price>{price}</Price>
        <Cta>Zobrazit produkt →</Cta>
      </Body>
    </Card>
  )
}
