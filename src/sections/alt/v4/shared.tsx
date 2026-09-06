import styled, { css } from 'styled-components'
import { altV4 } from '../../../styles/altV4'

export const V4Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 100svh;
  overflow-x: clip;
  background: ${altV4.paper};
  color: ${altV4.ink};
`

export const V4Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow-x: clip;
`

export const V4Inner = styled.div`
  width: min(100%, 42rem);
  margin-inline: auto;
  padding-inline: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: min(100%, 80rem);
    padding-inline: clamp(1.5rem, 4vw, 3rem);
  }
`

/** Chrome + this fold = one desktop viewport. Hero fills leftover; trust sits on the fold. */
export const AltV4FirstFold = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: column;
    height: calc(100svh - ${altV4.chromeHeight});
    min-height: 38rem;
  }
`

export const V4Section = styled.section<{ $tone?: 'paper' | 'paper2' | 'black' | 'gold' }>`
  padding: 1.75rem 0 2rem;
  background: ${({ $tone = 'paper' }) =>
    $tone === 'paper2'
      ? altV4.paper2
      : $tone === 'black'
        ? altV4.black
        : $tone === 'gold'
          ? altV4.gold
          : altV4.paper};
  color: ${({ $tone }) =>
    $tone === 'black' ? '#fff' : $tone === 'gold' ? altV4.black : altV4.ink};
  border-top: ${({ $tone }) =>
    $tone === 'paper2' || $tone === 'gold' ? `1px solid ${altV4.line}` : '0'};
  border-bottom: ${({ $tone }) =>
    $tone === 'paper2' ? `1px solid ${altV4.line}` : '0'};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-block: clamp(2.25rem, 5vw, 3.5rem);
  }
`

export const V4Eyebrow = styled.div<{ $onDark?: boolean }>`
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ $onDark }) => ($onDark ? altV4.gold : altV4.goldInk)};
`

export const V4Title = styled.h2<{ $onDark?: boolean; $size?: 'md' | 'lg' }>`
  margin: 0 0 0.65rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $size }) => ($size === 'lg' ? 'clamp(2.25rem, 7vw, 3.25rem)' : 'clamp(2rem, 6vw, 2.75rem)')};
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({ $onDark }) => ($onDark ? '#fff' : altV4.ink)};
`

export const V4Lead = styled.p<{ $onDark?: boolean }>`
  margin: 0 0 1.15rem;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ $onDark }) =>
    $onDark ? 'rgba(255, 255, 255, 0.9)' : altV4.ink2};
`

const pillBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 3.5rem;
  padding: 0.85rem 1.25rem;
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.15rem, 3.5vw, 1.35rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: fit-content;
    min-width: 16rem;
    padding-inline: 1.75rem;
  }
`

export const V4PillGold = styled.a`
  ${pillBase}
  background: ${altV4.gold};
  color: ${altV4.black};

  &:hover {
    background: #fff2a8;
  }
`

export const V4PillGoldButton = styled.button`
  ${pillBase}
  background: ${altV4.gold};
  color: ${altV4.black};

  &:hover {
    background: #fff2a8;
  }
`

export const V4PillBlack = styled.a`
  ${pillBase}
  background: ${altV4.black};
  color: ${altV4.gold};

  &:hover {
    background: #1f1c16;
    color: #fff;
  }
`

export const V4PillBlackButton = styled.button`
  ${pillBase}
  background: ${altV4.black};
  color: ${altV4.gold};

  &:hover:not(:disabled) {
    background: #1f1c16;
    color: #fff;
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`

const outlineHover = css<{ $onDark?: boolean }>`
  &:hover {
    background: ${({ $onDark }) => ($onDark ? '#fff' : altV4.black)};
    color: ${({ $onDark }) => ($onDark ? altV4.black : '#fff')};
    border-color: ${({ $onDark }) => ($onDark ? '#fff' : altV4.black)};
  }
`

export const V4PillOutline = styled.a<{ $onDark?: boolean }>`
  ${pillBase}
  background: transparent;
  color: ${({ $onDark }) => ($onDark ? '#fff' : altV4.ink)};
  border: 1px solid
    ${({ $onDark }) =>
      $onDark ? 'rgba(255, 255, 255, 0.35)' : altV4.ink};
  ${outlineHover}
`

export const V4PillOutlineButton = styled.button<{ $onDark?: boolean }>`
  ${pillBase}
  background: transparent;
  color: ${({ $onDark }) => ($onDark ? '#fff' : altV4.ink)};
  border: 1px solid
    ${({ $onDark }) =>
      $onDark ? 'rgba(255, 255, 255, 0.35)' : altV4.ink};
  ${outlineHover}
`

export const V4Card = styled.div`
  padding: 0.9rem;
  border-radius: 1.125rem;
  background: ${altV4.paper};
  border: 1px solid ${altV4.line};
`

export const V4Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`
