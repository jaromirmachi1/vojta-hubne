# Step 1 — Storefront API token (homepage products)

**Goal:** Token so React can load products on the homepage.  
**Clicks** on products still go to **Shopify** (`shop.../products/...`) for SEO.

---

## Important: two different “apps” in Shopify

| What you see | Good for us? |
|--------------|----------------|
| **Nastavení → Vývoj aplikací → Dev Dashboard** (`dev.shopify.com`, CLI) | No — for full Shopify apps / Admin API |
| **Prodejní kanál Headless** (in store admin) | **Yes** — Storefront API token in a few clicks |

If **Vývoj aplikací** only opens `dev.shopify.com`, **ignore it** for now. Use **Headless** below instead.

---

## Step 1 — Headless channel (recommended)

### A) Install Headless

**Option 1 — App Store**

1. Open: [Headless app on Shopify App Store](https://apps.shopify.com/headless)
2. **Install** on your store
3. On install, choose **Create storefront** (or add one after)

**Option 2 — Already in admin**

1. Store admin → **Prodejní kanály** (Sales channels)
2. If **Headless** is listed → open it  
3. If not → use App Store link above

### B) Create storefront & copy token

1. In **Headless** channel → **Add storefront** / **Přidat storefront**
2. Name e.g. `Vojta Hubne Web`
3. Copy the **Storefront API access token**  
   - Use the **public** token for the React site (browser)  
   - Keep **private** token secret (server only — we don’t need it yet)

4. **Permissions** → Edit → enable at least:
   - Products (read)
   - (Optional) Collections

5. **Save**

### C) Note your myshopify domain

**Nastavení → Domény** → e.g. `vojta-hubne.myshopify.com`  
(Use this for `VITE_SHOPIFY_STORE_DOMAIN`, not `shop.vojtahubne.cz`)

---

## Step 1 done — `.env`

```bash
cp .env.example .env
```

```env
VITE_SHOPIFY_STORE_URL=https://shop.vojtahubne.cz
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=paste_public_token_here
```

Restart: `npm run dev`

**Do not commit `.env` or paste the token in chat.**

---

## Quick test (terminal)

```bash
curl -s -X POST \
  "https://YOUR-STORE.myshopify.com/api/2024-10/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Storefront-Access-Token: YOUR_TOKEN" \
  -d '{"query":"{ products(first: 1) { nodes { title handle } } }"}'
```

Expect JSON with `title` and `handle`.

---

## Alternative — Dev Dashboard (only if Headless is not available)

Use only if you cannot install the Headless channel.

1. [dev.shopify.com](https://dev.shopify.com) → **Vytvořit aplikaci**
2. Create app → **Release** a version with needed scopes
3. **Install** on your store
4. **Settings** → Client ID + Secret → server-side token (expires 24h)

This path is **harder** for a simple Vite frontend. Prefer **Headless**.

Official docs: [Storefront API — Getting started](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started)

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Vývoj aplikací → dev.shopify only | Normal — use **Headless** channel instead |
| No Headless in sales channels | Install from [apps.shopify.com/headless](https://apps.shopify.com/headless) |
| 401 on curl | Wrong domain or token; use `.myshopify.com` |
| Empty products | Products **Active** + **Online Store** channel |
| **localhost** → `shop.vojtahubne.cz` can't be reached | DNS not ready — on dev, app uses `9kihpp-rg.myshopify.com` automatically. Or set `VITE_SHOPIFY_STORE_URL=https://9kihpp-rg.myshopify.com` in `.env` |

---

## Next

- Add the same env vars in Vercel → Settings → Environment Variables
- Redeploy production after env changes
- Homepage product cards can then pull live Shopify title, image and price
- Product clicks still go to `VITE_SHOPIFY_STORE_URL/products/{handle}`

Do not send or commit the real token. Public Storefront tokens are browser-safe, but keeping them out of docs avoids accidental confusion with private tokens.
