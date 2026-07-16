import styled, { keyframes } from 'styled-components'
import {
  getShortTickerReviews,
  type TickerReview,
} from '../data/reviewTicker'

const Strip = styled.aside`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background:
    linear-gradient(
      90deg,
      rgba(238, 220, 130, 0.07) 0%,
      transparent 18%,
      transparent 82%,
      rgba(238, 220, 130, 0.07) 100%
    ),
    ${({ theme }) => theme.colors.surface};
`

const FadeEdge = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  width: clamp(1.5rem, 6vw, 4rem);
  pointer-events: none;

  &[data-side='left'] {
    left: 0;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.surface},
      transparent
    );
  }

  &[data-side='right'] {
    right: 0;
    background: linear-gradient(
      270deg,
      ${({ theme }) => theme.colors.surface},
      transparent
    );
  }
`

const marquee = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-50%, 0, 0);
  }
`

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 95s linear infinite;
  will-change: transform;

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Set = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  min-width: max-content;
  padding-block: 0.55rem;
`

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding-inline: 1.15rem;
  white-space: nowrap;
`

const Stars = styled.span`
  flex-shrink: 0;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gold};
`

const Quote = styled.span`
  font-size: 0.72rem;
  font-style: italic;
  line-height: 1.35;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.text};
`

const Name = styled.span`
  flex-shrink: 0;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Dot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gold};
  opacity: 0.45;
`

function TickerItem({ review }: { review: TickerReview }) {
  return (
    <Item>
      <Stars aria-hidden>{'★'.repeat(review.rating)}</Stars>
      <Quote>„{review.body}“</Quote>
      <Name>— {review.reviewerName}</Name>
      <Dot aria-hidden />
    </Item>
  )
}

export function ReviewTickerBar() {
  const reviews = getShortTickerReviews()

  if (reviews.length === 0) return null

  return (
    <Strip aria-label="Krátké recenze zákazníků">
      <FadeEdge data-side="left" />
      <FadeEdge data-side="right" />
      <Track>
        <Set>
          {reviews.map((review) => (
            <TickerItem key={review.id} review={review} />
          ))}
        </Set>
        <Set aria-hidden="true">
          {reviews.map((review) => (
            <TickerItem key={`dup-${review.id}`} review={review} />
          ))}
        </Set>
      </Track>
    </Strip>
  )
}
