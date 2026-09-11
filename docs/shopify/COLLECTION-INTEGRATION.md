# `/collections` — remake the collections list

Page: **`https://shop.vojtahubne.cz/collections`**

Four separate sections:

| Order | Shopify section **filename** (exact) | Paste from repo |
|-------|--------------------------------------|-----------------|
| 1 | `vojta-hubne-collection-catalog.liquid` | `docs/shopify/vojta-hubne-collection-catalog.liquid` |
| 2 | `vojta-hubne-collection-care.liquid` | `docs/shopify/vojta-hubne-collection-care.liquid` |
| 3 | `vojta-hubne-collection-giftcard.liquid` | `docs/shopify/vojta-hubne-collection-giftcard.liquid` |
| 4 | `vojta-hubne-collection-upcoming.liquid` | `docs/shopify/vojta-hubne-collection-upcoming.liquid` |

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
   Filename exactly: **`vojta-hubne-collection-giftcard`**  
   Paste `docs/shopify/vojta-hubne-collection-giftcard.liquid` → Save

4. **Sections → Add a new section**  
   Filename exactly: **`vojta-hubne-collection-upcoming`**  
   Paste `docs/shopify/vojta-hubne-collection-upcoming.liquid` → Save

5. **Templates → `list-collections.json`**  
   Replace with `docs/shopify/list-collections.json` (updated types):

```json
{
  "sections": {
    "17888444757dec8acd": { "type": "_blocks", "...": "Judge.me (keep as-is from theme editor)" },
    "catalog": { "type": "vojta-hubne-collection-catalog", "settings": {} },
    "care": { "type": "vojta-hubne-collection-care", "settings": {} },
    "giftcard": { "type": "vojta-hubne-collection-giftcard", "settings": {} },
    "upcoming": { "type": "vojta-hubne-collection-upcoming", "settings": {} }
  },
  "order": ["17888444757dec8acd", "catalog", "care", "giftcard", "upcoming"]
}
```

6. Re-upload **`vojta-hubne-horizon.css`**

7. **Theme → Assets** — upload:
   - **`vh-catalog-visne-banner.jpg`** and **`vh-catalog-visne-banner-mobil.jpg`** from `docs/shopify/assets/` (links to `/products/visnova-forma-complete`)
   - **`vh-giftcard-logo.webp`**, **`vh-giftcard-card-a.webp`**, **`vh-giftcard-card-b.webp`** from `docs/shopify/assets/`

8. Hard-refresh `/collections`

## What you should see

0. **Nový balíček** promo banner → [Višňová forma COMPLETE](https://shop.vojtahubne.cz/products/visnova-forma-complete)
1. Vaše nejoblíbenější produkty — **4 compact tiles** (GLP-1 Support, Lean Shake, Kreatin + HMB, D3 + K2 + Vápník), same style as Péče a doplňky: **2 per row mobile, 4 desktop**
2. Trust bar
3. **Balíčky** — real Shopify products with type **Balíčky**, same cards as heroes
4. **Péče a doplňky** (own product grid underneath)
5. **Dárková karta** banner → `/products/darkova-karta`
6. **Co chystáme** — next 3 in-progress projects only (skips **Dokončeno**; currently Neviňátko, Cafe Lean Shake, Odvodňovač) + **Zobrazit více** → `vojtahubne.cz/co-chystame`

## Snippets needed

- `vojta-hubne-product-benefits.liquid` (trust bar)
- `vojta-hubne-care-product-card.liquid` (favorites + péče product tiles)
- `vojta-hubne-hero-card.liquid` (bundle product cards with quick add)
- `vojta-hubne-quick-add.liquid` (fast add-to-cart on compact tiles)
