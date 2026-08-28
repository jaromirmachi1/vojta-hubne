# Breadcrumbs — React + Shopify

Subtle drobečková navigace across the marketing site and the Shopify shop.

## React (www.vojtahubne.cz)

Already wired via `ShopLayout` / `AltShopLayout` `breadcrumbs` prop.

| Page | Trail |
|------|--------|
| `/kontakt` | Domů / Kontakt |
| `/spoluprace` | Domů / Spolupráce |
| `/co-chystame` | Domů / Co chystáme |
| `/klub` | Domů / VH Club |
| `/` | none (home) |
| 404 | Domů / Stránka nenalezena |

Component: `src/components/Breadcrumbs.tsx` (includes `BreadcrumbList` JSON-LD).

---

## Shopify (shop.vojtahubne.cz)

Horizon has no built-in breadcrumbs — add our snippet.

### 1. Snippet

**Snippets → Add snippet** → `vojta-hubne-breadcrumbs.liquid`  
Paste from `docs/shopify/vojta-hubne-breadcrumbs.liquid`.

### 2. CSS

Re-upload `vojta-hubne-horizon.css` (includes `.vh-breadcrumbs` styles).

### 3. Render after header

In `layout/theme.liquid`, directly **after** the header group / header markup:

```liquid
{% render 'vojta-hubne-breadcrumbs', marketing_url: 'https://www.vojtahubne.cz' %}
```

Example placement:

```liquid
{% sections 'header-group' %}
{% render 'vojta-hubne-breadcrumbs', marketing_url: 'https://www.vojtahubne.cz' %}
```

Or if you only use our header snippet inside `header.liquid`, put the render **below** `{% render 'vojta-hubne-header-nav' %}`.

### Trails

| Template | Trail |
|----------|--------|
| Product | Domů → Produkty → (kolekce) → produkt |
| Collection | Domů → Produkty → název kolekce |
| Cart | Domů → Košík |
| Blog / article | Domů → blog → článek |
| Page | Domů → název stránky |
| Homepage | hidden |

**Domů** points to the marketing site (`www.vojtahubne.cz`). **Produkty** points to `/collections`.
