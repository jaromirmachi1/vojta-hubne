import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PageContainer } from './PageContainer'

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
    grid-template-columns: 1.5fr 1fr 1fr;
  }
`

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Text = styled.p`
  margin: 0;
  max-width: 20rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const ColumnTitle = styled.h2`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const FooterLink = styled(Link)`
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
  color: ${({ theme }) => theme.colors.textMuted};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

export function SiteFooter() {
  return (
    <Footer>
      <Inner>
        <Brand>
          <BrandName>Vojta Hubne</BrandName>
          <Text>
            Prémiové doplňky a péče o tělo. Postavené na reálné transformaci —
            od 150 kg k 85 kg.
          </Text>
        </Brand>
        <Column>
          <ColumnTitle>Obchod</ColumnTitle>
          <FooterLink to="/homepage#produkty">Produkty</FooterLink>
          <FooterLink to="/">Spouštíme brzy</FooterLink>
        </Column>
        <Column>
          <ColumnTitle>Kontakt</ColumnTitle>
          <Text>Objednávky a dotazy — brzy online.</Text>
        </Column>
      </Inner>
      <Bottom>© {new Date().getFullYear()} Vojta Hubne. Všechna práva vyhrazena.</Bottom>
    </Footer>
  )
}
