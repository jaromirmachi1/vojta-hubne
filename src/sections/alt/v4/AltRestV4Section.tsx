import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4RestCopy,
  altV4RestIds,
} from '../../../data/altHomeV4'
import { useAltV4Catalog } from '../../../hooks/useAltV4Catalog'
import { useProductReviewStats } from '../../../hooks/useProductReviewStats'
import {
  V4Eyebrow,
  V4Inner,
  V4PillOutline,
  V4Section,
  V4Title,
} from './shared'
import { AltV4CollectionProductCard } from './AltV4CollectionProductCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem 0.75rem;
  margin-top: 0.35rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const Catalog = styled(V4PillOutline)`
  margin-top: 1.35rem;
`

export function AltRestV4Section() {
  const { get } = useAltV4Catalog()
  const reviewStatsByHandle = useProductReviewStats()
  const items = altV4RestIds.map((id) => get(id)).filter(Boolean)

  return (
    <V4Section
      $tone="black"
      id={ALT_V4_SECTION_IDS.rest}
      aria-labelledby="alt-v4-rest-title"
    >
      <V4Inner>
        <V4Eyebrow $onDark>{altV4RestCopy.eyebrow}</V4Eyebrow>
        <V4Title $onDark id="alt-v4-rest-title">
          {altV4RestCopy.titleLine1}
          <br />
          {altV4RestCopy.titleLine2}
        </V4Title>
        <Grid>
          {items.map((product) => (
            <AltV4CollectionProductCard
              key={product.id}
              product={product}
              reviewStats={
                product.shopifyHandle
                  ? reviewStatsByHandle.get(product.shopifyHandle)
                  : undefined
              }
            />
          ))}
        </Grid>
        <Catalog
          $onDark
          href={altV4RestCopy.catalogUrl}
          rel="noopener noreferrer"
        >
          {altV4RestCopy.catalogCta}
        </Catalog>
      </V4Inner>
    </V4Section>
  )
}
