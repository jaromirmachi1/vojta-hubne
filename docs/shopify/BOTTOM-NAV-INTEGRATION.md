# Mobile bottom nav — Shopify + marketing site

Matches the React `MobileBottomNav` used on the marketing homepage and other pages.

## Shopify setup

1. **Snippets → Add snippet**
   - Name: `vojta-hubne-bottom-nav.liquid`
   - Paste from `docs/shopify/vojta-hubne-bottom-nav.liquid`

2. **Re-upload** `assets/vojta-hubne-horizon.css` (includes `.vh-bottom-nav` styles).

3. **`layout/theme.liquid`** — before `</body>` (after theme scripts is fine):

```liquid
{% render 'vojta-hubne-bottom-nav', marketing_url: 'https://www.vojtahubne.cz' %}
```

## Behavior

| Tab | Target |
|-----|--------|
| Domů | Marketing site (`marketing_url`) |
| Produkty | `/collections` |
| VH Club | `marketing_url/klub` |
| Novinky | `/blogs/novinky` |

- Mobile only (hidden from `1024px` up)
- Four equal-width tabs (cart lives in the header — avoids clash with chat FAB)
- Body gets bottom padding so content clears the bar
- Sticky product CTAs sit above the bar on mobile

## React (already wired)

- `ShopLayout` / `AltShopLayout` / primary homepage → home `/`
- Legacy dark homepage remains at `/alt` (noindex)
