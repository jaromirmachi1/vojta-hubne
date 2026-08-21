import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PageContainer } from '../components/PageContainer'
import { usePageMeta } from '../hooks/usePageMeta'
import { ShopLayout } from '../layouts/ShopLayout'
import { notFoundPageMeta } from '../seo/notFoundPageMeta'
import { eyebrowText } from '../styles/eyebrow'
import { getShopifyCatalogUrl } from '../utils/shopify'

const Section = styled.section`
  display: flex;
  align-items: center;
  min-height: calc(
    100svh - ${({ theme }) => theme.layout.headerHeight} -
      ${({ theme }) => theme.layout.promoBarHeight}
  );
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
`

const Inner = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  max-width: 40rem;
`

const Code = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(4rem, 14vw, 7rem);
  line-height: 0.9;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.gold};
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  ${eyebrowText}
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(238, 220, 130, 0.06);
  }
`

const ShopLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(238, 220, 130, 0.06);
  }
`

export function NotFoundPage() {
  const catalogUrl = getShopifyCatalogUrl()

  usePageMeta(notFoundPageMeta)

  return (
    <ShopLayout
      breadcrumbs={[
        { label: 'Domů', to: '/' },
        { label: 'Stránka nenalezena' },
      ]}
    >
      <Section>
        <Inner>
          <Code aria-hidden>404</Code>
          <Eyebrow>Chyba</Eyebrow>
          <Title>Stránka nenalezena</Title>
          <Text>
            Odkaz je neplatný, stránka byla odstraněna, nebo jste zadali špatnou
            adresu. Zkuste se vrátit na úvodní stránku nebo pokračujte do
            e-shopu.
          </Text>
          <Actions>
            <PrimaryLink to="/">Domů</PrimaryLink>
            <SecondaryLink to="/kontakt">Kontakt</SecondaryLink>
            <ShopLink href={catalogUrl}>E-shop</ShopLink>
          </Actions>
        </Inner>
      </Section>
    </ShopLayout>
  )
}
