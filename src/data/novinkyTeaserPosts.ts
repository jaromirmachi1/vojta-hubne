export type NovinkyTeaserPost = {
  id: string
  handle: string
  status: string
  kicker: string
  title: string
  excerpt: string
}

/** Homepage teaser posts — keep in sync with Shopify blog `novinky`. */
export const novinkyTeaserPosts: NovinkyTeaserPost[] = [
  {
    id: 'kosik-platby-club',
    handle: 'vojta-hubne-se-meni-novy-kosik-platby-vh-club-a-predplatne',
    status: 'Novinka',
    kicker: 'Aktualizace e-shopu',
    title: 'Nový košík, platby, VH CLUB a předplatné',
    excerpt:
      'Připravujeme jednodušší košík, pohodlnější platby, VH CLUB a předplatné. Podívejte se, co měníme a jaký přínos budou mít novinky pro zákazníky VH.',
  },
]
