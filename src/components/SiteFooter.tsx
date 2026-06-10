import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { companyInfo } from '../data/company'
import { eyebrowText } from '../styles/eyebrow'
import { HashLink } from './HashLink'
import { PageContainer } from './PageContainer'
import { getShopifyPolicyUrl } from '../utils/shopify'

const Footer = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surface};
`

const Inner = styled(PageContainer)`
  display: grid;
  gap: 2.5rem;
  padding-block: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`

const ColumnTitle = styled.h2`
  margin: 0 0 0.25rem;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  ${eyebrowText}
`

const CompanyName = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`

const Text = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

const FooterNavLink = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const FooterExternalLink = styled.a`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const FooterHashLink = styled(HashLink)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Bottom = styled(PageContainer)`
  padding-block: 1.25rem;
  text-align: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

export function SiteFooter() {
  return (
    <Footer>
      <Inner>
        <Column>
          <ColumnTitle>Kontaktní informace</ColumnTitle>
          <CompanyName>{companyInfo.name}</CompanyName>
          <Text>{companyInfo.addressLine}</Text>
          <Text>IČO: {companyInfo.ico}</Text>
          <FooterExternalLink href={`mailto:${companyInfo.email}`}>
            {companyInfo.email}
          </FooterExternalLink>
        </Column>

        <Column>
          <ColumnTitle>Důležité informace</ColumnTitle>
          <FooterNavLink to="/kontakt">Kontakt</FooterNavLink>
          <FooterExternalLink href={getShopifyPolicyUrl('shipping-policy')}>
            Doprava a platba
          </FooterExternalLink>
          <FooterExternalLink href={getShopifyPolicyUrl('terms-of-service')}>
            Obchodní podmínky
          </FooterExternalLink>
          <FooterExternalLink href={getShopifyPolicyUrl('privacy-policy')}>
            Ochrana osobních údajů
          </FooterExternalLink>
          <FooterHashLink sectionId="produkty">Produkty</FooterHashLink>
        </Column>
      </Inner>
      <Bottom>
        © {new Date().getFullYear()} Vojta Hubne · {companyInfo.name}
      </Bottom>
    </Footer>
  )
}
