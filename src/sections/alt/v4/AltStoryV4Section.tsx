import styled from 'styled-components'
import { ALT_V4_SECTION_IDS, altV4Story } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import {
  V4Eyebrow,
  V4Inner,
  V4Lead,
  V4Section,
  V4Title,
} from './shared'

const Split = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(2rem, 4vw, 3.5rem);
    align-items: start;
  }
`

const Copy = styled.div``

const Quote = styled.blockquote`
  margin: 0;
  padding: 1.25rem 1.1rem;
  border-radius: 1.125rem;
  background: ${altV4.black};
  color: #fff;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 1.75rem 1.5rem;
  }
`

const QuoteText = styled.p`
  margin: 0 0 0.65rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.25rem, 3.5vw, 1.45rem);
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
    <V4Section id={ALT_V4_SECTION_IDS.story} aria-labelledby="alt-v4-story-title">
      <V4Inner>
        <Split>
          <Copy>
            <V4Eyebrow>{altV4Story.eyebrow}</V4Eyebrow>
            <V4Title id="alt-v4-story-title">
              Za každým produktem
              <br />
              stojím jménem
            </V4Title>
            {altV4Story.paragraphs.map((p) => (
              <V4Lead key={p.slice(0, 24)}>{p}</V4Lead>
            ))}
          </Copy>
          <Quote>
            <QuoteText>{altV4Story.quote}</QuoteText>
            <QuoteBy>{altV4Story.quoteBy}</QuoteBy>
          </Quote>
        </Split>
      </V4Inner>
    </V4Section>
  )
}
