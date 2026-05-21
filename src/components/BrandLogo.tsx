import styled, { css } from 'styled-components'
import logoSrc from '../assets/VojtHLogo.png'

const LOGO_WIDTH = 1196
const LOGO_HEIGHT = 382

const baseLogo = css`
  display: block;
  object-fit: contain;
`

const HeroLogo = styled.img`
  ${baseLogo}
  width: min(100%, clamp(14rem, 72vw, 24rem));
  height: auto;
  max-height: clamp(3.5rem, 12svh, 5.5rem);
`

const NavLogo = styled.img`
  ${baseLogo}
  height: 2.25rem;
  width: auto;
`

type BrandLogoProps = {
  /** `hero` — launch page; `nav` — site header */
  variant?: 'hero' | 'nav'
}

export function BrandLogo({ variant = 'hero' }: BrandLogoProps) {
  const Img = variant === 'nav' ? NavLogo : HeroLogo

  return (
    <Img
      src={logoSrc}
      alt="Vojta Hubne"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
    />
  )
}
