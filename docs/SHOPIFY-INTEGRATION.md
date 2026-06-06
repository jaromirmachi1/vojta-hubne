# Shopify + Vojta Hubne — current hybrid setup

The production architecture is intentionally hybrid:

| Layer | URL | Host | Purpose |
|-------|-----|------|---------|
| Marketing / launch / homepage | `vojtahubne.cz` | Vercel | Brand story, SEO content, curated product cards |
| Product detail / catalog / cart / checkout | `shop.vojtahubne.cz` | Shopify | Selling, inventory, payments, shipping |

React does **not** own production product detail pages. Any `/products/:handle` route on Vercel redirects to the matching Shopify product page.

---

## What React Uses Shopify For

1. Homepage product data can be enriched from the Shopify Storefront API:
   - title
   - image
   - price
   - handle
2. Product cards link to Shopify product pages:
   - default: `https://9kihpp-rg.myshopify.com/products/{handle}`
   - after DNS is fixed: `https://shop.vojtahubne.cz/products/{handle}`
3. Header links:
   - `Produkty` → Shopify catalog
   - cart icon → Shopify cart
4. Legacy shop paths on the marketing domain redirect to Shopify:
   - `vojtahubne.cz/collections/*` → `shop.vojtahubne.cz/collections/*`
   - `vojtahubne.cz/products/*` → `shop.vojtahubne.cz/products/*`
   - `vojtahubne.cz/cart` → `shop.vojtahubne.cz/cart`

If Storefront API env vars are missing, the homepage still renders the local curated products from `src/data/products.ts`. Links still point to Shopify because `src/utils/shopify.ts` has a production fallback URL.

---

## Required Environment Variables

Set these locally in `.env` and in Vercel.

```env
VITE_SHOPIFY_STORE_URL=https://shop.vojtahubne.cz
VITE_SHOPIFY_STORE_DOMAIN=9kihpp-rg.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_public_token
```

Notes:

- Links use `VITE_SHOPIFY_STORE_DOMAIN` by default to avoid loops while the custom shop domain is still being connected.
- `VITE_SHOPIFY_STORE_URL` is the future public shop URL.
- `VITE_SHOPIFY_STORE_DOMAIN` must be the `.myshopify.com` hostname for API calls.
- `VITE_SHOPIFY_STOREFRONT_TOKEN` is the public Headless channel Storefront token.
- Vercel requires a redeploy after env changes because Vite bakes env into the build.

Optional:

```env
VITE_SHOPIFY_CATALOG_PATH=/collections/all
```

After `shop.vojtahubne.cz` is definitely connected to Shopify and removed from Vercel domains, set:

```env
VITE_SHOPIFY_USE_CUSTOM_DOMAIN=true
```

---

## Product Handles

Handles in Shopify must match `src/data/products.ts`.

| Product | Shopify handle |
|---------|----------------|
| GLP-1 Support | `glp1-support` |
| Lean Shake GLP-1 | `lean-shake-glp-1` |
| GHK-Cu Cream | `ghk-cu-cream` |
| Antiage Cream Emulfeel® | `antiage-cream-emulfeel®` |

---

## Go-Live Checklist

- [ ] `shop.vojtahubne.cz` points to Shopify (`shops.myshopify.com`)
- [ ] `shop.vojtahubne.cz` is removed from Vercel project domains
- [ ] Shopify domain status is connected
- [ ] Products are active and published to Online Store
- [ ] Headless channel token is copied into Vercel env
- [ ] Vercel production redeployed after env changes
- [ ] `vojtahubne.cz/homepage` shows product cards
- [ ] Header `Produkty` opens Shopify catalog
- [ ] Product card CTA opens Shopify PDP
- [ ] Cart icon opens Shopify cart

---

## Troubleshooting

| Symptom | Most likely cause | Fix |
|---------|-------------------|-----|
| Homepage shows products without prices | Vercel missing Storefront API env vars | Add `VITE_SHOPIFY_STORE_DOMAIN` + `VITE_SHOPIFY_STOREFRONT_TOKEN`, then redeploy |
| Header `Produkty` stays on `/homepage#produkty` | Old Vercel deployment | Deploy the latest `main` |
| Product route shows API/config screen | Old Vercel deployment | Deploy the latest `main`; `/products/:handle` now redirects to Shopify |
| `www.vojtahubne.cz/collections/all` is blank | Main domain is React/Vercel, not Shopify, and old deployment has no redirect | Deploy the latest `main`; Vercel redirects `/collections/*` to Shopify |
| Browser says too many redirects between `www` and `shop` | `shop.vojtahubne.cz` is still handled by Vercel, not Shopify | Keep links on `.myshopify.com`; remove `shop.vojtahubne.cz` from Vercel and fix DNS before enabling `VITE_SHOPIFY_USE_CUSTOM_DOMAIN` |
| `shop.vojtahubne.cz` shows launch countdown | `shop` still points to Vercel | Remove `shop.vojtahubne.cz` from Vercel and set DNS CNAME to Shopify |
| Shopify preview has products but live shop does not | Live custom domain is not pointing to Shopify | Fix DNS/domain setup in `DNS-SETUP.md` |

---

## Related Docs

- [DNS-SETUP.md](./DNS-SETUP.md) — Vercel + Shopify domain split
- [SHOPIFY-STEP-1.md](./SHOPIFY-STEP-1.md) — Storefront API token for homepage data
- [SHOPIFY-HORIZON-THEME.md](./SHOPIFY-HORIZON-THEME.md) — Shopify theme styling
