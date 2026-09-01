import styled from 'styled-components'
import { PromoCodeCopyButton } from '../components/PromoCodeCopyButton'
import { homeHeroPromos } from '../data/homeHeroPromos'

/** Mobile-only: swipeable promo cards (image + CTA). Hidden from tablet up. */
const Section = styled.section`
  display: block;
  width: 100%;
  padding-block: 0.35rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.black};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const Track = styled.div`
  display: flex;
  gap: 0.85rem;
  width: 100%;
  padding-inline: ${({ theme }) => theme.layout.contentPadding};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: ${({ theme }) => theme.layout.contentPadding};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Card = styled.article`
  flex: 0 0 min(86vw, 22rem);
  scroll-snap-align: start;
  min-width: 0;
`

const Frame = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: #e8dccb;
  line-height: 0;
  aspect-ratio: 3 / 2;
`

const ImageLink = styled.a`
  display: block;
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const BuyCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.95rem 1.25rem;
  border: 0;
  font: inherit;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
`

export function HomeMobilePromoScroll() {
  return (
    <Section aria-label="Aktuální akce">
      <Track>
        {homeHeroPromos.map((promo, index) => {
          const image = (
            <Image
              src={promo.image}
              alt={promo.alt}
              width={promo.width}
              height={promo.height}
              fetchPriority={index === 0 ? 'high' : undefined}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          )

          return (
            <Card key={promo.id}>
              <Frame>
                {promo.ctaMode === 'image-link' ? (
                  <ImageLink href={promo.href} aria-label={promo.alt}>
                    {image}
                  </ImageLink>
                ) : (
                  image
                )}
              </Frame>
              {promo.ctaMode === 'copy-code' ? (
                <PromoCodeCopyButton />
              ) : promo.ctaMode === 'link' ? (
                <BuyCta href={promo.href}>{promo.ctaLabel}</BuyCta>
              ) : null}
            </Card>
          )
        })}
      </Track>
    </Section>
  )
}
