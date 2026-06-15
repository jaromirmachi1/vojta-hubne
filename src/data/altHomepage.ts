import {
  getShopifyCatalogUrl,
  getShopifyCollectionUrl,
  getShopifyProductUrl,
} from '../utils/shopify'

/** Section anchor IDs — used for in-page scroll */
export const ALT_SECTION_IDS = {
  customerPaths: 'customer-paths',
  mainOffer: 'main-offer',
  comparison: 'comparison',
  story: 'vojta-story',
  howItWorks: 'how-it-works',
  faq: 'faq',
  reviews: 'reviews',
} as const

/** Shopify product handle — 90 dní s Vojtou */
export const PROGRAM_PRODUCT_HANDLE = 'complete-fat-burning-system'

export function getProgramProductUrl(): string {
  return getShopifyProductUrl(PROGRAM_PRODUCT_HANDLE) ?? getShopifyCatalogUrl()
}

export const customerPaths = [
  {
    id: 'start',
    headline: 'Začínám hubnout',
    subtext: 'Chci vědět, kde začít a co brát jako první',
    cta: 'Začít tady →',
    collectionHandle: 'all',
  },
  {
    id: 'nutrients',
    headline: 'Jím méně a chci živiny',
    subtext: 'Hubnu, ale potřebuji tělu dát, co mu chybí',
    cta: 'Najít doplňky →',
    collectionHandle: 'all',
  },
  {
    id: 'maintain',
    headline: 'Chci udržet výsledek',
    subtext: 'Zhubl jsem a nechci jít zpátky',
    cta: 'Udržet výsledky →',
    collectionHandle: 'all',
  },
] as const

export function getPathCollectionUrl(handle: string): string {
  if (handle === 'all') return getShopifyCatalogUrl()
  return getShopifyCollectionUrl(handle) ?? getShopifyCatalogUrl()
}

export const programOffer = {
  name: '90 dní s Vojtou',
  price: 'Na míru dle balíčku',
  benefits: [
    'Kompletní systém doplňků na 90 dní',
    'Plán — co brát a kdy',
    'Podpora sytosti, živin a režimu',
    'Postaveno na reálné transformaci 160 → 99 kg',
  ],
} as const

export type ComparisonTierId = 'start' | 'premium' | 'vip' | 'program'

export const comparisonTiers: {
  id: ComparisonTierId
  name: string
  productHandle: string
  highlighted?: boolean
  badge?: string
}[] = [
  { id: 'start', name: 'Start', productHandle: 'glp1-support' },
  { id: 'premium', name: 'Premium', productHandle: 'lean-shake-glp-1' },
  { id: 'vip', name: 'VIP', productHandle: 'glp-1-support-lean-shake' },
  {
    id: 'program',
    name: '90 dní s Vojtou',
    productHandle: PROGRAM_PRODUCT_HANDLE,
    highlighted: true,
    badge: 'Nejlepší hodnota',
  },
]

// TODO: fill in real features from product specs / Shopify metafields
export const comparisonFeatures: {
  label: string
  values: Record<ComparisonTierId, boolean | string>
}[] = [
  {
    label: 'Podpora sytosti',
    values: { start: true, premium: true, vip: true, program: true },
  },
  {
    label: 'Proteinový shake',
    values: { start: false, premium: true, vip: true, program: true },
  },
  {
    label: 'Komplex vitamínů a minerálů',
    values: { start: true, premium: true, vip: true, program: true },
  },
  {
    label: 'Plán na 90 dní',
    values: { start: false, premium: false, vip: false, program: true },
  },
  {
    label: 'Osobní systém Vojty',
    values: { start: false, premium: false, vip: false, program: true },
  },
]

export const howItWorksSteps = [
  {
    id: 'protein',
    label: 'Bílkoviny',
    description: 'Sytost a stavba — základ, který drží den pohromadě.',
  },
  {
    id: 'minerals',
    label: 'Minerály',
    description: 'Co tělu chybí při deficitu a omezeném jídelníčku.',
  },
  {
    id: 'plan',
    label: 'Plán',
    description: 'Jasně víš, co brát a kdy — bez hádání.',
  },
  {
    id: 'routine',
    label: 'Režim',
    description: 'Systém, který zapadne do běžného života.',
  },
  {
    id: 'control',
    label: 'Kontrola',
    description: 'Výsledky, které vidíš a můžeš udržet.',
  },
] as const

export const faqItems = [
  {
    id: 'not-medicine',
    question: 'Jsou tyto produkty léky?',
    answer:
      'Ne. Jedná se o doplňky stravy. Nejsou určeny k diagnostice, léčbě ani prevenci nemocí a nenahrazují léky na předpis.',
  },
  {
    id: 'with-meds',
    question: 'Mohu je kombinovat s léky na hubnutí?',
    answer:
      'Doplňky stravy mohou někteří užívat vedle jiných postupů, ale vždy záleží na vaší konkrétní situaci. Před kombinací s léky na hubnutí nebo jinými přípravky se poraďte s lékařem.',
  },
  {
    id: 'not-working',
    question: 'Co když mi to nebude fungovat?',
    answer:
      'Hubnutí je individuální. Pokud s produktem nejste spokojeni, kontaktujte nás přes formulář na stránce Kontakt — společně najdeme řešení v rámci obchodních podmínek e-shopu.',
  },
  {
    id: 'not-for',
    question: 'Pro koho to není?',
    answer:
      'Pro děti, těhotné a kojící ženy a pro každého, kdo hledá zázračný prášek bez změny režimu. Systém funguje, když do něj vložíte reálnou snahu — stejně jako Vojta.',
  },
  {
    id: 'how-long',
    question: 'Jak dlouho trvá, než uvidím výsledky?',
    answer:
      'Záleží na výchozím stavu, režimu a konzistenci. Cílem není rychlá dieta na týden, ale udržitelný systém — první změny vnímá většina lidí během několika týdnů při dodržování plánu.',
  },
] as const

export const reviews = [
  {
    id: '1',
    quote:
      'Konečně mám pocit, že vím, co brát a kdy. Už se necítím ztracená v regálu doplňků.',
    name: 'Petra',
    city: 'Brno',
    product: '90 dní s Vojtou',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'Shake mi pomáhá držet sytost odpoledne. Není to magie, ale funguje to v reálném dni.',
    name: 'Martin',
    city: 'Praha',
    product: 'Lean Shake GLP-1',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'Líbí se mi, že za značkou stojí někdo, kdo to sám prošel. Působí to upřímně, ne jako reklama.',
    name: 'Jana',
    city: 'Ostrava',
    product: 'GLP-1 Support',
    rating: 5,
  },
  {
    id: '4',
    quote:
      'Objednávka dorazila rychle, balení působí prémiově a plán je srozumitelný i pro začátečníka.',
    name: 'Tomáš',
    city: 'Plzeň',
    product: '90 dní s Vojtou',
    rating: 4,
  },
] as const
