/** Prototype: short real Judge.me quotes for the promo-adjacent ticker. */

export type TickerReview = {
  id: string
  body: string
  reviewerName: string
  rating: number
}

/** Only full exact messages at or under this length enter the strip. */
export const REVIEW_TICKER_MAX_CHARS = 90

/**
 * Exact customer messages (not paraphrased, not clipped).
 * Kept short on purpose — filter still enforces REVIEW_TICKER_MAX_CHARS.
 */
const TICKER_REVIEWS: TickerReview[] = [
  {
    id: 'iva-z-rychle',
    body: 'Rýchle dodanie',
    reviewerName: 'Ivana Zedekova',
    rating: 5,
  },
  {
    id: 'michaela-glp',
    body: 'GLP 1 je super, funguje perfektně',
    reviewerName: 'Michaela Čierniková',
    rating: 5,
  },
  {
    id: 'andrea-ok',
    body: 'Vsetko v poriadku.',
    reviewerName: 'Andrea Lauko',
    rating: 5,
  },
  {
    id: 'eva-dodani',
    body: 'Velmi rychlé dodání',
    reviewerName: 'eva gröbl',
    rating: 5,
  },
  {
    id: 'denisa-super',
    body: 'Super produkty',
    reviewerName: 'Denisa Jelenová',
    rating: 5,
  },
  {
    id: 'iva-rezerva',
    body: 'Mám produkty zatím v rezervě, po dovolené je začnu zkoušet.',
    reviewerName: 'Iva Hamplová',
    rating: 5,
  },
  {
    id: 'jarmila-glp',
    body: 'GLP-1 mě moc překvapil. Beru nejnižší dávku a výborně mi pomáhá. Super a děkuji',
    reviewerName: 'Jarmila Chrudimská',
    rating: 5,
  },
  {
    id: 'ivana-fasting',
    body: 'Myslím, ze ucinkuje dobre. Dodrziavam fasting 16:8 a som spokojná. Dakujem',
    reviewerName: 'Ivana Zedekova',
    rating: 5,
  },
  {
    id: 'klara-kamarádka',
    body: 'Kamarádka je spokojená, zhubla s tim 3kg které ji furt nešli dolů ať dělala co chtěla.',
    reviewerName: 'Klára Švejdová',
    rating: 5,
  },
]

export function getShortTickerReviews(
  reviews: TickerReview[] = TICKER_REVIEWS,
  maxChars = REVIEW_TICKER_MAX_CHARS,
): TickerReview[] {
  return reviews.filter((review) => {
    const length = review.body.trim().length
    return length > 0 && length <= maxChars
  })
}
