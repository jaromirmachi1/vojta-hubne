# Same navbar as React app (Shopify Horizon)

You **cannot** paste `SiteHeader.tsx` into Shopify — Shopify runs **Liquid**, not React.

You **can** make Horizon look and behave the same: gold promo bar, black sticky header, logo, same links, gold cart icon.

React source of truth:

- `src/components/PromoBar.tsx`
- `src/components/SiteHeader.tsx`

---

## Option A — Theme editor only (recommended)

### 1. Gold promo bar (= `PromoBar`)

React source: `src/components/PromoBar.tsx`  
CSS: `vojta-hubne-horizon.css` → **Promo bar** block (gold bg, Montserrat 0.7rem, weight 600, uppercase).

1. **Customize → Header** → **Announcement bar** (or **Header announcements**)
2. Enable the bar
3. **Text** (copy exactly):

   ```
   Chceš zhubnout? Podpoř sytost, metabolismus a disciplínu — nakupuj teď v e-shopu →
   ```

4. **Link:** `/collections/all` (same catalog as homepage promo bar)
5. In **announcement block** settings (Horizon), if typography options appear:
   - Prefer **Montserrat** / body font
   - CSS overrides thin weight — but you can set **Semibold (600)** if available
   - Auto-rotate: **Off** (single message like React)
6. **Link** (optional): `/collections/all` — if the block supports a URL
7. Re-upload **`vojta-hubne-horizon.css`** and hard refresh (Cmd+Shift+R)

Horizon ships inline `font-weight: 100` and `0.625rem` on the slide — the CSS file forces homepage parity (`0.7rem`, weight `600`, gold bar, `0.14em` tracking).

### 2. Logo

1. **Settings → Files** → upload `src/assets/VojtHLogo.png` from this repo
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

**Width:** React `SiteHeader` uses `PageContainer` — `max-width: 1600px`, `padding-inline: clamp(1.25rem, 5vw, 3.5rem)`. Custom snippet `vh-shop-header__inner` gets the same via `vojta-hubne-horizon.css` (do not use `100vw` full-bleed on the inner row).

### 5. Custom CSS

Load **`docs/shopify/vojta-hubne-horizon.css`** (see [SHOPIFY-HORIZON-THEME.md](./SHOPIFY-HORIZON-THEME.md)) for exact fonts, sticky blur, link styles, cart button border.

---

## Option B — One shared navbar everywhere (advanced)

Only possible if **marketing site and shop share one frontend**. That is not the current production choice.

For the current hybrid, use **two UIs with the same design** (Option A): React header on `vojtahubne.cz`, Shopify header on `shop.vojtahubne.cz`.

---

## Cart button difference

| React homepage | Shopify |
|----------------|---------|
| Cart links to `shop.vojtahubne.cz/cart` | Real cart → `/cart` |

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
