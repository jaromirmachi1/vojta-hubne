import styled from 'styled-components'
import {
  getAltV4ProductHref,
  getAltV4ProductPrice,
  type AltV4Product,
} from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { formatReviewCount } from '../../../utils/plainText'

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
    outline: 2px solid ${altV4.gold};
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

const CartFab = styled.a`
  position: absolute;
  right: 0.55rem;
  bottom: 0.55rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.65rem;
  height: 2.65rem;
  border-radius: 999px;
  background: ${altV4.gold};
  color: ${altV4.black};
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    background: #fff2a8;
    transform: scale(1.04);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  svg {
    display: block;
    width: 1.15rem;
    height: 1.15rem;
  }
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
    outline: 2px solid ${altV4.gold};
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
  color: ${altV4.gold};
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
  color: ${altV4.gold};
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
  color: ${altV4.gold};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.75rem;
  }
`

const ReviewCount = styled.span`
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.85);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.75rem;
  }
`

function BagPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M7.5 7V6a4.5 4.5 0 0 1 9 0v1H19a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1h2.5Zm1.5 0h6V6a3 3 0 0 0-6 0v1Z"
      />
      <path
        fill="currentColor"
        d="M12 11.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V16a.75.75 0 0 1-1.5 0v-1.25H10a.75.75 0 0 1 0-1.5h1.25V12a.75.75 0 0 1 .75-.75Z"
      />
    </svg>
  )
}

function reviewCountFromLabel(label: string): number | null {
  const match = label.match(/(\d+)/)
  if (!match) return null
  return Number(match[1])
}

function buildDescription(product: AltV4Product): string {
  const claim = product.claim.trim()
  const desc = product.desc.trim()
  if (claim) return `${product.name} — ${claim}`
  if (desc) return desc
  return product.name
}

type AltV4CollectionProductCardProps = {
  product: AltV4Product
}

export function AltV4CollectionProductCard({
  product,
}: AltV4CollectionProductCardProps) {
  const href = getAltV4ProductHref(product)
  const price = getAltV4ProductPrice(product)
  const description = buildDescription(product)
  const reviewCount = reviewCountFromLabel(product.reviews)
  const external = href.startsWith('http')
  const rel = external ? 'noopener noreferrer' : undefined

  return (
    <Card>
      <Media>
        <MediaLink
          href={href}
          rel={rel}
          aria-label={`${product.name} — zobrazit produkt`}
          tabIndex={-1}
        >
          <Image
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        </MediaLink>
        <CartFab
          href={href}
          rel={rel}
          aria-label={`${product.name} — koupit v e-shopu`}
        >
          <BagPlusIcon />
        </CartFab>
      </Media>

      <Body>
        <BodyLink href={href} rel={rel} aria-label={product.name}>
          <Name>{product.name}</Name>
          <Description>{description}</Description>
          <Price>{price}</Price>
          {reviewCount !== null ? (
            <Rating aria-label={`${reviewCount} recenzí`}>
              <Stars aria-hidden>★★★★★</Stars>
              <ReviewCount>{formatReviewCount(reviewCount)}</ReviewCount>
            </Rating>
          ) : product.reviews ? (
            <Rating>
              <ReviewCount>{product.reviews}</ReviewCount>
            </Rating>
          ) : null}
        </BodyLink>
      </Body>
    </Card>
  )
}
