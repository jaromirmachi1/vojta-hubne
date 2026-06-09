import glpGenericImage from '../assets/glp1generic.png'
import glpSupportImage from '../assets/glpppp.png'
import { getShopifyProductUrl } from '../utils/shopify'

/** Mock comparison — GLP-1 Support vs. generic. */
export const glpSupportComparison = {
  productId: 'glp-1-support',
  productName: 'GLP-1 Support',
  headline: 'Zajímej se o to opravdu důležité:',
  headlineHighlight: 'složení',
  competitor: {
    shortName: 'Běžný spalovač tuků',
    ingredientCountLabel: '7 ingrediencí',
    visualImage: glpGenericImage,
    ingredients: [
      { name: 'Proprietární směs', percent: '—', grade: 4 },
      { name: 'Kofein', percent: '25 %', grade: 3 },
      { name: 'L-karnitin L-tartrát', percent: '8 %', grade: 2 },
      { name: 'Maltodextrin', percent: '15 %', grade: 4 },
      { name: 'Mikrokrystalická celulóza', percent: '12 %', grade: 3 },
      { name: 'Gelatinové kapsle', percent: '< 1 %', grade: 2 },
      { name: 'Barvivo, aroma', percent: '< 1 %', grade: 4 },
    ],
  },
  ours: {
    shortName: 'Vojta Hubne GLP-1 Support',
    ingredientCountLabel: '5 aktivních látek',
    visualImage: glpSupportImage,
    ingredients: [
      { name: 'Carolean® — karob & nopal', percent: '3 200 mg', grade: 1, note: '(sytost)' },
      { name: 'Berberin HCl', percent: '500 mg', grade: 1 },
      { name: 'Gymnema sylvestre', percent: '500 mg', grade: 1 },
      { name: 'Kreatin monohydrát', percent: '500 mg', grade: 1 },
      { name: 'VinOgrape®', percent: '300 mg', grade: 1, note: '(polyfenoly)' },
    ],
    summary: 'Prémiová formule — ne náhodná směs',
  },
  cta: {
    label: 'Více o GLP-1 Support',
    href: `${getShopifyProductUrl('glp1-support')}?variant=59680004145486`,
  },
} as const
