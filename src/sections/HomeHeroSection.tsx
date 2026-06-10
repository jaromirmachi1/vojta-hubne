import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { eyebrowText } from '../styles/eyebrow'
import heroPortrait from '../assets/SzzEgtimTNU2uqEm_2g6w.JPG.webp'
import { LaunchBackground } from '../components/backgrounds/LaunchBackground'
import { PageContainer } from '../components/PageContainer'
import { getShopifyCatalogUrl } from '../utils/shopify'

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: ${({ theme }) => theme.layout.heroMinHeight};
  min-height: ${({ theme }) => theme.layout.heroMinHeightDvh};
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(PageContainer)`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100%;
  display: grid;
  gap: 2rem;
  padding-block: clamp(2rem, 5vh, 3rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    gap: 4rem;
    padding-block: clamp(2.5rem, 6vh, 4rem);
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  ${eyebrowText}
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.75rem, 8vw, 4.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Lead = styled.p`
  margin: 0;
  max-width: 32rem;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 0.5rem;
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const StatValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.white};
`

const StatLabel = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  ${eyebrowText}
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
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
`

const Portrait = styled.figure`
  position: relative;
  margin: 0;
  width: 100%;
  max-width: 28rem;
  justify-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-self: end;
    max-width: none;
  }
`

const PortraitFrame = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.black};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.08) 0%,
      transparent 35%,
      rgba(0, 0, 0, 0.45) 100%
    );
    pointer-events: none;
  }
`

const PortraitImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`

export function HomeHeroSection() {
  const catalogUrl = getShopifyCatalogUrl()

  return (
    <Section>
      <LaunchBackground />
      <Inner>
        <Content>
          <Eyebrow>Prémiová řada GLP-1</Eyebrow>
          <Title>Transformace, která má váhu</Title>
          <Lead>
            Vojta Hubne — značka postavená na reálné cestě z 150 kg na 85 kg.
            Doplňky stravy a regenerační péče pro ty, kteří chtějí výsledky, ne
            prázdné sliby.
          </Lead>
          <Stats>
            <Stat>
              <StatValue>150→85</StatValue>
              <StatLabel>Kilogramů pryč</StatLabel>
            </Stat>
            <Stat>
              <StatValue>4</StatValue>
              <StatLabel>Flagship produkty</StatLabel>
            </Stat>
          </Stats>
          <Actions>
            <PrimaryLink to="/#produkty">Nejprodávanější</PrimaryLink>
            <SecondaryLink href={catalogUrl}>Nakupovat v e-shopu</SecondaryLink>
          </Actions>
        </Content>
        <Portrait>
          <PortraitFrame>
            <PortraitImage
              src={heroPortrait}
              alt="Vojta Hubne — zakladatel značky, cesta z 150 kg na 85 kg"
              width={960}
              height={1200}
              fetchPriority="high"
              decoding="async"
            />
          </PortraitFrame>
        </Portrait>
      </Inner>
    </Section>
  )
}
