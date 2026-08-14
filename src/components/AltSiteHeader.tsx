import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import {
  ALT_HOME_PATH,
  ALT_NAV_CTA,
  ALT_NAV_LINKS,
  ALT_SUB_NAV_CLUB,
  ALT_SUB_NAV_LINKS,
} from '../data/altHomepage'
import { useRegimeQuiz } from '../contexts/RegimeQuizContext'
import { getShopifyAccountUrl, getShopifyBlogUrl } from '../utils/shopify'
import { BrandLogo } from './BrandLogo'
import { openRegimeCategory } from './AltSubNav'
import { HashLink } from './HashLink'
import { MobileNavMenu, type MobileNavLink } from './MobileNavMenu'
import { PageContainer } from './PageContainer'

const HeaderShell = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
`

const Header = styled.header`
  height: ${({ theme }) => theme.layout.headerHeight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(PageContainer)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  height: 100%;
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-self: start;
  text-decoration: none;
`

const Nav = styled.nav`
  display: none;
  align-items: center;
  justify-self: center;
  gap: clamp(1.25rem, 2.5vw, 2rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`

const navLinkStyles = css`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  transition: color 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`

const NavHashLink = styled(HashLink)`
  ${navLinkStyles}
`

const ExternalNavLink = styled.a`
  ${navLinkStyles}
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 0.75rem;
`

const CtaLink = styled(HashLink)`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.92;
    color: ${({ theme }) => theme.colors.black};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;
  }
`

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.gold};
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(238, 220, 130, 0.08);
  }

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`

const MenuToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
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

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`

const blogUrl = getShopifyBlogUrl()
const accountUrl = getShopifyAccountUrl()

const mobileLinks: MobileNavLink[] = [
  { label: ALT_NAV_CTA.label, sectionId: ALT_NAV_CTA.sectionId },
  ...ALT_SUB_NAV_LINKS.map((link) => ({
    label: link.label,
    regimePathId: link.pathId,
  })),
  ...ALT_NAV_LINKS.map((link) => ({
    label: link.label,
    sectionId: link.sectionId,
  })),
  { label: 'Blog', href: blogUrl, external: true },
  { label: ALT_SUB_NAV_CLUB.label, to: ALT_SUB_NAV_CLUB.path },
]

export function AltSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { selectPath } = useRegimeQuiz()

  return (
    <HeaderShell>
      <Header>
        <Inner>
        <LogoLink to={ALT_HOME_PATH} aria-label="Vojta Hubne — domů">
          <BrandLogo variant="nav" />
        </LogoLink>

        <Nav aria-label="Hlavní navigace">
          {ALT_NAV_LINKS.map((link) => (
            <NavHashLink
              key={link.sectionId}
              sectionId={link.sectionId}
              pathname={ALT_HOME_PATH}
            >
              {link.label}
            </NavHashLink>
          ))}
          <ExternalNavLink href={blogUrl}>Blog</ExternalNavLink>
        </Nav>

        <Actions>
          <IconLink href={accountUrl} aria-label="Přihlásit se / účet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <circle cx="12" cy="8" r="3.25" />
              <path d="M5.5 19.5c1.6-3.2 4-4.75 6.5-4.75s4.9 1.55 6.5 4.75" />
            </svg>
          </IconLink>

          <CtaLink
            sectionId={ALT_NAV_CTA.sectionId}
            pathname={ALT_HOME_PATH}
          >
            {ALT_NAV_CTA.label}
          </CtaLink>

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

      </Header>

      <MobileNavMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={mobileLinks}
        hashPathname={ALT_HOME_PATH}
        onRegimePathClick={(pathId) => openRegimeCategory(pathId, selectPath)}
      />
    </HeaderShell>
  )
}
