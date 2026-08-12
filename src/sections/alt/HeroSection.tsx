import styled, { createGlobalStyle } from 'styled-components'
import heroImage from '../../assets/vojtazhubl.png'
import { ALT_SECTION_IDS } from '../../data/altHomepage'
import { scrollToSection } from '../../utils/scrollToSection'
import { StaggerItem, StaggerReveal } from './motion'
import {
  AltInner,
  PrimaryButton,
  ScrollGhostButton,
} from './shared'

const HeroScriptFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');
`

const Section = styled.section`
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.altHeroMinHeight};
  min-height: ${({ theme }) => theme.layout.altHeroMinHeightDvh};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: ${({ theme }) => theme.layout.altHeroMinHeight};
    height: ${({ theme }) => theme.layout.altHeroMinHeightDvh};
    max-height: ${({ theme }) => theme.layout.altHeroMinHeightDvh};
  }
`

const Inner = styled(AltInner)`
  display: grid;
  gap: clamp(1rem, 3vw, 1.75rem);
  align-items: center;
  width: 100%;
  min-height: 100%;
  padding-block: clamp(1rem, 2.5vh, 1.75rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    align-items: stretch;
    gap: clamp(1rem, 2vw, 1.75rem);
    height: 100%;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(0.75rem, 2vh, 1.1rem);
  min-height: 0;
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 6.5vw, 4rem);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: 0.035em;
  text-transform: uppercase;
`

const TitleLine = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.white};
`

const TitleLineGold = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.gold};
`

const Lead = styled.p`
  margin: 0;
  max-width: 34rem;
  font-size: clamp(1rem, 2.2vw, 1.15rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.35rem;
`

const VisualColumn = styled.figure`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  min-height: clamp(20rem, 52vh, 30rem);
  overflow: visible;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 100%;
    min-height: 0;
  }
`

const StatsBlock = styled.div`
  position: absolute;
  z-index: 2;
  top: 0.35rem;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: calc(100% - 0.5rem);
  padding: 0.35rem 0.5rem;
  text-align: center;
  pointer-events: none;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 45%;
    width: 145%;
    height: 220%;
    transform: translate(-50%, -45%);
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.78) 0%,
      rgba(0, 0, 0, 0.45) 35%,
      rgba(0, 0, 0, 0.15) 58%,
      transparent 72%
    );
    filter: blur(22px);
    pointer-events: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    left: auto;
    right: 0.25rem;
    transform: none;
    text-align: right;

    &::before {
      left: 70%;
      transform: translate(-70%, -45%);
      width: 160%;
      height: 240%;
    }
  }
`

const WeightLine = styled.p`
  position: relative;
  margin: 0;
  font-family: 'Italianno', 'Brush Script MT', cursive;
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.gold};
  white-space: nowrap;
  text-shadow:
    0 0 8px rgba(0, 0, 0, 0.85),
    0 0 20px rgba(0, 0, 0, 0.7),
    0 0 36px rgba(0, 0, 0, 0.5),
    0 2px 4px rgba(0, 0, 0, 0.55);
`

const Taglines = styled.p`
  position: relative;
  margin: 0.35rem 0 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(0.88rem, 1.6vw, 1.05rem);
  font-weight: 300;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  text-shadow:
    0 0 8px rgba(0, 0, 0, 0.9),
    0 0 18px rgba(0, 0, 0, 0.65),
    0 0 32px rgba(0, 0, 0, 0.4),
    0 1px 3px rgba(0, 0, 0, 0.6);
`

const GoldRule = styled.div`
  position: relative;
  width: min(100%, 10rem);
  height: 2px;
  margin-top: 0.9rem;
  margin-inline: auto;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.colors.gold} 18%,
    ${({ theme }) => theme.colors.gold} 100%
  );
  border-radius: ${({ theme }) => theme.radii.pill};
  opacity: 0.85;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-left: auto;
    margin-right: 0;
  }
`

const HeroImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: inherit;
  padding-inline: 0;
  overflow: hidden;
`

const HeroImage = styled.img`
  display: block;
  width: 100%;
  max-width: min(100%, 42rem);
  height: auto;
  max-height: clamp(18rem, 52vh, 28rem);
  margin: 0 auto;
  object-fit: contain;
  object-position: center center;

  @media (max-width: calc(${({ theme }) => theme.breakpoints.tablet} - 1px)) {
    max-height: clamp(18rem, 48vh, 26rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: min(100%, 46rem);
    max-height: clamp(22rem, 58vh, 36rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: min(100%, 52rem);
    max-height: clamp(28rem, 72vh, 46rem);
  }
`

export function HeroSection() {
  return (
    <Section>
      <HeroScriptFont />
      <Inner>
        <Content>
          <StaggerReveal>
            <StaggerItem>
              <Title>
                <TitleLine>Najděte režim</TitleLine>
                <TitleLineGold>který dává smysl</TitleLineGold>
                <TitleLine>pro vaši fázi hubnutí</TitleLine>
              </Title>
            </StaggerItem>
            <StaggerItem>
              <Lead>
                Odpovězte na pár jednoduchých otázek. Podle vašich odpovědí vás
                navedeme na nejvhodnější cestu — bez náhodného vybírání produktů.
              </Lead>
            </StaggerItem>
            <StaggerItem>
              <Actions>
                <PrimaryButton
                  as="button"
                  type="button"
                  onClick={() => scrollToSection(ALT_SECTION_IDS.regimeQuiz)}
                >
                  Najít můj režim
                </PrimaryButton>
                <ScrollGhostButton sectionId={ALT_SECTION_IDS.products}>
                  Chci vidět produkty
                </ScrollGhostButton>
              </Actions>
            </StaggerItem>
          </StaggerReveal>
        </Content>

        <VisualColumn aria-label="Transformace a produkty Vojta Hubne">
          <StatsBlock>
            <WeightLine>160&nbsp;kg → 99&nbsp;kg</WeightLine>
            <Taglines>Reálná cesta. Reálný režim.</Taglines>
            <GoldRule aria-hidden />
          </StatsBlock>

          <HeroImageWrap>
            <HeroImage
              src={heroImage}
              alt="Vojta Hubne — transformace před a po: cesta z 160 kg na 99 kg"
              width={1942}
              height={1924}
              fetchPriority="high"
              decoding="async"
            />
          </HeroImageWrap>
        </VisualColumn>
      </Inner>
    </Section>
  )
}
