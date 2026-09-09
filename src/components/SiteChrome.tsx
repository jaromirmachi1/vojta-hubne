import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BrandLogo } from './BrandLogo'
import { HashLink } from './HashLink'
import { MobileNavMenu, type MobileNavLink } from './MobileNavMenu'
import { ALT_HOME_PATH } from '../data/altHomepage'
import { ALT_V4_SECTION_IDS } from '../data/altHomeV4'
import { sitePromos } from '../data/promoBar'
import { altV4 } from '../styles/altV4'
import {
  getShopifyAccountUrl,
  getShopifyBlogUrl,
  getShopifyCartUrl,
  getShopifyCatalogUrl,
  getShopifyNovinkyUrl,
} from '../utils/shopify'

const Shell = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`

const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 0.65rem;
  padding: 0.65rem 1rem;
  background: ${altV4.black};
  border-bottom: 1px solid rgba(238, 220, 130, 0.35);

  @media (min-width: ${({ theme }) => theme.breakpoints.headerNav}) {
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    column-gap: 1.5rem;
    padding: 0.7rem clamp(1.5rem, 4vw, 3rem);
  }
`

const LogoLink = styled(Link)`
  grid-column: 1;
  justify-self: start;
  display: flex;
  align-items: center;
  text-decoration: none;
`

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: clamp(1.1rem, 2vw, 1.85rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.headerNav}) {
    display: flex;
    grid-column: 2;
    justify-self: center;
  }
`

const Actions = styled.div`
  grid-column: 2;
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.65rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.headerNav}) {
    grid-column: 3;
  }
`

const NavA = styled.a`
  color: ${altV4.gold};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: #fff;
  }
`

const NavHash = styled(HashLink)`
  color: ${altV4.gold};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: #fff;
  }
`

const NavLink = styled(Link)`
  color: ${altV4.gold};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: #fff;
  }
`

const MenuBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.85rem;
  height: 2.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: transparent;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.headerNav}) {
    display: none;
  }
`

const AccountBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.85rem;
  height: 2.85rem;
  border-radius: 999px;
  border: 1px solid rgba(238, 220, 130, 0.5);
  background: transparent;
  color: ${altV4.gold};
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(238, 220, 130, 0.08);
  }

  svg {
    width: 1.15rem;
    height: 1.15rem;
  }
`

const CartBtn = styled.a`
  display: inline-flex;
  align-items: center;
  height: 2.85rem;
  padding: 0 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(238, 220, 130, 0.5);
  color: ${altV4.gold};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
`

const Promo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  min-height: 3rem;
  padding: 0.55rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  background: ${altV4.gold};
  color: ${altV4.black};
  text-decoration: none;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.headerNav}) {
    justify-content: center;
    padding-inline: clamp(1.5rem, 4vw, 3rem);
  }
`

const PromoTag = styled.span`
  flex: none;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: ${altV4.black};
  color: ${altV4.gold};
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const PromoText = styled.span`
  flex: 1;
  min-width: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.headerNav}) {
    flex: none;
  }
`

export function SiteChrome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [promoIndex, setPromoIndex] = useState(0)
  const catalogUrl = getShopifyCatalogUrl()
  const blogUrl = getShopifyBlogUrl()
  const novinkyUrl = getShopifyNovinkyUrl()
  const cartUrl = getShopifyCartUrl()
  const accountUrl = getShopifyAccountUrl()
  const promo = sitePromos[promoIndex] ?? sitePromos[0]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPromoIndex((current) => (current + 1) % sitePromos.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [])

  const mobileLinks: MobileNavLink[] = [
    { label: 'Novinky', href: novinkyUrl, external: true, emphasis: true },
    { label: 'Produkty', href: catalogUrl, external: true },
    { label: 'Blog', href: blogUrl, external: true },
    { label: 'Proč my', sectionId: ALT_V4_SECTION_IDS.story },
    { label: 'Co chystáme', to: '/co-chystame' },
    { label: 'Spolupráce', to: '/spoluprace' },
    { label: 'Kontakt', to: '/kontakt' },
    { label: 'Přihlásit se / účet', href: accountUrl, external: true },
  ]

  return (
    <Shell>
      <Header>
        <LogoLink to={ALT_HOME_PATH} aria-label="Vojta Hubne — domů">
          <BrandLogo variant="nav" />
        </LogoLink>
        <DesktopNav aria-label="Hlavní menu">
          <NavA href={novinkyUrl} rel="noopener noreferrer">
            Novinky
          </NavA>
          <NavA href={catalogUrl} rel="noopener noreferrer">
            Produkty
          </NavA>
          <NavA href={blogUrl} rel="noopener noreferrer">
            Blog
          </NavA>
          <NavHash
            sectionId={ALT_V4_SECTION_IDS.story}
            pathname={ALT_HOME_PATH}
          >
            Proč my
          </NavHash>
          <NavLink to="/co-chystame">Co chystáme</NavLink>
          <NavLink to="/spoluprace">Spolupráce</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>
        </DesktopNav>
        <Actions>
          <AccountBtn
            href={accountUrl}
            rel="noopener noreferrer"
            aria-label="Přihlásit se / účet"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <circle cx="12" cy="8" r="3.25" />
              <path d="M5.5 19.5c1.6-3.2 4-4.75 6.5-4.75s4.9 1.55 6.5 4.75" />
            </svg>
          </AccountBtn>
          <CartBtn href={cartUrl} rel="noopener noreferrer">
            Košík
          </CartBtn>
          <MenuBtn type="button" aria-label="Menu" onClick={() => setMenuOpen(true)}>
            ≡
          </MenuBtn>
        </Actions>
      </Header>
      <Promo href={promo.href} rel={promo.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        <PromoTag>{promo.tag}</PromoTag>
        <PromoText>{promo.text}</PromoText>
        <span aria-hidden>→</span>
      </Promo>
      <MobileNavMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={mobileLinks}
        hashPathname={ALT_HOME_PATH}
      />
    </Shell>
  )
}
