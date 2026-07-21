import styled from 'styled-components'
import type { CoChystameProject } from '../../data/coChystameProjects'
import { SignupForm } from '../../components/cochystame/SignupForm'
import { PageContainer } from '../../components/PageContainer'
import { CoChystameArticleContent } from './CoChystameArticleContent'

const Section = styled.section`
  scroll-margin-top: calc(
    ${({ theme }) => theme.layout.headerHeight} + ${({ theme }) => theme.layout.promoBarHeight} + 0.5rem
  );
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Hero = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding-block: clamp(2.5rem, 6vw, 5.25rem);
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3rem);
`

const BackButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  padding: 0;
  margin: 0 0 1.8rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(238, 220, 130, 0.45);
  color: ${({ theme }) => theme.colors.goldMuted};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.6rem 0.8rem;
  border-radius: ${({ theme }) => theme.radii.pill};
`

const Eyebrow = styled.p`
  margin: 0.85rem 0 0;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(238, 220, 130, 0.85);
`

const ProjectTitle = styled.h2`
  margin: 1rem 0 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 5.2vw, 4.2rem);
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const Lead = styled.p`
  margin: 1.25rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
  font-size: 1.03rem;
  max-width: 72ch;
`

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 1.25rem;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

const Aside = styled.aside`
  display: grid;
  gap: 1.35rem;
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const ProgressCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.6rem 1.4rem;
`

const MiniLabel = styled.span`
  display: inline-flex;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const ProgressValue = styled.strong`
  display: block;
  margin-top: 0.85rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 3.6rem;
  line-height: 0.95;
  font-weight: 400;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.white};
`

const ProgressBarOuter = styled.div`
  margin-top: 1.05rem;
  background: rgba(0, 0, 0, 0.5);
  height: 2px;
  overflow: hidden;
`

const ProgressBarInner = styled.div<{ $pct: number }>`
  width: ${({ $pct }) => `${$pct}%`};
  height: 100%;
  background: ${({ theme }) => theme.colors.gold};
`

const ProgressPhase = styled.p`
  margin: 0.85rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`

const AsideCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.6rem 1.4rem;
`

const AsideCardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.6rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const AsideCardText = styled.p`
  margin: 0.85rem 0 1.2rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`

const ArticleBody = styled.div`
  width: 100%;
`

export function CoChystameArticleSection({
  project,
  onBackToProjects,
}: {
  project: CoChystameProject
  onBackToProjects: () => void
}) {
  return (
    <Section id="detail">
      <Hero>
        <Inner>
          <div>
            <BackButton type="button" onClick={onBackToProjects}>
              ← Zpět na přehled
            </BackButton>

            <StatusPill>{project.status}</StatusPill>
            <Eyebrow>{project.kicker}</Eyebrow>
            <ProjectTitle>{project.title}</ProjectTitle>
            <Lead>{project.excerpt}</Lead>

            <MetaRow>
              <span>Aktualizováno 20. 7. 2026</span>
              <span>{project.phase}</span>
            </MetaRow>
          </div>

          <ArticleBody>
            <CoChystameArticleContent id={project.id} />
          </ArticleBody>

          <Aside>
            <ProgressCard>
              <MiniLabel>Průběh vývoje</MiniLabel>
              <ProgressValue>{project.progress} %</ProgressValue>
              <ProgressBarOuter>
                <ProgressBarInner $pct={project.progress} />
              </ProgressBarOuter>
              <ProgressPhase>{project.phase}</ProgressPhase>
            </ProgressCard>

            <AsideCard>
              <AsideCardTitle>Nepropásněte další krok</AsideCardTitle>
              <AsideCardText>
                Pošleme jen potvrzené novinky, skutečný stav testování a termín dostupnosti.
              </AsideCardText>
              <SignupForm compact />
            </AsideCard>
          </Aside>
        </Inner>
      </Hero>
    </Section>
  )
}

