import { storefrontFetch } from './client'
import {
  COLLECTION_PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_LIST_QUERY,
} from './queries'
import type { ShopifyProductListNode } from '../../utils/mergeShopifyProducts'
import type { ShopifyImage, ShopifyProduct, ShopifyProductVariant } from '../../types/shopify'

export type ShopifyCollectionProducts = {
  title: string
  handle: string
  products: ShopifyProductListNode[]
}

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

type CollectionProductsResponse = {
  collection: {
    title: string
    handle: string
    products: { nodes: ShopifyProductListNode[] }
  } | null
}

export async function getShopifyProductList(
  first = 50,
): Promise<ShopifyProductListNode[]> {
  const data = await storefrontFetch<ProductsListResponse>(PRODUCTS_LIST_QUERY, {
    first,
  })
  return data.products.nodes
}

export async function getCollectionProducts(
  handle: string,
  first = 12,
): Promise<ShopifyCollectionProducts | null> {
  const data = await storefrontFetch<CollectionProductsResponse>(
    COLLECTION_PRODUCTS_QUERY,
    { handle, first },
  )

  if (!data.collection) return null

  return {
    title: data.collection.title,
    handle: data.collection.handle,
    products: data.collection.products.nodes,
  }
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
