import styled from 'styled-components'
import heroPortrait from '../../assets/SzzEgtimTNU2uqEm_2g6w.JPG.webp'
import { useRegimeQuiz } from '../../contexts/RegimeQuizContext'
import { regimeProblems } from '../../data/altHomepage'
import { Reveal } from './motion'
import { ScrollLink } from './shared'

const REGIME_QUIZ_PRODUCTS_ID = 'regime-quiz-products'

const Block = styled.div`
  padding-top: clamp(3.5rem, 8vw, 5.5rem);
`

const Grid = styled.div`
  display: grid;
  gap: clamp(2rem, 5vw, 3rem);
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.55fr);
    gap: clamp(1.25rem, 2.5vw, 2rem);
  }
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.25rem);
`

const Title = styled.h2`
  margin: 0;
  max-width: 20ch;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.035em;
  text-transform: uppercase;
`

const TitleWhite = styled.span`
  color: ${({ theme }) => theme.colors.white};
`

const TitleGold = styled.span`
  color: ${({ theme }) => theme.colors.gold};
`

const Lead = styled.p`
  margin: 0;
  max-width: 36rem;
  font-size: clamp(0.95rem, 1.8vw, 1.05rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Columns = styled.div`
  display: grid;
  gap: 0.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: 1rem;
  }

  & > * {
    display: flex;
    min-height: 100%;
  }
`

const Column = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 100%;
  width: 100%;
  padding: clamp(1.35rem, 2.5vw, 1.65rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: 0 0 0 1px rgba(238, 220, 130, 0.12);
  }
`

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 2.75rem;
  height: 2.75rem;
  color: ${({ theme }) => theme.colors.gold};

  svg {
    width: 2.25rem;
    height: 2.25rem;
  }
`

const ColumnTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(0.95rem, 1.6vw, 1.05rem);
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.gold};
`

const ColumnText = styled.p`
  margin: 0;
  flex: 1;
  font-size: 0.88rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ColumnLink = styled(ScrollLink)`
  align-self: flex-start;
  margin-top: 0.25rem;
  text-align: left;
`

const Visual = styled.figure`
  position: relative;
  margin: 0;
  justify-self: center;
  width: min(100%, 20rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
    max-width: 20rem;
    justify-self: end;
  }
`

const VisualGlow = styled.div`
  position: absolute;
  inset: 8% 0 0;
  background: radial-gradient(
    ellipse 70% 55% at 50% 45%,
    rgba(238, 220, 130, 0.22) 0%,
    rgba(238, 220, 130, 0.06) 42%,
    transparent 72%
  );
  pointer-events: none;
`

const VisualImage = styled.img`
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: bottom center;
`

function ProblemIcon({ problemId }: { problemId: string }) {
  switch (problemId) {
    case 'hunger-returns':
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path
            d="M14 14c2-3 5-4 10-4s8 1 10 4"
            strokeLinecap="round"
          />
          <path
            d="M12 18c1.5-2 4.5-3 12-3s10.5 1 12 3"
            strokeLinecap="round"
          />
          <path
            d="M18 28c0 6 3 10 6 10s6-4 6-10V22H18v6Z"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'metabolism-stalls':
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="24" cy="24" r="14" />
          <circle cx="24" cy="22" r="5" />
          <path d="M18 30c1.5 2 3.5 3 6 3s4.5-1 6-3" strokeLinecap="round" />
          <path
            d="M34 18c2 2 3 4.5 3 7"
            strokeLinecap="round"
          />
          <path
            d="M11 25c0-2.5 1-5 3-7"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'no-routine':
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="10" y="12" width="28" height="26" rx="3" />
          <path d="M10 20h28" />
          <path d="M18 8v6M30 8v6" strokeLinecap="round" />
          <circle cx="24" cy="30" r="4" />
          <path d="M24 28v2l1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

export function ProblemsSection() {
  const { selectPath } = useRegimeQuiz()

  const openPath = (pathId: string) => {
    selectPath(pathId)
    window.setTimeout(() => {
      document
        .getElementById(REGIME_QUIZ_PRODUCTS_ID)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 120)
  }

  return (
    <Block>
      <Grid>
        <Copy>
          <Reveal>
            <Title>
              <TitleWhite>3 problémy, které rozhodují</TitleWhite>{' '}
              <TitleGold>o výsledku</TitleGold>
            </Title>
          </Reveal>
          <Reveal delay={0.06}>
            <Lead>
              Hubnutí není jen v tom, kolik toho sníte. Je to o systému.
            </Lead>
          </Reveal>
          <Columns>
            {regimeProblems.map((problem, index) => (
              <Reveal key={problem.id} delay={0.1 + index * 0.06}>
                <Column>
                  <IconWrap>
                    <ProblemIcon problemId={problem.id} />
                  </IconWrap>
                  <ColumnTitle>
                    {index + 1}. {problem.title}
                  </ColumnTitle>
                  <ColumnText>{problem.description}</ColumnText>
                  <ColumnLink
                    type="button"
                    onClick={() => openPath(problem.pathId)}
                  >
                    {problem.linkLabel}
                  </ColumnLink>
                </Column>
              </Reveal>
            ))}
          </Columns>
        </Copy>

        <Reveal delay={0.12}>
          <Visual aria-hidden>
            <VisualGlow />
            <VisualImage
              src={heroPortrait}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </Visual>
        </Reveal>
      </Grid>
    </Block>
  )
}

export { REGIME_QUIZ_PRODUCTS_ID }
