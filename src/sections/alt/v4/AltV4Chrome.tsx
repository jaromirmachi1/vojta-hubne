import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BrandLogo } from '../../../components/BrandLogo'
import { HashLink } from '../../../components/HashLink'
import { MobileNavMenu, type MobileNavLink } from '../../../components/MobileNavMenu'
import { ALT_HOME_PATH } from '../../../data/altHomepage'
import { ALT_V4_SECTION_IDS, altV4Promo } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { getShopifyCartUrl, getShopifyCatalogUrl } from '../../../utils/shopify'

const Shell = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 1rem;
  background: ${altV4.black};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0.7rem clamp(1.5rem, 4vw, 3rem);
  }
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: auto;
  text-decoration: none;
`

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: clamp(1.1rem, 2vw, 1.85rem);
  margin-right: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
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

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
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

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
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

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: none;
  }
`

export function AltV4Chrome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const catalogUrl = getShopifyCatalogUrl()
  const cartUrl = getShopifyCartUrl()

  const mobileLinks: MobileNavLink[] = [
    { label: 'Produkty', href: catalogUrl, external: true },
    { label: 'Poradit', sectionId: ALT_V4_SECTION_IDS.quiz },
    { label: 'VH Club', to: '/klub' },
    { label: 'Co chystáme', to: '/co-chystame' },
    { label: 'Kontakt', to: '/kontakt' },
  ]

  return (
    <Shell>
      <Header>
        <LogoLink to={ALT_HOME_PATH} aria-label="Vojta Hubne — domů">
          <BrandLogo variant="nav" />
        </LogoLink>
        <DesktopNav aria-label="Hlavní menu">
          <NavA href={catalogUrl} rel="noopener noreferrer">
            Produkty
          </NavA>
          <NavHash sectionId={ALT_V4_SECTION_IDS.quiz} pathname={ALT_HOME_PATH}>
            Poradit
          </NavHash>
          <NavLink to="/klub">VH Club</NavLink>
          <NavLink to="/co-chystame">Co chystáme</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>
        </DesktopNav>
        <MenuBtn type="button" aria-label="Menu" onClick={() => setMenuOpen(true)}>
          ≡
        </MenuBtn>
        <CartBtn href={cartUrl} rel="noopener noreferrer">
          Košík
        </CartBtn>
      </Header>
      <Promo href={catalogUrl} rel="noopener noreferrer">
        <PromoTag>{altV4Promo.tag}</PromoTag>
        <PromoText>{altV4Promo.text}</PromoText>
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
