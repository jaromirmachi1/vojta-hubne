# Shopify blog — Blog + Novinky hub

Horizon blog listings are replaced by a **united hub**:

| Section | Content |
|---------|---------|
| Top | **Blog** (`blogs.blog`) |
| Bottom | **Novinky** (`blogs.novinky`) |

| URL | What you see |
|-----|----------------|
| `/blogs/blog` | Hub (Blog + Novinky) |
| `/blogs/novinky` | Same hub (same `blog.json` template) |
| `/blogs/blog/{handle}` | Single blog article (unchanged) |
| `/blogs/novinky/{handle}` | Single novinka article (unchanged) |

---

## Deploy

Do this **in order**. Do not paste the Liquid into **Snippets**.

1. **Sections → Add a new section**  
   Filename exactly: **`vojta-hubne-blog-hub`**  
   Paste `docs/shopify/vojta-hubne-blog-hub.liquid` → Save  
   If you see `Unknown tag 'schema'`, you are in **Snippets** — delete that file and create it under **Sections**.

2. **Templates → `blog.json`**  
   Replace with `docs/shopify/blog.json` (pure JSON, no comments) → Save  
   This only works after step 1 exists.

3. Re-upload:
   - `vojta-hubne-horizon.css`
   - `vojta-hubne-header-nav.liquid` (Snippets)
   - `vojta-hubne-bottom-nav.liquid` (Snippets)

4. Hard refresh `/blogs/blog` and `/blogs/novinky`

---

## Nav

One menu item **Blog** → `/blogs/blog` (covers both sections).  
Separate “Novinky” / “Blog” links are removed from header and bottom nav.

---

## Article pages

No change required. Article styling still comes from CSS on Horizon `main-blog-post`.

---

## Optional Customize

In **Customize → Blog**, open the VH Blog + Novinky section:

| Setting | Default |
|---------|---------|
| Počet článků blogu | 12 |
| Počet novinek | 12 |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Still see old grid only | `blog.json` not replaced, or section filename wrong |
| Empty Blog / Novinky block | Blog handles must be exactly `blog` and `novinky` in Admin |
| Nav still shows both links | Re-upload header + bottom-nav snippets |

---

## Files

| File | Purpose |
|------|---------|
| `vojta-hubne-blog-hub.liquid` | Hub section |
| `blog.json` | Blog template → hub |
| `vojta-hubne-horizon.css` | Hub + article styles |
| `vojta-hubne-header-nav.liquid` | Single Blog link |
| `vojta-hubne-bottom-nav.liquid` | Bottom tab → hub |
