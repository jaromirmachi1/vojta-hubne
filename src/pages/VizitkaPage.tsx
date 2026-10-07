import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { BrandLogo } from '../components/BrandLogo'
import {
  downloadVizitkaVCard,
  vizitkaContact,
} from '../data/vizitka'
import { usePageMeta } from '../hooks/usePageMeta'
import { vizitkaPageMeta } from '../seo/vizitkaPageMeta'
import { getShopifyCatalogUrl } from '../utils/shopify'

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Page = styled.div`
  isolation: isolate;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(
      120% 80% at 50% -10%,
      rgba(238, 220, 130, 0.12) 0%,
      transparent 55%
    ),
    linear-gradient(180deg, #0c0c0b 0%, #050505 100%);
  color: #f6f3e9;
`

const Shell = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 26rem;
  margin: 0 auto;
  padding: clamp(2rem, 8vw, 3.5rem) 1.35rem 2.5rem;
  animation: ${fadeUp} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
`

const LogoLink = styled(Link)`
  display: block;
  margin-bottom: 2.75rem;
  text-decoration: none;

  img {
    height: 2.1rem;
    width: auto;
  }
`

const Name = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.6rem, 11vw, 3.35rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
  color: #fff;
  text-wrap: balance;
`

const Role = styled.p`
  margin: 0.85rem 0 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-align: center;
  color: ${({ theme }) => theme.colors.gold};
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.75rem;
  width: 100%;
`

const DetailLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9375rem;
  font-weight: 500;
  color: rgba(246, 243, 233, 0.88);
  text-decoration: none;
  transition: color 160ms ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 4px;
    border-radius: 2px;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin-top: 2.5rem;
`

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  min-height: 3.25rem;
  padding: 0.95rem 1.5rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: #0c0c0b;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 140ms ease-out,
    opacity 160ms ease-out;

  &:hover {
    opacity: 0.92;
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }

  svg {
    width: 1.1rem;
    height: 1.1rem;
    flex: none;
  }
`

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  min-height: 3.25rem;
  padding: 0.95rem 1.5rem;
  border: 1px solid rgba(238, 220, 130, 0.4);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.gold};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background 160ms ease-out,
    border-color 160ms ease-out,
    transform 140ms ease-out;

  &:hover {
    background: rgba(238, 220, 130, 0.08);
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }

  svg {
    width: 1rem;
    height: 1rem;
    flex: none;
  }
`

const Foot = styled.p`
  margin: 2.25rem 0 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  line-height: 1.5;
  text-align: center;
  color: rgba(246, 243, 233, 0.45);
`

const ContactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M16 4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M10 8h4M10 12h4M10 16h2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)

const ShopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 9h14l-1.2 10.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 9Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M9 9V7a3 3 0 0 1 6 0v2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)

export function VizitkaPage() {
  const shopUrl = getShopifyCatalogUrl()
  const telHref = `tel:${vizitkaContact.phone.replace(/\s+/g, '')}`

  usePageMeta(vizitkaPageMeta)

  return (
    <Page>
      <Shell>
        <LogoLink to="/" aria-label="Vojta Hubne — domů">
          <BrandLogo variant="nav" />
        </LogoLink>

        <Name>{vizitkaContact.fullName}</Name>
        <Role>{vizitkaContact.role}</Role>

        <Details>
          <DetailLink href={telHref}>{vizitkaContact.phoneDisplay}</DetailLink>
          <DetailLink href={`mailto:${vizitkaContact.email}`}>
            {vizitkaContact.email}
          </DetailLink>
        </Details>

        <Actions>
          <PrimaryButton type="button" onClick={downloadVizitkaVCard}>
            <ContactIcon />
            Uložit kontakt
          </PrimaryButton>
          <SecondaryLink href={shopUrl} rel="noopener noreferrer">
            <ShopIcon />
            Přejít do e-shopu
          </SecondaryLink>
        </Actions>

        <Foot>Vojta Hubne · B2B kontakt</Foot>
      </Shell>
    </Page>
  )
}
