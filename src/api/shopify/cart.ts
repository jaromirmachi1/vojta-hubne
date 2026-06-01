import { storefrontFetch } from './client'
import { CART_CREATE_MUTATION } from './queries'
import type { ShopifyCart } from '../../types/shopify'

type CartCreateResponse = {
  cartCreate: {
    cart: ShopifyCart | null
    userErrors: { field: string[] | null; message: string }[]
  }
}

export async function createCart(variantId: string, quantity = 1): Promise<ShopifyCart> {
  const data = await storefrontFetch<CartCreateResponse>(CART_CREATE_MUTATION, {
    lines: [{ merchandiseId: variantId, quantity }],
  })

  const { cart, userErrors } = data.cartCreate

  if (userErrors.length) {
    throw new Error(userErrors.map((e) => e.message).join(', '))
  }

  if (!cart?.checkoutUrl) {
    throw new Error('Nepodařilo se vytvořit košík.')
  }

  return cart
}
