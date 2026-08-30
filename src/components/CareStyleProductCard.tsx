import styled from 'styled-components'
import type { ProductReviewStats } from '../hooks/useProductReviewStats'
import type { ShopifyProductListNode } from '../utils/mergeShopifyProducts'
import { formatReviewCount, toPlainText } from '../utils/plainText'
import { formatShopifyPrice } from '../utils/shopifyFormat'
import { getShopifyProductUrl } from '../utils/shopify'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
  height: 100%;
  transition: transform 0.22s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

const Media = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: clamp(0.8rem, 1.6vw, 1.4rem);
  overflow: hidden;
  border-radius: 0.9rem;
  background:
    radial-gradient(
      circle at center,
      rgba(238, 220, 130, 0.1),
      transparent 58%
    ),
    rgba(238, 220, 130, 0.08);
  transition: background 0.22s ease;

  ${Card}:hover & {
    background:
      radial-gradient(
        circle at center,
        rgba(238, 220, 130, 0.14),
        transparent 58%
      ),
      rgba(238, 220, 130, 0.12);
  }
`

const MediaLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const Image = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.24s ease;

  ${Card}:hover & {
    transform: scale(1.025);
  }
`

const Placeholder = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
  padding: 0.15rem 0.1rem 0;
`

const BodyLink = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
  height: 100%;
  text-decoration: none;
  color: inherit;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const Name = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(0.92rem, 1.45vw, 1.28rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: 0.055em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Description = styled.p`
  margin: 0.15rem 0 0;
  font-size: clamp(0.68rem, 0.9vw, 0.8rem);
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.72);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

const Price = styled.p`
  margin: 0.2rem 0 0;
  font-size: clamp(0.82rem, 0.95vw, 0.9rem);
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.gold};
`

const Rating = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.2rem 0.35rem;
  margin-top: 0.15rem;
  min-height: 1.1rem;
`

const Stars = styled.span`
  display: inline-flex;
  gap: 0.05rem;
  font-size: 0.68rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.gold};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.75rem;
  }
`

const ReviewCount = styled.span`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.75rem;
  }
`

type CareStyleProductCardProps = {
  product: ShopifyProductListNode
  reviewStats?: ProductReviewStats
}

function renderStars(rating: number) {
  const rounded = Math.round(rating)
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded)
}

function buildDescription(product: ShopifyProductListNode): string {
  const excerpt = toPlainText(product.description, 90)
  if (!excerpt) return product.title

  if (excerpt.toLowerCase().startsWith(product.title.toLowerCase())) {
    return excerpt
  }

  return `${product.title} — ${excerpt}`
}

export function CareStyleProductCard({
  product,
  reviewStats,
}: CareStyleProductCardProps) {
  const shopUrl = getShopifyProductUrl(product.handle)
  const price = formatShopifyPrice(product.priceRange.minVariantPrice)
  const image = product.featuredImage?.url
  const alt = product.featuredImage?.altText ?? product.title
  const description = buildDescription(product)

  if (!shopUrl) {
    return null
  }

  return (
    <Card>
      <Media>
        <MediaLink
          href={shopUrl}
          aria-label={`${product.title} — zobrazit produkt`}
          tabIndex={-1}
        >
          {image ? (
            <Image src={image} alt={alt} loading="lazy" decoding="async" />
          ) : (
            <Placeholder aria-hidden />
          )}
        </MediaLink>
      </Media>

      <Body>
        <BodyLink href={shopUrl} aria-label={product.title}>
          <Name>{product.title}</Name>
          <Description>{description}</Description>
          <Price>{price}</Price>
          {reviewStats && reviewStats.count > 0 ? (
            <Rating aria-label={`Hodnocení ${reviewStats.averageRating.toFixed(1)} z 5`}>
              <Stars aria-hidden>{renderStars(reviewStats.averageRating)}</Stars>
              <ReviewCount>{formatReviewCount(reviewStats.count)}</ReviewCount>
            </Rating>
          ) : null}
        </BodyLink>
      </Body>
    </Card>
  )
}
