# Shopify footer — match React SiteFooter

Horizon **Footer** in Customize only allows premade blocks (Text, Menu, Group, Email signup, …).  
There is **no Custom Liquid** block in the footer — use **Edit code** instead.

## Files you need

| Repo file | Upload to theme |
|-----------|-----------------|
| `vojta-hubne-footer-legal.liquid` | **Snippets** |
| `vojta-hubne-horizon.css` | **Assets** (replace existing) |

---

## Option A — One-line patch (recommended)

1. **Online Store → Themes → Horizon → Edit code**
2. Open **`sections/footer.liquid`**
3. Find this line:

```liquid
{% content_for 'blocks' %}
```

4. Add **directly above** it:

```liquid
{% render 'vojta-hubne-footer-legal', marketing_url: 'https://www.vojtahubne.cz' %}
```

5. **Save**
6. Hard refresh the shop (`Cmd+Shift+R`)

The legal columns appear **inside** the footer grid, before the newsletter block.  
Styling is in `vojta-hubne-horizon.css` (`.vh-footer-legal`).

---

## Option B — Separate footer section

If you prefer not to touch `footer.liquid`:

1. Upload **`vojta-hubne-footer-legal-section.liquid`** as **`sections/vh-footer-legal.liquid`**
2. Open **`sections/footer-group.json`**
3. In `"sections"`, add:

```json
"vh_footer_legal": {
  "type": "vh-footer-legal",
  "settings": {}
}
```

4. In `"order"`, put `"vh_footer_legal"` **before** `"footer"`:

```json
"order": [
  "vh_footer_legal",
  "footer",
  "utilities"
]
```

5. Save and hard refresh.

---

## Option C — Customize only (no code)

Use premade blocks only — layout won’t match React exactly:

1. **Footer → Add block → Text** — paste company info (RM Solution Group, adresa, IČO, e-mail)
2. **Footer → Add block → Menu** — create menu in **Content → Menus** with:
   - Kontakt → `https://www.vojtahubne.cz/kontakt`
   - Doprava a platba → Shopify shipping policy URL
   - Obchodní podmínky → terms policy URL
   - Ochrana osobních údajů → privacy policy URL
3. Keep **Email signup** block for newsletter (React doesn’t have this — optional on shop)

---

## Policies (required for links)

**Settings → Policies** — fill in:

- Zásady doručování
- Obchodní podmínky / Podmínky služby
- Zásady ochrany osobních údajů

---

## What matches React

| React | Shopify |
|-------|---------|
| Kontaktní informace (vč. DIČ + nejsem plátce DPH) | Left column in snippet |
| Důležité informace | Right column in snippet |
| Newsletter jako 3. sloupec | Horizon Email signup block (styled by CSS) |
| © Vojta Hubne · RM Solution | Footer utilities (CSS override) |
| Socials + payment icons (bottom right) | Utilities: Social Links + Payment Icons blocks |
| Country + © (bottom left) | Utilities: localization + copyright blocks |
| Dark + gold styling | `vojta-hubne-horizon.css` |

---

## Troubleshooting

- **Columns not styled** — confirm latest `vojta-hubne-horizon.css` is uploaded and loaded in `theme.liquid`
- **Policy links 404** — policies not created in Settings → Policies
- **Kontakt goes wrong** — `marketing_url` must be `https://www.vojtahubne.cz`
