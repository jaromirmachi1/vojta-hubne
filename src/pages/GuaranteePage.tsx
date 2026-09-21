import styled from 'styled-components'
import productCenter from '../assets/vh-guarantee-product-center.webp'
import productLeft from '../assets/vh-guarantee-product-left.webp'
import productRight from '../assets/vh-guarantee-product-right.webp'
import { usePageMeta } from '../hooks/usePageMeta'
import { ShopLayout } from '../layouts/ShopLayout'
import {
  GUARANTEE_MAIL,
  GUARANTEE_PATH,
  guaranteeFaqs,
  guaranteeSteps,
} from '../data/guarantee'
import { guaranteePageMeta } from '../seo/guaranteePageMeta'

const ShieldIcon = () => (
  <svg viewBox="0 0 32 36" fill="none" aria-hidden="true">
    <path
      d="M16 2 29 7v10c0 8-8 14-13 17C11 31 3 25 3 17V7L16 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="m10 17 4 4 8-9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Hero = styled.section`
  isolation: isolate;
  overflow: hidden;
  background: #0c0c0b;
  color: #f6f3e9;
`

const HeroInner = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  column-gap: 2.25rem;
  align-items: center;
  max-width: 1320px;
  margin: 0 auto;
  padding: 4.75rem clamp(1.25rem, 4vw, 3rem) 2.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 2.25rem 1.35rem 1.6rem;
  }
`

const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.gold};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  svg {
    width: 1.45rem;
    height: 1.7rem;
    flex: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.625rem;
  }
`

const Lead = styled.p`
  margin: 1.6rem 0 0.65rem;
  font-size: 0.95rem;
  color: #c9c7bf;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 1.35rem;
    font-size: 0.8125rem;
  }
`

const Title = styled.h1`
  margin: 0;
  max-width: none;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.7rem, 5.2vw, 4.625rem);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: 0;
  text-transform: uppercase;
  color: #fff;

  span {
    color: ${({ theme }) => theme.colors.gold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: clamp(2.3rem, 8.8vw, 3.75rem);
  }
`

const Intro = styled.p`
  max-width: 35rem;
  margin: 1.5rem 0 1.6rem;
  font-size: 0.95rem;
  line-height: 1.85;
  color: #d2d0c8;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 1.2rem;
    font-size: 0.875rem;
    line-height: 1.75;
  }
`

const HeroButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  min-height: 3.375rem;
  padding: 0.875rem 1.55rem;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: #12120e;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-decoration: none;
  transition:
    background 180ms ease-out,
    transform 160ms ease-out;

  span {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1;
  }

  &:hover {
    background: #f7eaa9;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 3.125rem;
    font-size: 0.75rem;
  }
`

const OpenedNote = styled.p`
  margin: 1rem 0 0;
  font-size: 0.75rem;
  line-height: 1.6;
  color: #b9b7af;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.6875rem;
  }
`

const Visual = styled.div`
  position: relative;
  min-width: 0;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 28.75rem;
    margin: 1.6rem auto 0;
  }
`

const Halo = styled.div`
  position: absolute;
  inset: 12% -10% 8%;
  z-index: -1;
  background: radial-gradient(
    ellipse,
    rgba(238, 220, 130, 0.12),
    transparent 68%
  );
  pointer-events: none;
`

const Seal = styled.div`
  position: absolute;
  top: 1px;
  right: 8px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 6.55rem;
  height: 6.55rem;
  border: 1px solid rgba(238, 220, 130, 0.44);
  border-radius: 50%;
  outline: 1px solid rgba(238, 220, 130, 0.15);
  outline-offset: 7px;
  background: #11110e;
  color: ${({ theme }) => theme.colors.gold};
  transform: rotate(10deg);

  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 3.45rem;
    font-weight: 400;
    line-height: 0.9;
  }

  span {
    margin-top: 0.45rem;
    font-size: 0.4375rem;
    font-weight: 700;
    letter-spacing: 0.09em;
  }

  @media (max-width: 900px) {
    width: 5.3rem;
    height: 5.3rem;

    strong {
      font-size: 2.8rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 0;
    right: 7%;
    width: 4.7rem;
    height: 4.7rem;

    strong {
      font-size: 2.5rem;
    }

    span {
      font-size: 0.34375rem;
    }
  }
`

const Products = styled.div`
  position: relative;
  height: 25.625rem;
  margin-top: 3.45rem;

  @media (max-width: 900px) {
    height: 20rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: auto;
    aspect-ratio: 1.4;
    margin-top: 1.35rem;
  }
`

const ProductImg = styled.img<{ $pos: 'left' | 'center' | 'right' }>`
  position: absolute;
  bottom: ${({ $pos }) => ($pos === 'center' ? '0' : '25px')};
  left: ${({ $pos }) =>
    $pos === 'left' ? '-17%' : $pos === 'center' ? '5%' : 'auto'};
  right: ${({ $pos }) => ($pos === 'right' ? '-17%' : 'auto')};
  z-index: ${({ $pos }) => ($pos === 'center' ? 3 : $pos === 'right' ? 2 : 1)};
  width: ${({ $pos }) => ($pos === 'center' ? '89%' : '76%')};
  max-width: none;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 24px 14px rgba(0, 0, 0, 0.55));
  transform: ${({ $pos }) =>
    $pos === 'left' ? 'rotate(-9deg)' : $pos === 'right' ? 'rotate(9deg)' : 'none'};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: ${({ $pos }) => ($pos === 'center' ? '0' : '9%')};
    left: ${({ $pos }) =>
      $pos === 'left' ? '-5%' : $pos === 'center' ? '11%' : 'auto'};
    right: ${({ $pos }) => ($pos === 'right' ? '-5%' : 'auto')};
    width: ${({ $pos }) => ($pos === 'center' ? '78%' : '66%')};
  }
