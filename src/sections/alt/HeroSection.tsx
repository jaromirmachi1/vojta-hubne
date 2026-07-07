import styled, { createGlobalStyle } from 'styled-components'
import heroImage from '../../assets/vojtazhubl.png'
import { ALT_SECTION_IDS } from '../../data/altHomepage'
import { scrollToSection } from '../../utils/scrollToSection'
import { StaggerItem, StaggerReveal } from './motion'
import {
  AltInner,
  altMobileImage,
  altMobileImageFrame,
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
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: clamp(0.75rem, 2vh, 1.25rem);
  margin: 0;
  width: 100%;
  min-height: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-items: flex-end;
    height: 100%;
  }
`

const StatsBlock = styled.div`
  width: 100%;
  max-width: 20rem;
  text-align: center;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: right;
  }
`

const WeightLine = styled.p`
  margin: 0;
  font-family: 'Italianno', 'Brush Script MT', cursive;
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.gold};
`

const Taglines = styled.p`
  margin: 0.35rem 0 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(0.88rem, 1.6vw, 1.05rem);
  font-weight: 300;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.white};
`

const GoldRule = styled.div`
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
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  margin-top: auto;
  padding-inline: 0;
  overflow: hidden;
  ${altMobileImageFrame}

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-inline: clamp(0.75rem, 3vw, 2rem);
  }
`

const HeroImage = styled.img`
  display: block;
  width: 100%;
  max-width: min(100%, 32rem);
  height: auto;
  max-height: clamp(16rem, 62vh, 30rem);
  margin-inline: auto;
  object-fit: contain;
  object-position: center center;
  transform: none;
  ${altMobileImage}

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: min(100%, 36rem);
    max-height: clamp(18rem, 68vh, 34rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: min(100%, 40rem);
    max-height: clamp(20rem, 72vh, 38rem);
    transform: none;
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
            <WeightLine>160 kg → 99 kg</WeightLine>
            <Taglines>
              Reálná cesta.
              <br />
              Reálný režim.
            </Taglines>
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
