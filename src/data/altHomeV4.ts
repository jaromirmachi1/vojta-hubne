import biomeImage from '../assets/biome4.png'
import bundlePost from '../assets/genericglp.png'
import bundleGlp from '../assets/all-bundle.png'
import bundleComplex from '../assets/90dnispicusemnew.png'
import aquaminImage from '../assets/glp1generic.png'
import d3Image from '../assets/vitality.png'
import kreatinImage from '../assets/glp1generic.png'
import ghkImage from '../assets/products/cream-ghk-cu.png'
import antiageImage from '../assets/products/emulfeel-cream.png'
import glpSupport from '../assets/products/glp-support.png'
import leanShake from '../assets/products/lean-shake.png'
import {
  getShopifyBlogUrl,
  getShopifyCatalogUrl,
  getShopifyCollectionUrl,
  getShopifyNovinkyArticleUrl,
  getShopifyProductUrl,
} from '../utils/shopify'

export const ALT_V4_SECTION_IDS = {
  bestsellers: 'best',
  quiz: 'vyber',
  daily: 'den',
  bundles: 'balicky',
  rest: 'nabidka',
  pipeline: 'co-chystame',
  story: 'pribeh',
  glossary: 'slozky',
  reviews: 'recenze',
  club: 'vh-club',
  blog: 'blog',
  faq: 'faq',
  newsletter: 'novinky',
} as const

export function formatAltCzk(value: number) {
  return `${Math.round(value).toLocaleString('cs-CZ').replace(/\u00a0/g, ' ')} Kč`
}

export type AltV4Spec = { k: string; v: string }

export type AltV4Product = {
  id: string
  name: string
  badge?: string
  claim: string
  reviews: string
  desc: string
  bullets: string[]
  specs: AltV4Spec[]
  value: number
  priceLabel?: string
  soon?: boolean
  clubOnly?: boolean
  shopifyHandle?: string
  href?: string
  image: string
  why: string
  unit: string
  livePrice?: string
}

const catalogUrl = getShopifyCatalogUrl()
const upcomingHref = '/co-chystame'

function productHref(handle?: string, fallback = catalogUrl) {
  return (handle && getShopifyProductUrl(handle)) || fallback
}

