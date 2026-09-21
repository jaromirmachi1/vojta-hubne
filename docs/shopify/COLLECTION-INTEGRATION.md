# `/collections` — remake the collections list

Page: **`https://shop.vojtahubne.cz/collections`**

Four sections on the page (+ VH Club snippet inside catalog):

| Order | Shopify section **filename** (exact) | Paste from repo |
|-------|--------------------------------------|-----------------|
| 1 | `vojta-hubne-collection-catalog.liquid` | `docs/shopify/vojta-hubne-collection-catalog.liquid` |
| 2 | `vojta-hubne-collection-care.liquid` | `docs/shopify/vojta-hubne-collection-care.liquid` |
| 3 | `vojta-hubne-collection-giftcard.liquid` | `docs/shopify/vojta-hubne-collection-giftcard.liquid` |
| 4 | `vojta-hubne-collection-upcoming.liquid` | `docs/shopify/vojta-hubne-collection-upcoming.liquid` |

**Snippet (inside catalog, between advantages and Balíčky):**  
`vojta-hubne-collection-club.liquid` → **Snippets**

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

5. **Snippets → `vojta-hubne-collection-club`**  
   Paste `docs/shopify/vojta-hubne-collection-club.liquid` → Save  
   (If you previously created this as a **Section**, delete that section — it must be a snippet.)

6. **Templates → `list-collections.json`**  
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

7. Re-upload **`vojta-hubne-horizon.css`**

8. **Theme → Assets** — upload:
   - **`vh-catalog-3prichute-banner.jpg`** and **`vh-catalog-3prichute-banner-mobil.jpg`** from `docs/shopify/assets/` (3 příchutě / 3 dárky — links to [`/products/3shake-bundle`](https://shop.vojtahubne.cz/products/3shake-bundle))
   - **`vh-giftcard-logo.webp`**, **`vh-giftcard-card-a.webp`**, **`vh-giftcard-card-b.webp`** from `docs/shopify/assets/`
   - **`vh-club-card.jpg`** from `docs/shopify/assets/`

9. Hard-refresh `/collections`

## What you should see

0. **3 příchutě / 3 dárky zdarma** promo banner (desktop wide / mobile tall)
1. Vaše nejoblíbenější produkty — **4 compact tiles**
2. Trust bar (advantages)
3. **VH Club** banner → [`/products/vh-club`](https://shop.vojtahubne.cz/products/vh-club) (copy from [Vítejte ve VH Clubu](https://shop.vojtahubne.cz/blogs/novinky/vitejte-ve-vh-clubu))
4. **Balíčky**
5. **Péče a doplňky**
6. **Dárková karta** banner → `/products/darkova-karta`
7. **Co chystáme** — next 3 in-progress projects only (skips **Dokončeno**; currently Neviňátko, Cafe Lean Shake, Odvodňovač) + **Zobrazit více** → `vojtahubne.cz/co-chystame`

## Snippets needed

- `vojta-hubne-product-benefits.liquid` (trust bar)
- `vojta-hubne-collection-club.liquid` (VH Club banner between trust and Balíčky)
- `vojta-hubne-care-product-card.liquid` (favorites + péče product tiles)
- `vojta-hubne-hero-card.liquid` (bundle product cards with quick add)
- `vojta-hubne-quick-add.liquid` (fast add-to-cart on compact tiles)
