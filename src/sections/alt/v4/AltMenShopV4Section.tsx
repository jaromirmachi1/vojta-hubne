import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4Men,
} from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { scrollToSection } from '../../../utils/scrollToSection'
import { V4Inner, V4Section } from './shared'

const Split = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(1.5rem, 4vw, 3rem);
    align-items: start;
  }
`

const Title = styled.h2`
  margin: 0 0 1.25rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.4rem, 8vw, 3.1rem);
  font-weight: 400;
  line-height: 0.92;
  text-transform: uppercase;
  color: #fff;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: 0;
  }
`

const Gold = styled.span`
  color: ${altV4.gold};
`

const Box = styled.div`
  padding: 1.25rem 1.1rem;
  border-radius: 1.125rem;
  border: 1px solid rgba(238, 220, 130, 0.4);
  background: rgba(238, 220, 130, 0.06);
  margin-bottom: 1.1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: 1rem;
  }
`

const Lead = styled.p`
  margin: 0 0 1rem;
  font-size: 1rem;
  line-height: 1.62;
  color: #fff;
`

const ReviewCta = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 2.75rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${altV4.gold};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
`

const Arrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  border: 1px solid rgba(238, 220, 130, 0.6);
  font-size: 0.8rem;
`

const ProductRow = styled.div`
  display: flex;
  gap: 0.65rem;
`

const ProductLink = styled.a`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.5rem;
  border: 1px solid rgba(238, 220, 130, 0.5);
  border-radius: 999px;
  background: transparent;
  color: ${altV4.gold};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
`

export function AltMenShopV4Section() {
  return (
    <V4Section
      $tone="black"
      id={ALT_V4_SECTION_IDS.men}
      aria-labelledby="alt-v4-men-title"
      style={{ borderTop: '1px solid rgba(238, 220, 130, 0.3)' }}
    >
      <V4Inner>
        <Split>
          <Title id="alt-v4-men-title">
            {altV4Men.titleLine1}
            <br />
            <Gold>{altV4Men.titleLine2}</Gold>
          </Title>
          <div>
            <Box>
              <Lead>{altV4Men.lead}</Lead>
              <ReviewCta
                type="button"
                onClick={() => scrollToSection(ALT_V4_SECTION_IDS.reviews)}
              >
                {altV4Men.ctaLabel} <Arrow aria-hidden>→</Arrow>
              </ReviewCta>
            </Box>
            <ProductRow>
              {altV4Men.productCtAs.map((p) => (
                <ProductLink key={p.label} href={p.href} rel="noopener noreferrer">
                  {p.label}
                </ProductLink>
              ))}
            </ProductRow>
          </div>
        </Split>
      </V4Inner>
    </V4Section>
  )
}