export const altV4Products: Record<string, AltV4Product> = {
  glp1: {
    id: 'glp1',
    name: 'GLP-1 Support',
    badge: 'Nejprodávanější',
    claim: 'Sytost · Kontrola chuti · Energie',
    reviews: '38 recenzí',
    desc: 'Komplex s Carolean®, berberinem, gymnemou a kreatinem pro podporu sytosti, metabolismu a energie. Výživová podpora během hubnutí.',
    bullets: [
      'Podpora sytosti během redukčního režimu',
      'Kontrola chuti k jídlu a chutí na sladké',
      'Energie, když jíte výrazně méně',
    ],
    specs: [
      { k: 'Balení', v: '120 kapslí · 82,4 g' },
      { k: 'Dávkování', v: 'Doporučená denní dávka podle etikety' },
      {
        k: 'Klíčové látky',
        v: 'Carolean® 3 200 mg, kreatin monohydrát 1 000 mg, berberin HCl 500 mg, gymnema sylvestre 500 mg, VinOgrape® 300 mg',
      },
    ],
    value: 1190,
    shopifyHandle: 'glp1-support',
    image: glpSupport,
    why: 'Sytost a kontrola chuti',
    unit: '120 kapslí',
  },
  lean: {
    id: 'lean',
    name: 'LEAN SHAKE GLP-1',
    badge: 'Nejprodávanější',
    claim: '22 g bílkovin · 107 kcal · 14 porcí',
    reviews: '34 recenzí',
    desc: 'Proteinový shake s CaroLean®, VinOgrape® a vitamíny. 22 g bílkovin v jedné dávce pro každodenní kontrolu váhy.',
    bullets: [
      'Jídlo, které zvládnete i bez chuti k jídlu',
      'Bílkoviny pro udržení svalů při hubnutí',
      'Vláknina a vitamíny v jedné dávce',
    ],
    specs: [
      { k: 'Balení', v: '14 dávek · 420 g' },
      { k: 'Bílkoviny', v: '22 g v jedné dávce' },
      { k: 'Příprava', v: 'Jedna odměrka do vody nebo mléka' },
    ],
    value: 849,
    shopifyHandle: 'lean-shake-glp-1',
    image: leanShake,
    why: '22 g bílkovin v jedné dávce',
    unit: '14 dávek',
  },
  kreatin: {
    id: 'kreatin',
    name: 'Kreatin + HMB',
    badge: 'Novinka',
    claim: '5 g kreatinu · 3 g CaHMB · 60 dávek',
    reviews: 'Nové',
    desc: 'Kreatin + HMB je práškový doplněk stravy se dvěma prověřenými látkami. Jedna odměrka denně, 60 dávek v balení.',
    bullets: [
      'Udržení síly při kalorickém deficitu',
      'Podpora aktivního režimu',
      'Jednoduché dávkování bez cyklování',
    ],
    specs: [
      { k: 'Balení', v: '480 g · 60 dávek' },
      { k: 'Dávkování', v: 'Jedna odměrka denně' },
      { k: 'Složení', v: '5 g kreatin monohydrát, 3 g CaHMB' },
    ],
    value: 590,
    shopifyHandle: 'kreatin-hmb',
    image: kreatinImage,
    why: 'Udržení síly a svalů',
    unit: '60 dávek',
  },
  d3k2: {
    id: 'd3k2',
    name: 'D3 + K2 + Vápník',
    claim: 'Kosti · Svaly · Imunita',
    reviews: '8 recenzí',
    desc: 'Trio vitamínu D3, K2 a vápníku pro kosti, svaly a imunitu v jedné dávce.',
    bullets: [
      'Kosti pod zátěží při hubnutí',
      'Podpora imunity celoročně',
      'Vápník a K2 ve správném poměru',
    ],
    specs: [
      { k: 'Balení', v: '60 kapslí' },
      { k: 'Dávkování', v: 'Podle etikety, denně' },
      { k: 'Složení', v: 'Vitamín D3, vitamín K2, vápník' },
    ],
    value: 790,
    shopifyHandle: 'd3-k2-vapnik',
    image: d3Image,
    why: 'Kosti, svaly a imunita',
    unit: '60 kapslí',
  },
  aquamin: {
    id: 'aquamin',
    name: 'Aquamin® Mg + B6',
    claim: 'Hořčík z mořské vody · Vitamín B6',
    reviews: '4 recenze',
    desc: 'Při změně jídelníčku chcete mít jasno v tom, co doplňujete. Aquamin® Mg + B6 je samostatná suplementace hořčíku z mořské vody.',
    bullets: [
      'Doplnění hořčíku při omezeném jídelníčku',
      'Podpora nervové soustavy',
      'Bez zbytečných příměsí',
    ],
    specs: [
      { k: 'Forma', v: 'Hořčík z mořské vody (Aquamin®)' },
      { k: 'Navíc', v: 'Vitamín B6' },
      { k: 'Použití', v: 'Denní doplnění minerálů' },
    ],
    value: 390,
    shopifyHandle: 'aquamin-mg-b6',
    image: aquaminImage,
    why: 'Samostatný hořčík',
    unit: 'doplněk',
  },
  ghk: {
    id: 'ghk',
    name: 'GHK-CU CREAM',
    claim: 'Každodenní péče o pokožku po výrazné změně hmotnosti',
    reviews: '3 recenze',
    desc: 'Hydratace, komfort a péče o vzhled pokožky po výrazné změně hmotnosti. Kosmetika neodstraňuje nadbytečnou kůži a nenahrazuje plastickou chirurgii.',
    bullets: [
      'Každodenní hydratace a komfort pokožky',
      'Péče o vzhled pokožky po redukci',
      'Bez slibů, které kosmetika splnit nemůže',
    ],
    specs: [
      { k: 'Aktivní látka', v: 'Peptid mědi GHK-Cu' },
      { k: 'Pro koho', v: 'Pokožka po výrazném hubnutí' },
      { k: 'Použití', v: 'Ráno i večer na čistou pleť' },
    ],
    value: 1990,
    shopifyHandle: 'ghk-cu-cream',
    image: ghkImage,
    why: 'Pokožka po zhubnutí',
    unit: 'krém',
  },
  antiage: {
    id: 'antiage',
    name: 'ANTIAGE CREAM Emulfeel®',
    claim: 'Péče po každém kilogramu dolů',
    reviews: '2 recenze',
    desc: 'Péče, kterou vaše pleť potřebuje po každém kilogramu dolů. Luxusní krém s Emulfeel® a šesti aktivními látkami.',
    bullets: [
      'Hydratace a pevnost pleti',
      'Péče o obličej po hubnutí',
      'Prémiová textura, rychlé vstřebání',
    ],
    specs: [
      { k: 'Aktivní látky', v: '6 aktivních látek, Emulfeel®' },
      { k: 'Pro koho', v: 'Pleť po redukci váhy' },
      { k: 'Použití', v: 'Každodenní péče' },
    ],
    value: 2490,
    shopifyHandle: 'antiage-cream-emulfeel®',
    image: antiageImage,
    why: 'Každodenní péče o pleť',
    unit: 'krém',
  },
  biome4: {
    id: 'biome4',
    name: 'BIOME 4™',
    badge: 'Novinka · předprodej',
    claim: '4 živé bakteriální kultury · 5 miliard CFU',
    reviews: 'Novinka',
    desc: 'Když jíte výrazně méně, mění se i zažívání. BIOME 4 je nejjednodušší krok, který k režimu můžete přidat: čtyři živé bakteriální kultury v deklarovaném množství 5 miliard CFU v jedné tobolce. Žádný prášek, žádné míchání.',
    bullets: [
      'Jedna tobolka denně — nejjednodušší krok v celém režimu',
      'Čtyři kmeny místo jednoho, s uvedeným množstvím CFU u každého',
      'Bez příchutí a bez míchání, vejde se do každého rána',
    ],
    specs: [
      { k: 'Balení', v: '30 tobolek · 30 dávek · 17,82 g' },
      {
        k: 'Dávkování',
        v: '1 tobolka denně, ideálně před jídlem. Zapijte dostatečným množstvím vody.',
      },
      {
        k: 'Kultury',
        v: 'Lactobacillus acidophilus (La-11) 2 mld. CFU · Lactobacillus plantarum (Lp-115) 1,25 mld. CFU · Bifidobacterium lactis (Bl-04) 1 mld. CFU · Bifidobacterium lactis (Bl-05) 0,75 mld. CFU',
      },
    ],
    value: 0,
    priceLabel: 'Předprodej',
    soon: true,
    href: upcomingHref,
    image: biomeImage,
    why: 'Zažívání při omezeném jídle',
    unit: '30 tobolek',
  },
  hair: {
    id: 'hair',
    name: 'VH HAIR',
    badge: 'Novinka · předprodej',
    claim: 'Hair Nutrition Complex · zinek, selen, biotin',
    reviews: 'Novinka',
    desc: 'Při rychlé redukci a omezeném jídelníčku bývají vlasy první, co dá znát, že tělu něco chybí. VH HAIR je složený přesně pro tohle období — síra, aminokyseliny, stopové prvky a vitamíny skupiny B v jedné denní dávce.',
    bullets: [
      'Jedna denní dávka, žádné míchání',
      'Síra a aminokyseliny jako základ, ne jen biotin do reklamy',
      'U každé látky víte přesné množství',
    ],
    specs: [
      { k: 'Balení', v: '120 tobolek · 30 dní · 52,4 g' },
      { k: 'Cena', v: '699 Kč' },
      { k: 'Dávkování', v: '4 tobolky denně = jedna denní dávka' },
    ],
    value: 699,
    soon: true,
    href: upcomingHref,
    image: d3Image,
    why: 'Vlasy při rychlé redukci',
    unit: '30 dní',
  },
  ileancoko: {
    id: 'ileancoko',
    name: 'iLEAN SHAKE™ ČOKOLÁDA',
    badge: 'Novinka · jen pro členy',
    claim: 'Bez inulinu · s probiotickou složkou',
    reviews: 'Novinka',
    desc: 'iLEAN SHAKE ČOKOLÁDA je varianta našeho shaku bez inulinu, doplněná probiotickou složkou. Pro lidi, kterým běžná vláknina při redukci nesedne. První série je menší, proto ji nabízíme jen členům VH Clubu.',
    bullets: [
      'Bez inulinu, když vám vláknina nesedne',
      'Probiotická složka přímo v dávce',
      'Stejných 22 g bílkovin jako v LEAN SHAKE',
    ],
    specs: [
      { k: 'Balení', v: '14 dávek · 420 g' },
      { k: 'Složení', v: 'LEAN základ bez inulinu, s probiotickou složkou' },
      { k: 'Dostupnost', v: 'První série — jen pro členy VH Clubu' },
    ],
    value: 849,
    clubOnly: true,
    shopifyHandle: 'lean-shake-glp-1',
    image: leanShake,
    why: 'Shake bez inulinu',
    unit: '14 dávek',
  },
  bnutricni: {
    id: 'bnutricni',
    name: 'Nutriční jistota 30',
    badge: 'Balíček',
    claim: '30denní plán · nutriční základ',
    reviews: 'Balíček',
    desc: 'Když jíte méně, záleží ještě víc na tom, co jíte. Při hubnutí se přirozeně mění množství jídla, velikost porcí i celý denní režim — tento balíček drží nutriční základ na 30 dní.',
    bullets: [
      'Méně rozhodování — vše připravené',
      'Nutriční základ pro redukční režim',
      'Výhodnější než jednotlivé produkty',
    ],
    specs: [
      { k: 'Délka', v: '30 dní' },
      { k: 'Pro koho', v: 'Nevíte, co tělu chybí' },
      { k: 'Obsah', v: 'Kombinace doplňků pro denní režim' },
    ],
    value: 2990,
    href: getShopifyCollectionUrl('nutricni-jistota') ?? catalogUrl,
    image: bundleComplex,
    why: 'Nutriční základ na 30 dní',
    unit: 'balíček',
  },
  bpoglpsmart: {
    id: 'bpoglpsmart',
    name: 'Po GLP SMART 30',
    badge: 'Balíček',
    claim: '30denní plán · po GLP-1',
    reviews: 'Balíček',
    desc: 'Balíček pro období po GLP-1 režimu nebo při návratu do běžného fungování. Je určený pro lidi, kteří se bojí návratu hladu, chutí, větších porcí nebo ztráty kontroly.',
    bullets: [
      'Udržení sytosti po vysazení',
      'Stabilní režim bez jojo efektu',
      'Připravený plán na celý měsíc',
    ],
    specs: [
      { k: 'Délka', v: '30 dní' },
      { k: 'Pro koho', v: 'Po ukončení GLP-1 léčby' },
      { k: 'Obsah', v: 'Sytost, bílkoviny, minerály' },
    ],
    value: 3849,
    href: getShopifyCollectionUrl('po-vysazeni-glp-1') ?? catalogUrl,
    image: bundlePost,
    why: 'Přechod po vysazení',
    unit: 'balíček',
  },
  bpoglpintense: {
    id: 'bpoglpintense',
    name: 'Po GLP INTENSE 30',
    badge: 'Balíček',
    claim: '30denní plán · silnější varianta',
    reviews: 'Balíček',
    desc: 'GLP-1 období může skončit. Režim, který jste si vybudovali, ale pokračuje dál. Po GLP INTENSE 30 je komplexní 30denní balíček pro období po ukončení GLP-1 léčby.',
    bullets: [
      'Nejkomplexnější podpora po GLP-1',
      'Hlad, chutě i výživa v jednom',
      'Vše na 30 dní bez přemýšlení',
    ],
    specs: [
      { k: 'Délka', v: '30 dní' },
      { k: 'Pro koho', v: 'Náročnější přechod po léčbě' },
      { k: 'Obsah', v: 'Kompletní měsíční systém' },
    ],
    value: 4190,
    href: getShopifyCollectionUrl('po-vysazeni-glp-1') ?? catalogUrl,
    image: bundleGlp,
    why: 'Silnější podpora po léčbě',
    unit: 'balíček',
  },
  bvahaplet: {
    id: 'bvahaplet',
    name: 'Váha & pleť SMART',
    badge: 'Balíček',
    claim: 'Měsíční režim · tělo i pleť',
    reviews: 'Balíček',
    desc: 'Hubnutí mění číslo na váze. Často ale mění i pokožku. Váha & pleť SMART je balíček pro období, kdy nechcete řešit pouze jídelníček, ale i pokožku.',
    bullets: [
      'Výživa a péče o pokožku současně',
      'Pro období výrazného hubnutí',
      'Jeden nákup místo šesti',
    ],
    specs: [
      { k: 'Délka', v: 'Měsíční režim' },
      { k: 'Pro koho', v: 'Hubnutí i péče o pokožku' },
      { k: 'Obsah', v: 'Doplňky + krémy' },
    ],
    value: 7290,
    href: catalogUrl,
    image: ghkImage,
    why: 'Tělo i pleť v jednom',
    unit: 'balíček',
  },
}

