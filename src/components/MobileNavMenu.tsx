import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { HashLink } from './HashLink'

export type MobileNavLink =
  | { label: string; href: string; external: true }
  | { label: string; to: string }
  | { label: string; sectionId: string }

type MobileNavMenuProps = {
  isOpen: boolean
  onClose: () => void
  links: MobileNavLink[]
}

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 100vw;
  height: 100dvh;
  min-height: 100vh;
  overflow: hidden;
  overscroll-behavior: none;
  background: #000000;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition:
    opacity 0.28s ease,
    visibility 0.28s ease;
`

const CloseButton = styled.button`
  position: absolute;
  top: clamp(1rem, 4vw, 1.5rem);
  right: clamp(1rem, 4vw, 1.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceRaised};
  }

  svg {
    width: 1.15rem;
    height: 1.15rem;
  }
`

const Nav = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: clamp(1.35rem, 5vw, 2.25rem);
  padding: clamp(5rem, 14vw, 7rem) clamp(1.5rem, 8vw, 3.5rem);
`

const linkStyles = css`
  display: inline-flex;
  align-items: baseline;
  gap: 0.65rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 10vw, 3.75rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  transition: color 0.2s ease;

  &::before {
    content: '+';
    font-size: 0.92em;
    line-height: 1;
    opacity: 0.9;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`

const MenuHashLink = styled(HashLink)`
  ${linkStyles}
`

const MenuInternalLink = styled(Link)`
  ${linkStyles}
`

const MenuExternalLink = styled.a`
  ${linkStyles}
`

const Footer = styled.footer`
  padding: clamp(1.5rem, 5vw, 2.5rem) clamp(1.5rem, 8vw, 3.5rem)
    clamp(2rem, 6vw, 3rem);
`

const FooterRule = styled.hr`
  margin: 0 0 clamp(1.25rem, 4vw, 1.75rem);
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const footerLinkStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(0.72rem, 2.8vw, 0.82rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`

const FooterInstagramLink = styled.a`
  ${footerLinkStyles}

  &::before {
    content: '+';
    font-size: 1em;
    line-height: 1;
    opacity: 0.9;
  }
`

const FooterSiteLink = styled.a`
  ${footerLinkStyles}
`

export function MobileNavMenu({ isOpen, onClose, links }: MobileNavMenuProps) {
  const scrollPositionRef = useRef(0)
  const skipScrollRestoreRef = useRef(false)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    scrollPositionRef.current = window.scrollY
    const { style } = document.body
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
      touchAction: style.touchAction,
    }

    style.position = 'fixed'
    style.top = `-${scrollPositionRef.current}px`
    style.left = '0'
    style.right = '0'
    style.width = '100%'
    style.overflow = 'hidden'
    style.touchAction = 'none'

    window.addEventListener('keydown', onKeyDown)

    return () => {
      style.position = previous.position
      style.top = previous.top
      style.left = previous.left
      style.right = previous.right
      style.width = previous.width
      style.overflow = previous.overflow
      style.touchAction = previous.touchAction
      if (!skipScrollRestoreRef.current) {
        window.scrollTo(0, scrollPositionRef.current)
      }
      skipScrollRestoreRef.current = false
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <Overlay
      id="vh-mobile-nav"
      $open={isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Mobilní navigace"
      aria-hidden={!isOpen}
    >
      <CloseButton type="button" onClick={onClose} aria-label="Zavřít menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </CloseButton>

      <Nav aria-label="Hlavní navigace">
        {links.map((link) =>
          'external' in link ? (
            <MenuExternalLink key={link.href} href={link.href} onClick={onClose}>
              {link.label}
            </MenuExternalLink>
          ) : 'to' in link ? (
            <MenuInternalLink key={link.to} to={link.to} onClick={onClose}>
              {link.label}
            </MenuInternalLink>
          ) : (
            <MenuHashLink
              key={link.sectionId}
              sectionId={link.sectionId}
              onClick={() => {
                skipScrollRestoreRef.current = true
                onClose()
              }}
            >
              {link.label}
            </MenuHashLink>
          ),
        )}
      </Nav>

      <Footer>
        <FooterRule />
        <FooterRow>
          <FooterInstagramLink
            href="https://www.instagram.com/vojtahubne/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            Instagram
          </FooterInstagramLink>
          <FooterSiteLink href="https://www.vojtahubne.cz" onClick={onClose}>
            vojta-hubne.cz
          </FooterSiteLink>
        </FooterRow>
      </Footer>
    </Overlay>,
    document.body,
  )
}
