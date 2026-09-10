import { getShopifyCatalogUrl, getShopifyProductUrl } from '../utils/shopify'

const catalogUrl = getShopifyCatalogUrl()
const upcomingHref = '/co-chystame'

function productHref(handle: string) {
  return getShopifyProductUrl(handle) ?? catalogUrl
}

/** Rotating gold announcement bar — React SiteChrome + Shopify promo snippet. */
export const sitePromos = [
  {
    tag: 'Jen pro členy',
    text: 'LEAN SHAKE™ MALINA — nová příchuť pro členy klubu',
    href: productHref('lean-shake-glp-1'),
    shopifyHref: '/products/lean-shake-glp-1',
  },
  {
    tag: 'Jen pro členy',
    text: 'iLEAN SHAKE™ ČOKOLÁDA · bez inulinu, první série',
    href: productHref('lean-shake-glp-1'),
    shopifyHref: '/products/lean-shake-glp-1',
  },
  {
    tag: 'Novinka',
    text: 'Kreatin + HMB · 60 dávek, 590 Kč — už skladem',
    href: productHref('kreatin-hmb'),
    shopifyHref: '/products/kreatin-hmb',
  },
  {
    tag: 'Novinka pro VH Club',
    text: 'BIOME 4™ — 4 živé kultury, 5 miliard CFU',
    href: upcomingHref,
    shopifyHref: 'https://www.vojtahubne.cz/co-chystame',
  },
  {
    tag: 'Připravujeme',
    text: 'VH HAIR · 120 kapslí na 30 dní, 699 Kč',
    href: upcomingHref,
    shopifyHref: 'https://www.vojtahubne.cz/co-chystame',
  },
  {
    tag: 'Nová příchuť',
    text: 'Lean Shake™ Višeň v čokoládě — k dodání',
    href: productHref('lean-shake-glp-1'),
    shopifyHref: '/products/lean-shake-glp-1',
  },
] as const

/** @deprecated Use sitePromos — kept for older Shopify CSS docs. */
export const PROMO_BAR_TEXT = sitePromos[1]?.text
  ? `${sitePromos[1].tag.toUpperCase()}: ${sitePromos[1].text}`
  : 'NOVINKY JSOU TADY'

export const PROMO_BAR_HREF = getShopifyCatalogUrl()
export const PROMO_BAR_SHOPIFY_LINK = '/collections'
export const PROMO_BAR_CODE = '30STARTSVOJTOU'
export const PROMO_BAR_HOME_PATH = '/'
