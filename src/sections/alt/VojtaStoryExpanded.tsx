import styled from 'styled-components'
import mockPhotoA from '../../assets/vojtahubneprofilovka.png'
import mockPhotoB from '../../assets/SzzEgtimTNU2uqEm_2g6w.JPG.webp'
import {
  vojtaStoryApproach,
  vojtaStoryExpandedCopy,
  vojtaStoryHelped,
  vojtaStoryJourney,
  vojtaStoryTeaches,
  vojtaStoryTestimonials,
} from '../../data/vojtaStoryExpanded'
import { altMobileImage, altMobileImageFrame } from './shared'

const mockPhotos = [mockPhotoA, mockPhotoB, mockPhotoA, mockPhotoB, mockPhotoA]

const Expanded = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 6vw, 4rem);
  padding-top: clamp(2.5rem, 6vw, 3.5rem);
  margin-top: clamp(2rem, 5vw, 3rem);
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const BlockTitle = styled.h3`
  margin: 0 0 clamp(1.25rem, 3vw, 1.75rem);
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const JourneyList = styled.ol`
  display: flex;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    overflow: visible;
    justify-content: space-between;
  }
`

const JourneyItem = styled.li`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 1 1 0;
    justify-content: center;

    &:last-child {
      flex: 0 0 auto;
    }
  }
`

const JourneyCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: clamp(7.5rem, 15vw, 9.5rem);
`

const JourneyFrame = styled.div`
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  ${altMobileImageFrame}
`

const JourneyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  ${altMobileImage}
`

const JourneyPhase = styled.p`
  margin: 0;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const JourneyWeight = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.15rem, 2.2vw, 1.45rem);
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.white};
`

const JourneyText = styled.p`
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

const JourneyArrow = styled.span`
  flex-shrink: 0;
  padding-inline: clamp(0.25rem, 0.8vw, 0.5rem);
  margin-top: 2.5rem;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const IconGrid = styled.div<{ $columns: number }>`
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.5rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(${({ $columns }) => Math.min($columns, 3)}, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  }
`

const IconCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: clamp(1.15rem, 2.5vw, 1.35rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const IconWrap = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.gold};

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`

const IconTitle = styled.h4`
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const IconText = styled.p`
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

const TwoCol = styled.div`
  display: grid;
  gap: clamp(1.5rem, 4vw, 2rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    align-items: stretch;
  }
`

const Panel = styled.div`
  padding: clamp(1.35rem, 3vw, 1.75rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const TeachList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`

const TeachItem = styled.li`
  display: flex;
  gap: 0.65rem;
  font-size: 0.88rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};

  &::before {
    content: '✓';
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gold};
    font-weight: 700;
  }
`

const WhyText = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
`

const BottomGrid = styled.div`
  display: grid;
  gap: clamp(1.5rem, 4vw, 2rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    align-items: start;
  }
`

const ProofRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 3vw, 1.5rem);
`

const ProofCard = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin: 0;
  width: clamp(7rem, 18vw, 9rem);
`

const ProofFrame = styled.div`
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  ${altMobileImageFrame}
`

const ProofImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${altMobileImage}
`

const ProofLabel = styled.figcaption`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  letter-spacing: 0.04em;
  text-align: center;
  color: ${({ theme }) => theme.colors.gold};
`

const ProofArrow = styled.span`
  color: ${({ theme }) => theme.colors.goldMuted};
  font-size: 1.25rem;
`

const TestimonialGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const TestimonialCard = styled.blockquote`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 100%;
  padding: clamp(1.15rem, 2.5vw, 1.35rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const TestimonialQuote = styled.p`
  margin: 0;
  flex: 1;
  font-size: 0.82rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

const TestimonialStars = styled.p`
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gold};
`

const TestimonialAuthor = styled.footer`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`