export function getAltV4ProductHref(product: AltV4Product) {
  if (product.href) return product.href
  return productHref(product.shopifyHandle)
}

export function getAltV4ProductPrice(product: AltV4Product) {
  if (product.priceLabel) return product.priceLabel
  return product.livePrice ?? formatAltCzk(product.value)
}

export const altV4BestIds = ['glp1', 'lean', 'kreatin'] as const
export const altV4RestIds = [
  'ileancoko',
  'd3k2',
  'aquamin',
  'ghk',
  'antiage',
  'biome4',
  'hair',
] as const
export const altV4BundleIds = ['bnutricni', 'bpoglpsmart', 'bvahaplet'] as const

export const altV4Hero = {
  titleLine1: 'Hubnutí, které',
  titleLine2: 'tělo zvládne.',
  lead:
    'Doplňky stravy, funkční výživa a péče o pokožku s přesně uvedeným složením. Vznikly z reálné zkušenosti Vojty — ze 160 na 99 kg.',
  badgeValue: '160 → 99 KG',
  badgeNote: '−61 kg',
  primaryCta: 'Začít u nejprodávanějších',
  secondaryCta: 'Nechat si poradit · 2 otázky',
} as const

export const altV4Trust = [
  { id: 'composition', label: ['Složení', '1:1'] as const, icon: 'leaf' },
  { id: 'recipes', label: ['Vlastní', 'receptury'] as const, icon: 'truck' },
  { id: 'shipping', label: ['Odesíláme', 'do 24 h'] as const, icon: 'clock' },
  { id: 'returns', label: ['Ověřené', 'nákupy'] as const, icon: 'shield' },
] as const

