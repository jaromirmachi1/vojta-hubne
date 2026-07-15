const JUDGEME_REVIEWS_URL = 'https://api.judge.me/api/v1/reviews'
const DEFAULT_SHOP_DOMAIN = '9kihpp-rg.myshopify.com'
export const JUDGEME_REVIEW_LIMIT = 12

type JudgeMeReview = {
  id?: unknown
  title?: unknown
  body?: unknown
  rating?: unknown
  product_title?: unknown
  product_handle?: unknown
  reviewer?: {
    name?: unknown
  }
  hidden?: unknown
  curated?: unknown
  verified?: unknown
  created_at?: unknown
}

type JudgeMeResponse = {
  reviews?: JudgeMeReview[]
}

export type PublicReview = {
  id: number
  title: string | null
  body: string
  rating: number
  reviewerName: string
  productTitle: string | null
  productHandle: string | null
  verified: boolean
  createdAt: string | null
}

export type JudgeMeReviewsConfig = {
  apiToken: string
  shopDomain: string
}

function decodeHtmlEntities(value: string): string {
  const namedEntities: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
  }

  return value
    .replace(/&#(\d+);/g, (_, code: string) => {
      const point = Number(code)
      return Number.isInteger(point) && point > 0 && point <= 0x10ffff
        ? String.fromCodePoint(point)
        : ''
    })
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => {
      const point = Number.parseInt(code, 16)
      return Number.isInteger(point) && point > 0 && point <= 0x10ffff
        ? String.fromCodePoint(point)
        : ''
    })
    .replace(/&([a-z]+);/gi, (entity, name: string) => {
      return namedEntities[name.toLowerCase()] ?? entity
    })
}

function toPlainText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''

  return decodeHtmlEntities(value.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

function isVerifiedReview(value: unknown): boolean {
  return (
    value === 'buyer' ||
    value === 'verified-purchase' ||
    value === 'verified'
  )
}

function normalizeReview(review: JudgeMeReview): PublicReview | null {
  const id = Number(review.id)
  const rating = Number(review.rating)
  const body = toPlainText(review.body, 700)
  const reviewerName = toPlainText(review.reviewer?.name, 80)

  if (
    !Number.isInteger(id) ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    !body ||
    !reviewerName ||
    review.hidden === true ||
    review.curated === 'spam'
  ) {
    return null
  }

  const title = toPlainText(review.title, 120)
  const productTitle = toPlainText(review.product_title, 140)
  const productHandle = toPlainText(review.product_handle, 160)
  const createdAt =
    typeof review.created_at === 'string' &&
    !Number.isNaN(Date.parse(review.created_at))
      ? review.created_at
      : null

  return {
    id,
    title: title || null,
    body,
    rating,
    reviewerName,
    productTitle: productTitle || null,
    productHandle: productHandle || null,
    verified: isVerifiedReview(review.verified),
    createdAt,
  }
}

export function getJudgeMeConfigFromEnv(
  env: Record<string, string | undefined>,
): JudgeMeReviewsConfig | null {
  const apiToken = (
    env.JUDGEME_PRIVATE_API_TOKEN ||
    env.JUDGEME_API_TOKEN ||
    env.JUDGEME_PUBLIC_API_TOKEN ||
    ''
  ).trim()

  const shopDomain = (
    env.JUDGEME_SHOP_DOMAIN ||
    env.SHOPIFY_STORE_DOMAIN ||
    env.VITE_SHOPIFY_STORE_DOMAIN ||
    DEFAULT_SHOP_DOMAIN
  )
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .trim()

  if (!apiToken || !shopDomain) return null

  return { apiToken, shopDomain }
}

export async function fetchJudgeMeReviews(
  config: JudgeMeReviewsConfig,
): Promise<PublicReview[]> {
  const url = new URL(JUDGEME_REVIEWS_URL)
  url.searchParams.set('shop_domain', config.shopDomain)
  url.searchParams.set('api_token', config.apiToken)
  url.searchParams.set('per_page', '50')
  url.searchParams.set('page', '1')

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-Api-Token': config.apiToken,
    },
  })

  if (!response.ok) {
    throw new Error(`Judge.me returned ${response.status}`)
  }

  const data = (await response.json()) as JudgeMeResponse

  return (data.reviews ?? [])
    .map(normalizeReview)
    .filter((review): review is PublicReview => review !== null)
    .sort((first, second) => {
      const firstDate = first.createdAt ? Date.parse(first.createdAt) : 0
      const secondDate = second.createdAt ? Date.parse(second.createdAt) : 0
      return secondDate - firstDate
    })
    .slice(0, JUDGEME_REVIEW_LIMIT)
}
