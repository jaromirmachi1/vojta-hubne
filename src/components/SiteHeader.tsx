import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { BrandLogo } from './BrandLogo'
import { HashLink } from './HashLink'
import { MobileNavMenu } from './MobileNavMenu'
import { PageContainer } from './PageContainer'
import { getShopifyCartUrl, getShopifyCatalogUrl } from '../utils/shopify'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: ${({ theme }) => theme.layout.headerHeight};
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(PageContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  height: 100%;
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
`

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`

const StyledHashLink = styled(HashLink)`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`

const ExternalNavLink = styled.a`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const iconButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.gold};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(238, 220, 130, 0.08);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 2.25rem;
    height: 2.25rem;
  }
`

const MenuToggle = styled.button`
  ${iconButtonStyles}
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`

const CartLink = styled.a`
  ${iconButtonStyles}
  text-decoration: none;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const catalogUrl = getShopifyCatalogUrl()
  const cartUrl = getShopifyCartUrl()

  const mobileLinks = [
    { label: 'Produkty', href: catalogUrl, external: true },
    { label: 'Proč my', sectionId: 'porovnani' },
    { label: 'Příběh', sectionId: 'pribeh' },
  ] as const

  return (
    <Header>
      <Inner>
        <LogoLink to="/" aria-label="Vojta Hubne — domů">
          <BrandLogo variant="nav" />
        </LogoLink>

        <Nav aria-label="Hlavní navigace">
          <ExternalNavLink href={catalogUrl}>Produkty</ExternalNavLink>
          <StyledHashLink sectionId="porovnani">Proč my</StyledHashLink>
          <StyledHashLink sectionId="pribeh">Příběh</StyledHashLink>
        </Nav>

        <Actions>
          <CartLink href={cartUrl} aria-label="Košík">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M6 6h15l-1.5 9h-12L6 6z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </CartLink>

          <MenuToggle
            type="button"
            aria-label={menuOpen ? 'Zavřít menu' : 'Otevřít menu'}
            aria-expanded={menuOpen}
            aria-controls="vh-mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </MenuToggle>
        </Actions>
      </Inner>

      <MobileNavMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={[...mobileLinks]}
      />
    </Header>
  )
}
