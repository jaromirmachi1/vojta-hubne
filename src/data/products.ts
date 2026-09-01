import glpSupport from "../assets/products/glp-support.png";
import leanShake from "../assets/products/lean-shake.png";
import d3Image from "../assets/vitality.png";
import kreatinImage from "../assets/glp1generic.png";

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
  format: string;
  benefits: string[];
  featured: boolean;
  /** Shopify URL handle — must match Admin (see docs/SHOPIFY-STEP-1.md) */
  shopifyHandle: string;
  /** Filled from Storefront API when available */
  price?: string;
};

export const featuredProducts: Product[] = [
  {
    id: "glp-1-support",
    slug: "glp-1-support",
    name: "GLP-1 Support",
    subtitle: "Doplněk stravy",
    tagline: "Energie · Spalování · Kontrola chuti",
    description:
      "Komplex s Carolean®, berberinem, gymnemou a kreatinem pro podporu sytosti, metabolismu a energie.",
    image: glpSupport,
    category: "Doplňky stravy",
    format: "120 kapslí · 82,4 g",
    benefits: ["Kontrola chuti", "Podpora sytosti", "Energie"],
    featured: true,
    shopifyHandle: "glp1-support",
  },
  {
    id: "lean-shake-glp-1",
    slug: "lean-shake-glp-1",
    name: "Lean Shake GLP-1",
    subtitle: "Proteinový shake",
    tagline: "Sytost · Kontrola · Výsledky",
    description:
      "Proteinový shake s CaroLean®, VinOgrape® a vitamíny. 22 g bílkovin v jedné dávce pro každodenní kontrolu váhy.",
    image: leanShake,
    category: "Proteiny & shaky",
    format: "14 dávek · 420 g",
    benefits: ["Vysoký obsah bílkovin", "Vláknina", "Vitamíny"],
    featured: true,
    shopifyHandle: "lean-shake-glp-1",
  },
  {
    id: "kreatin-hmb",
    slug: "kreatin-hmb",
    name: "Kreatin + HMB",
    subtitle: "Doplněk stravy",
    tagline: "Výkon · Síla · Jednoduché dávkování",
    description:
      "5 g kreatin monohydrátu a 3 g CaHMB v jedné denní dávce. Jedna odměrka denně, 60 dávek v balení.",
    image: kreatinImage,
    category: "Doplňky stravy",
    format: "480 g · 60 dávek",
    benefits: ["Kreatin monohydrát", "CaHMB", "Jedna odměrka denně"],
    featured: true,
    shopifyHandle: "kreatin-hmb",
  },
  {
    id: "d3-k2-vapnik",
    slug: "d3-k2-vapnik",
    name: "D3 + K2 + Vápník",
    subtitle: "Doplněk stravy",
    tagline: "Kosti · Svaly · Imunita",
    description:
      "Trio vitamínu D3, K2 a vápníku pro kosti, svaly a imunitu v jedné dávce.",
    image: d3Image,
    category: "Doplňky stravy",
    format: "60 kapslí",
    benefits: ["Vitamín D3", "Vitamín K2", "Vápník"],
    featured: true,
    shopifyHandle: "d3-k2-vapnik",
  },
];