export const altV4QuizCopy = {
  eyebrow: 'Poradce · jedna otázka',
  title: 'Co právě řešíte?',
  lead:
    'Vyberte situaci a hned pod ní se ukáže, co k ní patří — jednotlivě, nebo jako celý měsíční režim.',
  addAll: 'Otevřít v e-shopu',
  seeAll: 'Chci vidět všechny produkty',
} as const

export const altV4QuizScopes = [
  { id: 'single', label: 'Jeden, dva produkty' },
  { id: 'plan', label: 'Plán na 30 dní' },
] as const

export const altV4Situations = [
  {
    id: 'glp1rezim',
    num: '01',
    name: 'Jsem v GLP-1 režimu',
    rec: ['glp1', 'lean', 'kreatin'] as const,
    plan: ['bnutricni'] as const,
    note: 'Bílkoviny a minerály jsou při léčbě to první, co tělu chybí.',
    collectionHandle: 'glp-1-rezim',
  },
  {
    id: 'povysazeni',
    num: '02',
    name: 'Končím nebo jsem skončil',
    rec: ['lean', 'glp1'] as const,
    plan: ['bpoglpsmart'] as const,
    note: 'Nejcitlivější období celé cesty. Tady se rozhoduje, jestli váha zůstane dole.',
    collectionHandle: 'po-vysazeni-glp-1',
  },
  {
    id: 'hlad',
    num: '03',
    name: 'Hlad a chutě',
    rec: ['glp1', 'lean'] as const,
    plan: ['bpoglpintense'] as const,
    note: 'Tohle je nejčastější kombinace v našich objednávkách.',
    collectionHandle: 'nestiham-jist-spravne',
  },
  {
    id: 'bezleku',
    num: '04',
    name: 'Hubnu bez léků',
    rec: ['lean', 'glp1'] as const,
    plan: ['bnutricni'] as const,
    note: 'Sytost a bílkoviny nejdřív. Zbytek se dá přidat později.',
    collectionHandle: 'hubnu-bez-leku',
  },
  {
    id: 'nutricni',
    num: '05',
    name: 'Nutriční jistota',
    rec: ['d3k2', 'aquamin'] as const,
    plan: ['bnutricni'] as const,
    note: 'Základ, který má smysl mít doma celoročně.',
    collectionHandle: 'nutricni-jistota',
  },
] as const

