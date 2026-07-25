import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { PageContainer } from '../components/PageContainer'
import { ArrowIcon } from '../components/cochystame/ArrowIcon'
import { coChystameProjects } from '../data/coChystameProjects'
import { eyebrowText } from '../styles/eyebrow'

const teaserProjects = coChystameProjects.filter(
  (project) =>
    project.id === 'odvodnovac' ||
    project.id === 'kreatin' ||
    project.id === 'probiotika',
)

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`

const Section = styled.section`
  position: relative;
  isolation: isolate;
  padding-block: clamp(3.5rem, 8vw, 6rem);
  overflow: hidden;
  border-block: 1px solid rgba(238, 220, 130, 0.35);
  background:
    radial-gradient(
      ellipse 70% 55% at 50% 0%,
      rgba(238, 220, 130, 0.16),
      transparent 58%
    ),
    radial-gradient(
      circle at 8% 80%,
      rgba(238, 220, 130, 0.07),
      transparent 28rem
    ),
    linear-gradient(180deg, #0c0b08 0%, #000000 55%, #050505 100%);

  &::before {
    content: '';
    position: absolute;
    inset-inline: 0;
    top: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.gold} 20%,
      ${({ theme }) => theme.colors.goldMuted} 50%,
      ${({ theme }) => theme.colors.gold} 80%,
      transparent 100%
    );
    z-index: 1;
  }
`

const Inner = styled(PageContainer)`
  position: relative;
  z-index: 1;
`

const Header = styled.header`
  display: grid;
  gap: 1.25rem;
  margin-bottom: clamp(1.75rem, 4vw, 2.75rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.8fr);
    align-items: end;
    gap: 3rem;
  }
`

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
`

const NewBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

const BadgeDot = styled.span`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.black};
  animation: ${pulse} 1.6s ease-in-out infinite;
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  ${eyebrowText}
`

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.35rem, 6vw, 4rem);
  line-height: 0.92;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  text-shadow: 0 0 40px rgba(238, 220, 130, 0.18);
`

const Lead = styled.p`
  margin: 0;
  max-width: 42ch;
  padding: 1rem 1.15rem;
  border-left: 2px solid ${({ theme }) => theme.colors.gold};
  background: rgba(238, 220, 130, 0.05);
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
  font-size: 0.98rem;
`

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;

  & > *:nth-child(n + 3) {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & > *:nth-child(n + 3) {
      display: flex;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 100%;
  padding: 1.5rem 1.35rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(238, 220, 130, 0.28);
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(165deg, rgba(238, 220, 130, 0.08), transparent 42%),
    ${({ theme }) => theme.colors.surfaceRaised};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(238, 220, 130, 0.55);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`

const StatusPill = styled.span`
  align-self: start;
  border: 1px solid rgba(238, 220, 130, 0.45);
  color: ${({ theme }) => theme.colors.goldMuted};
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.5rem 0.65rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(238, 220, 130, 0.08);
`

const CardKicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

const CardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.55rem, 3vw, 2rem);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  line-height: 0.95;
  color: ${({ theme }) => theme.colors.white};
`

const CardExcerpt = styled.p`
  display: none;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 0.92rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`

const Progress = styled.div`
  display: none;
  margin-top: auto;
  gap: 0.55rem;
  padding-top: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
  }
`

const ProgressTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

const ProgressValue = styled.span`
  color: ${({ theme }) => theme.colors.gold};
`

const ProgressBar = styled.div`
  height: 2px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ $pct: number }>`
  width: ${({ $pct }) => `${$pct}%`};
  height: 100%;
  background: ${({ theme }) => theme.colors.gold};
`

const CtaRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(1.75rem, 4vw, 2.5rem);
`

const CtaLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1.05rem 1.55rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  box-shadow: 0 0 0 0 rgba(238, 220, 130, 0.35);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.25s ease;

  svg {
    color: ${({ theme }) => theme.colors.black};
    transition: transform 0.2s ease;
  }

  &:hover {
    opacity: 0.95;
    box-shadow: 0 0 28px rgba(238, 220, 130, 0.35);
  }

  &:hover svg {
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`

export function CoChystameTeaserSection() {
  return (
    <Section aria-labelledby="co-chystame-teaser-title">
      <Inner>
        <Header>
          <div>
            <BadgeRow>
              <NewBadge>
                <BadgeDot aria-hidden />
                Nové
              </NewBadge>
              <Eyebrow>Právě spuštěno</Eyebrow>
            </BadgeRow>
            <Title id="co-chystame-teaser-title">Co chystáme</Title>
          </div>
          <Lead>
            Transparentní pohled do vývoje: nové produkty, testování a komunita.
            Nic neschováváme — ukážeme, co je potvrzené a co teprve vzniká.
          </Lead>
        </Header>

        <Grid>
          {teaserProjects.map((project) => (
            <Card
              key={project.id}
              to="/co-chystame"
              aria-label={`Zjistit více o projektu ${project.title}`}
            >
              <StatusPill>{project.status}</StatusPill>
              <CardKicker>{project.kicker}</CardKicker>
              <CardTitle>{project.title}</CardTitle>
              <CardExcerpt>{project.excerpt}</CardExcerpt>
              <Progress>
                <ProgressTop>
                  <span>Stav vývoje</span>
                  <ProgressValue>{project.progress} %</ProgressValue>
                </ProgressTop>
                <ProgressBar>
                  <ProgressFill $pct={project.progress} />
                </ProgressBar>
              </Progress>
            </Card>
          ))}
        </Grid>

        <CtaRow>
          <CtaLink to="/co-chystame">
            Co dalšího chystáme <ArrowIcon />
          </CtaLink>
        </CtaRow>
      </Inner>
    </Section>
  )
}
