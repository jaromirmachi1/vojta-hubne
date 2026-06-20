import styled from 'styled-components'
import {
  altWhenToWriteCards,
  altWhenToWriteCopy,
} from '../../data/altContact'
import { Reveal } from './motion'

const Block = styled.div`
  padding-top: clamp(3.5rem, 8vw, 5.5rem);
`

const Title = styled.h2`
  margin: 0 0 clamp(1.5rem, 4vw, 2.25rem);
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.85rem, 4.5vw, 2.75rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`

const Grid = styled.div`
  display: grid;
  gap: 0.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
  }
`

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 100%;
  padding: clamp(1.25rem, 2.5vw, 1.5rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.colors.gold};

  svg {
    width: 2rem;
    height: 2rem;
  }
`

const CardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(0.92rem, 1.5vw, 1rem);
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.gold};
`

const CardText = styled.p`
  margin: 0;
  flex: 1;
  font-size: 0.84rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

function WhenToWriteIcon({ id }: { id: string }) {
  switch (id) {
    case 'choose':
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="18" cy="16" r="6" />
          <path d="M8 38c0-6 4.5-10 10-10s10 4 10 10" strokeLinecap="round" />
          <circle cx="34" cy="14" r="4" />
          <path d="M34 20v2M34 26h.01" strokeLinecap="round" />
        </svg>
      )
    case 'post-taper':
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path
            d="M30 12a10 10 0 1 0-12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 30l-4 6 6-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M30 8v4M38 16h-4M30 24v4M22 16h-4" strokeLinecap="round" />
        </svg>
      )
    case 'hunger':
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="24" cy="24" r="14" />
          <path d="M18 20v12M22 20v12M26 20v8M30 20v12" strokeLinecap="round" />
        </svg>
      )
    case 'routine':
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="12" y="10" width="24" height="30" rx="3" />
          <path d="M18 18h12M18 24h12M18 30h8" strokeLinecap="round" />
          <path d="M30 30l2 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

export function WhenToWriteSection() {
  return (
    <Block>
      <Reveal>
        <Title>{altWhenToWriteCopy.title}</Title>
      </Reveal>
      <Grid>
        {altWhenToWriteCards.map((card, index) => (
          <Reveal key={card.id} delay={index * 0.06}>
            <Card>
              <IconWrap>
                <WhenToWriteIcon id={card.id} />
              </IconWrap>
              <CardTitle>{card.title}</CardTitle>
              <CardText>{card.description}</CardText>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </Block>
  )
}
