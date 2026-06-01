/**
 * Shopify URL helpers — product links open the Shopify storefront.
 * Storefront API: see src/api/shopify and docs/SHOPIFY-HEADLESS-SETUP.md
 */

export { isStorefrontConfigured } from '../api/shopify/client'

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.replace(
  /^https?:\/\//,
  '',
).replace(/\/$/, '')

const customStoreUrl = import.meta.env.VITE_SHOPIFY_STORE_URL?.replace(/\/$/, '')

/** Public shop base URL for product/cart links */
export function getShopifyStoreUrl(): string | null {
  // Local dev: shop.vojtahubne.cz often has no DNS yet — myshopify always works
  if (import.meta.env.DEV && storeDomain) {
    return `https://${storeDomain}`
  }

  if (customStoreUrl) return customStoreUrl
  if (storeDomain) return `https://${storeDomain}`

  return null
}

export function isShopifyConfigured(): boolean {
  return Boolean(getShopifyStoreUrl())
}

/** Product page: https://shop.../products/{handle} */
export function getShopifyProductUrl(handle: string): string | null {
  const base = getShopifyStoreUrl()
  if (!base || !handle) return null
  return `${base}/products/${encodeURIComponent(handle)}`
}

/** Cart page */
export function getShopifyCartUrl(): string | null {
  const base = getShopifyStoreUrl()
  if (!base) return null
  return `${base}/cart`
}

/** All products / catalog */
export function getShopifyCatalogUrl(): string | null {
  const base = getShopifyStoreUrl()
  if (!base) return null
  return `${base}/collections/all`
}

/** Collection by handle, e.g. "bestsellery" */
export function getShopifyCollectionUrl(handle: string): string | null {
  const base = getShopifyStoreUrl()
  if (!base || !handle) return null
  return `${base}/collections/${encodeURIComponent(handle)}`
}
