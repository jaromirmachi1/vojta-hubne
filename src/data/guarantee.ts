export const GUARANTEE_PATH = '/30denni-garance'

export const GUARANTEE_MAIL =
  'mailto:info@vojtahubne.cz?subject=30denn%C3%AD%20garance%20VH'

export const guaranteeFaqs = [
  {
    q: 'Můžu vrátit otevřené balení?',
    a: 'Ano. Garance platí i na otevřené a vyzkoušené balení. Chceme, abys mohl zjistit, jestli ti produkt opravdu vyhovuje.',
  },
  {
    q: 'Od kdy běží 30 dní?',
    a: 'Od převzetí produktu. Pokud ti nechutná nebo nesedne, napiš nám do 30 dnů od převzetí. Potom s tebou domluvíme bezplatné odeslání zpět.',
  },
  {
    q: 'Kolik mi vrátíte?',
    a: '100 % částky, kterou jsi za vrácený produkt skutečně zaplatil, tedy cenu po případné slevě. Zpáteční dopravu hradíme my.',
  },
  {
    q: 'Musím být členem VH Clubu?',
    a: 'Ne. Pro využití 30denní garance není členství ve VH Clubu potřeba.',
  },
  {
    q: 'Co když mám zvýhodněný balíček nebo dárek?',
    a: 'V e-mailu nám napiš, co z objednávky chceš vrátit. Před odesláním s tebou projdeme konkrétní objednávku a potvrdíme další postup i částku k vrácení.',
  },
] as const

export const guaranteeSteps = [
  {
    n: '01',
    title: 'Napiš nám',
    body: 'Ozvi se na info@vojtahubne.cz. Připiš číslo objednávky a produkt, který chceš vrátit. Pro uplatnění garance nám napiš do 30 dnů od převzetí produktu.',
  },
  {
    n: '02',
    title: 'Pošli produkt zdarma zpět',
    body: 'Domluvíme s tebou postup a zajistíme bezplatnou zpáteční dopravu. Vyčkej na naše pokyny, zabal produkt včetně otevřeného balení a odešli ho domluveným způsobem.',
  },
  {
    n: '03',
    title: 'Dostaneš peníze zpět',
    body: 'Po vrácení produktu ti vrátíme celou částku, kterou jsi za něj skutečně zaplatil. I když už jsi ho otevřel a ochutnal.',
  },
] as const
