import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { usePageMeta } from '../hooks/usePageMeta'
import { ShopLayout } from '../layouts/ShopLayout'
import { getShopifyCatalogUrl, getShopifyStoreUrl } from '../utils/shopify'

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
  border-radius: ${({ theme }) => theme.radii.pill};
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
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.85rem 1.25rem;

  &:hover {
    background: rgba(238, 220, 130, 0.06);
  }
`

export function ShopifyCollectionRedirectPage() {
  const params = useParams()
  const collectionPath = params['*']
  const shopUrl = collectionPath
    ? `${getShopifyStoreUrl()}/collections/${collectionPath}`
    : getShopifyCatalogUrl()

  usePageMeta({
    title: 'Přesměrování do katalogu — Vojta Hubne',
    description: 'Katalog Vojta Hubne se otevírá v oficiálním Shopify e-shopu.',
  })

  useEffect(() => {
    window.location.replace(shopUrl)
  }, [shopUrl])

  return (
    <ShopLayout>
      <StateWrap>
        <StateTitle>Přesměrovávám do e-shopu</StateTitle>
        <StateText>
          Katalog otevíráme na Shopify, kde jsou aktuální produkty, sklad a checkout.
        </StateText>
        <ExternalLink href={shopUrl}>Otevřít katalog</ExternalLink>
      </StateWrap>
    </ShopLayout>
  )
}

export function ShopifyCartRedirectPage() {
  const shopUrl = `${getShopifyStoreUrl()}/cart`

  usePageMeta({
    title: 'Přesměrování do košíku — Vojta Hubne',
    description: 'Košík Vojta Hubne se otevírá v oficiálním Shopify e-shopu.',
  })

  useEffect(() => {
    window.location.replace(shopUrl)
  }, [shopUrl])

  return (
    <ShopLayout>
      <StateWrap>
        <StateTitle>Přesměrovávám do košíku</StateTitle>
        <StateText>Košík a checkout běží bezpečně na Shopify.</StateText>
        <ExternalLink href={shopUrl}>Otevřít košík</ExternalLink>
        <StateLink to="/homepage#produkty">Zpět na produkty</StateLink>
      </StateWrap>
    </ShopLayout>
  )
}
