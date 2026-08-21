import tisicataHeroPromoImage from '../assets/tisicata-hero-promo.png'
import restartHeroPromoImage from '../assets/159ede93-2c6a-47a5-ab52-1fac5d5e1c3c.jpg'
import vhClubHeroPromoImage from '../assets/vh-club-hero-promo.jpg'
import { getShopifyProductUrl, getShopifyStoreUrl } from '../utils/shopify'

export type HomeHeroPromo = {
  id: string
  image: string
  alt: string
  ctaLabel: string
  href: string
  /** Use gold CTA; restart uses copy-code style via separate button in UI when true */
  ctaMode: 'link' | 'copy-code'
  width: number
  height: number
}

const TISICATA_PRODUCT_URL = `${getShopifyProductUrl('lean-shake-slany-karamel-aquamin-mg')}?variant=60361804480846`

const RESTART_PRODUCT_URL =
  getShopifyProductUrl('re-start-balicek') ??
  `${getShopifyStoreUrl()}/products/re-start-balicek`

const VH_CLUB_BLOG_URL = `${getShopifyStoreUrl()}/blogs/blog/vitejte-ve-vh-clubu`

export const homeHeroPromos: HomeHeroPromo[] = [
  {
    id: 'tisicata',
    image: tisicataHeroPromoImage,
    alt: 'Tisící objednávka — děkovný set Slaný karamel + Aquamin Mg, jen 50 ks za 949 Kč.',
    ctaLabel: 'Nakoupit balíček',
    href: TISICATA_PRODUCT_URL,
    ctaMode: 'link',
    width: 1024,
    height: 768,
  },
  {
    id: 'vh-club',
    image: vhClubHeroPromoImage,
    alt: 'VH Club — černá klubová karta Vojta Hubne s výhodami členství.',
    ctaLabel: 'Zjistit více o VH CLUB',
    href: VH_CLUB_BLOG_URL,
    ctaMode: 'link',
    width: 1024,
    height: 682,
  },
  {
    id: 'restart',
    image: restartHeroPromoImage,
    alt: 'Balíček (re)START — GLP-1 Support, Lean Shake a D3+K2+Vápník se slevou 30 %. Kód 30STARTSVOJTOU.',
    ctaLabel: 'Zkopírovat kód 30STARTSVOJTOU',
    href: RESTART_PRODUCT_URL,
    ctaMode: 'copy-code',
    width: 1448,
    height: 1086,
  },
]
