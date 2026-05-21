/**
 * Shopify URL helpers — Level 1 integration.
 * Set VITE_SHOPIFY_STORE_URL in .env (see .env.example and docs/SHOPIFY-INTEGRATION.md).
 */

const storeUrl = import.meta.env.VITE_SHOPIFY_STORE_URL?.replace(/\/$/, '')

export function isShopifyConfigured(): boolean {
  return Boolean(storeUrl)
}

/** Product page: https://shop.../products/{handle} */
export function getShopifyProductUrl(handle: string): string | null {
  if (!storeUrl || !handle) return null
  return `${storeUrl}/products/${handle}`
}

/** Cart page */
export function getShopifyCartUrl(): string | null {
  if (!storeUrl) return null
  return `${storeUrl}/cart`
}

/** All products / catalog */
export function getShopifyCatalogUrl(): string | null {
  if (!storeUrl) return null
  return `${storeUrl}/collections/all`
}

/** Collection by handle, e.g. "bestsellery" */
export function getShopifyCollectionUrl(handle: string): string | null {
  if (!storeUrl || !handle) return null
  return `${storeUrl}/collections/${handle}`
}
