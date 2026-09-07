import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4RestCopy,
  altV4RestIds,
} from '../../../data/altHomeV4'
import { useAltV4Catalog } from '../../../hooks/useAltV4Catalog'
import {
  V4Eyebrow,
  V4Inner,
  V4PillOutline,
  V4Section,
  V4Title,
} from './shared'
import { AltV4ProductDetailCard } from './AltV4ProductDetailCard'

const Grid = styled.div`
  display: grid;
  gap: 0.9rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Catalog = styled(V4PillOutline)`
  margin-top: 1rem;
`

export function AltRestV4Section() {
  const { get } = useAltV4Catalog()
  const items = altV4RestIds.map((id) => get(id)).filter(Boolean)

  return (
    <V4Section
      $tone="paper2"
      id={ALT_V4_SECTION_IDS.rest}
      aria-labelledby="alt-v4-rest-title"
    >
      <V4Inner>
        <V4Eyebrow>{altV4RestCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-rest-title">
          {altV4RestCopy.titleLine1}
          <br />
          {altV4RestCopy.titleLine2}
        </V4Title>
        <Grid>
          {items.map((product) => (
            <AltV4ProductDetailCard key={product.id} product={product} />
          ))}
        </Grid>
        <Catalog href={altV4RestCopy.catalogUrl} rel="noopener noreferrer">
          {altV4RestCopy.catalogCta}
        </Catalog>
      </V4Inner>
    </V4Section>
  )
}
