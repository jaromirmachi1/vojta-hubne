/** Shopify URL helpers — product links open the Shopify storefront. */

export { isStorefrontConfigured } from '../api/shopify/client'

const FALLBACK_SHOPIFY_STORE_DOMAIN = '9kihpp-rg.myshopify.com'

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.replace(
  /^https?:\/\//,
  '',
).replace(/\/$/, '')

const customStoreUrl = import.meta.env.VITE_SHOPIFY_STORE_URL?.replace(/\/$/, '')
const useCustomStoreUrl = import.meta.env.VITE_SHOPIFY_USE_CUSTOM_DOMAIN === 'true'

/** Public shop base URL for product/cart links */
export function getShopifyStoreUrl(): string {
  if (useCustomStoreUrl && customStoreUrl) {
    return customStoreUrl
  }

  if (storeDomain) return `https://${storeDomain}`

  return `https://${FALLBACK_SHOPIFY_STORE_DOMAIN}`
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
export function getShopifyCartUrl(): string {
  const base = getShopifyStoreUrl()
  return `${base}/cart`
}

/** Shop catalog — all products (works on Shopify; same as theme “Katalog”) */
export function getShopifyCatalogUrl(): string {
  const base = getShopifyStoreUrl()

  const path =
    import.meta.env.VITE_SHOPIFY_CATALOG_PATH?.trim() || '/collections/all'
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}

/** Collection by handle, e.g. "bestsellery" */
export function getShopifyCollectionUrl(handle: string): string | null {
  const base = getShopifyStoreUrl()
  if (!base || !handle) return null
  return `${base}/collections/${encodeURIComponent(handle)}`
}
