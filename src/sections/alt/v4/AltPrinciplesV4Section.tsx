import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ALT_V4_SECTION_IDS, altV4Principles } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { V4Inner, V4Section } from './shared'

const Title = styled.h2`
  margin: 0 0 1.35rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 8vw, 3.25rem);
  font-weight: 400;
  line-height: 0.92;
  text-transform: uppercase;
  color: ${altV4.black};
`

const Stroke = styled.span`
  color: ${altV4.gold};
  -webkit-text-stroke: 1.5px #0a0a0a;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.15rem 2.5rem;
  }
`

const Item = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${altV4.black};
`

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 3rem;
  color: ${altV4.black};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
`

const Arrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  border: 1px solid rgba(10, 10, 10, 0.5);
  font-size: 0.8rem;
`

export function AltPrinciplesV4Section() {
  return (
    <V4Section
      $tone="gold"
      id={ALT_V4_SECTION_IDS.principles}
      aria-labelledby="alt-v4-principles-title"
    >
      <V4Inner>
        <Title id="alt-v4-principles-title">
          {altV4Principles.titleLine1}
          <br />
          <Stroke>{altV4Principles.titleLine2}</Stroke>
        </Title>
        <List>
          {altV4Principles.statements.map((s) => (
            <Item key={s}>{s}</Item>
          ))}
        </List>
        <Cta to={altV4Principles.ctaPath}>
          {altV4Principles.ctaLabel} <Arrow aria-hidden>→</Arrow>
        </Cta>
      </V4Inner>
    </V4Section>
  )
}
