import creamGhkCu from '../assets/products/cream-ghk-cu.png'
import emulfeelCream from '../assets/products/emulfeel-cream.png'
import glpSupport from '../assets/products/glp-support.png'
import leanShake from '../assets/products/lean-shake.png'

export type Product = {
  id: string
  slug: string
  name: string
  subtitle: string
  tagline: string
  description: string
  image: string
  category: string
  format: string
  benefits: string[]
  featured: boolean
  /** Shopify handle — připraveno pro budoucí napojení */
  shopifyHandle: string
}

export const featuredProducts: Product[] = [
  {
    id: 'glp-1-support',
    slug: 'glp-1-support',
    name: 'GLP-1 Support',
    subtitle: 'Doplněk stravy',
    tagline: 'Energie · Spalování · Kontrola chuti',
    description:
      'Komplex s Carolean®, berberinem, gymnemou a kreatinem pro podporu sytosti, metabolismu a energie.',
    image: glpSupport,
    category: 'Doplňky stravy',
    format: '160 kapslí · 125,4 g',
    benefits: ['Kontrola chuti', 'Podpora sytosti', 'Energie'],
    featured: true,
    shopifyHandle: 'glp-1-support',
  },
  {
    id: 'lean-shake-glp-1',
    slug: 'lean-shake-glp-1',
    name: 'Lean Shake GLP-1',
    subtitle: 'Proteinový shake',
    tagline: 'Sytost · Kontrola · Výsledky',
    description:
      'Proteinový shake s CaroLean®, VinOgrape® a vitamíny. 22 g bílkovin v jedné dávce pro každodenní kontrolu váhy.',
    image: leanShake,
    category: 'Proteiny & shaky',
    format: '15 dávek · 450 g',
    benefits: ['Vysoký obsah bílkovin', 'Vláknina', 'Vitamíny'],
    featured: true,
    shopifyHandle: 'lean-shake-glp-1',
  },
  {
    id: 'cream-glp-1-ghk-cu',
    slug: 'cream-glp-1-ghk-cu',
    name: 'Cream GLP-1 GHK-Cu',
    subtitle: 'Regenerační krém',
    tagline: 'Prokrvení · Ochrana · Regenerace',
    description:
      'Hřejivý regenerační krém s GHK-Cu pro suchou a namáhanou pokožku. Podporuje prokrvení a obnovu kožní bariéry.',
    image: creamGhkCu,
    category: 'Péče o tělo',
    format: '300 ml',
    benefits: ['GHK-Cu', 'Hřejivý efekt', 'Hydratace'],
    featured: true,
    shopifyHandle: 'cream-glp-1-ghk-cu',
  },
  {
    id: 'regeneracni-krem-emulfeel',
    slug: 'regeneracni-krem-emulfeel',
    name: 'Regenerační krém Emulfeel®',
    subtitle: 'Pleťová péče',
    tagline: 'Hydratace · Zklidnění · Regenerace',
    description:
      'Lehký hydratační krém pro každodenní péči. GHK-Cu, panthenol a bisabolol pro regeneraci a zklidnění pleti.',
    image: emulfeelCream,
    category: 'Péče o pleť',
    format: '50 ml',
    benefits: ['GHK-Cu', 'Zklidnění', 'Elasticita'],
    featured: true,
    shopifyHandle: 'regeneracni-krem-emulfeel',
  },
]
