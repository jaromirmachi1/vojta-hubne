import styled from 'styled-components'
import tisicataHeroPromoImage from '../assets/tisicata-hero-promo.png'
import restartHeroPromoImage from '../assets/159ede93-2c6a-47a5-ab52-1fac5d5e1c3c.jpg'
import { PromoCodeCopyButton } from '../components/PromoCodeCopyButton'
import { getShopifyProductUrl } from '../utils/shopify'

const TISICATA_PRODUCT_URL = `${getShopifyProductUrl(
  'lean-shake-slany-karamel-aquamin-mg',
)}?variant=60361804480846`

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
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
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
        <Card>
          <Frame>
            <Image
              src={tisicataHeroPromoImage}
              alt="Tisící objednávka — děkovný set Slaný karamel + Aquamin Mg, jen 50 ks za 949 Kč."
              width={1024}
              height={768}
              fetchPriority="high"
              decoding="async"
            />
          </Frame>
          <BuyCta href={TISICATA_PRODUCT_URL}>Nakoupit balíček</BuyCta>
        </Card>

        <Card>
          <Frame>
            <Image
              src={restartHeroPromoImage}
              alt="Balíček (re)START — GLP-1 Support, Lean Shake a D3+K2+Vápník se slevou 30 %. Kód 30STARTSVOJTOU."
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
            />
          </Frame>
          <PromoCodeCopyButton />
        </Card>
      </Track>
    </Section>
  )
}
