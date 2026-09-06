# `/collections` — remake the collections list

Page: **`https://shop.vojtahubne.cz/collections`**

Three separate sections:

| Order | Shopify section **filename** (exact) | Paste from repo |
|-------|--------------------------------------|-----------------|
| 1 | `vojta-hubne-collection-catalog.liquid` | `docs/shopify/vojta-hubne-collection-catalog.liquid` |
| 2 | `vojta-hubne-collection-care.liquid` | `docs/shopify/vojta-hubne-collection-care.liquid` |
| 3 | `vojta-hubne-collection-upcoming.liquid` | `docs/shopify/vojta-hubne-collection-upcoming.liquid` |

The filename in **Sections** must match the `type` in `list-collections.json`.  
Do **not** put care content into the catalog file.

## Fix the error you just got

`vh-collection-care neodkazuje na existující soubor` means the JSON points at a section name that does not exist.

### Do this

1. **Sections → Add a new section**  
   Filename exactly: **`vojta-hubne-collection-care`**  
   Paste `docs/shopify/vojta-hubne-collection-care.liquid` → Save

2. **Sections → `vojta-hubne-collection-catalog`**  
   (create if missing) Paste `docs/shopify/vojta-hubne-collection-catalog.liquid` → Save  
   If you wrongly named care as catalog, delete that wrong file and recreate both correctly.

3. **Sections → Add a new section**  
   Filename exactly: **`vojta-hubne-collection-upcoming`**  
   Paste `docs/shopify/vojta-hubne-collection-upcoming.liquid` → Save

4. **Templates → `list-collections.json`**  
   Replace with `docs/shopify/list-collections.json` (updated types):

```json
{
  "sections": {
    "catalog": { "type": "vojta-hubne-collection-catalog", "settings": {} },
    "care": { "type": "vojta-hubne-collection-care", "settings": {} },
    "upcoming": { "type": "vojta-hubne-collection-upcoming", "settings": {} }
  },
  "order": ["catalog", "care", "upcoming"]
}
```

5. Re-upload **`vojta-hubne-horizon.css`**

6. **Theme → Assets** — upload **`vh-catalog-novinky-banner.jpg`** and **`vh-catalog-novinky-banner-mobil.png`** from `src/assets/` (or `docs/shopify/assets/`)

7. Hard-refresh `/collections`

## What you should see

0. **Nové produkty** promo banner (Lean Shake Višeň v čokoládě + Kreatin HMB)
1. Vaše nejoblíbenější produkty — **4 compact tiles** (GLP-1 Support, Lean Shake, Kreatin + HMB, D3 + K2 + Vápník), same style as Péče a doplňky: **2 per row mobile, 4 desktop**
2. Trust bar
3. **Balíčky** — real Shopify products with type **Balíčky**, same cards as heroes
4. **Péče a doplňky** (own product grid underneath)
5. **Co chystáme** — Neviňátko, Odvodňovač, Probiotika + **Zobrazit více** → `vojtahubne.cz/co-chystame`

## Snippets needed

- `vojta-hubne-product-benefits.liquid` (trust bar)
- `vojta-hubne-care-product-card.liquid` (favorites + péče product tiles)
- `vojta-hubne-hero-card.liquid` (bundle product cards with quick add)
- `vojta-hubne-quick-add.liquid` (fast add-to-cart on compact tiles)
