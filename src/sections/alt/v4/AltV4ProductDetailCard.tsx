import { useState } from 'react'
import styled from 'styled-components'
import {
  getAltV4ProductHref,
  getAltV4ProductPrice,
  type AltV4Product,
} from '../../../data/altHomeV4'
import type { ProductReviewStats } from '../../../hooks/useProductReviewStats'
import { altV4 } from '../../../styles/altV4'
import { formatReviewCount } from '../../../utils/plainText'
import { V4PillBlack } from './shared'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  border-radius: 1.25rem;
  background: ${altV4.paper};
  border: 1px solid ${altV4.line};
`

const Top = styled.div`
  display: flex;
  gap: 0.9rem;
  margin-bottom: 0.75rem;
`

const Thumb = styled.img`
  width: 5.75rem;
  height: 5.75rem;
  object-fit: contain;
  border-radius: 0.85rem;
  background: ${altV4.paper2};
`

const Body = styled.div`
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

const Name = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  line-height: 1.02;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const Claim = styled.div`
  margin-top: 0.25rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: ${altV4.goldInk};
`

const Rating = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.4rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${altV4.ink2};
`

const Stars = styled.span`
  display: inline-flex;
  gap: 0.04rem;
  line-height: 1;
  color: ${altV4.goldInk};
  letter-spacing: 0.02em;
`

const Average = styled.span`
  font-weight: 700;
  color: ${altV4.ink};
`

const Desc = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${altV4.ink2};
`

const List = styled.ul`
  list-style: none;
  margin: 0 0 0.9rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Bullet = styled.li`
  display: flex;
  gap: 0.65rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${altV4.ink};
`

const Toggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  width: 100%;
  min-height: 3.25rem;
  padding: 0 1rem;
  border-radius: 0.9rem;
  border: 1px solid ${altV4.line};
  background: ${altV4.paper2};
  color: ${altV4.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
`

const Specs = styled.div`
  margin-top: 0.35rem;
`

const SpecRow = styled.div`
  display: flex;
  gap: 0.9rem;
  align-items: baseline;
  padding: 0.7rem 0.15rem;
  border-bottom: 1px solid ${altV4.line};
`

const SpecKey = styled.span`
  flex: none;
  width: 38%;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${altV4.ink2};
`

const SpecVal = styled.span`
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${altV4.ink};
`

const Note = styled.div`
  padding-top: 0.65rem;
  font-size: 0.8rem;
  line-height: 1.6;
  color: ${altV4.ink2};
`

const Footer = styled.div`
  margin-top: auto;
`

const PriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.9rem;
  margin-top: 0.9rem;
`

const Price = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2rem;
  line-height: 1;
`

const Unit = styled.div`
  margin-top: 0.15rem;
  font-size: 0.75rem;
  color: ${altV4.ink2};
`

const Detail = styled.a`
  border: 0;
  background: transparent;
  padding: 0;
  color: ${altV4.goldInk};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
`

const Cta = styled(V4PillBlack)`
  width: 100%;
  margin-top: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
  }
`

function renderStars(rating: number) {
  const rounded = Math.round(rating)
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded)
}

type AltV4ProductDetailCardProps = {
  product: AltV4Product
  ctaPrefix?: string
  reviewStats?: ProductReviewStats
}

export function AltV4ProductDetailCard({
  product,
  ctaPrefix = 'Koupit',
  reviewStats,
}: AltV4ProductDetailCardProps) {
  const [open, setOpen] = useState(false)
  const href = getAltV4ProductHref(product)
  const price = getAltV4ProductPrice(product)
  const cta = product.soon
    ? 'Zobrazit předprodej'
    : product.clubOnly
      ? 'Koupit — jen pro členy'
      : ctaPrefix
  const note = product.soon
    ? 'Předprodej — členové klubu nakupují první.'
    : `Za tento nákup získáte ${Math.max(1, Math.round(product.value / 10))} bodů do VH Clubu.`

  const liveReviews =
    reviewStats && reviewStats.count > 0
      ? {
          average: reviewStats.averageRating.toFixed(1).replace('.', ','),
          label: formatReviewCount(reviewStats.count),
          stars: renderStars(reviewStats.averageRating),
          aria: `Hodnocení ${reviewStats.averageRating.toFixed(1)} z 5 · ${formatReviewCount(reviewStats.count)}`,
        }
      : product.reviews
        ? {
            average: null,
            label: product.reviews,
            stars: null,
            aria: product.reviews,
          }
        : null

  return (
    <Card>
      <Top>
        <Thumb src={product.image} alt="" width={92} height={92} />
        <Body>
          {product.badge ? <Badge>{product.badge}</Badge> : null}
          <Name>{product.name}</Name>
          <Claim>{product.claim}</Claim>
          {liveReviews ? (
            <Rating aria-label={liveReviews.aria}>
              {liveReviews.stars ? (
                <Stars aria-hidden>{liveReviews.stars}</Stars>
              ) : null}
              {liveReviews.average ? (
                <>
                  <Average>{liveReviews.average}</Average>
                  <span aria-hidden>·</span>
                </>
              ) : null}
              <span>{liveReviews.label}</span>
            </Rating>
          ) : null}
        </Body>
      </Top>
      <Desc>{product.desc}</Desc>
      <List>
        {product.bullets.map((item) => (
          <Bullet key={item}>
            <span style={{ flex: 'none', color: altV4.goldInk, fontWeight: 700 }}>
              ✓
            </span>
            <span>{item}</span>
          </Bullet>
        ))}
      </List>
      <Footer>
        <Toggle
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? 'Skrýt složení a dávkování' : 'Složení a dávkování'}</span>
          <span aria-hidden>{open ? '−' : '+'}</span>
        </Toggle>
        {open ? (
          <Specs>
            {product.specs.map((spec) => (
              <SpecRow key={spec.k}>
                <SpecKey>{spec.k}</SpecKey>
                <SpecVal>{spec.v}</SpecVal>
              </SpecRow>
            ))}
            <Note>{note}</Note>
          </Specs>
        ) : null}
        <PriceRow>
          <div>
            <Price>{price}</Price>
            <Unit>{product.unit}</Unit>
          </div>
          <Detail href={href} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
            Celý detail →
          </Detail>
        </PriceRow>
        <Cta href={href} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {cta}
        </Cta>
      </Footer>
    </Card>
  )
}
