# Cart CTA + always-visible discount code (Horizon)

## 1. CTA: Zaplatit → Pokračovat

### Preferred (theme translation)
1. Shopify Admin → **Online Store** → theme **⋯** → **Edit default theme content**
2. Search for **Checkout** / `content.checkout` / **Zaplatit**
3. Change to: **Pokračovat**
4. Save

### Already covered in CSS
`vojta-hubne-horizon.css` overrides the cart checkout button label to **Pokračovat** via `::after` after you re-upload the CSS asset.

---

## 2. Discount code always open (no “Zvýhodněná cena” click)

Horizon wraps the discount field in `accordion-custom` and only expands it after a click (or when a code is already applied).

### Preferred (Liquid — durable)
Edit **`snippets/cart-summary.liquid`**. Find the discount accordion render (class `cart-discount`) and force it open:

```liquid
{% render 'accordion-custom-component',
  children: cart_discount_accordion_children,
  class: 'cart-discount',
  open_by_default_on_desktop: true,
  open_by_default_on_mobile: true
%}
```

Also open the `<details>` inside the captured children if present:

```liquid
<details open>
```

### Already covered in CSS
`vojta-hubne-horizon.css` forces the discount panel content visible and hides the `+` toggle so the input shows immediately.

---

## Deploy checklist
1. Re-upload **`assets/vojta-hubne-horizon.css`** from this repo
2. (Optional but recommended) Apply the Liquid change in `cart-summary.liquid`
3. (Optional) Set theme translation **Pokračovat** so drawer/other locales stay consistent
4. Hard-refresh `https://shop.vojtahubne.cz/cart` with an item in the cart
