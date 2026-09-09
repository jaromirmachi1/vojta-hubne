import styled from 'styled-components'
import { sitePromos } from '../data/promoBar'

const Bar = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  min-height: 3rem;
  padding: 0.55rem 1rem;
  text-align: left;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.92;
  }
`

const Tag = styled.span`
  flex: none;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.gold};
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
`

/** @deprecated Prefer SiteChrome — kept for rare standalone use. */
export function PromoBar() {
  const promo = sitePromos[0]
  return (
    <Bar href={promo.href} rel="noopener noreferrer">
      <Tag>{promo.tag}</Tag>
      <span>{promo.text}</span>
      <span aria-hidden>→</span>
    </Bar>
  )
}
