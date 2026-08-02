# Newsletter popup — Shopify offer emails

Popup signups tag customers in Shopify. The homepage popup offers **200 Kč** only (`offer-200kc`).

## Tags the site adds

| Source            | Tags                                        |
| ----------------- | ------------------------------------------- |
| Popup — **200 Kč** | `newsletter`, `popup-signup`, `offer-200kc` |
| Footer newsletter | `newsletter`, `website-footer`              |

**No duplicate offers:** if a customer already has `offer-200kc` (or the older `offer-herohero` tag), a second signup does **not** add another offer tag.

**Popup hidden after subscribe:** browser stores `vh-newsletter-popup-subscribed=true` permanently.

---

## Part 1 — Deploy code (Vercel)

1. Push latest `main` (or merge `dev` → `main`).
2. Confirm Vercel env vars for `/api/newsletter`:
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_CLIENT_ID` + `SHOPIFY_CLIENT_SECRET` (or `SHOPIFY_ADMIN_ACCESS_TOKEN`)
3. Redeploy Production.

### Test API

```bash
# 200 Kč offer
curl -sS -X POST "https://www.vojtahubne.cz/api/newsletter" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","offer":"discount","source":"popup"}'

# Herohero offer
curl -sS -X POST "https://www.vojtahubne.cz/api/newsletter" \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com","offer":"herohero","source":"popup"}'
```

Expected: `{"ok":true}`

In Shopify Admin → **Customers**, open the test customer and confirm tags.

---

## Part 2 — Create discount codes (Shopify Admin)

### A) 200 Kč off first order

1. **Discounts** → **Create discount** → **Amount off order** (or order discount).
2. Set **200 Kč** off, **one use per customer**, optional minimum order if needed.
3. Create a code, e.g. `VH200` or auto-generate unique codes per customer later.
4. Note the code you will put in the email template.

### B) Herohero free month

1. Create a code or partner process for Herohero (manual code, unique link, or internal process).
2. Put the redemption instructions in the Herohero email template.

---

## Part 3 — Customer segments (optional but clear)

**Customers** → **Segments** → **Create segment**

| Segment name   | Condition                               |
| -------------- | --------------------------------------- |
| Offer 200 Kč   | Customer tags contains `offer-200kc`    |
| Offer Herohero | Customer tags contains `offer-herohero` |

---

## Part 4 — Automated emails in Shopify

Use **Shopify Email** and/or **Shopify Flow** (plan-dependent).

### Option A — Shopify Flow (recommended if available)

1. **Settings** → **Apps and sales channels** → **Shopify Flow**.
2. **Create workflow** → trigger: **Customer tags added**.
3. Condition: tag equals `offer-200kc`.
4. Action: **Send marketing email** (or add to Shopify Email automation / send internal notification with template).
5. Repeat for `offer-herohero` with the Herohero template.

### Option B — Shopify Email automation

1. **Marketing** → **Automations** → **Create automation**.
2. Trigger: customer joins segment **Offer 200 Kč** (or tag-based trigger if available).
3. Email subject example: `Váš kupón 200 Kč na první nákup — Vojta Hubne`
4. Body: welcome text + coupon code `VH200` (or your code) + shop link.
5. Create second automation for segment **Offer Herohero** with Herohero instructions/code.

---

## Part 5 — Email content checklist

**200 Kč email**

- Thank you for joining
- Coupon code and how to apply at checkout
- Expiry date (if any)
- Link to shop
- Unsubscribe / marketing consent footer

**Herohero email**

- Thank you for joining
- How to activate Herohero free month (code or link)
- Support contact: info@vojtahubne.cz
- Unsubscribe / marketing consent footer

---

## Part 6 — End-to-end test

1. Use a **new email** you control (not already in Customers).
2. Open site in incognito → wait for popup (8s or 35% scroll).
3. Click **Chci 200 Kč** → submit.
4. In Shopify **Customers**: tags `newsletter`, `popup-signup`, `offer-200kc`.
5. Confirm **200 Kč email** arrives (may take a few minutes).
6. Refresh site → popup should **not** appear again (subscribed flag).
7. Repeat with another new email and **Chci Herohero zdarma** → tag `offer-herohero` + second email.
8. Try same email again with other button → still subscribed, **no new offer tag**, no second offer email.

---

## Troubleshooting

| Issue                             | Fix                                                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Customer created, no tags         | Check Vercel env + redeploy; test `/api/newsletter` with curl                                             |
| Tags OK, no email                 | Automation not published; check Flow/Email trigger matches exact tag                                      |
| Popup still shows after subscribe | Clear `localStorage` key `vh-newsletter-popup-subscribed` only for testing; production sets it on success |
| Second offer email sent           | Customer should already have offer tag — verify API not adding duplicate tags                             |
