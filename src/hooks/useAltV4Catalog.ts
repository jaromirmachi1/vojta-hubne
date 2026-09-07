import { useEffect, useMemo, useState } from 'react'
import { getShopifyProductList, isStorefrontConfigured } from '../api/shopify'
import {
  altV4Products,
  type AltV4Product,
} from '../data/altHomeV4'
import { formatShopifyPrice } from '../utils/shopifyFormat'
import type { ShopifyProductListNode } from '../utils/mergeShopifyProducts'

function overlay(
  product: AltV4Product,
  nodes: Map<string, ShopifyProductListNode>,
): AltV4Product {
  if (!product.shopifyHandle) return product
  const remote = nodes.get(product.shopifyHandle)
  if (!remote) return product
  return {
    ...product,
    image: remote.featuredImage?.url ?? product.image,
    livePrice: formatShopifyPrice(remote.priceRange.minVariantPrice),
  }
}

export function useAltV4Catalog() {
  const [byId, setById] = useState<Record<string, AltV4Product>>(altV4Products)

  useEffect(() => {
    if (!isStorefrontConfigured()) return
    let cancelled = false

    async function load() {
      try {
        const nodes = await getShopifyProductList(50)
        if (cancelled) return
        const map = new Map(nodes.map((node) => [node.handle, node]))
        const next = Object.fromEntries(
          Object.entries(altV4Products).map(([id, product]) => [
            id,
            overlay(product, map),
          ]),
        )
        setById(next)
      } catch {
        if (!cancelled) setById(altV4Products)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return useMemo(
    () => ({
      byId,
      get: (id: string) => byId[id] ?? altV4Products[id],
    }),
    [byId],
  )
}
