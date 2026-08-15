import styled, { keyframes } from "styled-components";
import tisicataHeroPromoImage from "../assets/tisicata-hero-promo.png";
import { LaunchBackground } from "../components/backgrounds/LaunchBackground";
import { PageContainer } from "../components/PageContainer";
import { eyebrowText } from "../styles/eyebrow";
import {
  getShopifyCatalogUrl,
  getShopifyNovinkyUrl,
  getShopifyProductUrl,
} from "../utils/shopify";

const TISICATA_PRODUCT_URL = `${getShopifyProductUrl("lean-shake-slany-karamel-aquamin-mg")}?variant=60361804480846`;

const NOVINKY_URL = getShopifyNovinkyUrl();

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 0;
  overflow: hidden;
  border-bottom: 0;
  padding-block: clamp(1.5rem, 5vw, 2.25rem) 0.35rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: ${({ theme }) => theme.layout.heroMinHeight};
    min-height: ${({ theme }) => theme.layout.heroMinHeightDvh};
    padding-block: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  }
`;

const Inner = styled(PageContainer)`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100%;
  display: grid;
  gap: 2rem;
  padding-block: clamp(2rem, 5vh, 3rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    align-items: center;
    gap: 4rem;
    padding-block: clamp(2.5rem, 6vh, 4rem);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  ${eyebrowText}
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.75rem, 8vw, 4.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`;

const Lead = styled.p`
  margin: 0;
  max-width: 32rem;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 0.5rem;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.white};
`;

const StatLabel = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  ${eyebrowText}
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 0.55rem;
`;

const PrimaryLink = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  gap: 0.55rem;
  min-height: 3.25rem;
  margin-top: 0;
  padding: 0 1.5rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: 2px solid ${({ theme }) => theme.colors.goldMuted};
  border-radius: ${({ theme }) => theme.radii.pill};
  box-shadow: 0 0 0 1px rgba(238, 220, 130, 0.35);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.92;
  }
`;

const CtaEyebrow = styled.span`
  position: absolute;
  top: 0;
  left: 1rem;
  z-index: 1;
  transform: translateY(-50%);
  padding: 0.15rem 0.45rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  line-height: 1;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  background: #000000;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  pointer-events: none;
`;

const CtaArrow = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  margin-left: 0.05rem;
  color: currentColor;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    stroke-width: 2.75;
  }
`;

const bellRing = keyframes`
  0%,
  100% {
    transform: rotate(0deg);
  }
  8% {
    transform: rotate(14deg);
  }
  16% {
    transform: rotate(-12deg);
  }
  24% {
    transform: rotate(10deg);
  }
  32% {
    transform: rotate(-8deg);
  }
  40% {
    transform: rotate(5deg);
  }
  48% {
    transform: rotate(-3deg);
  }
  56%,
  100% {
    transform: rotate(0deg);
  }
`;

const badgePulse = keyframes`
  0%,
  56%,
  100% {
    transform: scale(1);
  }
  12%,
  28% {
    transform: scale(1.2);
  }
  20%,
  36% {
    transform: scale(1);
  }
`;

const NotificationIcon = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: 1.2rem;
  height: 1.2rem;
  color: currentColor;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: top center;
    animation: ${bellRing} 2.4s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: -0.12rem;
    right: -0.08rem;
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    background: #e11d2e;
    border: 1.5px solid ${({ theme }) => theme.colors.gold};
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
    animation: ${badgePulse} 2.4s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      animation: none;
    }

    &::after {
      animation: none;
    }
  }
`;

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 3.25rem;
  padding: 0 1.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(238, 220, 130, 0.06);
  }
`;

const Portrait = styled.figure`
  display: none;
  position: relative;
  margin: 0;
  width: 100%;
  min-width: 0;
  justify-self: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const PortraitFrame = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: #e8dccb;
  line-height: 0;
`;

const PortraitImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const BundleCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.85rem;
  padding: 1rem 1.75rem;
  border: 0;
  font: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

function BellNotificationIcon() {
  return (
    <NotificationIcon aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M6.2 9.6a5.8 5.8 0 0 1 11.6 0c0 4.1 1.7 5.5 1.7 5.5H4.5s1.7-1.4 1.7-5.5" />
        <path d="M10 18.2a2 2 0 0 0 4 0" />
      </svg>
    </NotificationIcon>
  );
}

export function HomeHeroSection() {
  const catalogUrl = getShopifyCatalogUrl();

  return (
    <Section>
      <LaunchBackground />
      <Inner>
        <Content>
          <Eyebrow>Prémiová řada GLP-1</Eyebrow>
          <Title>Transformace, která má váhu</Title>
          <Lead>
            Vojta Hubne — značka postavená na reálné cestě z 160 kg na 99 kg.
            Doplňky stravy a regenerační péče pro ty, kteří chtějí výsledky, ne
            prázdné sliby.
          </Lead>
          <Stats>
            <Stat>
              <StatValue>160→99</StatValue>
              <StatLabel>Kilogramů pryč</StatLabel>
            </Stat>
            <Stat>
              <StatValue>4</StatValue>
              <StatLabel>Flagship produkty</StatLabel>
            </Stat>
          </Stats>
          <Actions>
            <PrimaryLink href={NOVINKY_URL}>
              <CtaEyebrow>Novinky</CtaEyebrow>
              <BellNotificationIcon />
              Nově QR Platby, nový košík a další...
              <CtaArrow aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </CtaArrow>
            </PrimaryLink>
            <SecondaryLink href={catalogUrl}>Nakupovat v e-shopu</SecondaryLink>
          </Actions>
        </Content>
        <Portrait>
          <PortraitFrame>
            <PortraitImage
              src={tisicataHeroPromoImage}
              alt="Tisící objednávka — děkovný set Slaný karamel + Aquamin Mg, jen 50 ks za 949 Kč."
              width={1024}
              height={768}
              fetchPriority="high"
              decoding="async"
            />
          </PortraitFrame>
          <BundleCta href={TISICATA_PRODUCT_URL}>Nakoupit balíček</BundleCta>
        </Portrait>
      </Inner>
    </Section>
  );
}
