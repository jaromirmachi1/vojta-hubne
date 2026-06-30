import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import mockPhotoA from '../../assets/vojtahubneprofilovka.png'
import mockPhotoB from '../../assets/SzzEgtimTNU2uqEm_2g6w.JPG.webp'
import {
  ALT_SECTION_IDS,
  vojtaStoryCopy,
  vojtaStoryTimeline,
} from '../../data/altHomepage'
import { vojtaStoryExpandedCopy } from '../../data/vojtaStoryExpanded'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal } from './motion'
import { AltInner, AltSection, GhostButton, altMobileImage, altMobileImageFrame } from './shared'
import { VojtaStoryExpanded } from './VojtaStoryExpanded'

const mockPhotos = [mockPhotoA, mockPhotoB, mockPhotoB, mockPhotoA]

const Grid = styled.div`
  display: grid;
  gap: clamp(1.75rem, 4vw, 2.5rem);
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
    align-items: center;
    gap: clamp(2rem, 4vw, 4rem);
  }
`

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5vw, 1.35rem);
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
`

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Paragraph = styled.p`
  margin: 0;
  width: 100%;
  max-width: 28rem;
  font-size: 0.95rem;
  line-height: 1.75;
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.colors.textMuted};
`

const StoryCta = styled(GhostButton)`
  align-self: flex-start;
  margin-top: 0.25rem;
  white-space: normal;
  text-align: left;
`

const ExpandedWrap = styled(motion.div)`
  overflow: hidden;
`

const TimelineWrap = styled.div`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Timeline = styled.ol`
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    overflow: visible;
    justify-content: space-between;
    width: 100%;
  }
`

const TimelineItem = styled.li`
  display: flex;
  align-items: center;
  flex: 1 1 0;
  min-width: 0;
  justify-content: center;

  &:last-child {
    flex: 0 0 auto;
  }
`

const StepCard = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  margin: 0;
  width: clamp(7rem, 16vw, 10rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: clamp(8rem, 14vw, 11.5rem);
  }
`

const StepFrame = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  ${altMobileImageFrame}
`

const StepImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  filter: saturate(0.88) contrast(1.02);
  ${altMobileImage}
`

const StepCaption = styled.figcaption`
  margin: 0;
  font-size: clamp(0.72rem, 1.3vw, 0.85rem);
  line-height: 1.35;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`

const StepArrow = styled.span`
  flex-shrink: 0;
  padding-inline: clamp(0.35rem, 1vw, 0.65rem);
  margin-top: clamp(3rem, 9vw, 4rem);
  font-size: 1.05rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.goldMuted};
`

export function VojtaStory() {
  const reducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      }

  const toggleExpanded = () => {
    setExpanded((current) => {
      const next = !current
      if (!next) return next
      window.setTimeout(() => {
        document
          .getElementById('vojta-story-expanded')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
      return next
    })
  }

  return (
    <AltSection id={ALT_SECTION_IDS.story}>
      <AltInner>
        <Grid>
          <ContentColumn>
            <Reveal>
              <Title>{vojtaStoryCopy.title}</Title>
            </Reveal>
            <Reveal delay={0.06}>
              <Paragraph>{vojtaStoryCopy.paragraph}</Paragraph>
            </Reveal>
            <Reveal delay={0.1}>
              <StoryCta
                type="button"
                aria-expanded={expanded}
                aria-controls="vojta-story-expanded"
                onClick={toggleExpanded}
              >
                {expanded
                  ? vojtaStoryExpandedCopy.collapseCta
                  : vojtaStoryCopy.cta}
              </StoryCta>
            </Reveal>
          </ContentColumn>

          <Reveal delay={0.08}>
            <TimelineWrap>
              <Timeline aria-label="Cesta transformace Vojty">
                {vojtaStoryTimeline.map((step, index) => (
                  <TimelineItem key={step.id}>
                    <StepCard>
                      <StepFrame>
                        <StepImage
                          src={mockPhotos[index]}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </StepFrame>
                      <StepCaption>{step.caption}</StepCaption>
                    </StepCard>
                    {index < vojtaStoryTimeline.length - 1 ? (
                      <StepArrow aria-hidden>→</StepArrow>
                    ) : null}
                  </TimelineItem>
                ))}
              </Timeline>
            </TimelineWrap>
          </Reveal>
        </Grid>

        <AnimatePresence initial={false}>
          {expanded ? (
            <ExpandedWrap
              key="vojta-story-expanded"
              id="vojta-story-expanded"
              {...motionProps}
            >
              <VojtaStoryExpanded />
            </ExpandedWrap>
          ) : null}
        </AnimatePresence>
      </AltInner>
    </AltSection>
  )
}
