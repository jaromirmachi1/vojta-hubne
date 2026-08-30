import styled from 'styled-components'
import { ArrowIcon } from '../components/cochystame/ArrowIcon'
import { HashLink } from '../components/HashLink'
import {
  HomeSplitSection,
  SplitCopy,
  SplitPanel,
  goldActionLinkStyles,
} from '../components/home/HomeSplitSection'
import { menShopHereCopy } from '../data/menShopHere'

const ActionLink = styled(HashLink)`
  ${goldActionLinkStyles}
`

export function MenShopHereSection() {
  return (
    <HomeSplitSection
      variant="gold"
      titleLine1={menShopHereCopy.titleLine1}
      titleLine2={menShopHereCopy.titleLine2}
      titleId="men-shop-here-title"
    >
      <SplitPanel>
        <SplitCopy $variant="gold">{menShopHereCopy.lead}</SplitCopy>

        <ActionLink sectionId={menShopHereCopy.reviewsSectionId}>
          {menShopHereCopy.ctaLabel} <ArrowIcon />
        </ActionLink>
      </SplitPanel>
    </HomeSplitSection>
  )
}
