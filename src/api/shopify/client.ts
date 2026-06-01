const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '')
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
const API_VERSION = '2024-10'

export function isStorefrontConfigured(): boolean {
  return Boolean(STORE_DOMAIN && STOREFRONT_TOKEN)
}

type GraphQLError = { message: string }

type GraphQLResponse<T> = {
  data?: T
  errors?: GraphQLError[]
}

export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!isStorefrontConfigured()) {
    throw new Error('Shopify Storefront API není nakonfigurováno.')
  }

  const response = await fetch(
    `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    },
  )

  if (!response.ok) {
    throw new Error(`Shopify API chyba: ${response.status}`)
  }

  const json = (await response.json()) as GraphQLResponse<T>

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(', '))
  }

  if (!json.data) {
    throw new Error('Shopify API nevrátilo data.')
  }

  return json.data
}