export const altV4BestsellersCopy = {
  eyebrow: 'Nejprodávanější · vše důležité tady',
  titleLine1: 'Co lidé berou',
  titleLine2: 'a proč',
  lead:
    'U každého produktu najdete složení, dávkování a k čemu je. Nemusíte nikam odbíhat — rozbalte si detaily přímo tady.',
} as const

export const altV4DailyCopy = {
  eyebrow: 'Jak to používat',
  title: 'Jeden běžný den',
  footnote:
    'Doplňky stravy nejsou náhradou pestré stravy ani lékařské péče. Pokud se léčíte, poraďte se se svým lékařem.',
} as const

export const altV4Daily = [
  {
    time: 'RÁNO',
    title: 'Doplňky nalačno',
    text: 'GLP-1 Support podle etikety, k tomu D3 + K2 + Vápník. Pokud řešíte zažívání, přidejte BIOME 4 před jídlem.',
  },
  {
    time: 'DEN',
    title: 'Bílkoviny místo výpadku',
    text: 'LEAN SHAKE jako svačina nebo náhrada jídla, když nemáte chuť nebo čas. 22 g bílkovin a 107 kcal v jedné dávce.',
  },
  {
    time: 'VEČER',
    title: 'Regenerace a péče',
    text: 'Kreatin + HMB kdykoli během dne, Aquamin Mg + B6 večer. Na pokožku GHK-CU nebo ANTIAGE po umytí.',
  },
] as const

