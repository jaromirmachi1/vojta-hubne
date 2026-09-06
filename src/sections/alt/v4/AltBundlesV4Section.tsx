import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4Bundles,
  altV4BundlesCopy,
} from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import {
  V4Eyebrow,
  V4Inner,
  V4Lead,
  V4Section,
  V4Title,
} from './shared'

const Grid = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Card = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.9rem;
  border-radius: 1.125rem;
  background: ${altV4.paper2};
  border: 1px solid ${altV4.line};
  text-decoration: none;
  color: ${altV4.ink};
  text-align: left;
`

const Top = styled.span`
  display: flex;
  gap: 0.9rem;
  align-items: center;
  width: 100%;
`

const Thumb = styled.img`
  width: 4.85rem;
  height: 4.85rem;
  object-fit: contain;
  border-radius: 0.85rem;
  background: ${altV4.paper};
`

const Body = styled.span`
  flex: 1;
  min-width: 0;
`

const Name = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.45rem;
  line-height: 1.05;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const Short = styled.span`
  font-size: 0.88rem;
  line-height: 1.55;
  color: ${altV4.ink2};
`

const Arrow = styled.span`
  color: ${altV4.goldInk};
  font-size: 1.35rem;
`

export function AltBundlesV4Section() {
  return (
    <V4Section id={ALT_V4_SECTION_IDS.bundles} aria-labelledby="alt-v4-bundles-title">
      <V4Inner>
        <V4Eyebrow>{altV4BundlesCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-bundles-title">
          Méně rozhodování,
          <br />
          více výsledků
        </V4Title>
        <V4Lead>{altV4BundlesCopy.lead}</V4Lead>
        <Grid>
          {altV4Bundles.map((b) => (
            <Card key={b.id} href={b.href} rel="noopener noreferrer">
              <Top>
                <Thumb src={b.image} alt="" width={78} height={78} />
                <Body>
                  <Name>{b.name}</Name>
                </Body>
                <Arrow aria-hidden>→</Arrow>
              </Top>
              <Short>{b.short}</Short>
            </Card>
          ))}
        </Grid>
      </V4Inner>
    </V4Section>
  )
}
