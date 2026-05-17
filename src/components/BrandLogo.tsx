import styled from 'styled-components'
import logoSrc from '../assets/logo.png'

const LogoImage = styled.img`
  display: block;
  width: min(100%, 22rem);
  height: auto;
  object-fit: contain;
`

export function BrandLogo() {
  return (
    <LogoImage src={logoSrc} alt="Vojta Hubne" width={978} height={652} />
  )
}
