import styled from 'styled-components'
import { ALT_V4_SECTION_IDS, altV4Story } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import {
  V4Eyebrow,
  V4Inner,
  V4Lead,
  V4PillOutline,
  V4Section,
  V4Title,
} from './shared'

const Quote = styled.blockquote`
  margin: 0 0 1.15rem;
  padding: 1.25rem 1.1rem;
  border-radius: 1.125rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(238, 220, 130, 0.3);
`

const QuoteText = styled.p`
  margin: 0 0 0.65rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.35rem, 4vw, 1.5rem);
  line-height: 1.15;
`

const QuoteBy = styled.footer`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${altV4.gold};
`

export function AltStoryV4Section() {
  return (
    <V4Section
      $tone="black"
      id={ALT_V4_SECTION_IDS.story}
      aria-labelledby="alt-v4-story-title"
    >
      <V4Inner>
        <V4Eyebrow $onDark>{altV4Story.eyebrow}</V4Eyebrow>
        <V4Title $onDark $size="lg" id="alt-v4-story-title">
          {altV4Story.titleLine1}
          <br />
          {altV4Story.titleLine2}
        </V4Title>
        {altV4Story.paragraphs.map((p) => (
          <V4Lead $onDark key={p.slice(0, 24)}>
            {p}
          </V4Lead>
        ))}
        <Quote>
          <QuoteText>{altV4Story.quote}</QuoteText>
          <QuoteBy>{altV4Story.quoteBy}</QuoteBy>
        </Quote>
        <V4PillOutline
          $onDark
          href={altV4Story.ctaHref}
          rel="noopener noreferrer"
          target="_blank"
        >
          {altV4Story.cta}
        </V4PillOutline>
      </V4Inner>
    </V4Section>
  )
}
