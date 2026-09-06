import styled from 'styled-components'
import { glpSupportComparison } from '../../../data/productComparison'
import { ALT_V4_SECTION_IDS } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import {
  V4Eyebrow,
  V4Inner,
  V4Lead,
  V4PillOutline,
  V4Section,
  V4Title,
} from './shared'

const Compare = styled.div`
  display: flex;
  gap: 0.65rem;
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 1rem;
  }
`

const Col = styled.div<{ $ours?: boolean }>`
  flex: 1;
  padding: 0.9rem;
  border-radius: 1rem;
  background: ${({ $ours }) => ($ours ? altV4.black : altV4.paper)};
  border: 1px solid ${({ $ours }) => ($ours ? 'transparent' : altV4.line)};
  color: ${({ $ours }) => ($ours ? '#fff' : altV4.ink)};
`

const ColLabel = styled.div<{ $ours?: boolean }>`
  margin-bottom: 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $ours }) => ($ours ? altV4.gold : altV4.ink2)};
`

const ColCount = styled.div<{ $ours?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  line-height: 1;
  color: ${({ $ours }) => ($ours ? altV4.gold : altV4.ink2)};
`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
`

const Row = styled.div<{ $ours?: boolean }>`
  display: flex;
  flex-direction: ${({ $ours }) => ($ours ? 'column' : 'row')};
  gap: ${({ $ours }) => ($ours ? '0' : '0.5rem')};
  align-items: ${({ $ours }) => ($ours ? 'flex-start' : 'baseline')};
  font-size: 0.8rem;
  line-height: 1.4;
`

const Name = styled.span<{ $ours?: boolean }>`
  flex: 1;
  min-width: 0;
  color: ${({ $ours }) => ($ours ? '#fff' : altV4.ink2)};
`

const Amount = styled.span<{ $ours?: boolean }>`
  flex: none;
  color: ${({ $ours }) => ($ours ? altV4.gold : altV4.ink2)};
  font-weight: ${({ $ours }) => ($ours ? 600 : 400)};
`

export function AltComparisonV4Section() {
  const data = glpSupportComparison

  return (
    <V4Section
      $tone="paper2"
      id={ALT_V4_SECTION_IDS.comparison}
      aria-labelledby="alt-v4-compare-title"
    >
      <V4Inner>
        <V4Eyebrow>Srovnání</V4Eyebrow>
        <V4Title id="alt-v4-compare-title">
          Zajímejte se o to opravdu důležité
        </V4Title>
        <V4Lead>
          Sedm ingrediencí v běžném GLP produktu proti pěti aktivním látkám v
          GLP‑1 Supportu. U nás víte, kolik čeho je.
        </V4Lead>
        <Compare>
          <Col>
            <ColLabel>Běžný GLP</ColLabel>
            <ColCount>{data.competitor.ingredientCountLabel}</ColCount>
            <Rows>
              {data.competitor.ingredients.map((item) => (
                <Row key={item.name}>
                  <Name>{item.name}</Name>
                  <Amount>{item.percent}</Amount>
                </Row>
              ))}
            </Rows>
          </Col>
          <Col $ours>
            <ColLabel $ours>Vojta Hubne</ColLabel>
            <ColCount $ours>{data.ours.ingredientCountLabel}</ColCount>
            <Rows>
              {data.ours.ingredients.map((item) => (
                <Row key={item.name} $ours>
                  <Name $ours>{item.name}</Name>
                  <Amount $ours>
                    {item.percent}
                    {'note' in item && item.note ? ` ${item.note}` : ''}
                  </Amount>
                </Row>
              ))}
            </Rows>
          </Col>
        </Compare>
        <V4PillOutline href={data.cta.href} rel="noopener noreferrer">
          {data.cta.label}
        </V4PillOutline>
      </V4Inner>
    </V4Section>
  )
}
