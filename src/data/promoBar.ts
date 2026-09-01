import { getShopifyCatalogUrl } from '../utils/shopify'

/** Shared copy for React PromoBar and Shopify announcement bar. */
export const PROMO_BAR_TEXT =
  'NOVINKY JSOU TADY: LEAN SHAKE™ VIŠEŇ V ČOKOLÁDĚ + CREATIN HMB — OBJEDNÁVEJTE UŽ TEĎ'

/** Marketing-site promo bar → shop catalog. */
export const PROMO_BAR_HREF = getShopifyCatalogUrl()

/** Shopify announcement bar link (relative, same storefront). */
export const PROMO_BAR_SHOPIFY_LINK = '/collections'

/** @deprecated Legacy restart promo — HomeSecondaryPromoSection only. */
export const PROMO_BAR_CODE = '30STARTSVOJTOU'

/** @deprecated Use PROMO_BAR_HREF on marketing site. */
export const PROMO_BAR_HOME_PATH = '/'
