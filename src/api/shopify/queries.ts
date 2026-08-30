/** Shopify Markets locale for Storefront API translated fields (title, description, …). */
export const STOREFRONT_IN_CONTEXT =
  import.meta.env.VITE_SHOPIFY_IN_CONTEXT?.trim() ||
  '@inContext(country: CZ, language: CS)'

export const PRODUCTS_LIST_QUERY = `
  query ProductsList($first: Int!) ${STOREFRONT_IN_CONTEXT} {
    products(first: $first) {
      nodes {
        id
        handle
        title
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) ${STOREFRONT_IN_CONTEXT} {
    product(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 12) {
        nodes {
          url
          altText
          width
          height
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 25) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`

export const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) ${STOREFRONT_IN_CONTEXT} {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const COLLECTION_PRODUCTS_QUERY = `
  query CollectionProducts($handle: String!, $first: Int!) ${STOREFRONT_IN_CONTEXT} {
    collection(handle: $handle) {
      title
      handle
      products(first: $first) {
        nodes {
          id
          handle
          title
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`
