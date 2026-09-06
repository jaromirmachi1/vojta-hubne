import styled from 'styled-components'
import heroImage from '../../../assets/vojta-alt-hero.png'
import { ALT_V4_SECTION_IDS, altV4Hero } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { scrollToSection } from '../../../utils/scrollToSection'
import {
  V4Inner,
  V4PillGoldButton,
  V4PillOutline,
  V4Section,
} from './shared'

const Hero = styled(V4Section)`
  padding-block: 1.6rem 1.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 0;
    padding-block: clamp(1rem, 2.2vh, 2rem);
  }
`

const HeroInner = styled(V4Inner)`
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    min-height: 0;
    width: min(100%, 80rem);
  }
`

const Layout = styled.div`
  display: grid;
  gap: 1.1rem;
  grid-template-areas:
    'copy'
    'figure'
    'actions';

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 1;
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    grid-template-rows: auto auto;
    grid-template-areas:
      'copy figure'
      'actions figure';
    align-content: center;
    align-items: center;
    column-gap: clamp(2rem, 5vw, 4.5rem);
    row-gap: 1.15rem;
    min-height: 0;
  }
`

const Copy = styled.div`
  grid-area: copy;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 36rem;
    align-self: end;
  }
`

const Actions = styled.div`
  grid-area: actions;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 26rem;
    align-self: start;

    a,
    button {
      width: 100%;
    }
  }
`

const Title = styled.h1`
  margin: 0 0 0.75rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.75rem, 9vw, 3.5rem);
  font-weight: 400;
  line-height: 0.94;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #fff;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: 1rem;
    font-size: clamp(3.5rem, 5.2vw, 5rem);
  }
`

const Lead = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.62;
  color: rgba(255, 255, 255, 0.9);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 1.125rem;
    line-height: 1.65;
    max-width: 34rem;
  }
`

const Figure = styled.figure`
  position: relative;
  grid-area: figure;
  margin: 0;
  align-self: start;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 0;
    height: 100%;
  }
`

const Media = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: min(100%, 36rem);
  }
`

const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3162 / 3134;
  object-fit: contain;
  border-radius: 1.125rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-height: calc(100svh - ${altV4.chromeHeight} - 9.5rem);
  }
`

const Badge = styled.div`
  position: absolute;
  left: 0.85rem;
  bottom: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.88);
  border: 1px solid rgba(238, 220, 130, 0.5);
`

const BadgeValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  line-height: 1;
  color: ${altV4.gold};
`

const BadgeNote = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
`

const Primary = styled(V4PillGoldButton)`
  flex-direction: column;
  gap: 0.15rem;
  min-height: 4rem;
  margin-bottom: 0.65rem;
`

const PrimarySub = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.72;
`

export function AltHeroV4Section() {
  return (
    <Hero $tone="black" aria-labelledby="alt-v4-hero-title">
      <HeroInner>
        <Layout>
          <Copy>
            <Title id="alt-v4-hero-title">
              Hubnutí, které
              <br />
              tělo zvládne
            </Title>
            <Lead>{altV4Hero.lead}</Lead>
          </Copy>
          <Figure>
            <Media>
              <Img
                src={heroImage}
                alt="Vojta Hubne před a po zhubnutí 61 kilogramů"
                width={3162}
                height={3134}
                fetchPriority="high"
              />
              <Badge>
                <BadgeValue>{altV4Hero.badgeValue}</BadgeValue>
                <BadgeNote>{altV4Hero.badgeNote}</BadgeNote>
              </Badge>
            </Media>
          </Figure>
          <Actions>
            <Primary
              type="button"
              onClick={() => scrollToSection(ALT_V4_SECTION_IDS.quiz)}
            >
              <span>{altV4Hero.primaryCta}</span>
              <PrimarySub>{altV4Hero.primarySub}</PrimarySub>
            </Primary>
            <V4PillOutline
              $onDark
              href={altV4Hero.catalogUrl}
              rel="noopener noreferrer"
            >
              {altV4Hero.secondaryCtaPrefix} produktů
            </V4PillOutline>
          </Actions>
        </Layout>
      </HeroInner>
    </Hero>
  )
}
