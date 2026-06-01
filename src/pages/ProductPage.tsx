import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { usePageMeta } from '../hooks/usePageMeta'
import { useShopifyProduct } from '../hooks/useShopifyProduct'
import { ShopLayout } from '../layouts/ShopLayout'
import { ProductDetailSection } from '../sections/ProductDetailSection'
import { getShopifyProductUrl } from '../utils/shopify'

const StateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 50vh;
  padding: 3rem 1.5rem;
  text-align: center;
`

const StateTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const StateText = styled.p`
  margin: 0;
  max-width: 28rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

const StateLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.85rem 1.25rem;

  &:hover {
    background: rgba(238, 220, 130, 0.06);
  }
`

const ExternalLink = styled.a`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.85rem 1.25rem;

  &:hover {
    background: rgba(238, 220, 130, 0.06);
  }
`

export function ProductPage() {
  const { handle } = useParams<{ handle: string }>()
  const { product, loading, error, configured } = useShopifyProduct(handle)

  usePageMeta({
    title: product
      ? `${product.title} — Vojta Hubne`
      : 'Produkt — Vojta Hubne',
    description: product
      ? `Kupte ${product.title} na Vojta Hubne. Prémiové doplňky pro transformaci.`
      : 'Produkt Vojta Hubne',
  })

  const fallbackShopUrl = handle ? getShopifyProductUrl(handle) : null

  return (
    <ShopLayout>
      {loading ? (
        <StateWrap>
          <StateTitle>Načítám produkt…</StateTitle>
        </StateWrap>
      ) : !configured ? (
        <StateWrap>
          <StateTitle>Storefront API</StateTitle>
          <StateText>
            Shopify ještě není propojeno. Nastavte proměnné prostředí podle{' '}
            <code>docs/SHOPIFY-HEADLESS-SETUP.md</code>.
          </StateText>
          {fallbackShopUrl ? (
            <ExternalLink href={fallbackShopUrl}>Otevřít v Shopify e-shopu</ExternalLink>
          ) : (
            <StateLink to="/homepage">Zpět na homepage</StateLink>
          )}
        </StateWrap>
      ) : error || !product ? (
        <StateWrap>
          <StateTitle>Produkt nenalezen</StateTitle>
          <StateText>{error ?? 'Tento produkt neexistuje nebo není dostupný.'}</StateText>
          <StateLink to="/homepage#produkty">Zpět na produkty</StateLink>
        </StateWrap>
      ) : (
        <ProductDetailSection product={product} />
      )}
    </ShopLayout>
  )
}
