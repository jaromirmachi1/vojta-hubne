import type { Product } from '../data/products'
import { formatShopifyPrice } from './shopifyFormat'

export type ShopifyProductListNode = {
  handle: string
  title: string
  featuredImage: { url: string; altText: string | null } | null
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
}

/** Merge Shopify API data into local catalog (keeps marketing copy, updates handle/price/image). */
export function mergeFeaturedWithShopify(
  catalog: Product[],
  shopifyNodes: ShopifyProductListNode[],
): Product[] {
  const byHandle = new Map(shopifyNodes.map((node) => [node.handle, node]))

  return catalog.map((item) => {
    const remote = byHandle.get(item.shopifyHandle)
    if (!remote) return item

    const price = formatShopifyPrice(remote.priceRange.minVariantPrice)

    return {
      ...item,
      name: remote.title || item.name,
      shopifyHandle: remote.handle,
      image: remote.featuredImage?.url ?? item.image,
      price,
    }
  })
}
