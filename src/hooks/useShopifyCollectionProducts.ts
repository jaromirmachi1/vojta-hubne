import { useEffect, useState } from 'react'
import {
  getCollectionProducts,
  isStorefrontConfigured,
  type ShopifyCollectionProducts,
} from '../api/shopify'

type UseShopifyCollectionProductsState = {
  collection: ShopifyCollectionProducts | null
  loading: boolean
  error: string | null
}

export function useShopifyCollectionProducts(
  handle: string | null,
): UseShopifyCollectionProductsState {
  const [collection, setCollection] =
    useState<ShopifyCollectionProducts | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!handle) {
      setCollection(null)
      setLoading(false)
      setError(null)
      return
    }

    if (!isStorefrontConfigured()) {
      setCollection(null)
      setLoading(false)
      setError('Storefront API není nakonfigurováno.')
      return
    }

    let cancelled = false

    async function load() {
      if (!handle) return

      setLoading(true)
      setError(null)

      try {
        const result = await getCollectionProducts(handle, 12)
        if (cancelled) return

        if (!result) {
          setCollection(null)
          setError('Kolekci se nepodařilo najít.')
          return
        }

        setCollection(result)
      } catch (err) {
        if (cancelled) return
        setCollection(null)
        setError(
          err instanceof Error
            ? err.message
            : 'Produkty se nepodařilo načíst.',
        )
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [handle])

  return { collection, loading, error }
}