`

const Caption = styled.p`
  margin: 0.65rem 0 0;
  text-align: center;
  font-size: 0.6875rem;
  line-height: 1.5;
  color: #bcb8a8;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.625rem;
  }
`

const Facts = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 2.8rem;
  padding-top: 1.9rem;
  border-top: 1px solid rgba(238, 220, 130, 0.18);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 1.55rem;
    padding-top: 1.35rem;
  }
`

const Fact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 0.95rem;
  text-align: center;

  & + & {
    border-left: 1px solid rgba(238, 220, 130, 0.18);
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 2.625rem;
    font-weight: 400;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.gold};
  }

  span {
    font-size: 0.75rem;
    line-height: 1.6;
    color: #c4c1b9;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 0.45rem;

    strong {
      font-size: 2rem;
    }

    span {
      font-size: 0.625rem;
    }
  }
`

const Detail = styled.section`
  background: #0c0c0b;
  color: #e9e5d9;
  padding: 0.75rem ${({ theme }) => theme.layout.contentPadding} 3rem;
  scroll-margin-top: ${({ theme }) => theme.layout.altStickyScrollMargin};
`

const DetailInner = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 0.75rem 0 2.25rem;
`

const DetailEyebrow = styled.p`
  margin: 0;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const DetailTitle = styled.h2`
  margin: 1rem 0 1.5rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.375rem, 5vw, 4rem);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: 0;
  text-transform: uppercase;
  color: #fff;

  span {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const DetailIntro = styled.p`
  max-width: 48.75rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.85;
  color: #e9e5d9;

  strong {
    color: #fff;
    font-weight: 700;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.875rem;
  }
`

const DetailFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 1.9rem 0 0.9rem;
  padding: 1.5rem 0;
  border-block: 1px solid rgba(238, 220, 130, 0.25);

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0 1.1rem;
  }

  > div + div {
    border-left: 1px solid rgba(238, 220, 130, 0.25);
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.gold};
  }

  span {
    font-size: 0.6875rem;
    line-height: 1.5;
    color: #c4c1b9;
  }

  @media (max-width: 600px) {
    padding: 1.1rem 0;

    > div {
      padding: 0 0.5rem;
    }

    strong {
      font-size: 1.375rem;
    }

    span {
      font-size: 0.625rem;
    }
  }
`

const DetailOpened = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gold};
`

const SectionHeading = styled.h3`
  margin: 2.75rem 0 1.35rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0;
  color: #fff;

  @media (max-width: 600px) {
    font-size: 1.75rem;
  }
`

const Steps = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Step = styled.li`
  display: flex;
  gap: 1.35rem;
  margin: 0 0 1.55rem;
  padding: 0;

  > span {
    flex: none;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 1;
    color: ${({ theme }) => theme.colors.gold};
  }

  h4 {
    margin: 0 0 0.4rem;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.5;
    color: #fff;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.85;
    color: #e9e5d9;
  }

  a {
    color: ${({ theme }) => theme.colors.gold};
    text-underline-offset: 4px;
  }

  @media (max-width: 600px) {
    gap: 0.95rem;

    p {
      font-size: 0.8125rem;
    }
  }
`

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1.9rem;
  margin: 0.5rem 0 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: #14140f;
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.5;
  text-decoration: none;
  transition:
    background 180ms ease-out,
    transform 160ms ease-out;

  &:hover {
    background: #f7eaa9;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 4px;
  }
`

const Faq = styled.div`
  margin-top: 1.75rem;

  details {
    padding: 1.1rem 0;
    border-bottom: 1px solid rgba(238, 220, 130, 0.19);
  }

  summary {
    cursor: pointer;
    list-style: none;
    font-size: 0.875rem;
    font-weight: 600;
    color: #f4f1e7;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  details p {
    margin: 0.75rem 0 0;
    font-size: 0.8125rem;
    line-height: 1.85;
    color: #c9c7bf;
  }
`

const Legal = styled.p`
  margin: 2rem 0 0;
  font-size: 0.6875rem;
  line-height: 1.6;
  color: #b6b2a6;
