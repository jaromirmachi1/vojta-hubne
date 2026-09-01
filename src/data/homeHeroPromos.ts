import noveProduktyHeroPromoImage from '../assets/nove-produkty-hero-promo.jpg'
import vhClubHeroPromoImage from '../assets/vh-club-hero-promo.jpg'
import { getShopifyCatalogUrl, getShopifyStoreUrl } from '../utils/shopify'

export type HomeHeroPromo = {
  id: string
  image: string
  alt: string
  href: string
  ctaLabel?: string
  /** image-link = whole banner is clickable, no separate CTA button */
  ctaMode: 'link' | 'copy-code' | 'image-link'
  width: number
  height: number
}

const VH_CLUB_BLOG_URL = `${getShopifyStoreUrl()}/blogs/blog/vitejte-ve-vh-clubu`

export const homeHeroPromos: HomeHeroPromo[] = [
  {
    id: 'nove-produkty',
    image: noveProduktyHeroPromoImage,
    alt: 'Nové produkty — Lean Shake Višeň v čokoládě a Kreatin HMB. Splnili jsme slib.',
    href: getShopifyCatalogUrl(),
    ctaLabel: 'Podívejte se na novinky',
    ctaMode: 'link',
    width: 1024,
    height: 674,
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
]
