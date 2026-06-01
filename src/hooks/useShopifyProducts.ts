import { useEffect, useState } from 'react'
import { getShopifyProductList, isStorefrontConfigured } from '../api/shopify'
import { featuredProducts, type Product } from '../data/products'
import { mergeFeaturedWithShopify } from '../utils/mergeShopifyProducts'

type UseShopifyProductsState = {
  products: Product[]
  loading: boolean
  fromShopify: boolean
  error: string | null
}

export function useShopifyProducts(): UseShopifyProductsState {
  const [products, setProducts] = useState<Product[]>(featuredProducts)
  const [loading, setLoading] = useState(isStorefrontConfigured())
  const [fromShopify, setFromShopify] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isStorefrontConfigured()) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const nodes = await getShopifyProductList(50)
        if (cancelled) return

        const merged = mergeFeaturedWithShopify(featuredProducts, nodes)
        setProducts(merged)
        setFromShopify(true)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Nepodařilo se načíst produkty.')
        setProducts(featuredProducts)
        setFromShopify(false)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { products, loading, fromShopify, error }
}
