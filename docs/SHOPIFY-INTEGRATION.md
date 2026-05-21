# Shopify + Vojta Hubne — integration guide

Keep the React site on **Vercel** (`vojtahubne.cz`). Send product clicks to **Shopify** for product pages, cart, and checkout.

## Recommended setup

| Site | URL | Host |
|------|-----|------|
| Launch + marketing | `vojtahubne.cz` | Vercel |
| E-shop | `shop.vojtahubne.cz` | Shopify |

---

## Part 1 — Shopify store

1. Sign up at [shopify.com](https://www.shopify.com).
2. **Settings → Store details** — name, currency (CZK).
3. **Settings → Payments** — activate provider.
4. **Settings → Shipping and delivery** — rates.
5. **Settings → Policies** — privacy, terms, returns.

Note your store URL: `https://YOUR-STORE.myshopify.com`

---

## Part 2 — Products (must match code handles)

Handles in `src/data/products.ts` → **Search engine listing / URL handle** in Shopify must be identical.

| Product | Shopify handle |
|---------|----------------|
| GLP-1 Support | `glp-1-support` |
| Lean Shake GLP-1 | `lean-shake-glp-1` |
| Cream GLP-1 GHK-Cu | `cream-glp-1-ghk-cu` |
| Regenerační krém Emulfeel® | `regeneracni-krem-emulfeel` |

### Per product

1. **Products → Add product**
2. Title, description, images, price, inventory
3. URL handle = table above (exact spelling)
4. Save

### Test URL

```text
https://YOUR-STORE.myshopify.com/products/glp-1-support
```

### Optional collection

**Products → Collections** → e.g. `Bestsellery` → add all 4 products (useful for Storefront API later).

---

## Part 3 — Shop domain (subdomain)

### Shopify

1. **Settings → Domains**
2. Connect `vojtahubne.cz` if owned
3. Set **`shop.vojtahubne.cz`** as online store (or follow Shopify wizard)

### DNS (registrar)

| Type | Name | Value |
|------|------|--------|
| CNAME | `shop` | `shops.myshopify.com` (use value Shopify shows) |

Root domain stays on **Vercel** for the React app.

### Temporary (before DNS)

```text
https://YOUR-STORE.myshopify.com
```

---

## Part 4 — Level 1: Link homepage → Shopify (start here)

No API. Buttons open Shopify product pages.

### 4.1 Local env

Copy `.env.example` → `.env`:

```env
VITE_SHOPIFY_STORE_URL=https://shop.vojtahubne.cz
```

Restart: `npm run dev`

### 4.2 Code (already prepared)

- `src/utils/shopify.ts` — `getShopifyProductUrl()`, `getShopifyCartUrl()`
- Wire in `src/components/ProductCard.tsx` (see checklist below)

### 4.3 ProductCard example

```tsx
import { getShopifyProductUrl } from '../utils/shopify'

const shopUrl = getShopifyProductUrl(product.shopifyHandle)

{shopUrl ? (
  <a href={shopUrl}>Zobrazit v e-shopu</a>
) : (
  <button type="button" disabled>Brzy v e-shopu</button>
)}
```

### 4.4 Other links

| Location | Link to |
|----------|---------|
| Product cards | `/products/{shopifyHandle}` |
| Header cart | `/cart` |
| Comparison CTA | product or collection |

### 4.5 Vercel

1. Project → **Settings → Environment Variables**
2. `VITE_SHOPIFY_STORE_URL` = `https://shop.vojtahubne.cz`
3. **Redeploy** (required after env change)

### 4.6 Verify

1. `vojtahubne.cz/homepage`
2. Click product → Shopify PDP
3. Add to cart → Shopify checkout

---

## Part 5 — Level 2: Storefront API (later)

Sync title, price, image from Shopify on the homepage.

### 5.1 Custom app

1. **Settings → Apps → Develop apps → Create app**
2. Name: `Vojta Hubne Headless`
3. Storefront API scopes (read):
   - `unauthenticated_read_product_listings`
4. Install app → copy **Storefront API access token**

### 5.2 Env

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_token
```

Add on Vercel. **Never** put Admin API token in frontend.

### 5.3 GraphQL endpoint

```text
POST https://YOUR-STORE.myshopify.com/api/2024-01/graphql.json
Header: X-Shopify-Storefront-Access-Token: TOKEN
```

Use `onlineStoreUrl` from response for product links.

### 5.4 App changes (future)

- `src/api/shopify.ts` — fetch helper
- `src/hooks/useShopifyProducts.ts`
- Replace `featuredProducts` mock with API data on `HomePage`

---

## Part 6 — Checkout flow

```text
Homepage (Vercel) → Shopify product → Cart → Shopify checkout
```

Checkout stays on Shopify for Level 1.

---

## Part 7 — Go-live checklist

- [ ] 4 products in Shopify, handles match `products.ts`
- [ ] Prices, images, policies complete
- [ ] Test order (test gateway on dev store)
- [ ] `VITE_SHOPIFY_STORE_URL` on Vercel + redeploy
- [ ] ProductCard links wired (`ProductCard.tsx`)
- [ ] `shop.vojtahubne.cz` SSL active
- [ ] `vercel.json` SPA rewrite deployed (`/homepage` works)

---

## Part 8 — Avoid

| Don't | Why |
|-------|-----|
| Vercel + Shopify both on `vojtahubne.cz/products` | Routing conflict |
| Admin API token in React | Security |
| Wrong handle (`glp-1-support-2`) | 404 on Shopify |
| Skip redeploy after Vercel env | Old build without shop URL |

---

## URL reference

```text
Marketing:    https://vojtahubne.cz
Homepage:     https://vojtahubne.cz/homepage
Shop:         https://shop.vojtahubne.cz
Product:      https://shop.vojtahubne.cz/products/glp-1-support
Cart:         https://shop.vojtahubne.cz/cart
```

---

## Suggested timeline

1. Shopify store + 4 products + handles
2. Test myshopify URLs + payments/shipping
3. Domain `shop.vojtahubne.cz` + Vercel env + ProductCard links (Level 1)
4. After launch → Storefront API (Level 2) if needed

---

## Horizon theme (product page styling)

If your shop uses **Shopify Horizon**, product page code is **not** in this repo. See:

**[docs/SHOPIFY-HORIZON-THEME.md](./SHOPIFY-HORIZON-THEME.md)**

---

## Code wiring checklist (when ready)

- [ ] Copy `.env.example` → `.env` with real shop URL
- [ ] Update `ProductCard.tsx` to use `getShopifyProductUrl()`
- [ ] Enable header cart link → `getShopifyCartUrl()`
- [ ] Add env on Vercel + redeploy
- [ ] (Optional) `ProductComparisonSection` CTA → product URL
- [ ] (Optional) Storefront API — see Part 5
