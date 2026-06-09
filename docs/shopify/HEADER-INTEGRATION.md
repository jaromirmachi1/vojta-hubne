# Horizon `header.liquid` — integrate Vojta Hubne header

You do **not** replace the whole `sections/header.liquid`. Add **one line** and load the CSS asset.

## 1. Snippet + assets (once)

1. **Theme → Edit code → Assets**
   - Upload `VojtHLogo.png` (same file as React: `src/assets/VojtHLogo.png`)
   - Upload `vojta-hubne-horizon.css` from `docs/shopify/vojta-hubne-horizon.css`

2. **Snippets → Add snippet**
   - Name: `vojta-hubne-header-nav.liquid`
   - Paste from `docs/shopify/vojta-hubne-header-nav.liquid`

3. **layout/theme.liquid** — before `</head>`:

```liquid
{{ 'vojta-hubne-horizon.css' | asset_url | stylesheet_tag }}
```

Before `</body>` (after theme scripts):

```liquid
<script src="{{ 'vojta-hubne-collection-media-fix.js' | asset_url }}" defer="defer"></script>
```

Do **not** use `| script_tag` here — Theme Check flags it as parser-blocking (red error in the editor). `defer` is correct for this script.

**Verify the JS loaded:** on `/collections/all`, open DevTools → Network → filter `collection-media-fix`. If missing, the asset file is not uploaded or the script tag is missing.

## 2. One line in `sections/header.liquid`

Find this block (near the bottom of the liquid logic, before the rows loop):

```liquid
<header-component
  id="header-component"
  class="{{ class }}"
```

**Immediately after** the opening `<header-component ...>` tag (right after the `>`), add:

```liquid
  {% render 'vojta-hubne-header-nav', marketing_url: 'https://www.vojtahubne.cz' %}
```

So it looks like:

```liquid
<header-component
  id="header-component"
  class="{{ class }}"
  ...
>
  {% render 'vojta-hubne-header-nav', marketing_url: 'https://www.vojtahubne.cz' %}
  <div class="header__underlay header__underlay-closed"></div>
  ...
```

Leave the rest of Horizon’s header code **unchanged**. CSS hides the default menu/logo rows when `.vh-shop-header` is present.

## 3. Logo / home link

In the snippet, logo already goes to:

```text
https://www.vojtahubne.cz/homepage
```

(via `marketing_url` + `/homepage`). That is the “home” action — same as React.

## 4. Optional Customize settings (recommended)

In **Customize → Header**:

| Setting | Value |
|---------|--------|
| Search icon | Off |
| Transparent header (product/collection) | Off |
| Sticky header | Always (optional) |

Horizon menu blocks are hidden by CSS; nav comes from the snippet.

## 5. Troubleshooting

| Issue | Fix |
|-------|-----|
| **Blank / empty header bar** | Horizon hides `.header[data-sticky-state='idle']` with `opacity: 0`. Re-upload latest `vojta-hubne-horizon.css` (includes fix). |
| **Red outline in theme editor** | Usually missing snippet, missing `VojtHLogo.png` asset, or render line outside `<header-component>`. Not normal when setup is correct. |
| Two headers visible | Snippet must be **inside** `<header-component>`, not outside. |
| Old Horizon menu still shows | Hard refresh; confirm CSS is in `theme.liquid`. |
| Logo broken / empty left side | Upload `VojtHLogo.png` to theme **Assets** (exact filename). |
| Nav links missing on phone | Expected below 768px (same as React). Logo + cart still show. |
| Logo goes to shop home | `marketing_url` must be `https://www.vojtahubne.cz`, not `shop.vojtahubne.cz`. |

## 6. “Domů” in Horizon menu

If you keep Horizon’s menu for mobile drawer, set in **Navigation → Main menu**:

- **Domů** → `https://www.vojtahubne.cz/homepage` (custom URL)
- **Katalog** → `/collections/all` (on shop domain)

Custom snippet desktop nav already matches React: Produkty, Proč my, Příběh, Spouštíme brzy.

## 7. Shop homepage vs marketing homepage (recommended)

Do **not** redirect the whole `shop.vojtahubne.cz` domain to `vojtahubne.cz`. That would break cart, checkout, and product URLs.

Use two different “home” targets:

| User intent | URL |
|-------------|-----|
| Brand / story (logo, “Domů”) | `https://www.vojtahubne.cz/homepage` |
| Shopping / catalog (shop root, “Pokračovat v nákupu”) | `https://shop.vojtahubne.cz/collections/all` |

### A. Shop root → catalog (best fix for accidental `shop.vojtahubne.cz/`)

**Option 1 — Shopify redirect (simplest)**

Shopify Admin → **Online Store → Navigation → URL redirects** → Add:

| From | To |
|------|-----|
| `/` | `/collections/all` |

**Option 2 — Theme snippet**

1. Add `snippets/vojta-hubne-shop-home-redirect.liquid` from `docs/shopify/vojta-hubne-shop-home-redirect.liquid`
2. In `layout/theme.liquid` inside `<head>`:

```liquid
{% render 'vojta-hubne-shop-home-redirect' %}
```

### B. Logo on cart / checkout

| Place | Logo link |
|-------|-----------|
| Theme header (snippet) | `https://www.vojtahubne.cz/homepage` — already set via `marketing_url` |
| **Checkout** | Shopify Admin → **Settings → Checkout → Customize** (or Checkout branding) → Logo → link: `https://www.vojtahubne.cz/homepage` |

Checkout is separate from the theme. Theme CSS/Liquid does not control checkout logo.

### C. Horizon drawer menu (if still visible on mobile)

**Navigation → Main menu:**

- **Domů** → `https://www.vojtahubne.cz/homepage`
- **Katalog** → `/collections/all`
