# Same navbar as React app (Shopify Horizon)

You **cannot** paste `SiteHeader.tsx` into Shopify — Shopify runs **Liquid**, not React.

You **can** make Horizon look and behave the same: gold promo bar, black sticky header, logo, same links, gold cart icon.

React source of truth:

- `src/components/PromoBar.tsx`
- `src/components/SiteHeader.tsx`

---

## Option A — Theme editor only (recommended)

### 1. Gold promo bar (= `PromoBar`)

1. **Customize → Header** (or **Announcement bar** section)
2. Enable announcement bar
3. Text: `E-shop spouštíme brzy — sledujte odpočet na úvodní stránce`
4. Background: `#eedc82`
5. Text color: `#000000`
6. Typography: small, uppercase, wide letter-spacing if available

### 2. Logo

1. **Settings → Files** → upload `src/assets/logo.png` from this repo
2. **Customize → Header → Logo** → select that image
3. Logo height ~ **36px** (2.25rem in React)

### 3. Main menu (= React `Nav`)

**Shopify Admin → Online Store → Navigation → Main menu**

Add links (same as React):

| Label | URL |
|-------|-----|
| Produkty | `https://vojtahubne.cz/homepage#produkty` |
| Proč my | `https://vojtahubne.cz/homepage#porovnani` |
| Příběh | `https://vojtahubne.cz/homepage#pribeh` |
| Spouštíme brzy | `https://vojtahubne.cz/` |

Optional shop-only link:

| Katalog | `/collections/all` |

3. **Customize → Header → Menu** → assign **Main menu**

### 4. Header layout (match React)

In **Customize → Header**:

| Setting | React equivalent |
|---------|------------------|
| Sticky header | On (`position: sticky`) |
| Color scheme | Dark (black bg, white text) |
| Logo left | Yes |
| Menu center/right | Yes |
| **Hide search** | React has no search — turn off search in header |
| Cart icon | On (Shopify cart — works unlike disabled React button) |
| Transparent header on product | **Off** (React always solid black bar) |

### 5. Custom CSS

Load **`docs/shopify/vojta-hubne-horizon.css`** (see [SHOPIFY-HORIZON-THEME.md](./SHOPIFY-HORIZON-THEME.md)) for exact fonts, sticky blur, link styles, cart button border.

---

## Option B — One shared navbar everywhere (advanced)

Only possible if **marketing site and shop share one frontend**:

- Same domain + React Router for `/`, `/homepage`, `/products/...` (Storefront API), **or**
- iframe embed (not recommended)

Otherwise: **two UIs, same design** (Option A) is normal for headless.

---

## Cart button difference

| React homepage | Shopify |
|----------------|---------|
| Cart disabled (placeholder) | Real cart → `/cart` |

On shop, keep cart **enabled** — that is correct for e-commerce.

Style it like React: gold icon, square border — handled in `vojta-hubne-horizon.css`.

---

## Mobile menu

React hides desktop nav below 768px (no mobile menu built yet in React).

Horizon uses a **drawer** on mobile — keep it; style with same dark + gold in CSS.

---

## Checklist

- [ ] Announcement bar = gold promo text
- [ ] Logo uploaded and set in header
- [ ] Main menu links point to `vojtahubne.cz` sections
- [ ] Sticky black header, search off
- [ ] `vojta-hubne-horizon.css` loaded in `theme.liquid`
- [ ] Test desktop + phone

---

## If menu HTML must be pixel-perfect

Use snippet **`docs/shopify/vojta-hubne-header-nav.liquid`** inside a custom Liquid block (advanced). Option A is enough for most cases.
