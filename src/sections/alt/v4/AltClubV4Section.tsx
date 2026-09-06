import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ALT_V4_SECTION_IDS, altV4Club } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import {
  V4Eyebrow,
  V4Inner,
  V4Lead,
  V4PillGold,
  V4Section,
  V4Title,
} from './shared'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.85rem;
    margin-bottom: 1.35rem;
  }
`

const Tile = styled.div`
  padding: 0.9rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.07);
`

const Big = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.6rem;
  line-height: 1;
  color: ${altV4.gold};
`

const Text = styled.div`
  margin-top: 0.35rem;
  font-size: 0.8rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.88);
`

const Cta = styled(V4PillGold)`
  /* Link styled as pill; uses react-router for /klub */
`

export function AltClubV4Section() {
  return (
    <V4Section
      $tone="black"
      id={ALT_V4_SECTION_IDS.club}
      aria-labelledby="alt-v4-club-title"
    >
      <V4Inner>
        <V4Eyebrow $onDark>{altV4Club.eyebrow}</V4Eyebrow>
        <V4Title $onDark $size="lg" id="alt-v4-club-title">
          VH Club:
          <br />
          10 Kč = 1 bod
        </V4Title>
        <V4Lead $onDark>{altV4Club.lead}</V4Lead>
        <Grid>
          {altV4Club.tiles.map((tile) => (
            <Tile key={tile.big}>
              <Big>{tile.big}</Big>
              <Text>{tile.text}</Text>
            </Tile>
          ))}
        </Grid>
        <Cta as={Link} to={altV4Club.href}>
          {altV4Club.cta}
        </Cta>
      </V4Inner>
    </V4Section>
  )
}