`

export function GuaranteePage() {
  usePageMeta(guaranteePageMeta)

  return (
    <ShopLayout
      breadcrumbs={[
        { label: 'Domů', to: '/' },
        { label: '30denní garance' },
      ]}
    >
      <Hero aria-labelledby="vh-guarantee-hero-title">
        <HeroInner>
          <div>
            <Eyebrow>
              <ShieldIcon />
              <span>30denní garance VH</span>
            </Eyebrow>
            <Lead>Věříme tomu, co děláme.</Lead>
            <Title id="vh-guarantee-hero-title">
              Nechutná? Nesedne?
              <br />
              <span>Peníze ti vrátíme.</span>
            </Title>
            <Intro>
              Našim produktům věříme. Chceme, abys je mohl vyzkoušet s klidem.
              Když ti nechutnají nebo nesednou, ozvi se nám do 30 dnů od
              převzetí. Dopravu platíme my a ty dostaneš 100&nbsp;% zaplacené
              ceny produktu zpět.
            </Intro>
            <HeroButton href="#jak-to-funguje">
              Jak funguje garance <span aria-hidden="true">↗</span>
            </HeroButton>
            <OpenedNote>Platí i na otevřené a vyzkoušené balení.</OpenedNote>
          </div>

          <Visual>
            <Halo aria-hidden />
            <Seal>
              <strong>30</strong>
              <span>DNÍ NA VYZKOUŠENÍ</span>
            </Seal>
            <Products>
              <ProductImg
                $pos="left"
                src={productLeft}
                alt="LEAN SHAKE Višeň v čokoládě"
                width={900}
                height={900}
                fetchPriority="high"
              />
              <ProductImg
                $pos="center"
                src={productCenter}
                alt="iLEAN SHAKE Čokoláda"
                width={900}
                height={900}
                fetchPriority="high"
              />
              <ProductImg
                $pos="right"
                src={productRight}
                alt="LEAN SHAKE Malina"
                width={900}
                height={900}
              />
            </Products>
            <Caption>Tvoje chuť. Tvoje rozhodnutí. Naše garance.</Caption>
          </Visual>

          <Facts>
            <Fact>
              <strong>30 dní</strong>
              <span>na vyzkoušení od převzetí</span>
            </Fact>
            <Fact>
              <strong>0 Kč</strong>
              <span>za odeslání zpět</span>
            </Fact>
            <Fact>
              <strong>100 %</strong>
              <span>zaplacené ceny produktu zpět</span>
            </Fact>
          </Facts>
        </HeroInner>
      </Hero>

      <Detail id="jak-to-funguje" aria-labelledby="vh-guarantee-detail-title">
        <DetailInner>
          <DetailEyebrow>VĚŘÍME TOMU, CO DĚLÁME.</DetailEyebrow>
          <DetailTitle id="vh-guarantee-detail-title">
            Nechutná? Nesedne?
            <br />
            <span>Peníze ti vrátíme.</span>
          </DetailTitle>
          <DetailIntro>
            Našim produktům věříme. A chceme, abys je mohl vyzkoušet s klidem.
            Pokud ti produkt nechutná nebo ti nesedne, ozvi se nám do 30 dnů od
            převzetí a domluvíme jeho vrácení. Dopravu platíme my a vrátíme ti{' '}
            <strong>100&nbsp;% zaplacené ceny produktu.</strong>
          </DetailIntro>

          <DetailFacts>
            <div>
              <strong>30 dní</strong>
              <span>od převzetí produktu</span>
            </div>
            <div>
              <strong>Vrácení zdarma</strong>
              <span>dopravu zpět platí VH</span>
            </div>
            <div>
              <strong>100 % zpět</strong>
              <span>ze zaplacené ceny produktu</span>
            </div>
          </DetailFacts>

          <DetailOpened>
            Ano, i když balení otevřeš a produkt vyzkoušíš.
          </DetailOpened>

          <SectionHeading>Jak na vrácení? Ve třech krocích.</SectionHeading>
          <Steps>
            {guaranteeSteps.map((step) => (
              <Step key={step.n}>
                <span>{step.n}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>
                    {step.n === '01' ? (
                      <>
                        Ozvi se na{' '}
                        <a href={GUARANTEE_MAIL}>info@vojtahubne.cz</a>. Připiš
                        číslo objednávky a produkt, který chceš vrátit. Pro
                        uplatnění garance nám napiš do 30 dnů od převzetí
                        produktu.
                      </>
                    ) : (
                      step.body
                    )}
                  </p>
                </div>
              </Step>
            ))}
          </Steps>

          <CtaButton href={GUARANTEE_MAIL}>
            Chci využít garanci <span aria-hidden="true">↗</span>
          </CtaButton>

          <Faq>
            <SectionHeading>Ještě tě možná zajímá</SectionHeading>
            {guaranteeFaqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Faq>

          <Legal>
            30denní garance VH je dobrovolná garance spokojenosti. Tvoje zákonná
            práva z vadného plnění ani právo na odstoupení od smlouvy tím nejsou
            dotčena.
          </Legal>
        </DetailInner>
      </Detail>
    </ShopLayout>
  )
}

export { GUARANTEE_PATH }
