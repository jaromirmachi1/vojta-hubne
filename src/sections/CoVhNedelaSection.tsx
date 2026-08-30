import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowIcon } from '../components/cochystame/ArrowIcon'
import {
  HomeSplitSection,
  SplitList,
  SplitListItem,
  darkActionLinkStyles,
} from '../components/home/HomeSplitSection'
import {
  vhPrinciplesCopy,
  vhPrinciplesStatements,
} from '../data/vhPrinciples'

const ActionLink = styled(Link)`
  ${darkActionLinkStyles}
`

export function CoVhNedelaSection() {
  return (
    <HomeSplitSection
      variant="dark"
      titleLine1={vhPrinciplesCopy.titleLine1}
      titleLine2={vhPrinciplesCopy.titleLine2}
      titleId="co-vh-nedela-title"
    >
      <SplitList>
        {vhPrinciplesStatements.map((statement) => (
          <SplitListItem key={statement}>{statement}</SplitListItem>
        ))}
      </SplitList>

      <ActionLink to={vhPrinciplesCopy.ctaPath}>
        {vhPrinciplesCopy.ctaLabel} <ArrowIcon />
      </ActionLink>
    </HomeSplitSection>
  )
}
