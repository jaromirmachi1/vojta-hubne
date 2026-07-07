import type { IncomingMessage, ServerResponse } from 'node:http'

const SHOPIFY_API_VERSION = '2025-10'
const NEWSLETTER_TAGS = ['newsletter', 'website-footer']

type NewsletterRequestBody = {
  email?: unknown
}

type ShopifyCustomer = {
  id: string
  tags: string[]
}

type ShopifyGraphQlResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

type ShopifyClientCredentialsResponse = {
  access_token?: string
  expires_in?: number
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null

function getRequestBody(request: IncomingMessage): Promise<NewsletterRequestBody> {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: Record<string, unknown>,
) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(payload))
}

function getShopifyDomain(): string {
  return (
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.VITE_SHOPIFY_STORE_DOMAIN ||
    ''
  )
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
}

async function getShopifyAdminAccessToken(domain: string): Promise<string> {
  const staticToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN
  if (staticToken) return staticToken

  const clientId = process.env.SHOPIFY_CLIENT_ID
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing Shopify auth: set SHOPIFY_ADMIN_ACCESS_TOKEN or SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET',
    )
  }

  const now = Date.now()
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60_000) {
    return cachedAccessToken.token
  }

  const response = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
  })

  const json =
    (await response.json().catch(() => ({}))) as ShopifyClientCredentialsResponse

  if (!response.ok || !json.access_token) {
    throw new Error('Could not obtain Shopify Admin access token')
  }

  cachedAccessToken = {
    token: json.access_token,
    expiresAt: now + (json.expires_in ?? 3600) * 1000,
  }

  return json.access_token
}

async function getShopifyAdminConfig() {
  const domain = getShopifyDomain()

  if (!domain) {
    return null
  }

  const token = await getShopifyAdminAccessToken(domain)

  return {
    endpoint: `https://${domain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
    token,
  }
}

async function shopifyGraphQl<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const config = await getShopifyAdminConfig()

  if (!config) {
    throw new Error('Shopify Admin API is not configured')
  }

  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': config.token,
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = (await response.json()) as ShopifyGraphQlResponse<T>

  if (!response.ok || json.errors?.length) {
    throw new Error(json.errors?.[0]?.message ?? 'Shopify request failed')
  }

  if (!json.data) {
    throw new Error('Shopify returned an empty response')
  }

  return json.data
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null
}

async function findCustomerByEmail(email: string): Promise<ShopifyCustomer | null> {
  const data = await shopifyGraphQl<{
    customers: { edges: Array<{ node: ShopifyCustomer }> }
  }>(
    `#graphql
      query FindCustomerByEmail($query: String!) {
        customers(first: 1, query: $query) {
          edges {
            node {
              id
              tags
            }
          }
        }
      }
    `,
    { query: `email:${email}` },
  )

  return data.customers.edges[0]?.node ?? null
}

async function subscribeCustomer(email: string) {
  const existingCustomer = await findCustomerByEmail(email)
  const tags = Array.from(
    new Set([...(existingCustomer?.tags ?? []), ...NEWSLETTER_TAGS]),
  )

  if (existingCustomer) {
    const data = await shopifyGraphQl<{
      customerUpdate: { userErrors: Array<{ message: string }> }
    }>(
      `#graphql
        mutation UpdateNewsletterCustomer($input: CustomerInput!) {
          customerUpdate(input: $input) {
            userErrors {
              message
            }
          }
        }
      `,
      {
        input: {
          id: existingCustomer.id,
          tags,
          emailMarketingConsent: {
            marketingState: 'SUBSCRIBED',
            marketingOptInLevel: 'SINGLE_OPT_IN',
          },
        },
      },
    )

    const error = data.customerUpdate.userErrors[0]?.message
    if (error) throw new Error(error)
    return
  }

  const data = await shopifyGraphQl<{
    customerCreate: { userErrors: Array<{ message: string }> }
  }>(
    `#graphql
      mutation CreateNewsletterCustomer($input: CustomerInput!) {
        customerCreate(input: $input) {
          userErrors {
            message
          }
        }
      }
    `,
    {
      input: {
        email,
        tags,
        emailMarketingConsent: {
          marketingState: 'SUBSCRIBED',
          marketingOptInLevel: 'SINGLE_OPT_IN',
        },
      },
    },
  )

  const error = data.customerCreate.userErrors[0]?.message
  if (error) throw new Error(error)
}

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
) {
  if (request.method !== 'POST') {
    sendJson(response, 405, { ok: false, message: 'Method not allowed' })
    return
  }

  try {
    const body = await getRequestBody(request)
    const email = normalizeEmail(body.email)

    if (!email) {
      sendJson(response, 400, { ok: false, message: 'Enter a valid email' })
      return
    }

    await subscribeCustomer(email)
    sendJson(response, 200, { ok: true })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Newsletter signup failed'

    sendJson(response, 500, { ok: false, message })
  }
}
