import {
  getShopifyCatalogUrl,
  getShopifyCollectionUrl,
  getShopifyProductUrl,
} from '../utils/shopify'

/** Alt homepage route — used for in-page nav hash links */
export const ALT_HOME_PATH = '/alt'

/** Section anchor IDs — used for in-page scroll */
export const ALT_SECTION_IDS = {
  regimeQuiz: 'regime-quiz',
  customerPaths: 'customer-paths',
  mainOffer: 'main-offer',
  comparison: 'comparison',
  products: 'produkty',
  story: 'vojta-story',
  howItWorks: 'how-it-works',
  faq: 'faq',
  reviews: 'reviews',
  contact: 'kontakt',
} as const

export const ALT_NAV_LINKS = [
  { label: 'Produkty', sectionId: ALT_SECTION_IDS.products },
  { label: 'Příběh Vojty', sectionId: ALT_SECTION_IDS.story },
  { label: 'Poradna', sectionId: ALT_SECTION_IDS.faq },
  { label: 'Kontakt', sectionId: ALT_SECTION_IDS.contact },
] as const

export const ALT_NAV_CTA = {
  label: 'Najít můj režim',
  sectionId: ALT_SECTION_IDS.regimeQuiz,
} as const

/** Handles must match Shopify Admin → Products → Collections (not auto-slug from title). */
export const customerPaths = [
  {
    id: 'nutrition',
    headline: 'Nutriční jistota',
    collectionHandle: 'nutricni-jistota',
    subtext:
      'Když nevíte, co tělu chybí — vitamíny, minerály a podpora metabolismu v jednom plánu.',
    cta: 'Získat jistotu →',
  },
  {
    id: 'no-meds',
    headline: 'Hubnu bez léků',
    collectionHandle: 'hubnu-bez-leku',
    subtext:
      'Přirozený režim hubnutí — sytost, živiny a systém bez GLP-1 léků na předpis.',
    cta: 'Režim bez léků →',
  },
  {
    id: 'hunger-cravings',
    headline: 'Hlad a chutě',
    collectionHandle: 'nestiham-jist-spravne',
    subtext:
      'Praktická podpora proti přejídání — když vás tělo neposlouchá a chutě přebíjí plán.',
    cta: 'Zklidnit chutě →',
  },
  {
    id: 'post-tapering',
    headline: 'Po vysazení',
    collectionHandle: 'po-vysazeni-glp-1',
    subtext:
      'Plynulý přechod bez jojo efektu — udržení sytosti a stabilní režim po léčbě.',
    cta: 'Režim po vysazení →',
  },
  {
    id: 'glp1-regime',
    headline: 'GLP-1 režim',
    collectionHandle: 'glp-1-rezim',
    subtext:
      'Podpora těla během GLP-1 léčby — živiny, sytost a péče o metabolismus v jednom systému.',
    cta: 'Režim pro GLP-1 →',
  },
] as const

export const ALT_SUB_NAV_LINKS = customerPaths.map((path) => ({
  label: path.headline,
  pathId: path.id,
  collectionHandle: path.collectionHandle,
  collectionUrl: getShopifyCollectionUrl(path.collectionHandle),
}))

export function getCustomerPathById(pathId: string) {
  return customerPaths.find((path) => path.id === pathId)
}

export function getCustomerPathCollectionUrl(pathId: string): string | null {
  const path = getCustomerPathById(pathId)
  return path ? getShopifyCollectionUrl(path.collectionHandle) : null
}

export function getCustomerPathAnchorId(pathId: string): string {
  return `path-${pathId}`
}

export const regimeProblems = [
  {
    id: 'hunger-returns',
    title: 'Hlad a chutě se vrací',
    description:
      'Hlad není jen o pocitu v žaludku. Když tělo nemá přesné signály, hlad se vrací silnější. Cukr, stres i nuda spouští chuťové výkyvy.',
    linkLabel: 'Ukázat podporu pro hlad a chutě →',
    pathId: 'hunger-cravings',
  },
  {
    id: 'metabolism-stalls',
    title: 'Jíte méně, ale tělo pořád nehubne',
    description:
      'Příliš málo často znamená pomalejší metabolismus, ztrátu svalů, únavu a větší hlad navíc.',
    linkLabel: 'Ukázat výživu při hubnutí →',
    pathId: 'nutrition',
  },
  {
    id: 'no-routine',
    title: 'Bez rutiny se všechno rozpadne',
    description:
      'Rozhodnutí vydrží pár dní. Ale systém, který je jednoduchý, vás nese i ve dnech, kdy se vám nechce.',
    linkLabel: 'Sestavit jednoduchý režim →',
    pathId: 'no-meds',
  },
] as const

export const ALT_SUB_NAV_CLUB = {
  label: 'Vojta Hubne klub',
  path: '/klub',
} as const

export const vojtaStoryCopy = {
  title: 'Příběh Vojty',
  paragraph:
    'Nepopsatelná proměna. Tuhle cestu jsem si šel sám — bez výmluv, bez zkratek a bez prázdných slibů. Hlad, energie, disciplína, výživa a správné doplňky. Ne skokové diety, ale systém, který dává smysl v reálném životě. Začal jsem pro sebe — a zůstal jsem, protože výsledky nebyly jen na váze, ale hlavně v hlavě.',
  cta: 'Chci znát celý příběh Vojty →',
} as const

export const vojtaStoryTimeline = [
  { id: 'start', caption: '160 kg' },
  { id: 'decision', caption: 'Rozhodnutí' },
  { id: 'result', caption: '99 kg' },
  { id: 'brand', caption: 'Vznik Vojta Hubne' },
] as const

/** Shopify product handle — Kompletní systém */
export const PROGRAM_PRODUCT_HANDLE = 'complete-fat-burning-system'

export function getProgramProductUrl(): string {
  return getShopifyProductUrl(PROGRAM_PRODUCT_HANDLE) ?? getShopifyCatalogUrl()
}

export function getPathCollectionUrl(handle: string): string {
  if (handle === 'all') return getShopifyCatalogUrl()
  return getShopifyCollectionUrl(handle) ?? getShopifyCatalogUrl()
}

export const programOffer = {
  name: 'Kompletní systém',
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
    name: 'Kompletní systém',
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

export const howItWorksOutcomes = {
  title: 'Co získáte na konci?',
  items: [
    {
      id: 'regime',
      lead: 'Jasné doporučení',
      rest: 'správného režimu pro vaši fázi',
    },
    {
      id: 'products',
      lead: 'Přehled produktů',
      rest: ', které vám pomohou uspět',
    },
    {
      id: 'steps',
      lead: 'Praktické kroky',
      rest: ', které můžete začít hned',
    },
    {
      id: 'motivation',
      lead: 'Motivaci a jistotu',
      rest: ', že jdete správným směrem',
    },
    {
      id: 'savings',
      lead: 'Ušetříte čas, peníze',
      rest: ' i zbytečné pokusy',
    },
  ],
  quote:
    'Každý má jinou výchozí pozici. Důležité je jít správným směrem.',
  signature: 'Vojta',
} as const

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
    product: 'Kompletní systém',
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
    product: 'Kompletní systém',
    rating: 4,
  },
] as const
