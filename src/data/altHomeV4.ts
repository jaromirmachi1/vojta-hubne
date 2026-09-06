import {
  getShopifyCatalogUrl,
  getShopifyCollectionUrl,
  getShopifyProductUrl,
} from '../utils/shopify'
import { vhPrinciplesStatements } from './vhPrinciples'
import { faqItems, reviews } from './altHomepage'
import { altBundles } from './altShopCatalog'
import { novinkyTeaserPosts } from './novinkyTeaserPosts'

export const ALT_V4_SECTION_IDS = {
  quiz: 'vyber',
  bestsellers: 'bestsellery',
  bundles: 'balicky',
  club: 'vh-club',
  biome: 'biome-4',
  comparison: 'srovnani',
  story: 'pribeh',
  principles: 'co-vh-nedela',
  men: 'chlapi',
  reviews: 'recenze',
  blog: 'blog',
  faq: 'faq',
  newsletter: 'novinky',
} as const

export const altV4Hero = {
  title: 'Hubnutí, které tělo zvládne',
  lead:
    'České doplňky stravy, proteinové shaky a péče o pleť pro lidi v redukci. Vyvinuté podle toho, co Vojta sám potřeboval při cestě ze 160 na 99 kg.',
  badgeValue: '−61 KG',
  badgeNote: 'za 14 měsíců',
  primaryCta: 'Poradit, co potřebuju',
  primarySub: '2 otázky · 15 sekund',
  secondaryCtaPrefix: 'Prohlédnout všech',
  catalogUrl: getShopifyCatalogUrl(),
} as const

export const altV4Trust = [
  { id: 'composition', label: ['Složení', '1:1'] as const, icon: 'leaf' },
  { id: 'gender', label: ['Pro ženy', 'i muže'] as const, icon: 'people' },
  { id: 'shipping', label: ['Odesíláme', 'do 24 h'] as const, icon: 'clock' },
  { id: 'returns', label: ['30 dní', 'na vrácení'] as const, icon: 'shield' },
] as const

export const altV4QuizCopy = {
  eyebrow: 'Jedna otázka',
  title: 'Co právě řešíte?',
  lead:
    'Klepněte na svou situaci. Hned pod ní se rozbalí, co bychom vám poslali my. Většina lidí začíná první možností.',
  panelEyebrow: 'Vybráno pro vás',
  addAll: 'Přidat vše do košíku',
  seeAll: 'Chci vidět všechny produkty',
} as const

export const altV4BestsellersCopy = {
  eyebrow: 'Nejprodávanější',
  title: 'Co lidé berou',
} as const

export const altV4BundlesCopy = {
  eyebrow: 'Balíčky na 30 dní',
  title: 'Méně rozhodování, více výsledků',
  lead: 'Jeden nákup na celý měsíc. Bez skládání košíku a bez přemýšlení, co k čemu.',
} as const

export const altV4Bundles = altBundles.map((b) => ({
  id: b.id,
  name: b.title,
  short: b.benefits.join(' · '),
  image: b.image,
  href: getShopifyCollectionUrl(b.collectionHandle) ?? getShopifyCatalogUrl(),
  unit: 'balíček',
}))

export const altV4Club = {
  eyebrow: 'Členství · zdarma při objednávce nad 2 990 Kč',
  title: 'VH Club:\n10 Kč = 1 bod',
  lead:
    'Body za každou objednávku, novinky až 30 dní před veřejným spuštěním, vzorky připravovaných produktů na objednání a hlas v tom, co půjde do výroby. Členství dostanete zdarma k objednávce nad 2 990 Kč — nebo hned za 499 Kč na rok.',
  tiles: [
    { big: '10 Kč', text: 'za 1 bod v každém nákupu' },
    { big: '30 dní', text: 'náskok u novinek' },
    { big: 'Vzorky', text: 'před veřejným spuštěním' },
    { big: 'Hlas', text: 'v tom, co půjde do výroby' },
  ],
  cta: 'Co všechno klub dává',
  href: '/klub',
} as const

