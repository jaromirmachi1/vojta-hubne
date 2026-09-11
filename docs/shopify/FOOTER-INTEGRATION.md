# Shopify footer — match React SiteFooter

Horizon **Footer** in Customize only allows premade blocks (Text, Menu, Group, Email signup, …).  
There is **no Custom Liquid** block in the footer — use **Edit code** instead.

The VH footer is an **accordion layout** (brand left, three collapsed sections, bottom strip). All sections start **collapsed**.

## Files you need

| Repo file | Upload to theme |
|-----------|-----------------|
| `vojta-hubne-footer-legal.liquid` | **Snippets** |
| `vojta-hubne-horizon.css` | **Assets** (replace existing) |
| `VojtHLogo.png` | **Assets** (same as header) |

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

Brand + accordion columns + bottom bar appear **inside** the footer.  
Horizon **Email signup** and default utilities are hidden automatically.

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
   - Doprava a platba → Shopify shipping policy URL
   - Nejčastější dotazy → `https://www.vojtahubne.cz/#faq`
   - Obchodní podmínky → terms policy URL
   - Reklamace → Shopify refund policy URL
   - Zásady ochrany osobních údajů → `/pages/zasady-ochrany-osobnich-udaju`
   - Zásady používání cookies → `/pages/zasady-pouzivani-cookies`
3. Keep **Email signup** block for newsletter

**Newsletter copy (same as React — snippet):**

| Field | Text |
|-------|------|
| Heading | `Novinky od Vojty` |
| Text | `Tipy, novinky, nové produkty a zákulisí. Bez každodenního spamu.` |
| Placeholder | `Váš e-mail` |
| Button | `Chci novinky` |

---

## Policies (required for links)

**Settings → Policies** — fill in:

- Zásady doručování
- Obchodní podmínky / Podmínky služby
- Zásady vrácení peněz (Reklamace)
- Zásady ochrany osobních údajů

---

## What matches React

| React | Shopify |
|-------|---------|
| Brand (logo + tagline + socials) | Left column in snippet |
| Firma a kontakty (accordion, collapsed) | First `<details>` |
| Informace k nákupu (accordion, collapsed) | Second `<details>` |
| Novinky od Vojty (accordion, collapsed) | Third `<details>` + customer form |
| © · email · payments · Nahoru ↑ | Bottom strip in snippet |
| Dark + gold styling | `vojta-hubne-horizon.css` |

---

## Troubleshooting

- **Columns not styled** — confirm latest `vojta-hubne-horizon.css` is uploaded and loaded in `theme.liquid`
- **Logo missing** — upload `VojtHLogo.png` to theme Assets
- **Policy links 404** — policies not created in Settings → Policies
- **Kontakt goes wrong** — `marketing_url` must be `https://www.vojtahubne.cz`
- **Accordions open by default** — snippet must not set `open` on `<details>`
