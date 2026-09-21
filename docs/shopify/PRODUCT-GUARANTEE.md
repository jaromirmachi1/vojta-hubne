# Product guarantee — wire in buy-buttons code

Horizon product buy box lives in theme file **`blocks/buy-buttons.liquid`**
(not in this repo — edit in Shopify).

## 1. Snippet (once)

**Edit code → Snippets → Add a new snippet**  
Name: `vojta-hubne-product-guarantee`  
Paste full contents of `vojta-hubne-product-guarantee.liquid`.

Re-upload **`vojta-hubne-horizon.css`** if you have not already.

## 2. Buy buttons block

**Edit code → Blocks → `buy-buttons.liquid`**

Find `{%- endform -%}` (closes the add-to-cart / Shop Pay form).  
Paste the render **immediately after** that line, still inside the `product != blank` branch:

```liquid
{%- endform -%}

{% render 'vojta-hubne-product-guarantee' %}
```

That places the card under „Další platební možnosti“ on every product page.

## Do not use

- `templates/product.json` — optional Custom Liquid block only if you prefer the editor
- `sections/product-information.liquid` — wrong layer; buy box is a block

---

## Full guarantee page

Canonical: [vojtahubne.cz/30denni-garance](https://www.vojtahubne.cz/30denni-garance) (React). See [GUARANTEE-PAGE.md](./GUARANTEE-PAGE.md).

Shopify product snippet link must use that marketing URL.
