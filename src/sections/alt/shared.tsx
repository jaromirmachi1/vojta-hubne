import type { MouseEvent, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { scrollToSection } from '../../utils/scrollToSection'
import { eyebrowText } from '../../styles/eyebrow'

export const AltSection = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
  background: ${({ theme }) => theme.colors.background};
  scroll-margin-top: ${({ theme }) => theme.layout.altStickyScrollMargin};
`

export const AltInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.layout.contentPadding};
`

export const Eyebrow = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: lowercase;
  ${eyebrowText}
`

export const SectionTitle = styled.h2`
  margin: 0 0 clamp(1.5rem, 4vw, 2.5rem);
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
`

export const PrimaryButton = styled.a`
  ${buttonBase}
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.gold};

  &:hover {
    opacity: 0.92;
  }
`

export const GhostButton = styled.a`
  ${buttonBase}
  color: ${({ theme }) => theme.colors.gold};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background: rgba(238, 220, 130, 0.06);
  }
`

type SectionAnchorProps = {
  sectionId: string
  children: ReactNode
  className?: string
}

export function SectionAnchor({
  sectionId,
  children,
  className,
}: SectionAnchorProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollToSection(sectionId)
  }

  return (
    <a href={`#${sectionId}`} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}

export function ScrollGhostButton({
  sectionId,
  children,
}: {
  sectionId: string
  children: ReactNode
}) {
  return (
    <GhostButton
      as="button"
      type="button"
      onClick={() => scrollToSection(sectionId)}
    >
      {children}
    </GhostButton>
  )
}

export const ScrollLink = styled.button`
  ${buttonBase}
  color: ${({ theme }) => theme.colors.goldMuted};
  background: transparent;
  border: 0;
  padding-inline: 0;
  text-transform: none;
  letter-spacing: 0.04em;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`
