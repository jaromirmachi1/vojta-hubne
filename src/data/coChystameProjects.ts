export type CoChystameCategory =
  | 'Vše'
  | 'Připravujeme'
  | 'Vojta Lab'
  | 'Komunita'
  | 'Novinky'
  | 'Průvodce'

export type CoChystameProjectId =
  | 'odvodnovac'
  | 'kreatin'
  | 'probiotika'
  | 'nevinatko'
  | 'cafe'
  | 'flavor'
  | 'xxl'
  | 'samples'
  | 'affiliate'
  | 'lab'
  | 'active'

export type CoChystameProject = {
  id: CoChystameProjectId
  category: Exclude<CoChystameCategory, 'Vše'>
  status: string
  title: string
  kicker: string
  excerpt: string
  progress: number
  phase: string
  updatedAt: string
}

export const coChystameCategories: CoChystameCategory[] = [
  'Vše',
  'Připravujeme',
  'Vojta Lab',
  'Komunita',
  'Novinky',
  'Průvodce',
]

export const coChystameProjects: CoChystameProject[] = [
  {
    id: 'nevinatko',
    category: 'Připravujeme',
    status: 'Připravujeme',
    title: 'Neviňátko',
    kicker: 'Večerní směs',
    excerpt:
      'Jednoduchý večerní rituál s transparentním pracovním složením a jasně popsaným stavem vývoje.',
    progress: 64,
    phase: 'Pracovní etiketa připravena',
    updatedAt: '20. 7. 2026',
  },
  {
    id: 'cafe',
    category: 'Připravujeme',
    status: 'Ve vývoji',
    title: 'Cafe Lean Shake',
    kicker: 'Pracovní název',
    excerpt:
      'Samostatný řídký ranní nápoj z pravé kávy s proteinovou složkou. Ne další příchuť LEAN SHAKE.',
    progress: 36,
    phase: 'Čeká na testovací recepturu',
    updatedAt: '20. 7. 2026',
  },
  {
    id: 'odvodnovac',
    category: 'Připravujeme',
    status: 'Ve vývoji – ladíme finální podobu',
    title: 'Odvodňovač',
    kicker: 'Lehčí pocit. Méně zadržené vody.',
    excerpt:
      'Produkt zaměřený na podporu přirozeného hospodaření organismu s vodou a na pocit větší lehkosti při hubnutí.',
    progress: 60,
    phase: 'Aktivně ladíme a testujeme recepturu',
    updatedAt: '20. 7. 2026',
  },
  {
    id: 'kreatin',
    category: 'Připravujeme',
    status: 'Ve vývoji – ladíme finální podobu',
    title: 'Kreatin',
    kicker: 'Síla. Výkon. Udržení aktivního režimu.',
    excerpt:
      'Vlastní kreatin jako přirozená součást programu Vojta Hubne — jednoduché dávkování, dobrá rozpustnost a použití pro každého.',
    progress: 95,
    phase: 'Aktivně ladíme a testujeme recepturu',
    updatedAt: '20. 7. 2026',
  },
  {
    id: 'probiotika',
    category: 'Připravujeme',
    status: 'Ve vývoji – ladíme finální podobu',
    title: 'Probiotika',
    kicker: 'Podpora trávení a střevního mikrobiomu',
    excerpt:
      'Probiotický produkt jako doplněk k ostatním produktům Vojta Hubne. Ladíme kmeny, množství, stabilitu a vhodnou formu.',
    progress: 60,
    phase: 'Aktivně ladíme a testujeme recepturu',
    updatedAt: '20. 7. 2026',
  },
  {
    id: 'flavor',
    category: 'Komunita',
    status: 'Ve vývoji',
    title: 'Nová příchuť Lean Shake',
    kicker: 'Komunita rozhodla',
    excerpt:
      'Hlasování skončilo. Do výroby jdou Višeň v čokoládě a Čokoláda — dvě příchutě, které získaly nejvíc hlasů.',
    progress: 95,
    phase: 'Ladíme finální recepturu a výrobu',
    updatedAt: '4. 8. 2026',
  },
  {
    id: 'xxl',
    category: 'Novinky',
    status: 'Prověřujeme',
    title: 'XXL balení',
    kicker: 'Více porcí, méně objednávek',
    excerpt:
      'Větší balení GLP-1 Support a LEAN SHAKE pro pravidelné zákazníky. Receptury zůstávají stejné.',
    progress: 28,
    phase: 'Ověřujeme obaly a výrobu',
    updatedAt: '20. 7. 2026',
  },
  {
    id: 'samples',
    category: 'Novinky',
    status: 'Připravujeme',
    title: 'Malá zkušební balení',
    kicker: 'Nejdřív ochutnat',
    excerpt:
      'Placené testovací porce pro nové zákazníky, kteří nechtějí začínat nákupem celého balení.',
    progress: 24,
    phase: 'Řešíme formát a ekonomiku',
    updatedAt: '20. 7. 2026',
  },
  {
    id: 'affiliate',
    category: 'Komunita',
    status: 'Připravujeme pravidla',
    title: 'Affiliate program',
    kicker: 'Doporučení ze zkušenosti',
    excerpt:
      'Tři úrovně spolupráce pro aktivní zákazníky a tvůrce, kteří značku znají a chtějí ji autenticky doporučovat.',
    progress: 95,
    phase: 'Finalizujeme podmínky',
    updatedAt: '20. 7. 2026',
  },
  {
    id: 'lab',
    category: 'Vojta Lab',
    status: 'Vzniká komunita',
    title: 'Vojta Lab',
    kicker: 'Produkty tvořené společně',
    excerpt:
      'Menší tým aktivních zákazníků, který navrhuje, testuje a pomáhá rozhodovat o dalších produktech.',
    progress: 52,
    phase: 'Připravujeme první test',
    updatedAt: '20. 7. 2026',
  },
  {
    id: 'active',
    category: 'Vojta Lab',
    status: 'Pracovní koncept',
    title: 'Spalovač',
    kicker: 'Pracovní označení',
    excerpt:
      'Koncept produktu pro energii, motivaci a aktivní režim. Finální název, receptura i forma zatím nejsou schválené.',
    progress: 18,
    phase: 'Vyhodnocujeme zadání',
    updatedAt: '20. 7. 2026',
  },
]