export const altV4Biome = {
  badge: 'Novinka · předprodej',
  title: 'BIOME 4™',
  claim: '4 živé kultury · 5 miliard CFU',
  lead:
    'Když jíte výrazně méně, mění se i zažívání. Jedna tobolka denně před jídlem. Žádný prášek, žádné míchání.',
  notifyLabel: 'Dejte vědět, až bude v prodeji',
  detailLabel: 'Celé složení a dávkování',
  detailHref: '/co-chystame',
  footnote: 'Členové VH Clubu si ho koupí první.',
} as const

export const altV4Story = {
  eyebrow: 'Od Vojty osobně',
  title: 'Za každým produktem stojím jménem',
  paragraphs: [
    'Vojta si prošel celoživotním bojem s obezitou. Po letech neúspěšných pokusů, zdravotních komplikacích a váze 160 kg se v roce 2024 rozhodl převzít kontrolu nad svým zdravím. Díky kombinaci změny životního stylu, disciplíny a moderní léčby dokázal zhubnout 61 kilogramů a zásadně zlepšit kvalitu svého života.',
    'Každou recepturu si necháváme vyrobit v Česku podle toho, co jsme sami potřebovali — ne podle toho, co je ve velkoobchodu nejlevnější. Objednávky chodí z naší expedice a na zprávy odpovídáme sami.',
  ],
  quote:
    '„Nechci prodávat zázrak za týden. Chci dát lidem nástroje, které mi samotnému pomohly vydržet a dotáhnout to.“',
  quoteBy: '— Vojta Hubne',
} as const

export const altV4Principles = {
  titleLine1: 'Co VH',
  titleLine2: 'nedělá.',
  statements: vhPrinciplesStatements,
  ctaLabel: 'Jak produkty vznikají',
  ctaPath: '/co-chystame',
} as const

export const altV4Men = {
  titleLine1: 'Jo. Chlapi',
  titleLine2: 'tady nakupují taky.',
  lead:
    'Protein, hlad, svaly, minerály ani pokožka po zhubnutí nejsou ženská témata. A pokud vás překvapuje muž u ANTIAGE CREAM, naše zákaznické recenze to vysvětlí lépe než další odstavec marketingového textu.',
  ctaLabel: 'Přečíst zkušenosti zákazníků',
  productCtAs: [
    {
      label: 'Kreatin + HMB',
      href: getShopifyProductUrl('kreatin-hmb') ?? getShopifyCatalogUrl(),
    },
    {
      label: 'GHK-Cu Cream',
      href: getShopifyProductUrl('ghk-cu-cream') ?? getShopifyCatalogUrl(),
    },
  ],
} as const

export const altV4ReviewsCopy = {
  eyebrow: 'Ověřeno zákazníky',
  rating: '5.0 ★ z 5',
  source: 'Judge.me · ověřené nákupy',
} as const

export const altV4Reviews = reviews.map((r) => ({
  id: r.id,
  text: r.quote,
  who: r.name,
  what: r.product,
}))

export const altV4BlogCopy = {
  eyebrow: 'Blog',
  title: 'Co si přečíst, než něco koupíte',
  lead: 'Bez obchodních frází. Složení, redukce, péče o pleť a co se u nás právě mění.',
  allLabel: 'Blog — všechny články',
  novinkyLabel: 'Novinky a co chystáme',
} as const

export const altV4BlogPosts = novinkyTeaserPosts

export const altV4FaqCopy = {
  eyebrow: 'Než se rozhodnete',
  title: 'Na co se lidé ptají',
} as const

export const altV4Faq = faqItems

export const altV4Newsletter = {
  title: 'Buďte u toho s námi',
  lead:
    'Tipy, novinky, nové produkty, zákulisí vývoje a občas Karel z expedice. Bez každodenního spamu.',
  cta: 'Chci novinky',
  contactLabel: 'Kontakt, doprava a podmínky',
  contactHref: '/kontakt',
  legal: '© 2026 Vojta Hubne · RM Solution Group s.r.o.\nDoplňky stravy nejsou náhradou pestré stravy ani lékařské péče.',
} as const

export const altV4Promo = {
  tag: 'Novinky',
  text: 'Lean Shake Višeň v čokoládě + Kreatin HMB — objednávejte už teď',
}
