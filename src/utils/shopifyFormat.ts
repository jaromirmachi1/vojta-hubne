import type { ShopifyMoney } from '../types/shopify'

export function formatShopifyPrice(money: ShopifyMoney): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(money.amount))
}

export function hasMultipleVariants(variantCount: number): boolean {
  return variantCount > 1
}

export function isDefaultVariantOnly(variants: { title: string }[]): boolean {
  return variants.length === 1 && variants[0]?.title === 'Default Title'
}
