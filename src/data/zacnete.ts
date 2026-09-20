import { altV4Story } from './altHomeV4'
import { companyInfo } from './company'

export const ZACNETE_PRODUCTS_ID = 'produkty'
export const ZACNETE_NEWSLETTER_ID = 'novinky'

/** Same catalog IDs as homepage — live price/image via useAltV4Catalog. */
export const zacneteProductIds = ['lean', 'glp1'] as const

export const zacneteHero = {
  title: 'Co fungovalo mně, může fungovat i vám.',
  lead:
    'Já jsem začal tam, kde to bolelo nejvíc. Tady najdete doplňky a praktické nástroje, které mi pomohly vydržet — bez zázraků a bez skryté reklamy.',
  primaryCta: 'Chci start balíček',
  /** Shopify product: START Balíček (Lean Shake + GLP-1 Support) */
  startBundleHandle: 'start-balicek-1',
  socialProof: '160 → 99 kg · 450+ lidí · 100 % testováno na sobě',
} as const

export const zacneteQuote = {
  text: altV4Story.quote,
  by: altV4Story.quoteBy,
} as const

export const zacneteGuides = [
  {
    id: 'jidlo',
    title: 'Jídlo a snídaně',
    lead: 'Jak může vypadat jeden běžný den — ráno, den, večer — bez složité diety.',
    to: '/#den',
  },
  {
    id: 'kalkulacka',
    title: 'Kolik přibližně jíst',
    lead: 'Orientační denní příjem, BMI a BRI. Spočítejte si čísla podle sebe.',
    to: '/calculator',
  },
  {
    id: 'pribeh',
    title: 'Můj příběh',
    lead: 'Proč Vojta Hubne vznikl a co stálo za cestou ze 160 na 99 kg.',
    to: '/#pribeh',
  },
] as const

export const zacneteArticles = [
  {
    id: 'kosik',
    title: 'Nový košík, platby, VH CLUB a předplatné',
    lead: 'Co měníme v e-shopu a jaký přínos to má pro zákazníky.',
    handle: 'vojta-hubne-se-meni-novy-kosik-platby-vh-club-a-predplatne',
    kind: 'novinky' as const,
  },
  {
    id: 'club',
    title: 'Vítejte ve VH Clubu',
    lead: 'Co členství znamená a jak se k němu dostat jako první.',
    handle: 'vitejte-ve-vh-clubu',
    kind: 'blog' as const,
  },
  {
    id: 'muzi',
    title: 'Hubnutí u mužů: nejde jen o břicho',
    lead: 'TODO: napojit finální URL článku na shop.vojtahubne.cz/blogs.',
    handle: null,
    kind: 'todo' as const,
  },
  {
    id: 'predplatne',
    title: 'Předplatné: jak funguje a proč se vyplatí',
    lead: 'TODO: napojit finální URL článku na shop.vojtahubne.cz/blogs.',
    handle: null,
    kind: 'todo' as const,
  },
] as const

export const zacneteNewsletter = {
  title: 'Novinky do schránky',
  lead:
    'Občas tipy, novinky z e-shopu a upozornění na start balíčku. Bez spamu. Odesílá RM Solution Group s.r.o.',
  legal: `Odesláním souhlasíte se zpracováním e-mailu dle zásad ochrany osobních údajů. Provozovatel: ${companyInfo.name}.`,
} as const

export const zacneteDisclosure = {
  title: 'Vztah mezi projekty',
  body:
    'Vojta Hubne je komerční projekt Vojtěcha Křepindla. Cesta z obezity z.s. je samostatný pacientský spolek. Obojí vede stejný člověk — nejde o skrytou reklamu.',
  linkLabel: 'Víc o spolku Cesta z obezity',
  linkHref: 'https://cestazobezity.cz/o-nas/',
} as const
