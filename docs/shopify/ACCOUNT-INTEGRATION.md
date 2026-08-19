# Customer account dashboard — Vojta Hubne branding

Your store uses **New customer accounts** (hosted by Shopify at `shopify.com/…/account`).  
These pages are **not** theme Liquid — you customize them in **Settings → Customer accounts → Customize**, not in `customers/account.liquid`.

Goal: **clear, modern, functional** dashboard that matches the shop (black + gold, Montserrat, minimal cards).

---

## 1. Where to edit

1. Shopify Admin → **Settings** → **Customer accounts**
2. Confirm **New customer accounts** is enabled
3. Click **Customize** (opens Checkout and accounts editor)
4. Use the page switcher (top) to preview:
   - **Orders** (Objednávky)
   - **Order status** (detail)
   - **Profile** (Profil)
   - **Sign in**

Changes apply to checkout, sign-in, and account pages together.

---

## 2. Brand palette (copy from `vojta-hubne-horizon.css`)

| Token | Hex / value | Use in accounts editor |
| ----- | ----------- | ---------------------- |
| Black | `#000000` | Page / main background |
| Surface | `#0a0a0a` | Optional alternate background |
| Surface raised | `#111111` | Cards, sections, input fields |
| Gold | `#eedc82` | Primary accent, links, active toggle |
| Gold muted | `#c9b56a` | Secondary links, footer links |
| Text | `rgba(255,255,255,0.92)` | Body text (or `#FFFFFF` at ~92% opacity) |
| Text muted | `rgba(255,255,255,0.78)` | Labels, order meta (`VH2072 · 0,00 Kč`) |
| Border subtle | `rgba(255,255,255,0.08)` | Card borders / dividers |
| Border gold | `rgba(238,220,130,0.35)` | Secondary button outline |

---

## 3. Recommended editor settings

### Global / Colors

| Setting | Value | Why |
| ------- | ----- | --- |
| Background | `#000000` | Matches shop body |
| Text | `#FFFFFF` (or editor “primary text”) | High contrast on black |
| Accent / Interactive | `#eedc82` | Gold — toggles, links, focus |
| Button background (primary) | `#eedc82` | CTAs that should pop |
| Button text (primary) | `#000000` | Readable on gold |
| Form field background | `#111111` | Same as product/cart cards |
| Form field border | `rgba(255,255,255,0.08)` | Subtle, not heavy boxes |

### Typography

| Setting | Value |
| ------- | ----- |
| Body font | **Montserrat** (400) — same as shop |
| Heading font | **Montserrat** (600) uppercase **or** Bebas Neue if available |
| Base size | Default or slightly larger for readability on mobile |

Shopify may not offer Bebas Neue in the picker; Montserrat semibold + letter-spacing reads close enough for account headings.

### Shape

| Setting | Value |
| ------- | ----- |
| Corner radius | **Medium** (~8–12px) — matches `--vh-radius-md` |
| Buttons | Rounded (pill optional for “Odhlásit se”) |

### Logo

- Upload the same asset as the shop header: `VojtHLogo.png`
- Link logo to your storefront: `https://shop.vojtahubne.cz`

---

## 4. Page-by-page checklist

### Orders list (Objednávky)

- [ ] Card background `#111111`, page `#000000`
- [ ] Status line (“Zrušeno”, “Potvrzeno”) — white, semibold
- [ ] Order id + price — muted grey (`~78%` white)
- [ ] **Koupit znovu** — secondary style: transparent bg, gold border `#eedc82`, white/gold text
- [ ] Product thumbnail — keep default; Shopify controls aspect ratio

### Order detail

- [ ] Back link + order title — white, clear hierarchy
- [ ] Section cards (Platba, Výdejní místo, Timeline) — same `#111111` fill
- [ ] **Koupit znovu** (top right) — match secondary button above
- [ ] Totals block — bold “Celkem”, muted labels for Mezisoučet / Expedice

### Profile (Profil)

- [ ] Name block + **Upravit** — card style, subtle border
- [ ] Address row — pin icon + chevron; default address badge readable
- [ ] Marketing toggle ON state — gold `#eedc82` (already correct in your screenshots)
- [ ] **Odhlásit se** — gold outline button; **Odhlásit se ze všech zařízení** — gold muted text link

### Footer links

- Prefer **gold muted** `#c9b56a` for legal links (Česko, cookies, doprava…) so the main content stays the focus.

---

## 5. Czech copy (Settings → Languages)

Tweak customer-account strings if needed:

| Key area | Suggestion |
| -------- | ---------- |
| Orders empty state | Short, direct Czech + link back to shop |
| Profile sections | Keep “Adresy”, “Marketingové předvolby” as-is unless marketing wants rename |
| Sign out | “Odhlásit se” / “Odhlásit se ze všech zařízení” — already fine |

Filter languages by **Customer accounts** in the language editor.

---

## 6. What you **cannot** change (New accounts)

These are fixed by Shopify — not theme CSS:

| Element | Notes |
| ------- | ----- |
| Sidebar layout (Objednávky / Profil) | Structure is platform-standard |
| Purple **“Sledovat objednávku přes aplikaci Shop”** | Shop app CTA; color is Shop-branded |
| Full custom HTML / your theme header on account pages | Accounts are sandboxed off-theme |
| Hiding Shopify footer legal links | Required; style via accent colors only |

If you need **custom blocks** (loyalty, reorder banner, support widget), use a **Customer account UI extension** (separate Shopify app / CLI project) — not Liquid in Horizon.

---

## 7. Shopify Plus (optional)

Plus merchants can use the **Checkout and Accounts Configuration API** for finer control (per-surface overrides, palette references, section padding). Non-Plus stores rely on the visual editor above.

---

## 8. Do **not** switch to Classic accounts for design

Classic accounts use `customers/*.liquid` and allow full theme rewrites, but Shopify is deprecating them. Prefer polishing **New accounts** branding so you do not rebuild later.

---

## 9. Quick audit vs your current screenshots

You are already close. To push **clearer / more functional**:

1. **Increase contrast hierarchy** — status white, meta grey, less gold on body text
2. **Unify card fill** — all modules `#111111`, single border style
3. **Secondary actions** — outline gold (Koupit znovu, Odhlásit se), primary gold fill only for main CTAs
4. **Reduce visual noise** — keep footer links muted gold, not bright gold
5. **Logo** — ensure same mark as `shop.vojtahubne.cz` header

---

## 10. After you save in Admin

1. Open an incognito window
2. Sign in at your shop’s account URL
3. Check **Orders**, one **order detail**, and **Profile** on mobile + desktop
4. Compare side-by-side with `shop.vojtahubne.cz/cart` for color match

No theme re-upload is required for account-only branding changes.
