/** Shopify URL helpers — product links open the Shopify storefront. */

export { isStorefrontConfigured } from "../api/shopify/client";
import { contactFormRecipientEmail } from "../data/company";

const FALLBACK_SHOPIFY_STORE_DOMAIN = "9kihpp-rg.myshopify.com";

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.replace(
  /^https?:\/\//,
  "",
).replace(/\/$/, "");

const customStoreUrl = import.meta.env.VITE_SHOPIFY_STORE_URL?.replace(
  /\/$/,
  "",
);
const useCustomStoreUrl =
  import.meta.env.VITE_SHOPIFY_USE_CUSTOM_DOMAIN === "true";

/** Public shop base URL for product/cart links */
export function getShopifyStoreUrl(): string {
  if (useCustomStoreUrl && customStoreUrl) {
    return customStoreUrl;
  }

  if (storeDomain) return `https://${storeDomain}`;

  return `https://${FALLBACK_SHOPIFY_STORE_DOMAIN}`;
}

export function isShopifyConfigured(): boolean {
  return Boolean(getShopifyStoreUrl());
}

/** Product page: https://shop.../products/{handle} */
export function getShopifyProductUrl(handle: string): string | null {
  const base = getShopifyStoreUrl();
  if (!base || !handle) return null;
  return `${base}/products/${encodeURIComponent(handle)}`;
}

/** Cart page */
export function getShopifyCartUrl(): string {
  const base = getShopifyStoreUrl();
  return `${base}/cart`;
}

/** Customer account — login if logged out, account hub if logged in */
export function getShopifyAccountUrl(): string {
  const base = getShopifyStoreUrl();
  return `${base}/account`;
}

/** Shop catalog — all products, default sort = most ordered (best-selling). */
export function getShopifyCatalogUrl(): string {
  const base = getShopifyStoreUrl();

  const path =
    import.meta.env.VITE_SHOPIFY_CATALOG_PATH?.trim() || "/collections/all";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const separator = normalized.includes("?") ? "&" : "?";
  return `${base}${normalized}${separator}sort_by=best-selling`;
}

/** Blog index — default handle is `blog`; override via VITE_SHOPIFY_BLOG_PATH */
export function getShopifyBlogUrl(): string {
  const base = getShopifyStoreUrl();

  const path = import.meta.env.VITE_SHOPIFY_BLOG_PATH?.trim() || "/blogs/blog";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Novinky blog — Shopify blog handle `novinky` */
export function getShopifyNovinkyUrl(): string {
  const base = getShopifyStoreUrl();
  return `${base}/blogs/novinky`;
}

/** Collection by handle, e.g. "bestsellery" */
export function getShopifyCollectionUrl(handle: string): string | null {
  const base = getShopifyStoreUrl();
  if (!base || !handle) return null;
  return `${base}/collections/${encodeURIComponent(handle)}`;
}

type ShopifyPolicySlug =
  | "shipping-policy"
  | "terms-of-service"
  | "privacy-policy"
  | "refund-policy";

/** Shopify policy pages (Settings → Policies). */
export function getShopifyPolicyUrl(slug: ShopifyPolicySlug): string {
  return `${getShopifyStoreUrl()}/policies/${slug}`;
}

/** Custom legal pages on the shop (Online Store → Pages). */
export function getShopifyPageUrl(handle: string): string {
  return `${getShopifyStoreUrl()}/pages/${handle}`;
}

export function getPrivacyPolicyPageUrl(): string {
  return getShopifyPageUrl("zasady-ochrany-osobnich-udaju");
}

export function getCookiesPolicyPageUrl(): string {
  return getShopifyPageUrl("zasady-pouzivani-cookies");
}

/**
 * Shopify native contact form endpoint.
 * Deliveries go to the store contact email in Shopify Admin (see contactFormRecipientEmail).
 */
export function getShopifyContactFormUrl(): string {
  return `${getShopifyStoreUrl()}/contact#contact_form`;
}

/** Shopify newsletter/customer subscribe endpoint used by footer form. */
export function getShopifyNewsletterSubscribeUrl(): string {
  return `${getShopifyStoreUrl()}/contact`;
}

/** Inbox configured for contact form notifications. */
export function getContactFormRecipientEmail(): string {
  return contactFormRecipientEmail;
}
