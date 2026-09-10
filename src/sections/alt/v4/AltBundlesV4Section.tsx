import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4BundleIds,
  altV4BundlesCopy,
} from '../../../data/altHomeV4'
import { useAltV4Catalog } from '../../../hooks/useAltV4Catalog'
import { useProductReviewStats } from '../../../hooks/useProductReviewStats'
import {
  V4Eyebrow,
  V4Inner,
  V4Lead,
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

const MoreRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.35rem;
`

const MoreCta = styled(V4PillOutline)`
  min-width: 14rem;
`

export function AltBundlesV4Section() {
  const { get } = useAltV4Catalog()
  const reviewStatsByHandle = useProductReviewStats()
  const items = altV4BundleIds.map((id) => get(id)).filter(Boolean)

  return (
    <V4Section id={ALT_V4_SECTION_IDS.bundles} aria-labelledby="alt-v4-bundles-title">
      <V4Inner>
        <V4Eyebrow>{altV4BundlesCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-bundles-title">
          {altV4BundlesCopy.titleLine1}
          <br />
          {altV4BundlesCopy.titleLine2}
        </V4Title>
        <V4Lead>{altV4BundlesCopy.lead}</V4Lead>
        <Grid>
          {items.map((product) => (
            <AltV4ProductDetailCard
              key={product.id}
              product={product}
              ctaPrefix="Koupit balíček"
              reviewStats={
                product.shopifyHandle
                  ? reviewStatsByHandle.get(product.shopifyHandle)
                  : undefined
              }
            />
          ))}
        </Grid>
        <MoreRow>
          <MoreCta
            href={altV4BundlesCopy.moreHref}
            rel="noopener noreferrer"
          >
            {altV4BundlesCopy.moreCta}
          </MoreCta>
        </MoreRow>
      </V4Inner>
    </V4Section>
  )
}
