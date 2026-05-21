# Shopify Horizon theme — product page files

Official theme: [Shopify/horizon on GitHub](https://github.com/Shopify/horizon)

**Not in this repo.** All files below are edited in:

**Shopify Admin → Online Store → Themes → Horizon → ⋯ → Edit code**

---

## Product page — which files matter

Horizon uses **JSON templates + blocks** (newer than Dawn’s `main-product.liquid` only).

### 1. Layout (start here)

| File | What it does |
|------|----------------|
| **`templates/product.json`** | Defines which sections appear on every product page and block order |

Default sections on product page:

- `product-information` (main — gallery + details + buy box)
- `product-recommendations` (“You may also like”)

> Warning: `product.json` is often **auto-updated** by the theme editor. Prefer **Customize** for layout changes; use **Edit code** for CSS and advanced tweaks.

### 2. Main product section (structure)

| File | What it does |
|------|----------------|
| **`sections/product-information.liquid`** | Wrapper: media gallery + product details column, sticky ATC |

### 3. Blocks (UI pieces — Horizon-specific)

Product UI is built from **blocks** inside `product.json`, for example:

| Block type | Controls |
|------------|----------|
| `_product-media-gallery` | Images / grid / zoom |
| `_product-details` | Right column container |
| `text` | Title, description |
| `price` | Price styling |
| `variant-picker` | Variants |
| `buy-buttons` | Quantity + Add to cart |
| `add-to-cart` | Button look (`style_class`) |

Block **settings** live inside `templates/product.json` (long JSON).  
Block **markup/logic** often lives under **`blocks/`** in the theme.

Browse folder: **`blocks/`** — files like `_product-details.liquid`, `buy-buttons.liquid`, `price.liquid`, etc.

### 4. Global look (black / gold brand)

| File | What it does |
|------|----------------|
| **`config/settings_schema.json`** | Theme settings (colors, typography) — also edited via **Customize** |
| **`config/settings_data.json`** | Saved values from Customize (your live colors) |
| **`assets/*.css`** | Theme stylesheets |
| **`layout/theme.liquid`** | HTML shell, loads CSS/JS |
| **`snippets/theme-styles-variables.liquid`** | CSS variables (common in Horizon) |

**Easiest brand match (Vojta Hubne):**

1. **Customize** → **Theme settings** → Colors → dark background + gold accent  
2. Or add **`assets/vojta-hubne-custom.css`** and link it in `layout/theme.liquid`:

```liquid
{{ 'vojta-hubne-custom.css' | asset_url | stylesheet_tag }}
```

Example custom CSS:

```css
/* assets/vojta-hubne-custom.css */
:root {
  --color-background: #000000;
  --color-foreground: #ffffff;
}

.button,
button.shopify-payment-button__button--unbranded {
  background-color: #eedc82 !important;
  color: #000000 !important;
}
```

(Variable names may differ — inspect computed styles in browser DevTools on your live shop.)

---

## Two ways to style

### A) Theme editor (no code) — recommended first

1. **Online Store → Themes → Customize**
2. Open any **product** page (preview)
3. Click sections/blocks in left sidebar
4. Adjust colors, fonts, spacing, gallery layout

Changes save to `config/settings_data.json` and `templates/product.json`.

### B) Edit code (full control)

1. **Themes → ⋯ → Edit code**
2. Edit files from tables above
3. **Save** — live in seconds

---

## Homepage product cards vs Shopify product page

| Page | Where code lives |
|------|------------------|
| `vojtahubne.cz/homepage` | This repo — `ProductCard.tsx`, `products.ts` |
| `shop…/products/handle` | **Horizon theme** — files in this doc |

---

## Redesign Horizon to match vojtahubne.cz (black + gold)

Your marketing site uses tokens in `src/styles/theme.ts`. The shop should mirror them.

| Brand token | Value | Use on Shopify |
|-------------|-------|----------------|
| Background | `#000000` | Page + product section |
| Surface | `#0a0a0a` / `#111111` | Cards, inputs |
| Gold | `#eedc82` | Titles, price, primary buttons |
| Gold muted | `#c9b56a` | Links, labels |
| Body text | `rgba(255,255,255,0.72)` | Description |
| Display font | Bebas Neue | Product title, headings |
| Body font | Montserrat | UI, description |

### Step 1 — Theme editor (80% of the look)

1. **Themes → Customize**
2. **Theme settings** (gear icon):
   - **Colors** → create or pick a **dark color scheme**: background `#000000`, text `#ffffff`, primary button `#eedc82`, button label `#000000`
   - **Typography** → heading + body closest to your fonts (Montserrat if available)
3. Open **Products → Default product** (or any product):
   - Section **Product information** → assign your **dark color scheme**
   - Block **Title** → heading style (large, uppercase feel if preset allows)
   - Block **Price** → accent color gold
   - Block **Buy buttons** → primary button = gold
4. **Header** + **Footer** → same dark scheme
5. Save

This updates `config/settings_data.json` without touching Liquid.

### Step 2 — Custom CSS (fine-tuning)

Copy ready-made CSS from this repo:

**`docs/shopify/vojta-hubne-horizon.css`**

In Shopify:

1. **Edit code → Assets → Add a new asset** → paste file as `vojta-hubne-horizon.css`
2. **layout/theme.liquid** → before `</head>` add:

```liquid
{{ 'vojta-hubne-horizon.css' | asset_url | stylesheet_tag }}
```

3. Save → refresh a product page
4. Use browser **Inspect** — if a element stays wrong, add a selector to the CSS file

Horizon class names can differ slightly per version; DevTools is your friend.

### Step 3 — Product page layout (Aktin-style)

**Full guide:** **[SHOPIFY-PRODUCT-LAYOUT.md](./SHOPIFY-PRODUCT-LAYOUT.md)**

Aktin-like structure: **wide image grid left (~62%)**, **sticky buy column right (~38%)**, description under Add to cart.

| Setting | Use |
|---------|-----|
| Width | **Full** |
| Media position | **Left** |
| Equal columns | **Off** |
| Gallery | Grid, **2 columns**, **large first image** |
| Product details | **Sticky on desktop** |

Upload product images + copy `vojta-hubne-horizon.css` (layout block at bottom of file).

Avoid heavy edits to `templates/product.json` unless you know JSON; use Customize when possible.

### Step 4 — Same navbar as React app

See **[SHOPIFY-HEADER-MATCH.md](./SHOPIFY-HEADER-MATCH.md)** (promo bar, menu links, logo, CSS).

### Step 5 — Logo + header link back to marketing site

In **Customize → Header**:

- Upload same logo as `src/assets/VojtHLogo.png`
- Menu link: `https://vojtahubne.cz/homepage` (Domů / Značka)

Keeps one brand journey: marketing site ↔ shop.

### Step 6 — Match homepage product cards (visual parity)

| Homepage (React) | Horizon equivalent |
|------------------|-------------------|
| Black card + gold border on hover | Product card border in CSS |
| Gold Bebas title | Product title block preset |
| Gold CTA button | Add to cart button |
| Dark section background | Color scheme on sections |

### What you cannot copy 1:1 from React

- React Bits **particles** background → not in Horizon by default (would need custom JS or static image)
- **Exact** same spacing as Vercel → tune padding in Customize per section

For “same vibe”, dark + gold + fonts + sharp corners (no big border-radius) is enough.

### Alternative: headless product page on Vercel (advanced)

Build `/products/:handle` in this React repo with Storefront API — full design control, checkout still on Shopify. More dev work; only choose this if Horizon theming is too limiting.

---

## Black & gold checklist (Horizon)

- [ ] **Customize → Theme settings** — dark scheme, light text, gold buttons  
- [ ] **Customize → Product page** — `product-information` color scheme  
- [ ] **Add to cart** block — button style (gold background)  
- [ ] **Typography** — clean sans (close to Montserrat if available)  
- [ ] Copy `docs/shopify/vojta-hubne-horizon.css` → Shopify asset + load in `theme.liquid`  
- [ ] **Product layout** — [SHOPIFY-PRODUCT-LAYOUT.md](./SHOPIFY-PRODUCT-LAYOUT.md) (full width, equal columns, images uploaded)  
- [ ] Header/footer — **sections/header.liquid** / footer section in `templates/*.json`

---

## Useful links

- [Shopify/horizon — templates/product.json](https://github.com/Shopify/horizon/blob/main/templates/product.json)
- [Shopify/horizon — sections/product-information.liquid](https://github.com/Shopify/horizon/blob/main/sections/product-information.liquid)
- [General Shopify connection](./SHOPIFY-INTEGRATION.md)
