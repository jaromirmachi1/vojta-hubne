import { useEffect, useState } from 'react'
import { getProductByHandle, isStorefrontConfigured } from '../api/shopify'
import type { ShopifyProduct } from '../types/shopify'

type UseShopifyProductState = {
  product: ShopifyProduct | null
  loading: boolean
  error: string | null
  configured: boolean
}

export function useShopifyProduct(handle: string | undefined): UseShopifyProductState {
  const [product, setProduct] = useState<ShopifyProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const configured = isStorefrontConfigured()

  useEffect(() => {
    if (!handle) {
      setLoading(false)
      setError('Chybí handle produktu.')
      return
    }

    if (!configured) {
      setLoading(false)
      setError('Shopify Storefront API není nakonfigurováno.')
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const result = await getProductByHandle(handle!)
        if (cancelled) return

        if (!result) {
          setProduct(null)
          setError('Produkt nebyl nalezen.')
        } else {
          setProduct(result)
        }
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Nepodařilo se načíst produkt.')
        setProduct(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [handle, configured])

  return { product, loading, error, configured }
}
