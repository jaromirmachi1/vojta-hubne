import styled from 'styled-components'
import {
  ALT_SECTION_IDS,
  comparisonFeatures,
  comparisonTiers,
  type ComparisonTierId,
} from '../../data/altHomepage'
import { getShopifyProductUrl } from '../../utils/shopify'
import { Reveal } from './motion'
import { AltInner, AltSection, GhostButton, SectionTitle } from './shared'

const TableWrap = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-inline: calc(-1 * ${({ theme }) => theme.layout.contentPadding});
  padding-inline: ${({ theme }) => theme.layout.contentPadding};
  padding-bottom: 0.25rem;
  overscroll-behavior-x: contain;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-inline: 0;
    padding-inline: 0;
    overflow: visible;
  }
`

const Table = styled.table`
  width: 100%;
  min-width: 38rem;
  border-collapse: separate;
  border-spacing: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 44rem;
  }
`

const Th = styled.th<{ $highlighted?: boolean }>`
  padding: 1rem 0.85rem;
  vertical-align: bottom;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme, $highlighted }) =>
    $highlighted ? theme.colors.gold : theme.colors.text};
  background: ${({ $highlighted }) =>
    $highlighted ? 'rgba(238, 220, 130, 0.08)' : 'transparent'};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-bottom: 0;

  &:first-child {
    text-align: left;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    color: ${({ theme }) => theme.colors.goldMuted};
  }
`

const Badge = styled.span`
  display: block;
  margin-top: 0.35rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.25rem 0.5rem;
`

const Td = styled.td<{ $highlighted?: boolean }>`
  padding: 0.85rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ $highlighted }) =>
    $highlighted ? 'rgba(238, 220, 130, 0.05)' : 'transparent'};

  &:first-child {
    text-align: left;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Check = styled.span`
  color: ${({ theme }) => theme.colors.gold};
  font-weight: 600;
`

const Dash = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.45;
`

const CtaRow = styled.td<{ $highlighted?: boolean }>`
  padding: 1.25rem 0.85rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ $highlighted }) =>
    $highlighted ? 'rgba(238, 220, 130, 0.05)' : 'transparent'};
`

const TierCta = styled(GhostButton)`
  width: 100%;
  max-width: 11rem;
  padding-inline: 1rem;
  font-size: 0.62rem;
`

function renderValue(value: boolean | string) {
  if (value === true) return <Check>✓</Check>
  if (value === false) return <Dash>—</Dash>
  return value
}

export function ComparisonTable() {
  return (
    <AltSection id={ALT_SECTION_IDS.comparison}>
      <AltInner>
        <Reveal>
          <SectionTitle>Srovnání balíčků</SectionTitle>
        </Reveal>
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <Th>Co dostaneš</Th>
                {comparisonTiers.map((tier) => (
                  <Th key={tier.id} $highlighted={tier.highlighted}>
                    {tier.name}
                    {tier.badge ? <Badge>{tier.badge}</Badge> : null}
                  </Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature) => (
                <tr key={feature.label}>
                  <Td>{feature.label}</Td>
                  {comparisonTiers.map((tier) => (
                    <Td key={tier.id} $highlighted={tier.highlighted}>
                      {renderValue(feature.values[tier.id as ComparisonTierId])}
                    </Td>
                  ))}
                </tr>
              ))}
              <tr>
                <Td />
                {comparisonTiers.map((tier) => {
                  const url =
                    getShopifyProductUrl(tier.productHandle) ?? undefined
                  return (
                    <CtaRow key={tier.id} $highlighted={tier.highlighted}>
                      {url ? (
                        <TierCta href={url}>
                          {tier.highlighted ? 'Chci program' : 'Vybrat'}
                        </TierCta>
                      ) : (
                        <Dash>—</Dash>
                      )}
                    </CtaRow>
                  )
                })}
              </tr>
            </tbody>
          </Table>
        </TableWrap>
      </AltInner>
    </AltSection>
  )
}
