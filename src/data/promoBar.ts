import { getAbsoluteUrl } from '../seo/site'

/** Shared copy for React PromoBar and Shopify announcement bar. */
export const PROMO_BAR_TEXT =
  'RE(START) je zpět: –30 % na (re)Start balíček s kódem 30STARTSVOJTOU. Platí do 31.8.2026'

export const PROMO_BAR_CODE = '30STARTSVOJTOU'

/** React in-app route (homepage hero with banner + copy button). */
export const PROMO_BAR_HOME_PATH = '/'

/** Full URL for Shopify announcement bar link (shop → marketing homepage). */
export const PROMO_BAR_HOME_URL = getAbsoluteUrl(PROMO_BAR_HOME_PATH)
