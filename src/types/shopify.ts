export type ShopifyMoney = {
  amount: string
  currencyCode: string
}

export type ShopifyImage = {
  url: string
  altText: string | null
  width?: number
  height?: number
}

export type ShopifyProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  price: ShopifyMoney
  compareAtPrice: ShopifyMoney | null
  selectedOptions: { name: string; value: string }[]
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  descriptionHtml: string
  featuredImage: ShopifyImage | null
  images: ShopifyImage[]
  priceRange: {
    minVariantPrice: ShopifyMoney
    maxVariantPrice: ShopifyMoney
  }
  variants: ShopifyProductVariant[]
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
}