export const altV4BundlesCopy = {
  eyebrow: 'Balíčky na 30 dní',
  titleLine1: 'Když nechcete',
  titleLine2: 'skládat košík',
  lead:
    'Balíček je hotový měsíční režim: co brát ráno, co k jídlu a co večer. Jedna objednávka, žádné dohadování, co k čemu patří.',
} as const

export const altV4RestCopy = {
  eyebrow: 'Zbytek nabídky',
  titleLine1: 'Doplňky, shaky',
  titleLine2: 'a péče o pokožku',
  catalogCta: 'Katalog s filtry',
  catalogUrl,
} as const

export const altV4PipelineCopy = {
  title: 'Co chystáme',
  allLabel: 'Vše →',
  allHref: '/co-chystame',
  lead:
    'Ukazujeme i to, co ještě není hotové. Členové klubu kupují novinky o 30 dní dřív.',
} as const

export const altV4Pipeline = [
  {
    id: 'kreatin',
    state: 'Již v prodeji',
    name: 'Kreatin + HMB',
    desc: 'Vlastní kreatin je hotový a skladem. 5 g kreatin monohydrátu a 3 g CaHMB v jedné denní dávce, 60 dávek v balení.',
    buyable: true,
    productId: 'kreatin',
    cta: 'Koupit hned',
  },
  {
    id: 'malina',
    state: 'Již v prodeji · jen pro členy',
    name: 'LEAN SHAKE™ Malina',
    desc: 'Nová příchuť je vyrobená. První sérii nabízíme členům VH Clubu dřív, než půjde do veřejného e-shopu.',
    buyable: true,
    productId: 'lean',
    cta: 'Koupit — jen pro členy',
  },
  {
    id: 'ileancoko',
    state: 'Již v prodeji · jen pro členy',
    name: 'iLEAN SHAKE™ Čokoláda',
    desc: 'Varianta bez inulinu s probiotickou složkou. Menší první série, proto zatím jen pro členy.',
    buyable: true,
    productId: 'ileancoko',
    cta: 'Koupit — jen pro členy',
  },
  {
    id: 'flavor',
    state: 'Komunita rozhodla',
    name: 'Nová příchuť Lean Shake',
    desc: 'Hlasování skončilo. Do výroby jdou Višeň v čokoládě a Čokoláda — dvě příchutě, které získaly nejvíc hlasů.',
    buyable: false,
  },
  {
    id: 'odvodnovac',
    state: 'Ve vývoji — ladíme finální podobu',
    name: 'Odvodňovač',
    desc: 'Produkt zaměřený na podporu přirozeného hospodaření organismu s vodou a na pocit větší lehkosti při hubnutí.',
    buyable: false,
  },
] as const

