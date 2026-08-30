export type CuratedProductPick = {
  id: string
  category: string
  productName: string
  shopifyHandle: string
}

export const curatedProductPicksCopy = {
  title: 'Nemusíte mít všechno',
  lead:
    'Produkty VH nejsou sběratelské kartičky. Vyberte jen ty, které odpovídají tomu, co skutečně řešíte.',
} as const

export const curatedProductPicks: CuratedProductPick[] = [
  {
    id: 'lean-shake',
    category: 'Bílkoviny a praktická výživa',
    productName: 'LEAN SHAKE GLP-1',
    shopifyHandle: 'lean-shake-glp-1',
  },
  {
    id: 'aquamin',
    category: 'Samostatná suplementace hořčíku',
    productName: 'Aquamin® Mg + B6',
    shopifyHandle: 'aquamin-mg-b6',
  },
  {
    id: 'd3-k2',
    category: 'D3, K2 a vápník',
    productName: 'D3 + K2 + Vápník',
    shopifyHandle: 'd3-k2-vapnik',
  },
  {
    id: 'glp-1-support',
    category: 'Doplněk stravy pro redukční režim',
    productName: 'GLP-1 Support',
    shopifyHandle: 'glp1-support',
  },
  {
    id: 'ghk-cu-cream',
    category: 'Pokožka těla',
    productName: 'GHK-CU CREAM',
    shopifyHandle: 'ghk-cu-cream',
  },
  {
    id: 'antiage-cream',
    category: 'Pleť',
    productName: 'ANTIAGE CREAM Emulfeel®',
    shopifyHandle: 'antiage-cream-emulfeel®',
  },
]
