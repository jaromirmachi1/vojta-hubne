import { Link, useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { ALT_HOME_PATH } from '../../../data/altHomepage'
import { altV4 } from '../../../styles/altV4'
import {
  getShopifyCartUrl,
  getShopifyCatalogUrl,
  getShopifyNovinkyUrl,
} from '../../../utils/shopify'

const BOTTOM_NAV_HEIGHT = '4.25rem'

const Bar = styled.nav`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 90;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: stretch;
  min-height: ${BOTTOM_NAV_HEIGHT};
  padding: 0.55rem 0.35rem calc(0.45rem + env(safe-area-inset-bottom, 0px));
  border-radius: 1.35rem 1.35rem 0 0;
  background: ${altV4.black};
  box-shadow: 0 -8px 28px rgba(0, 0, 0, 0.28);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`

const itemStyles = css<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-width: 0;
  padding: 0.15rem 0.2rem;
  border: 0;
  background: transparent;
  color: ${({ $active }) => ($active ? altV4.gold : 'rgba(255, 255, 255, 0.48)')};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  line-height: 1.1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
`

const ItemLink = styled(Link)<{ $active?: boolean }>`
  ${itemStyles}
`

const ItemAnchor = styled.a<{ $active?: boolean }>`
  ${itemStyles}
`

const Indicator = styled.span<{ $active?: boolean }>`
  display: block;
  width: ${({ $active }) => ($active ? '1.15rem' : '0.35rem')};
  height: 0.35rem;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? altV4.gold : 'rgba(255, 255, 255, 0.42)'};
`

const Label = styled.span`
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

/** Spacer so page content clears the fixed mobile tab bar. */
export const AltV4BottomNavSpacer = styled.div`
  height: calc(${BOTTOM_NAV_HEIGHT} + env(safe-area-inset-bottom, 0px) + 0.5rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`

export function AltV4BottomNav() {
  const { pathname } = useLocation()
  const homeActive = pathname === ALT_HOME_PATH || pathname === `${ALT_HOME_PATH}/`

  return (
    <Bar aria-label="Hlavní navigace">
      <ItemLink
        to={ALT_HOME_PATH}
        $active={homeActive}
        aria-current={homeActive ? 'page' : undefined}
      >
        <Indicator $active={homeActive} aria-hidden />
        <Label>Domů</Label>
      </ItemLink>
      <ItemAnchor href={getShopifyCatalogUrl()} rel="noopener noreferrer">
        <Indicator aria-hidden />
        <Label>Produkty</Label>
      </ItemAnchor>
      <ItemLink to="/klub">
        <Indicator aria-hidden />
        <Label>VH Club</Label>
      </ItemLink>
      <ItemAnchor href={getShopifyNovinkyUrl()} rel="noopener noreferrer">
        <Indicator aria-hidden />
        <Label>Novinky</Label>
      </ItemAnchor>
      <ItemAnchor href={getShopifyCartUrl()} rel="noopener noreferrer">
        <Indicator aria-hidden />
        <Label>Košík</Label>
      </ItemAnchor>
    </Bar>
  )
}
