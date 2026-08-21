# Product info tags (under title)

Show product highlights and specs under the title on Shopify product pages — editable per product in **Admin → Products → Tags**.

Inspired by Natios-style spec tables + bullet highlights, styled for Vojta Hubne (dark + gold).

---

## 1. One-time setup

1. **Snippets → Add snippet**
   - Name: `vojta-hubne-product-tags.liquid`
   - Paste from `docs/shopify/vojta-hubne-product-tags.liquid`

2. Re-upload **`vojta-hubne-horizon.css`** (includes `.vh-product-tags` styles).

3. **Customize → Product page → Product information → Podrobnosti (Product details)**
   - **Add block → Custom Liquid** (Vlastní Liquid)
   - Drag it **directly below Product title** (Název produktu)
   - Paste **exactly this** (no parameters):

```liquid
{% render 'vojta-hubne-product-tags' %}
```

**Do not use** `product: closest.product` — in Horizon that value is often empty and the block renders nothing.

In the theme editor you should see a gray hint box until tags are added. After saving tags on the product, hard refresh.

4. Save the theme.

---

## 1b. Block order (important)

In **Product details** (Podrobnosti), drag blocks to this order:

1. **Product title** (Název produktu)
2. **Custom Liquid** — `{% render 'vojta-hubne-product-tags' %}`
3. **Price** (Cena)
4. Variant picker, Buy buttons…
5. **Product description** (Popis produktu) — long text stays here

---

## 1c. Short description (under title, above price)

Two ways to add the **smaller teaser text**. The long description in the **Popis produktu** block is unchanged.

### Option A — Metafield (recommended for 1–2 sentences)

1. **Nastavení → Vlastní data → Produkty → Přidat definici**
2. Název: `Krátký popis`
3. Namespace and key: `custom.short_description`
4. Typ: **Víceřádkový text** (Multi-line text)
5. On each product: **Produkty → [produkt] → Krátký popis** field

Example:

```
Proteinový koktejl pro každodenní podporu sytosti a kontroly. 15 dávek v balení.
```

### Option B — Tag (quick one-liner)

Add a tag on the product:

```
vh-desc|Proteinový koktejl pro každodenní podporu sytosti a kontroly.
```

Metafield wins if both are set. Max ~255 characters per tag.

---

## 1d. Other tags on the product

**Admin → Products → [your product] → Tags** (not the theme editor).

Example for Antiage Cream:

```
vh-line|Hydratace
vh-line|Zklidnění
vh-line|Regenerace
vh-meta|50 ml
vh-spec|Forma|Krém
vh-spec|Množství|50 ml
vh-bullet|Intenzivní hydratace a regenerace
vh-bullet|Vhodný pro citlivou pleť
```

Without at least one `vh-line|`, `vh-line-white|`, `vh-meta|`, `vh-spec|`, or `vh-bullet|` tag, nothing appears on the live store (by design).

**Note:** Text like `Hydratace • Zklidnění • Regenerace | 50 ml` inside the **product description** is separate — the snippet only reads **Tags**, not description.

---

## 2. Tag formats

Add tags on each product in Shopify Admin. Each line is one tag.

| Prefix        | Example tag                    | Renders as                               |
| ------------- | ------------------------------ | ---------------------------------------- |
| Metafield     | `custom.short_description`     | Small grey text under chips, above price |
| `vh-desc\|`   | `vh-desc\|Proteinový koktejl…` | Same (fallback if no metafield)          |
| `vh-line\|`   | `vh-line\|Sytost`              | Gold highlight chip under title          |
| `vh-line-white\|` | `vh-line-white\|Sytost`    | Same chip row/position, white text       |
| `VH_CLUB` / `vh-club` | `VH_CLUB`              | Quiet gold border + „Jen pro členy VH Clubu“ on cards + PDP |
| `vh-meta\|`   | `vh-meta\|450 g`               | Trailing text after `\|` on the same row |
| `vh-spec\|`   | `vh-spec\|Forma\|Kapsle`       | Left spec table row                      |
| `vh-bullets-title\|` | `vh-bullets-title\|Aktivní složky v 1 dávce (30 g):` | Bold heading above bullet list |
| `vh-bullet\|` | `vh-bullet\|Vegan, bez lepku`  | Right bullet point                       |

**Do not** put `|` inside spec values — use it only to separate label and value.

---

## 3. Example — Lean Shake GLP-1 Jahoda

Tags to add:

```
vh-line|Sytost
vh-line|Kontrola
vh-line|Výsledky
vh-meta|450 g
vh-desc|Proteinový koktejl pro každodenní podporu sytosti. 15 dávek v balení.
vh-spec|Forma|Prášek
vh-spec|Denní dávka|1–2 odměrky
vh-spec|Množství|450 g
vh-bullets-title|Aktivní složky v 1 dávce (30 g):
vh-bullet|Bílkoviny – 22 g
vh-bullet|CaroLean™ – 1000 mg
vh-bullet|Vysoký obsah bílkovin
vh-bullet|Bez přidaného cukru
vh-bullet|Vegan
```

**Renders:**

- Under title: **SYTOST • KONTROLA • VÝSLEDKY | 450 g**
- Below that: spec table (left) + bullet list (right)

---

## 4. Example — supplement (Natios-style)

```
vh-spec|Druh produktu|Doplněk stravy
vh-spec|Forma|Kapsle
vh-spec|Typ kapsle|Rostlinná
vh-spec|Denní dávka|1–2 kapsle
vh-spec|Množství|90 kapslí
vh-spec|Vstřebatelnost|Vysoká
vh-bullet|Patentovaný hořčík bisglycinát MagChel® +20
vh-bullet|Vstřebatelnost až 80 %
vh-bullet|Bez příměsí, plnidel a éček
vh-bullet|Vegan, bez lepku a GMO-free
```

---

## 5. Block order (recommended)

In **Product details**:

1. Title
2. **Custom Liquid** (product tags snippet) ← here
3. Price
4. Variant picker
5. Buy buttons
6. Description

---

## 6. Troubleshooting

| Issue                              | Fix                                                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Nothing shows                      | Tags must start with exact prefix (`vh-line\|`, not `vh-line:`)                                           |
| Wrong block scope                  | Use `product: closest.product` in Custom Liquid                                                           |
| Tags visible in collection filters | Normal — prefix tags appear in Shopify tag list; use consistent `vh-*` prefix                             |
| Order looks random                 | Tags render in the order Shopify returns them; use consistent naming or add sort prefixes later if needed |

---

## 7. Optional upgrade (later)

For guaranteed order and richer content, use **metafields** instead of tags. Tags are the simplest manual workflow for now.
