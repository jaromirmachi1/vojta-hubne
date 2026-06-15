import styled from 'styled-components'
import heroPortrait from '../../assets/SzzEgtimTNU2uqEm_2g6w.JPG.webp'
import {
  ALT_SECTION_IDS,
  getProgramProductUrl,
} from '../../data/altHomepage'
import { StaggerItem, StaggerReveal } from './motion'
import {
  AltInner,
  PrimaryButton,
  ScrollGhostButton,
} from './shared'

const Section = styled.section`
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.heroMinHeight};
  min-height: ${({ theme }) => theme.layout.heroMinHeightDvh};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(AltInner)`
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  padding-block: clamp(2.5rem, 6vh, 4rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.75rem, 8vw, 4.75rem);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: 0.035em;
  text-transform: uppercase;
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

const Portrait = styled.figure`
  margin: 0;
  justify-self: center;
  width: 100%;
  max-width: 26rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-self: end;
    max-width: none;
  }
`

const PortraitFrame = styled.div`
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.black};
`

const PortraitImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`

export function HeroSection() {
  const programUrl = getProgramProductUrl()

  return (
    <Section>
      <Inner>
        <Content>
          <StaggerReveal>
            <StaggerItem>
              <Title>Začni 90 dní s Vojtou</Title>
            </StaggerItem>
            <StaggerItem>
              <Lead>
                Od 160 kg sem. Tyhle doplňky jsem nenašel — tak jsem je vytvořil.
              </Lead>
            </StaggerItem>
            <StaggerItem>
              <Actions>
                <PrimaryButton href={programUrl}>Chci začít</PrimaryButton>
                <ScrollGhostButton sectionId={ALT_SECTION_IDS.customerPaths}>
                  Najít správný balíček
                </ScrollGhostButton>
              </Actions>
            </StaggerItem>
          </StaggerReveal>
        </Content>
        <Portrait>
          <PortraitFrame>
            <PortraitImage
              src={heroPortrait}
              alt="Vojta Hubne — zakladatel značky"
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
