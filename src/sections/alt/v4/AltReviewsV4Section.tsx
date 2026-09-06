import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4Reviews,
  altV4ReviewsCopy,
} from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import {
  V4Eyebrow,
  V4Inner,
  V4Section,
  V4Title,
} from './shared'

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
  }
`

const Source = styled.div`
  margin: 0 0 1.1rem;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${altV4.ink2};
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 1rem;
  border-radius: 1.125rem;
  background: ${altV4.paper2};
  border: 1px solid ${altV4.line};
`

const Stars = styled.div`
  color: ${altV4.goldInk};
  font-size: 0.9rem;
  letter-spacing: 0.15em;
`

const Text = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${altV4.ink};
`

const Who = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${altV4.ink2};
`

export function AltReviewsV4Section() {
  return (
    <V4Section id={ALT_V4_SECTION_IDS.reviews} aria-labelledby="alt-v4-reviews-title">
      <V4Inner>
        <V4Eyebrow>{altV4ReviewsCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-reviews-title">{altV4ReviewsCopy.rating}</V4Title>
        <Source>{altV4ReviewsCopy.source}</Source>
        <Grid>
          {altV4Reviews.map((r) => (
            <Card key={r.id}>
              <Stars aria-hidden>★★★★★</Stars>
              <Text>{r.text}</Text>
              <Who>
                {r.who} · {r.what}
              </Who>
            </Card>
          ))}
        </Grid>
      </V4Inner>
    </V4Section>
  )
}
