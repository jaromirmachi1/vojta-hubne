import type { IncomingMessage, ServerResponse } from 'node:http'

const JUDGEME_REVIEWS_URL = 'https://api.judge.me/api/v1/reviews'
const DEFAULT_SHOP_DOMAIN = '9kihpp-rg.myshopify.com'
const REVIEW_LIMIT = 12

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

type PublicReview = {
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

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: Record<string, unknown>,
) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
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

function getJudgeMeConfig(): { apiToken: string; shopDomain: string } | null {
  const apiToken = (
    process.env.JUDGEME_PRIVATE_API_TOKEN ||
    process.env.JUDGEME_API_TOKEN ||
    process.env.JUDGEME_PUBLIC_API_TOKEN ||
    ''
  ).trim()

  const shopDomain = (
    process.env.JUDGEME_SHOP_DOMAIN ||
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.VITE_SHOPIFY_STORE_DOMAIN ||
    DEFAULT_SHOP_DOMAIN
  )
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .trim()

  if (!apiToken || !shopDomain) return null

  return { apiToken, shopDomain }
}

async function fetchJudgeMeReviews(config: {
  apiToken: string
  shopDomain: string
}): Promise<PublicReview[]> {
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
    .slice(0, REVIEW_LIMIT)
}

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
) {
  if (request.method !== 'GET') {
    sendJson(response, 405, { ok: false, message: 'Method not allowed' })
    return
  }

  const config = getJudgeMeConfig()

  if (!config) {
    sendJson(response, 503, {
      ok: false,
      message: 'Judge.me reviews are not configured',
    })
    return
  }

  try {
    const reviews = await fetchJudgeMeReviews(config)

    response.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=86400',
    )
    sendJson(response, 200, { ok: true, reviews })
  } catch (error) {
    console.error('Judge.me reviews request failed', error)
    sendJson(response, 502, {
      ok: false,
      message: 'Reviews are temporarily unavailable',
    })
  }
}
