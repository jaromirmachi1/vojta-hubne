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
    id: 'glp1-ziviny',
    handle: 'hubnete-s-glp-1-mene-jidla-nesmi-znamenat-mene-zivin',
    title: 'Hubnete s GLP-1? Méně jídla nesmí znamenat méně živin',
    lead:
      'Co ukázala studie o riziku závažného nedostatku vitaminu B1 — a proč u redukce záleží na kvalitě jídelníčku stejně jako na kaloriích.',
    date: '14. 9. 2026',
    dateTime: '2026-09-14',
    image: undefined,
  },
  {
    id: 'muzi',
    handle: 'hubnuti-u-muzu',
    title: 'Hubnutí u mužů: nejde jen o břicho. Co při redukci řešit',
    lead:
      'Obvod pasu, kondice, svalová hmota a příjem bílkovin — bez stereotypů a bez zázračných slibů.',
    date: '4. 9. 2026',
    dateTime: '2026-09-04',
    image:
      'https://shop.vojtahubne.cz/cdn/shop/articles/hubnenizensketema_b9fe636c-c119-4ad4-af0f-d8b71ca53367.png?v=1789295932',
  },
  {
    id: 'telo-po-zhubnuti',
    handle: 'co-se-muze-zmenit-na-tele-po-zhubnuti',
    title: 'Co se může změnit na těle po zhubnutí 20, 30 nebo 50 kg',
    lead:
      'Proporce, svaly, pokožka i vztah k tělu — milníky, ne biologické hranice.',
    date: '4. 9. 2026',
    dateTime: '2026-09-04',
    image:
      'https://shop.vojtahubne.cz/cdn/shop/articles/cosemuzestat_2e1674f2-9abe-471a-9cd6-fbb644b5a278.png?v=1789295942',
  },
  {
    id: 'bilkoviny',
    handle: 'jak-pri-redukci-hlidat-prijem-bilkovin',
    title: 'Jak při redukci hlídat příjem bílkovin',
    lead:
      'Proč při hubnutí nestačí jen ubírat kalorie — a jak prakticky hlídat bílkoviny v jídelníčku.',
    date: '4. 9. 2026',
    dateTime: '2026-09-04',
    image:
      'https://shop.vojtahubne.cz/cdn/shop/articles/bilkoviny_50fa763d-8dfd-4d11-8474-f5585cc9bfc7.png?v=1789295952',
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
