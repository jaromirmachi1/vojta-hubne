import { storefrontFetch } from './client'
import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_LIST_QUERY } from './queries'
import type { ShopifyProductListNode } from '../../utils/mergeShopifyProducts'
import type { ShopifyImage, ShopifyProduct, ShopifyProductVariant } from '../../types/shopify'

type ProductByHandleResponse = {
  product: {
    id: string
    handle: string
    title: string
    descriptionHtml: string
    featuredImage: ShopifyImage | null
    images: { nodes: ShopifyImage[] }
    priceRange: ShopifyProduct['priceRange']
    variants: { nodes: ShopifyProductVariant[] }
  } | null
}

type ProductsListResponse = {
  products: { nodes: ShopifyProductListNode[] }
}

export async function getShopifyProductList(
  first = 50,
): Promise<ShopifyProductListNode[]> {
  const data = await storefrontFetch<ProductsListResponse>(PRODUCTS_LIST_QUERY, {
    first,
  })
  return data.products.nodes
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontFetch<ProductByHandleResponse>(PRODUCT_BY_HANDLE_QUERY, {
    handle,
  })

  if (!data.product) return null

  const { product } = data

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    descriptionHtml: product.descriptionHtml,
    featuredImage: product.featuredImage,
    images: product.images.nodes,
    priceRange: product.priceRange,
    variants: product.variants.nodes,
  }
}
