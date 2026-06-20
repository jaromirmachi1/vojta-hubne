export const vojtaStoryExpandedCopy = {
  journeyTitle: 'Moje cesta k lepší verzi sebe',
  helpedTitle: 'Co mi na cestě opravdu pomohlo',
  teachesTitle: 'Co dnes učím ostatní',
  whyTitle: 'Proč vznikl Vojta Hubne',
  whyText:
    'Vojta Hubne nevznikl jako marketingový nápad. Vznikl z frustrace — z regálu plného produktů, které slibovaly zázraky, ale neřešily reálný život. Chtěl jsem systém, který bych sám chtěl používat každý den. Proto vznikla značka, která stojí za reálnou proměnou 160 → 99 kg.',
  approachTitle: 'Můj přístup: bez extrémů, bez výmluv, bez zázraků',
  proofTitle: 'Důkaz, že to funguje',
  proofBefore: '160 kg',
  proofAfter: '99 kg',
  testimonialsTitle: 'Co říkají lidé',
  collapseCta: 'Skrýt celý příběh',
} as const

export const vojtaStoryJourney = [
  {
    id: 'start',
    phase: 'Začátek',
    weight: '160 kg',
    description: 'Nejhorší fyzická i mentální forma. Už jsem to chtěl vzdát.',
  },
  {
    id: 'first',
    phase: 'První změny',
    weight: '145 kg',
    description: 'První kilogramy pryč. Objevila se naděje, že to jde jinak.',
  },
  {
    id: 'persistence',
    phase: 'Vytrvalost',
    weight: '125 kg',
    description: 'Režim přestal být boj. Návyky začaly držet samy.',
  },
  {
    id: 'final',
    phase: 'Poslední kroky',
    weight: '105 kg',
    description: 'Tělo reagovalo. Energie, disciplína a jasnější hlava.',
  },
  {
    id: 'today',
    phase: 'Dnes',
    weight: '99 kg',
    description: 'Výsledek, který držím. Ne dieta — systém na celý život.',
  },
] as const

export const vojtaStoryHelped = [
  {
    id: 'food',
    title: 'Jednoduché stravování',
    description: 'Méně pravidel, víc sytosti a reálných porcí.',
  },
  {
    id: 'movement',
    title: 'Pravidelný pohyb',
    description: 'Ne extrémní tréninky — konzistence, která se dá udržet.',
  },
  {
    id: 'mindset',
    title: 'Vítězné myšlení',
    description: 'Když hlava ustoupí, tělo následuje. Naopak to nefunguje.',
  },
  {
    id: 'sleep',
    title: 'Spánek a regenerace',
    description: 'Bez spánku roste hlad, stres a chuť to vzdát.',
  },
  {
    id: 'routine',
    title: 'Rutina a systém',
    description: 'Jasné kroky místo chaosu. Vědět, co dělat každý den.',
  },
] as const

export const vojtaStoryTeaches = [
  'Jak nastavit režim, který vydrží i po náročném dni',
  'Jak pracovat s hladem, chutěmi a energií — ne proti nim',
  'Jak doplnit stravu chytře, ne náhodně z regálu',
  'Jak budovat návyky, které nepadají po prvním stresu',
] as const

export const vojtaStoryApproach = [
  {
    id: 'target',
    title: 'Cílený plán',
    description: 'Víte, co děláte a proč — ne hádání z týdne na týden.',
  },
  {
    id: 'no-extremes',
    title: 'Bez extrémů',
    description: 'Žádné hladovění ani zázračné diety na 14 dní.',
  },
  {
    id: 'consistency',
    title: 'Síla konzistence',
    description: 'Malé kroky každý den porazí velké skoky jednou za měsíc.',
  },
  {
    id: 'results',
    title: 'Reálné výsledky',
    description: 'Měřitelná změna těla i hlavy — ne jen číslo na váze.',
  },
] as const

export const vojtaStoryTestimonials = [
  {
    id: '1',
    quote:
      'Konečně mám pocit, že vím, co brát a kdy. Už se necítím ztracená v regálu doplňků.',
    name: 'Petra',
    detail: '38 let',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'Shake mi pomáhá držet sytost odpoledne. Není to magie, ale funguje to v reálném dni.',
    name: 'Martin',
    detail: '41 let',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'Líbí se mi, že za značkou stojí někdo, kdo to sám prošel. Působí to upřímně.',
    name: 'Jana',
    detail: '34 let',
    rating: 5,
  },
] as const
