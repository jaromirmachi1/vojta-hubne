# 30denní garance

**Canonical page:** [vojtahubne.cz/30denni-garance](https://www.vojtahubne.cz/30denni-garance) (React)

Shopify `/pages/30denni-garance` can be unpublished / redirected — product PDP link points to the marketing site.

## React (this repo)

- Route: `/30denni-garance` → `src/pages/GuaranteePage.tsx`
- Copy: `src/data/guarantee.ts`
- SEO: `src/seo/guaranteePageMeta.ts`
- Images: `src/assets/vh-guarantee-product-*.webp`

## Shopify product card

Re-paste **Snippets → `vojta-hubne-product-guarantee`** so „Podrobnosti garance →“ goes to:

`https://www.vojtahubne.cz/30denni-garance`

## Optional Shopify redirect

In Shopify Admin → Pages → 30denní garance VH → unpublish, or set a redirect from `/pages/30denni-garance` → `https://www.vojtahubne.cz/30denni-garance`.
