import bundleComplex from '../assets/90dnispicusemnew.png'
import bundleGlp from '../assets/all-bundle.png'
import bundlePost from '../assets/genericglp.png'
import bundleStart from '../assets/vitalbundle.png'
import bundleHunger from '../assets/products/lean-shake.png'
import glpSupport from '../assets/products/glp-support.png'
import leanShake from '../assets/products/lean-shake.png'
import aquaminImage from '../assets/glp1generic.png'
import d3Image from '../assets/vitality.png'
import { customerPaths } from './altHomepage'
import { getShopifyCatalogUrl, getShopifyCollectionUrl, getShopifyProductUrl } from '../utils/shopify'

export const altBundlesCopy = {
  title: 'Nové balíčky podle vaší situace',
  subtitle:
    'Méně rozhodování, více výsledků. Vše připravené tak, aby dávalo smysl právě vám.',
} as const

export const altProductsCopy = {
  title: 'Produkty, které dávají smysl ve správném režimu',
  viewAll: 'Zobrazit všechny produkty →',
} as const

const bundleMeta = {
  nutrition: {
    benefits: [
      'Vitamíny a minerály v jednom plánu',
      'Podpora metabolismu',
      'Jistota, že tělu nic nechybí',
    ],
    cta: 'Získat jistotu →',
    image: bundleComplex,
  },
  'no-meds': {
    benefits: [
      'Základ pro reálné hubnutí',
      'Podpora výživy a hladu',
      'Jednoduchý režim bez extrémů',
    ],
    cta: 'Režim bez léků →',
    image: bundleStart,
  },
  'hunger-cravings': {
    benefits: [
      'Podpora proti přejídání',
      'Kontrola hladu a chutí',
      'Praktické doplňky na každý den',
    ],
    cta: 'Zklidnit chutě →',
    image: bundleHunger,
  },
  'post-tapering': {
    benefits: [
      'Stabilizace metabolismu',
      'Udržení sytosti',
      'Podpora svalů',
    ],
    cta: 'Po vysazení →',
    image: bundlePost,
  },
  'glp1-regime': {
    benefits: [
      'Podpora během léčby',
      'Doplňování živin při nižším příjmu',
      'Stabilizace hladu',
    ],
    cta: 'Režim pro GLP-1 →',
    image: bundleGlp,
  },
} as const

export const altBundles = customerPaths.map((path) => ({
  id: path.id,
  title: path.headline,
  collectionHandle: path.collectionHandle,
  ...bundleMeta[path.id],
}))

export const altFeaturedProducts = [
  {
    id: 'glp-1-support',
    name: 'GLP-1 Support',
    benefits: [
      'Podpora během léčby',
      'Kontrola hladu',
      'Hydratace',
    ],
    shopifyHandle: 'glp1-support',
    image: glpSupport,
  },
  {
    id: 'lean-shake',
    name: 'Lean Shake GLP-1',
    benefits: [
      'Proteinový shake pro sytost',
      'Kontrola váhy',
      'Praktické řešení na každý den',
    ],
    shopifyHandle: 'lean-shake-glp-1',
    image: leanShake,
  },
  {
    id: 'd3-k2',
    name: 'D3 + K2 + Vápník',
    benefits: [
      'Trio pro kosti a svaly',
      'Podpora imunity',
      'Vitamíny v jedné dávce',
    ],
    shopifyHandle: 'd3-k2-vapnik',
    image: d3Image,
  },
  {
    id: 'aquamin',
    name: 'Aquamin Mg + B6',
    benefits: [
      'Hořčík z mořských řas',
      'Nervy a energie',
      'Proti únavě',
    ],
    shopifyHandle: 'aquamin-mg-b6',
    image: aquaminImage,
  },
] as const

export function getBundleUrl(handle: string): string {
  return getShopifyCollectionUrl(handle) ?? getShopifyCatalogUrl()
}

export function getAltProductUrl(handle: string): string {
  return getShopifyProductUrl(handle) ?? getShopifyCatalogUrl()
}
