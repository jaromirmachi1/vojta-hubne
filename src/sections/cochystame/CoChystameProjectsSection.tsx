import styled from 'styled-components'
import type {
  CoChystameCategory,
  CoChystameProject,
} from '../../data/coChystameProjects'
import { PageContainer } from '../../components/PageContainer'
import { ArrowIcon } from '../../components/cochystame/ArrowIcon'

const Wrapper = styled.section`
  padding: clamp(3rem, 7vw, 5.5rem) 0 clamp(4rem, 9vw, 7.25rem);
  scroll-margin-top: calc(
    ${({ theme }) => theme.layout.headerHeight} + ${({ theme }) => theme.layout.promoBarHeight} + 0.5rem
  );
`

const IntroRow = styled.div`
  display: grid;
  gap: 1.75rem;
  margin-bottom: clamp(2rem, 4vw, 3.25rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.75fr);
    align-items: end;
    gap: 3rem;
  }
`

const SectionNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Lead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  max-width: 60ch;
`

const ProjectsTitle = styled.h2`
  margin: 0.8rem 0 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 5vw, 4.25rem);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 0.95;
`

const Filters = styled.div`
  display: flex;
  gap: clamp(1rem, 2vw, 2rem);
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`

const FilterButton = styled.button<{ $active?: boolean }>`
  flex: none;
  background: none;
  border: 0;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.25rem 0;
  white-space: nowrap;

  ${({ $active, theme }) =>
    $active
      ? `
    color: ${theme.colors.goldMuted};
  `
      : ''}
`

const ProjectGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
`

const Card = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  font: inherit;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease,
    background 0.25s ease;
  min-height: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 28rem;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(238, 220, 130, 0.42);
    background: rgba(17, 17, 17, 0.92);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.05rem;
  padding: clamp(1.35rem, 4vw, 3.25rem);
  min-height: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 28rem;
  }
`

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const StatusPill = styled.span`
  border: 1px solid rgba(238, 220, 130, 0.45);
  color: ${({ theme }) => theme.colors.goldMuted};
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.55rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.pill};
`

const CardIndex = styled.small`
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.75rem;
  font-weight: 700;
`

const CardKicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

const CardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.8rem, 4vw, 2.85rem);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 0.95;
`

const CardExcerpt = styled.p`
  display: none;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.95rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`

const ProgressRow = styled.div`
  display: none;
  margin-top: auto;
  flex-direction: column;
  gap: 0.8rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`

const ProgressTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`

const ProgressTopStrong = styled.b`
  color: ${({ theme }) => theme.colors.gold};
  font-weight: 400;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
`

const ProgressBarOuter = styled.div`
  height: 2px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
  border-radius: 999px;
`

const ProgressBarInner = styled.div<{ $pct: number }>`
  width: ${({ $pct }) => `${$pct}%`};
  height: 100%;
  background: ${({ theme }) => theme.colors.gold};
`

const DetailsCta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1.1rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};

  svg {
    color: ${({ theme }) => theme.colors.goldMuted};
    transition: transform 0.2s ease;
  }

  ${Card}:hover & svg {
    transform: translateX(4px);
  }
`

export function CoChystameProjectsSection({
  activeCategory,
  setActiveCategory,
  visibleProjects,
  onOpenProject,
  categories,
}: {
  categories: CoChystameCategory[]
  activeCategory: CoChystameCategory
  setActiveCategory: (value: CoChystameCategory) => void
  visibleProjects: CoChystameProject[]
  onOpenProject: (id: CoChystameProject['id']) => void
}) {
  return (
    <Wrapper id="projekty">
      <PageContainer>
        <IntroRow>
          <div>
            <SectionNumber>01 / PROJEKTY</SectionNumber>
            <ProjectsTitle>
              Novinky, vývoj
              <br />
              a testování
            </ProjectsTitle>
          </div>

          <Lead>
            Neustále pracujeme na nových produktech, které mají přirozeně
            doplnit cestu za zdravějším a lehčím životem. Některé jsou teprve
            nápadem, jiné už aktivně testujeme a dokončujeme. Tady můžete
            sledovat, co právě vzniká a jak daleko jsme se ve vývoji dostali.
          </Lead>
        </IntroRow>

        <Filters aria-label="Filtrovat projekty" role="group">
          {categories.map((category) => (
            <FilterButton
              key={category}
              $active={activeCategory === category}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </Filters>

        <ProjectGrid>
          {visibleProjects.map((project, index) => (
            <Card
              key={project.id}
              type="button"
              aria-label={`Zjistit více o projektu ${project.title}`}
              onClick={() => onOpenProject(project.id)}
            >
              <CardContent>
                <CardTop>
                  <StatusPill>{project.status}</StatusPill>
                  <CardIndex>{String(index + 1).padStart(2, '0')}</CardIndex>
                </CardTop>

                <CardKicker>{project.kicker}</CardKicker>
                <CardTitle>{project.title}</CardTitle>
                <CardExcerpt>{project.excerpt}</CardExcerpt>

                <ProgressRow>
                  <ProgressTop>
                    <span>Stav vývoje</span>
                    <ProgressTopStrong>{project.progress} %</ProgressTopStrong>
                  </ProgressTop>
                  <ProgressBarOuter>
                    <ProgressBarInner $pct={project.progress} />
                  </ProgressBarOuter>
                </ProgressRow>

                <DetailsCta>
                  Zjistit více <ArrowIcon />
                </DetailsCta>
              </CardContent>
            </Card>
          ))}
        </ProjectGrid>
      </PageContainer>
    </Wrapper>
  )
}

