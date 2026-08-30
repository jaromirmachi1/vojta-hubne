import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { PageContainer } from '../PageContainer'

const darkSectionStyles = css`
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.background};
`

const goldSectionStyles = css`
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`

export const SplitSection = styled.section<{ $variant: 'dark' | 'gold' }>`
  ${({ $variant }) => ($variant === 'gold' ? goldSectionStyles : darkSectionStyles)}
`

export const SplitInner = styled(PageContainer)<{ $variant: 'dark' | 'gold' }>`
  padding-block: ${({ $variant, theme }) =>
    $variant === 'gold'
      ? 'clamp(3.75rem, 7vw, 5.6rem)'
      : theme.layout.sectionPaddingY};
`

export const SplitLayout = styled.div<{ $variant: 'dark' | 'gold' }>`
  display: grid;
  gap: ${({ $variant }) => ($variant === 'gold' ? '2.25rem' : '1.5rem')};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: ${({ $variant }) =>
      $variant === 'gold' ? '1.1fr 0.9fr' : 'minmax(0, 1fr) 0.75fr'};
    align-items: center;
    gap: ${({ $variant }) => ($variant === 'gold' ? '4rem' : '3rem')};
  }
`

export const SplitTitle = styled.h2<{ $variant: 'dark' | 'gold' }>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $variant }) =>
    $variant === 'gold'
      ? 'clamp(2.25rem, 5.2vw, 4.3rem)'
      : 'clamp(2.5rem, 5.4vw, 4.8rem)'};
  line-height: 0.92;
  letter-spacing: ${({ $variant }) => ($variant === 'gold' ? '0.04em' : '0.02em')};
  text-transform: uppercase;
  color: ${({ $variant, theme }) =>
    $variant === 'gold' ? theme.colors.black : theme.colors.white};
`

export const SplitTitleEm = styled.em<{ $variant: 'dark' | 'gold' }>`
  font-style: normal;
  color: transparent;
  -webkit-text-stroke: 1px
    ${({ $variant, theme }) =>
      $variant === 'gold' ? theme.colors.black : theme.colors.gold};
`

export const SplitCopy = styled.p<{ $variant?: 'dark' | 'gold' }>`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${({ $variant, theme }) =>
    $variant === 'gold'
      ? 'rgba(11, 11, 9, 0.72)'
      : theme.colors.textMuted};
`

export const SplitList = styled.ul<{ $variant?: 'dark' | 'gold' }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
`

export const SplitListItem = styled.li<{ $variant?: 'dark' | 'gold' }>`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.75;
  color: ${({ $variant, theme }) =>
    $variant === 'gold'
      ? 'rgba(11, 11, 9, 0.82)'
      : theme.colors.textMuted};
`

export const SplitPanel = styled.div`
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.6rem 1.4rem;
`

export const darkActionLinkStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 1.15rem;
  padding: 0.25rem 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.goldMuted};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover svg {
    transform: translateX(4px);
  }

  svg {
    color: currentColor;
    transition:
      transform 0.2s ease,
      color 0.2s ease;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`

export const goldActionLinkStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 1.15rem;
  padding: 0.25rem 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: rgba(11, 11, 9, 0.75);
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  &:hover svg {
    transform: translateX(4px);
  }

  svg {
    color: currentColor;
    transition:
      transform 0.2s ease,
      color 0.2s ease;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.black};
    outline-offset: 3px;
  }
`

type HomeSplitSectionProps = {
  id?: string
  variant: 'dark' | 'gold'
  titleLine1: string
  titleLine2: string
  titleId?: string
  children: ReactNode
}

export function HomeSplitSection({
  id,
  variant,
  titleLine1,
  titleLine2,
  titleId,
  children,
}: HomeSplitSectionProps) {
  return (
    <SplitSection id={id} $variant={variant} aria-labelledby={titleId}>
      <SplitInner $variant={variant}>
        <SplitLayout $variant={variant}>
          <div>
            <SplitTitle id={titleId} $variant={variant}>
              {titleLine1}
              <br />
              <SplitTitleEm $variant={variant}>{titleLine2}</SplitTitleEm>
            </SplitTitle>
          </div>
          <div>{children}</div>
        </SplitLayout>
      </SplitInner>
    </SplitSection>
  )
}
