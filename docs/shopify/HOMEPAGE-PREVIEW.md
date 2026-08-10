# Shopify homepage preview (match React)

Experiment: rebuild the React homepage look inside Shopify Liquid **without making it the public shop root**.

Live `shop.vojtahubne.cz/` can stay redirected to `/collections/all` (see `vojta-hubne-shop-home-redirect.liquid`).

---

## What you get

File: [`vojta-hubne-homepage.liquid`](./vojta-hubne-homepage.liquid)

Sections mirrored from React:

1. Hero (copy, stats, CTAs, promo code copy)
2. Bestsellers (4 flagship products from Shopify catalog)
3. Co chystáme teaser (flavor / odvodňovač / kreatin)
4. Story (transformace + quote)
5. Benefits

Skipped for v1 (easy to add later): Judge.me reviews, category teasers, comparison table, newsletter popup.

---

## Setup (private)

### 1. Upload images → Theme assets

Online Store → Themes → **…** → Edit code → **Assets** → Upload:

| Theme asset name | Source in this repo |
| ---------------- | ------------------- |
| `vh-hero.jpg` | `src/assets/159ede93-2c6a-47a5-ab52-1fac5d5e1c3c.jpg` |
| `vh-story.png` | `src/assets/vojtazhubl.png` |

Rename on upload if needed so Liquid `asset_url` matches.

### 2. Add the section

Edit code → **Sections** → Add file `vh-homepage.liquid` → paste contents of `vojta-hubne-homepage.liquid`.

### 3. Create a preview page (not the store homepage)

1. Online Store → **Pages** → Add page  
2. Title: `Homepage preview`  
3. Handle: `homepage-preview`  
4. Visibility: **Hidden** (or keep theme password on)  
5. Theme editor → open that page → add section **VH Homepage** / Custom Liquid that renders:

```liquid
{% section 'vh-homepage' %}
```

Horizon tip: if `{% section %}` is not allowed in Custom Liquid, create a page template:

`templates/page.homepage-preview.json`:

```json
{
  "sections": {
    "main": {
      "type": "vh-homepage",
      "settings": {}
    }
  },
  "order": ["main"]
}
```

Then assign template **homepage-preview** to the page.

### 4. Open preview

`https://shop.vojtahubne.cz/pages/homepage-preview`

Compare side-by-side with `https://www.vojtahubne.cz/`.

---

## Important: do not publish as store home yet

| URL | Current intent |
| --- | --- |
| `/` | Catalog redirect / shopping entry |
| `/pages/homepage-preview` | Private React-parity experiment |
| `vojtahubne.cz` | Live marketing homepage |

To make Shopify the real homepage later you would:

1. Remove shop-home redirect (`/` → `/collections/all`)
2. Put `vh-homepage` on `templates/index.json`
3. Re-point Domů / logo to shop root
4. Decide SEO / cookies / analytics (one domain strategy)

---

## What to judge

- Does black/gold + Bebas/Montserrat feel close enough?
- Are product cards + prices good enough vs React Storefront cards?
- Is Co chystáme OK linking back to React (`vojtahubne.cz/co-chystame`), or must it live on Shopify too?
- Effort vs benefit of migrating the rest (reviews, comparison, popup)

If this preview feels 80%+ right, full migration is realistic with more Liquid work. If it feels “theme-ish”, keep React as brand home and Shopify as commerce.
