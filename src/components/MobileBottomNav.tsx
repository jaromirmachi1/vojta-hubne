import { Link, useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'
import {
  getShopifyCartUrl,
  getShopifyCatalogUrl,
  getShopifyNovinkyUrl,
} from '../utils/shopify'

export const MOBILE_BOTTOM_NAV_HEIGHT = '4.6rem'

const Bar = styled.nav`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 90;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: stretch;
  min-height: ${MOBILE_BOTTOM_NAV_HEIGHT};
  padding: 0.45rem 0.35rem calc(0.4rem + env(safe-area-inset-bottom, 0px));
  border-radius: 1.35rem 1.35rem 0 0;
  background: ${({ theme }) => theme.colors.black};
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
  gap: 0.28rem;
  min-width: 0;
  padding: 0.15rem 0.2rem;
  border: 0;
  background: transparent;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.gold : 'rgba(255, 255, 255, 0.48)'};
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

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  color: inherit;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`

const Label = styled.span`
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

/** Spacer so page content clears the fixed mobile tab bar. */
export const MobileBottomNavSpacer = styled.div`
  height: calc(
    ${MOBILE_BOTTOM_NAV_HEIGHT} + env(safe-area-inset-bottom, 0px) + 0.5rem
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d="M4.5 10.75 12 4.5l7.5 6.25V19a1.5 1.5 0 0 1-1.5 1.5h-3.75v-5.25h-4.5V20.5H6A1.5 1.5 0 0 1 4.5 19v-8.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProductsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <rect
        x="3.75"
        y="3.75"
        width="7"
        height="7"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="13.25"
        y="3.75"
        width="7"
        height="7"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="3.75"
        y="13.25"
        width="7"
        height="7"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="13.25"
        y="13.25"
        width="7"
        height="7"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function ClubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d="M12 3.75 13.7 9.1h5.55l-4.5 3.25 1.72 5.4L12 14.7l-4.47 3.05 1.72-5.4-4.5-3.25H10.3L12 3.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NewsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d="M5 5.75h11.5A2.75 2.75 0 0 1 19.25 8.5v9.75H7.5A2.75 2.75 0 0 1 4.75 15.5V6.5A.75.75 0 0 1 5.5 5.75"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 9.5h7.5M8.25 12.5h7.5M8.25 15.5H14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d="M7.25 7.5V6.25a4.75 4.75 0 0 1 9.5 0V7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6.5 7.5h11l-.85 10.2a1.75 1.75 0 0 1-1.74 1.55H9.09a1.75 1.75 0 0 1-1.74-1.55L6.5 7.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function pathMatches(pathname: string, target: string) {
  return pathname === target || pathname === `${target}/`
}

type MobileBottomNavProps = {
  /** Internal home route (e.g. `/` or `/alt`). */
  homeTo?: string
  /** Internal VH Club route. */
  clubTo?: string
}

export function MobileBottomNav({
  homeTo = '/',
  clubTo = '/klub',
}: MobileBottomNavProps) {
  const { pathname } = useLocation()
  const homeActive = pathMatches(pathname, homeTo)
  const clubActive = pathMatches(pathname, clubTo)

  return (
    <Bar aria-label="Hlavní navigace">
      <ItemLink
        to={homeTo}
        $active={homeActive}
        aria-current={homeActive ? 'page' : undefined}
      >
        <Icon>
          <HomeIcon />
        </Icon>
        <Label>Domů</Label>
      </ItemLink>
      <ItemAnchor href={getShopifyCatalogUrl()} rel="noopener noreferrer">
        <Icon>
          <ProductsIcon />
        </Icon>
        <Label>Produkty</Label>
      </ItemAnchor>
      <ItemLink
        to={clubTo}
        $active={clubActive}
        aria-current={clubActive ? 'page' : undefined}
      >
        <Icon>
          <ClubIcon />
        </Icon>
        <Label>VH Club</Label>
      </ItemLink>
      <ItemAnchor href={getShopifyNovinkyUrl()} rel="noopener noreferrer">
        <Icon>
          <NewsIcon />
        </Icon>
        <Label>Novinky</Label>
      </ItemAnchor>
      <ItemAnchor href={getShopifyCartUrl()} rel="noopener noreferrer">
        <Icon>
          <CartIcon />
        </Icon>
        <Label>Košík</Label>
      </ItemAnchor>
    </Bar>
  )
}
