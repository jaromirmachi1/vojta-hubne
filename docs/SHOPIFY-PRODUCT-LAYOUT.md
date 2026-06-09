# Product page layout — Aktin-style (Vojta Hubne styling)

Match the **structure** of a typical Aktin PDP:

- **Left (~62%)** — large hero image + 2-column image grid below  
- **Right (~38%)** — sticky column: title, price, variants, full-width Add to cart, then description  
- **Wide container** (~1400px), not a thin centered strip  

Colors, fonts, and square corners stay **black + gold** (`vojta-hubne-horizon.css`).

---

## Visual target

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────┐  ┌──────────────────────────┐ │
│  │     MAIN PRODUCT IMAGE      │  │ Title                    │ │
│  │         (full width)        │  │ ★ reviews (optional)     │ │
│  ├──────────────┬──────────────┤  │ Price                    │ │
│  │   thumb 2    │   thumb 3    │  │ Variants                 │ │
│  ├──────────────┼──────────────┤  │ [ Qty ] [ ADD TO CART ]  │ │
│  │   thumb 4    │   thumb 5    │  │ PayPal / payments        │ │
│  └──────────────┴──────────────┘  │ ─────────────────────── │ │
│         GALLERY (~62%)            │  Description + bullets   │ │
│                                   │     (sticky scroll)      │ │
│                                   └──────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

**Vojta Hubne (Natios-style):** long **Popis produktu** is centered full-width **below** the image + buy row using a separate Custom Liquid section.

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────┐  ┌──────────────────────────┐ │
│  │     MAIN PRODUCT IMAGE      │  │ Title, tags, price, ATC  │ │
│  └─────────────────────────────┘  └──────────────────────────┘ │
│           Long description (centered, max ~720px)                │
└──────────────────────────────────────────────────────────────────┘
```

---

## Step 1 — Product images (required)

Upload **at least 3–5 images** per product (Admin → Products → Media).  
Without media, Horizon uses a **narrow centered text-only** layout.

---

## Step 2 — Section: Product information

**Customize → Product page → Product information**

| Setting | Value |
|---------|--------|
| **Width** | **Full** |
| **Media position** | **Left** |
| **Equal columns** | **Off** ← important (Aktin uses wide gallery + narrow buy column) |
| **Limit product details width** | **Off** |
| **Gap** | **24–32px** |

---

## Step 3 — Block: Product media gallery

Click **Product media gallery** in the left sidebar:

| Setting | Value |
|---------|--------|
| **Type** | **Grid** (not Carousel) |
| **Columns** | **2** |
| **Full width first image** | **On** |
| **Gap** | **12px** |
| **Aspect ratio** | Adapt (or Square if labels are square) |
| **Limit media to screen height** | **Off** (or On + Contain if images crop) |
| **Border radius** | **0** (sharp corners — brand) |
| **Extend media to screen edge** | **Off** when Width = Full |

---

## Step 4 — Block: Product details

| Setting | Value |
|---------|--------|
| **Sticky on desktop** | **On** |
| **Gap between blocks** | **24–28px** |
| **Width** | Fill |

**Block order** (drag in sidebar — Aktin-like):

1. Title  
2. **Custom Liquid** — product tags under title ([PRODUCT-TAGS.md](./shopify/PRODUCT-TAGS.md))  
3. Price  
4. (Optional) Divider  
5. Variant picker  
6. Buy buttons (quantity + Add to cart + accelerated checkout)  
7. Remove the default **Product description** block from Product details if you add the centered description section below.

---

## Step 4b — Benefits Strip

To add the mocked benefits row between the buy area and the long description:

1. **Snippets → Add snippet**
   - Name: `vojta-hubne-product-benefits.liquid`
   - Paste from `docs/shopify/vojta-hubne-product-benefits.liquid`
2. **Customize → Product page**
   - Add a **Custom Liquid** section directly **below Product information**
   - Paste:

```liquid
{% render 'vojta-hubne-product-benefits' %}
```

This section is mocked for now. Update the text/icons later when shipping, returns, support, and product guarantees are final.

---

## Step 4c — Centered Long Description

To place the main product description below the image + buy row:

1. **Snippets → Add snippet**
   - Name: `vojta-hubne-product-description.liquid`
   - Paste from `docs/shopify/vojta-hubne-product-description.liquid`
2. **Customize → Product page**
   - Add a **Custom Liquid** section directly **below the benefits strip**
   - Paste:

```liquid
{% render 'vojta-hubne-product-description' %}
```

3. In **Product information → Product details**, remove the old **Product description** block so the description is not duplicated in the right column.

---

## Step 5 — CSS asset

1. Copy latest `docs/shopify/vojta-hubne-horizon.css` → Shopify **Assets**  
2. Load in `layout/theme.liquid`:

```liquid
{{ 'vojta-hubne-horizon.css' | asset_url | stylesheet_tag }}
```

Layout rules are in the **Product page layout (Aktin-style)** section of that file.

---

## Step 6 — Check on desktop

- Window **≥ 750px** wide  
- Left: hero + 2-column thumbs  
- Right: buy column stays visible while scrolling (sticky)  
- Hard refresh if an old CSS file is cached  

---

## Common mistakes

| Problem | Fix |
|---------|-----|
| Thin center column, no images | Upload product media |
| 50/50 columns, feels wrong | Turn **Equal columns Off** |
| Only carousel, no grid | Media gallery → **Grid**, 2 columns |
| No large hero | **Full width first image On** |
| Description above buttons | Reorder blocks in Product details |
| Still narrow page | Section **Width = Full** |

---

## What we do not copy from Aktin (styling only)

- Rounded corners / light gray boxes → you keep **square, black, gold**  
- Top mega-menu / search bar → separate header task ([SHOPIFY-HEADER-MATCH.md](./SHOPIFY-HEADER-MATCH.md))  
- Flavor selector cards → use Horizon **variant picker** until custom Liquid is needed  

---

## Optional JSON (advanced)

In `templates/product.json` under `product-information`:

```json
"settings": {
  "content_width": "content-full-width",
  "desktop_media_position": "left",
  "equal_columns": false,
  "limit_details_width": false,
  "gap": 28
}
```

Media gallery block:

```json
"media_presentation": "grid",
"media_columns": "two",
"large_first_image": true,
"image_gap": 12,
"media_radius": 0
```

Prefer **Customize** over hand-editing JSON.
