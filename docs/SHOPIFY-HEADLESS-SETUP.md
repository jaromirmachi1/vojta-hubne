# Headless Shopify — step-by-step setup

Custom product pages on **Vercel** (`vojtahubne.cz/products/...`) with data from **Shopify Storefront API**. Checkout stays on Shopify.

---

## Overview

| Step | Where | What |
|------|--------|------|
| 1 | Shopify Admin | Create custom app + Storefront token |
| 2 | Shopify Admin | Products + matching handles |
| 3 | Local `.env` | API credentials |
| 4 | Vercel | Same env vars + redeploy |
| 5 | Browser | Test `/products/glp-1-support` |

Code already in repo:

- `src/api/shopify/` — GraphQL client, product fetch, cart create
- `src/pages/ProductPage.tsx` — route `/products/:handle`
- `src/sections/ProductDetailSection.tsx` — Aktin-style layout
- Homepage cards → link to `/products/{handle}`

---

## Step 1 — Custom app in Shopify

1. **Shopify Admin → Settings → Apps and sales channels**
2. **Develop apps** → **Allow custom app development** (if prompted)
3. **Create an app** → name: `Vojta Hubne Headless`
4. Open the app → **Configuration** → **Storefront API integration**

Enable these scopes:

| Scope | Why |
|-------|-----|
| `unauthenticated_read_product_listings` | Read products |
| `unauthenticated_read_product_inventory` | Stock / availableForSale |
| `unauthenticated_read_checkouts` | Cart |
| `unauthenticated_write_checkouts` | Add to cart → checkout |

5. **Save** → **Install app**
6. **API credentials** → copy **Storefront API access token** (starts with `shpat_` or public storefront token)

Also note your **myshopify domain**, e.g. `vojta-hubne.myshopify.com` (Settings → Domains).

---

## Step 2 — Products & handles

Handles must match `src/data/products.ts`:

| Product | Handle |
|---------|--------|
| GLP-1 Support | `glp-1-support` |
| Lean Shake GLP-1 | `lean-shake-glp-1` |
| Cream GLP-1 GHK-Cu | `cream-glp-1-ghk-cu` |
| Regenerační krém Emulfeel® | `regeneracni-krem-emulfeel` |

Per product in Admin:

1. **Products →** open product
2. **Search engine listing** → URL handle = table above
3. Images, price, description filled in
4. **Save**

Test in browser (Shopify native URL):

```text
https://YOUR-STORE.myshopify.com/products/glp-1-support
```

---

## Step 3 — Local environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SHOPIFY_STORE_URL=https://shop.vojtahubne.cz
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token
```

Rules:

- `STORE_DOMAIN` = **myshopify.com** hostname only (no `https://`)
- No trailing slashes
- Restart dev server after changes: `npm run dev`

---

## Step 4 — Test locally

1. Open `http://localhost:5173/homepage`
2. Click **Zobrazit produkt** on a card
3. URL should be `/products/glp-1-support` (or matching handle)
4. Page loads title, price, images, description from Shopify
5. **Přidat do košíku** → redirects to Shopify checkout

If you see *“Storefront API není nakonfigurováno”* → check `.env` and restart dev.

If *“Produkt nebyl nalezen”* → handle mismatch or product not published to Online Store.

---

## Step 5 — Vercel production

1. **Vercel → Project → Settings → Environment Variables**
2. Add all three `VITE_*` keys (Production + Preview)
3. **Redeploy** (required — Vite bakes env at build time)

`vercel.json` already rewrites `/products/*` to the SPA.

---

## Step 6 — Go-live checklist

- [ ] Storefront app installed with correct scopes
- [ ] 4 products live, handles match code
- [ ] `.env` works locally
- [ ] Vercel env + redeploy
- [ ] `/products/glp-1-support` works on `vojtahubne.cz`
- [ ] Add to cart → Shopify checkout completes
- [ ] Test on mobile

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| API not configured | Set both `STORE_DOMAIN` + `STOREFRONT_TOKEN`, restart/redeploy |
| Product not found | Check handle spelling; product must be **Active** and on **Online Store** channel |
| CORS / network error | Domain must be `xxx.myshopify.com`, not custom domain |
| Cart / checkout fails | Enable `unauthenticated_write_checkouts` scope; reinstall app |
| 401 on API | Wrong or expired Storefront token |
| Empty images | Upload media in Shopify Admin |

---

## Architecture

```text
vojtahubne.cz/homepage
    → ProductCard links to /products/{handle}

vojtahubne.cz/products/glp-1-support
    → Storefront API: product query
    → React ProductDetailSection (gallery + sticky buy box)
    → cartCreate mutation → checkoutUrl → Shopify checkout
```

---

## What’s next (optional)

- Sync homepage product cards from API (replace static `products.ts`)
- Local cart drawer before checkout
- JSON-LD Product schema on PDP
- Redirect old `shop.vojtahubne.cz/products/*` to main domain

See also: [SHOPIFY-INTEGRATION.md](./SHOPIFY-INTEGRATION.md)
