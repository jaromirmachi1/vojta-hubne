# Shopify blog — Vojta Hubne styling

Horizon already renders blog pages via:

| Template | Section | URL |
|----------|---------|-----|
| `templates/blog.json` | `main-blog` | `/blogs/blog` |
| `templates/article.json` | `main-blog-post` | `/blogs/blog/{handle}` |

You **do not need to replace** `main-blog.liquid` or `main-blog-post.liquid`.  
Styling lives in **`vojta-hubne-horizon.css`** (section **Blog listing + article**).

---

## Deploy (5 minutes)

1. **Online Store → Themes → Horizon → Edit code**
2. Open **Assets → `vojta-hubne-horizon.css`**
3. Replace with the latest file from this repo: `docs/shopify/vojta-hubne-horizon.css`
4. Confirm `layout/theme.liquid` still loads it:

```liquid
{{ 'vojta-hubne-horizon.css' | asset_url | stylesheet_tag }}
```

5. Hard refresh:
   - Listing: [shop.vojtahubne.cz/blogs/blog](https://shop.vojtahubne.cz/blogs/blog)
   - Article: open any post

---

## What the CSS does

### Blog listing (`/blogs/blog`)

- Gold display title **BLOG**
- Dark cards with subtle gold border + hover lift
- Featured image cover crop
- Post title in Bebas Neue / gold
- Date in small uppercase gold-muted
- Excerpt in readable Montserrat body
- Fixes Horizon mobile `--blog-post-card-scale: 0.5` (cards were too small)

### Single article

- Narrow readable column (`max-width: 52rem`)
- Left-aligned title + date (overrides theme center)
- Featured image with rounded frame
- **Hides duplicate H1** inside article body when the title is also in the page header
- RTE typography: paragraphs, H2/H3, links, lists, images, blockquotes
- Comment block styled to match (if comments enabled)

---

## Optional theme editor tweaks

These are **not required** if you only upload the CSS.

### `templates/article.json` — recommended

In **Customize → Blog post** (or edit `article.json`):

| Block | Setting | Suggested |
|-------|---------|-----------|
| Title | Alignment | **Left** (CSS forces left anyway) |
| Details | Show date | On |
| Details | Show author | Off |
| Featured image | Border radius | 0 (CSS handles radius on wrapper) |

### `templates/blog.json`

| Block | Setting | Suggested |
|-------|---------|-----------|
| Title | Text | `<h1>{{ closest.blog.title }}</h1>` |
| Blog post card → Details | Show date | On |

---

## Content tip — avoid double title

If your article body in Shopify Admin **starts with the same H1** as the post title, the CSS hides that first H1 automatically.

Better long-term: use **only H2+** inside the article body; let the theme title block render the H1.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No style change | Re-upload CSS asset; hard refresh (`Cmd+Shift+R`) |
| Title still centered | Clear theme cache; confirm latest CSS includes `blog-post-content` rules |
| Card image too small on phone | CSS sets `--blog-post-card-scale: 1` on mobile |
| Wrong fonts in body | Global `h1–h4` rules are overridden inside `.blog-post-content.rte` |

---

## Files in this repo

| File | Purpose |
|------|---------|
| `vojta-hubne-horizon.css` | All blog styles (no Liquid changes) |
| `BLOG-INTEGRATION.md` | This guide |

Horizon Liquid sources you shared are kept as reference — edit them only if you need layout changes beyond CSS.
