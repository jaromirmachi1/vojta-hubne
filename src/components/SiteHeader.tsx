import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { BrandLogo } from './BrandLogo'
import { PageContainer } from './PageContainer'

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

const StyledNavLink = styled(NavLink)`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const ExternalNavLink = styled.a`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const CartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.gold};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(238, 220, 130, 0.08);
  }

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`

export function SiteHeader() {
  return (
    <Header>
      <Inner>
        <LogoLink to="/homepage" aria-label="Vojta Hubne — domů">
          <BrandLogo variant="nav" />
        </LogoLink>

        <Nav aria-label="Hlavní navigace">
          <StyledNavLink to="/homepage#produkty">Produkty</StyledNavLink>
          <StyledNavLink to="/homepage#porovnani">Proč my</StyledNavLink>
          <StyledNavLink to="/homepage#pribeh">Příběh</StyledNavLink>
          <ExternalNavLink href="/">Spouštíme brzy</ExternalNavLink>
        </Nav>

        <Actions>
          <CartButton type="button" aria-label="Košík (brzy)" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M6 6h15l-1.5 9h-12L6 6z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </CartButton>
        </Actions>
      </Inner>
    </Header>
  )
}
