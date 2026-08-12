# Variant add-to-cart race fix (Lean Shake dual selection)

## What was broken

On [LEAN SHAKE GLP-1](https://shop.vojtahubne.cz/products/lean-shake-glp-1), some customers (~2%) saw **two flavors selected** and could not reliably add to cart.

Root cause (reproduced):

1. Horizon checks the new flavor radio **immediately**
2. Hidden `input[name="id"]` + URL `?variant=` update only **after** an async fetch
3. Fast tap on **Přidat do košíku** submits the **old/default** variant
4. Horizon’s sliding pill can also make previous + current flavors look selected

## Fix (2 files)

| File | Action |
|------|--------|
| `docs/shopify/vojta-hubne-variant-sync.liquid` | New snippet — sync ID/URL immediately + lock ATC briefly |
| `docs/shopify/vojta-hubne-horizon.css` | Deterministic selected styles; hide sliding pill |

## Install in Shopify

### 1. Snippet

1. **Online Store → Themes → Edit code**
2. **Snippets → Add a new snippet** → name: `vojta-hubne-variant-sync`
3. Paste contents of `vojta-hubne-variant-sync.liquid` → Save

### 2. Load in theme

In `layout/theme.liquid`, before `</body>`:

```liquid
{% render 'vojta-hubne-variant-sync' %}
```

### 3. CSS asset

1. Re-upload / replace **`assets/vojta-hubne-horizon.css`** from this repo
2. Hard refresh the product page (`Cmd+Shift+R`)

## How to verify

1. Open Lean Shake with Jahoda selected
2. Tap **Slaný karamel**, then immediately **Přidat do košíku**
3. Cart should contain **only Slaný karamel** (not Jahoda + Karamel)
4. Only one flavor pill should look selected (black), others gold
5. Back/forward navigation should still show one consistent selection

## Notes

- Snippet runs only on `template.name == 'product'`
- Does not edit Horizon core `variant-picker.js` / `product-form.js` (safe across theme updates)
- Second separate “cannot order” issues (payment apps, cookie banners, stock) are unrelated — track those separately if they continue after this fix