export const altV4Story = {
  eyebrow: 'Od Vojty osobně',
  titleLine1: 'Proč to',
  titleLine2: 'vůbec vzniklo',
  paragraphs: [
    'Vojta si prošel celoživotním bojem s obezitou. Po letech neúspěšných pokusů, zdravotních komplikacích a váze 160 kg se v roce 2024 rozhodl převzít kontrolu nad svým zdravím a zhubnul 61 kilogramů.',
    'Během té cesty narazil na dvě věci. Sytost a bílkoviny se řeší každý den, ne jednou za měsíc. A většina doplňků na trhu neuvádí, kolik čeho v nich vlastně je. Proto má každá naše etiketa přesná množství a receptury si necháváme vyrábět v Česku.',
  ],
  quote:
    '„Nechci prodávat zázrak za týden. Chci dát lidem nástroje, které mi samotnému pomohly vydržet a dotáhnout to.“',
  quoteBy: '— Vojta Hubne',
  cta: 'Celý příběh a komunita',
  ctaHref: 'https://www.instagram.com/vojtahubne/',
} as const

export const altV4GlossaryCopy = {
  eyebrow: 'Slovníček bez marketingu',
  titleLine1: 'Co které složky',
  titleLine2: 'vlastně dělají',
} as const

export const altV4Glossary = [
  {
    term: 'Carolean®',
    text: 'Standardizovaný extrakt, který v GLP-1 Supportu tvoří hlavní podíl — 3 200 mg v denní dávce. Uvádíme přesné množství, ne „proprietární směs“.',
  },
  {
    term: 'Berberin',
    text: 'Rostlinný alkaloid z dřišťálu. V doplňcích se používá jako podpora metabolismu. Není to lék a nenahrazuje léčbu.',
  },
  {
    term: 'CaHMB',
    text: 'Vápenatá sůl HMB, metabolitu leucinu. V kombinaci s kreatinem se používá při udržování síly v kalorickém deficitu — 3 g v denní dávce.',
  },
  {
    term: 'Aquamin®',
    text: 'Hořčík a minerály z mořské vody, ne syntetický oxid. Doplněné vitamínem B6 pro lepší využití.',
  },
  {
    term: 'GHK-Cu',
    text: 'Peptid mědi v kosmetice. Pečuje o vzhled a komfort pokožky. Neodstraňuje nadbytečnou kůži a nenahrazuje plastickou chirurgii — to říkáme rovnou.',
  },
] as const

export const altV4ReviewsCopy = {
  eyebrow: 'Ověřeno zákazníky',
  rating: '5,0 ★ z 5',
  source: 'Judge.me · ověřené nákupy',
} as const

export const altV4Reviews = [
  {
    id: '1',
    text: '„Super, chutné a kremové. Pijem namiesto večere a zasýti. Odporucam a kupim zase.“',
    who: 'Katarina Buzova',
    what: 'LEAN SHAKE GLP-1',
  },
  {
    id: '2',
    text: '„Je to opravdová podpora, účinně podpoří snahu o změnu ve stravování. Beru 3 kapsle dopoledne a zvládám nastavený stravovací plán v naprosté pohodě.“',
    who: 'Šárka Sirůčková',
    what: 'GLP-1 Support',
  },
  {
    id: '3',
    text: '„Jsem moc spokojená, komunikace s e-shopem výborná, dodací lhůta super krátká.“',
    who: 'Iva Hamplová',
    what: 'Judge.me Shop Reviews',
  },
] as const

export const altV4Club = {
  eyebrow: 'Členství',
  title: 'VH Club',
  lead:
    'Členství získáte zdarma k objednávce od 2 990 Kč, nebo si ho koupíte hned za 499 Kč na 12 měsíců. Členové sbírají body, kupují novinky až 30 dní dřív a hlasují o tom, co půjde do výroby.',
  tiles: [
    { big: '0 Kč', text: 'při objednávce od 2 990 Kč' },
    { big: '499 Kč', text: 'na 12 měsíců, když chcete hned' },
  ],
  cta: 'Co všechno klub dává',
  href: '/klub',
} as const

export const altV4BlogCopy = {
  eyebrow: 'Blog',
  titleLine1: 'Co si přečíst,',
  titleLine2: 'než něco koupíte',
  allLabel: 'Blog — všechny články',
} as const

