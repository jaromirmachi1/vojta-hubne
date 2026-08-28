# Collection landing — match the catalog layout

Rebuild `/collections/all` (Produkty) as a landing page:

1. Collection banner  
2. Trust bar (same 4 benefits as product pages)  
3. 2 hero products with Add to cart  
4. Bundles in 3 groups  
5. Care / supplements grid  
6. Reviews line  

Announcement bar stays global. Other collections keep the normal product grid.

You do **not** need to send Liquid from Shopify. Upload the files below.

## 1. Create 3 bundle collections + 1 care collection

Shopify Admin → Products → Collections:

| Title | Suggested handle | Put in it |
| ----- | ---------------- | --------- |
| Podpora po GLP | `podpora-po-glp` | Smart / Intense (GLP group) |
| Váha a pleť | `vaha-a-plet` | remaining Smart / Intense / skin packs |
| Rychlý start | `rychly-start` | (re)Start, Hlad pod kontrolou, Nutriční jistota |
| Péče a doplňky | `pece-a-doplnky` | Antiage cream, GHK-Cu cream, Aquamin, D3+K2 |

Sort each collection **manually**. Grouping in the PDF is a working draft — adjust products to match real bundle contents.

## 2. Upload theme files

**Assets** → replace `vojta-hubne-horizon.css`

**Snippets** → add / replace:

- `vojta-hubne-catalog-card.liquid`
- `vojta-hubne-product-benefits.liquid` (if not already there)

**Sections** → Add `vh-collection-landing.liquid`  
Paste `vojta-hubne-collection-landing.liquid`

**Templates** → Add `collection.landing.json`  
Paste `collection.landing.json`

## 3. Assign the template

Products → Collections → **All** (or Produkty) → Theme template → **landing** → Save.

Do not assign this to every collection — only the main catalog.

## 4. Pick products in the editor

Online Store → Themes → Customize → open `/collections/all`.

In **VH Collection landing**:

- Hero 1 / Hero 2 (defaults: `glp1-support`, `lean-shake-glp-1`)
- Upsell products for the gold links under Add to cart
- The 3 bundle collections if handles differ
- Care collection if handle differs

## What stays as-is

Category chips on the old grid are hidden on this template (no product grid).  
`/collections/balicky` and other collections still use the default Horizon grid.