function StoryIcon({ iconId }: { iconId: string }) {
  switch (iconId) {
    case 'food':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M8 12h8M5 8v8M19 8v8" strokeLinecap="round" />
        </svg>
      )
    case 'movement':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="14" cy="5" r="2" />
          <path d="M11 8l-2 5 3 2-1 9M13 8l4 3-2 6 3 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'mindset':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M9 10h.01M15 10h.01M9.5 15a3 3 0 0 0 5 0" strokeLinecap="round" />
        </svg>
      )
    case 'sleep':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M21 14A8 8 0 1 1 12 4a6 6 0 0 0 9 10Z" strokeLinejoin="round" />
        </svg>
      )
    case 'routine':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      )
    case 'target':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" strokeLinecap="round" />
        </svg>
      )
    case 'no-extremes':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M6 6l12 12" strokeLinecap="round" />
        </svg>
      )
    case 'consistency':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M8 11V8a4 4 0 0 1 8 0v3M7 11h10v9H7z" strokeLinejoin="round" />
        </svg>
      )
    case 'results':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M5 18 9 10l4 5 3-3 3 6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 19h16" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export function VojtaStoryExpanded() {
  return (
    <Expanded>
      <section aria-labelledby="vojta-journey-title">
        <BlockTitle id="vojta-journey-title">
          {vojtaStoryExpandedCopy.journeyTitle}
        </BlockTitle>
        <JourneyList>
          {vojtaStoryJourney.map((step, index) => (
            <JourneyItem key={step.id}>
              <JourneyCard>
                <JourneyFrame>
                  <JourneyImage src={mockPhotos[index]} alt="" loading="lazy" />
                </JourneyFrame>
                <JourneyPhase>{step.phase}</JourneyPhase>
                <JourneyWeight>{step.weight}</JourneyWeight>
                <JourneyText>{step.description}</JourneyText>
              </JourneyCard>
              {index < vojtaStoryJourney.length - 1 ? (
                <JourneyArrow aria-hidden>→</JourneyArrow>
              ) : null}
            </JourneyItem>
          ))}
        </JourneyList>
      </section>

      <section aria-labelledby="vojta-helped-title">
        <BlockTitle id="vojta-helped-title">
          {vojtaStoryExpandedCopy.helpedTitle}
        </BlockTitle>
        <IconGrid $columns={5}>
          {vojtaStoryHelped.map((item) => (
            <IconCard key={item.id}>
              <IconWrap>
                <StoryIcon iconId={item.id} />
              </IconWrap>
              <IconTitle>{item.title}</IconTitle>
              <IconText>{item.description}</IconText>
            </IconCard>
          ))}
        </IconGrid>
      </section>

      <TwoCol>
        <Panel>
          <BlockTitle>{vojtaStoryExpandedCopy.teachesTitle}</BlockTitle>
          <TeachList>
            {vojtaStoryTeaches.map((item) => (
              <TeachItem key={item}>{item}</TeachItem>
            ))}
          </TeachList>
        </Panel>
        <Panel>
          <BlockTitle>{vojtaStoryExpandedCopy.whyTitle}</BlockTitle>
          <WhyText>{vojtaStoryExpandedCopy.whyText}</WhyText>
        </Panel>
      </TwoCol>

      <section aria-labelledby="vojta-approach-title">
        <BlockTitle id="vojta-approach-title">
          {vojtaStoryExpandedCopy.approachTitle}
        </BlockTitle>
        <IconGrid $columns={4}>
          {vojtaStoryApproach.map((item) => (
            <IconCard key={item.id}>
              <IconWrap>
                <StoryIcon iconId={item.id} />
              </IconWrap>
              <IconTitle>{item.title}</IconTitle>
              <IconText>{item.description}</IconText>
            </IconCard>
          ))}
        </IconGrid>
      </section>

      <BottomGrid>
        <section aria-labelledby="vojta-proof-title">
          <BlockTitle id="vojta-proof-title">
            {vojtaStoryExpandedCopy.proofTitle}
          </BlockTitle>
          <ProofRow>
            <ProofCard>
              <ProofFrame>
                <ProofImage src={mockPhotoA} alt="" loading="lazy" />
              </ProofFrame>
              <ProofLabel>{vojtaStoryExpandedCopy.proofBefore}</ProofLabel>
            </ProofCard>
            <ProofArrow aria-hidden>→</ProofArrow>
            <ProofCard>
              <ProofFrame>
                <ProofImage src={mockPhotoB} alt="" loading="lazy" />
              </ProofFrame>
              <ProofLabel>{vojtaStoryExpandedCopy.proofAfter}</ProofLabel>
            </ProofCard>
          </ProofRow>
        </section>

        <section aria-labelledby="vojta-testimonials-title">
          <BlockTitle id="vojta-testimonials-title">
            {vojtaStoryExpandedCopy.testimonialsTitle}
          </BlockTitle>
          <TestimonialGrid>
            {vojtaStoryTestimonials.map((item) => (
              <TestimonialCard key={item.id}>
                <TestimonialQuote>„{item.quote}"</TestimonialQuote>
                <TestimonialStars>{'★'.repeat(item.rating)}</TestimonialStars>
                <TestimonialAuthor>
                  {item.name}, {item.detail}
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </section>
      </BottomGrid>
    </Expanded>
  )
}