export const altV4BlogPosts = [
  {
    id: 'muzi',
    cat: 'Redukce',
    date: '4. září 2026',
    title: 'Hubnutí u mužů: nejde jen o břicho. Co při redukci řešit',
    lead:
      'Hubnutí u mužů není jen o čísle na váze. Při redukci dává smysl sledovat také obvod pasu, kondici, svalovou hmotu, příjem bílkovin a jednoduše i to, jak se ve vlastním těle cítíte.',
    href: getShopifyBlogUrl(),
  },
  {
    id: 'predplatne',
    cat: 'VH Club',
    date: '28. srpen 2026',
    title: 'Předplatné: jak funguje a proč se vyplatí',
    lead:
      'Vyberete produkt, interval a dodávky chodí samy o 15 % výhodněji. Termín, množství i produkt měníte kdykoli, vázanost žádná.',
    href: getShopifyBlogUrl(),
  },
  {
    id: 'zmena',
    cat: 'E-shop',
    date: '14. srpen 2026',
    title: 'Vojta Hubne se mění: nový košík, platby, VH CLUB a předplatné',
    lead:
      'Připravujeme jednodušší košík, pohodlnější platby, VH CLUB a předplatné. Podívejte se, co měníme a jaký přínos budou mít novinky pro zákazníky VH.',
    href: getShopifyNovinkyArticleUrl(
      'vojta-hubne-se-meni-novy-kosik-platby-vh-club-a-predplatne',
    ),
  },
]

export const altV4FaqCopy = {
  title: 'Na co se lidé ptají',
  contactLabel: 'Doprava, platba a podmínky',
  contactHref: '/kontakt',
} as const

export const altV4Faq = [
  {
    id: 'not-medicine',
    question: 'Nahradí to lék na předpis?',
    answer:
      'Ne. Doplněk stravy není lék a nikdy o něm takto nemluvíme. Naše produkty jsou výživová podpora režimu — sytost, bílkoviny, minerály a péče o pleť.',
  },
  {
    id: 'with-meds',
    question: 'Beru GLP-1 od lékaře. Můžu to kombinovat?',
    answer:
      'Většina zákazníků právě v takové situaci je. Vždy se ale poraďte se svým lékařem — on zná vaši léčbu i dávkování.',
  },
  {
    id: 'shipping',
    question: 'Za jak dlouho to přijde?',
    answer:
      'Skladové produkty odesíláme do 24 hodin v pracovní dny. Zásilkovna obvykle druhý pracovní den, kurýr na adresu následující pracovní den.',
  },
  {
    id: 'returns',
    question: 'Co když mi to nebude chutnat nebo sednout?',
    answer:
      'Máte 30 dní na vrácení, i když balení otevřete. Napište nám a vyřešíme to — peníze vracíme bez zdlouhavého vysvětlování.',
  },
  {
    id: 'who',
    question: 'Kdo za e-shopem stojí?',
    answer:
      'Vojta Hubne a malý tým v Žabni u Frýdku-Místku. Receptury si necháváme vyrobit v Česku, objednávky balíme sami a na dotazy odpovídáme sami.',
  },
] as const

export const altV4Newsletter = {
  title: 'Buďte u toho s námi',
  lead: 'Novinky, nové příchutě a zákulisí vývoje. Bez každodenního spamu.',
  cta: 'Chci novinky',
  legal:
    '© 2026 Vojta Hubne · RM Solution Group s.r.o.\nDoplňky stravy nejsou náhradou pestré stravy ani lékařské péče.',
} as const

export const altV4Promos = [
  {
    tag: 'Jen pro členy',
    text: 'LEAN SHAKE™ MALINA — nová příchuť pro členy klubu',
    href: productHref('lean-shake-glp-1'),
  },
  {
    tag: 'Jen pro členy',
    text: 'iLEAN SHAKE™ ČOKOLÁDA · bez inulinu, první série',
    href: productHref('lean-shake-glp-1'),
  },
  {
    tag: 'Novinka',
    text: 'Kreatin + HMB · 60 dávek, 590 Kč — už skladem',
    href: productHref('kreatin-hmb'),
  },
  {
    tag: 'Předprodej',
    text: 'BIOME 4™ — 4 živé kultury, 5 miliard CFU',
    href: upcomingHref,
  },
  {
    tag: 'Předprodej',
    text: 'VH HAIR · 120 kapslí na 30 dní, 699 Kč',
    href: upcomingHref,
  },
  {
    tag: 'Nová příchuť',
    text: 'Lean Shake™ Višeň v čokoládě — k dodání',
    href: productHref('lean-shake-glp-1'),
  },
]
