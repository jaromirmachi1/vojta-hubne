# DNS — vojtahubne.cz + shop.vojtahubne.cz

Návod jak nastavit domény pro náš setup:

| Doména | Kam | Co tam běží |
|--------|-----|-------------|
| `vojtahubne.cz` + `www` | **Vercel** | React (launch, homepage) |
| `shop.vojtahubne.cz` | **Shopify** | Produkty, košík, checkout |

DNS se mění u **registrátora domény** (Wedos, Forpsi, Active24, GoDaddy, …) — ne v Shopify ani Vercel.

---

## Krok 0 — Kde spravuješ DNS?

1. Zjisti, **kde jsi koupil** `vojtahubne.cz`
2. Přihlas se do panelu registrátora
3. Najdi sekci: **DNS zóna**, **Správa domény**, **DNS záznamy**

> Pokud doména používá **Shopify DNS** nebo **Vercel DNS**, úpravy děláš v tom panelu (Shopify → Domény → spravovat DNS, nebo Vercel → Domains).

---

## Krok 1 — Shopify: `shop.vojtahubne.cz`

### V Shopify Admin

1. **Nastavení → Domény**
2. **Připojit existující doménu** → zadej `shop.vojtahubne.cz`
3. Shopify ukáže **přesné DNS záznamy** — použij **jejich** hodnoty (mohou se lišit)

Typicky:

| Typ | Název / Host | Hodnota / Cíl |
|-----|----------------|---------------|
| **CNAME** | `shop` | `shops.myshopify.com` |

4. Počkej na propagaci (minuty až 48 h)
5. Ve Shopify musí být stav **Připojeno** (zeleně), ne „Neplatné záznamy DNS“

Oficiální návod Shopify:  
https://help.shopify.com/en/manual/domains/add-a-domain/connecting-domains/connect-domain-manual

---

## Krok 2 — Vercel: `vojtahubne.cz` + `www`

### V Vercel

1. https://vercel.com → tvůj projekt **vojta-hubne**
2. **Settings → Domains**
3. **Add** → `vojtahubne.cz`
4. **Add** → `www.vojtahubne.cz`
5. Vercel ukáže **jaké záznamy** přidat u registrátora

Typicky jedna z variant:

**A) Apex doména (`vojtahubne.cz`)**

| Typ | Název | Hodnota |
|-----|--------|---------|
| **A** | `@` | IP adresa od Vercelu (např. `76.76.21.21`) |

**B) Nebo CNAME** (pokud registrátor podporuje CNAME na apex)

| Typ | Název | Hodnota |
|-----|--------|---------|
| **CNAME** | `@` | `cname.vercel-dns.com` |

**WWW:**

| Typ | Název | Hodnota |
|-----|--------|---------|
| **CNAME** | `www` | `cname.vercel-dns.com` |

6. V Vercel počkej na **Valid Configuration**

Oficiální návod Vercel:  
https://vercel.com/docs/projects/domains/add-a-domain

---

## Krok 3 — Obě služby najednou (přehled)

U registrátora by mělo být něco takového:

```
vojtahubne.cz          A nebo CNAME  →  Vercel
www.vojtahubne.cz      CNAME         →  cname.vercel-dns.com
shop.vojtahubne.cz     CNAME         →  shops.myshopify.com
```

**Neměň** nameservery na slepo — pokud Shopify řekne „přesuň celou doménu k nám“, pro náš split setup chceš jen **záznamy** pro `shop`, zbytek nech na Vercel.

---

## Krok 4 — Ověření

| Test | Očekávání |
|------|-----------|
| https://vojtahubne.cz | Launch / homepage (Vercel) |
| https://www.vojtahubne.cz | Stejně → Vercel |
| https://shop.vojtahubne.cz | Shopify obchod |
| https://shop.vojtahubne.cz/products/glp1-support | Produkt v Shopify |

Nástroje:

- https://dnschecker.org — zkontroluj propagaci CNAME
- V prohlížeči anonymní okno po změně DNS

---

## Dokud DNS není hotové

| Co | URL |
|----|-----|
| Web (dev) | http://localhost:5173 |
| Web (Vercel preview) | URL z Vercelu |
| E-shop | https://9kihpp-rg.myshopify.com |

Na localhostu app automaticky používá **myshopify** odkazy v dev režimu.

---

## Časté chyby

| Chyba | Řešení |
|-------|--------|
| Celá doména jen na Shopify | Přidej A/CNAME pro `@` a `www` na Vercel |
| `shop` jde na Vercel | CNAME `shop` musí být `shops.myshopify.com` |
| Shopify: Neplatné DNS | Počkej 1–24 h; zkontroluj přesný CNAME z Shopify |
| Vercel: Invalid Configuration | Zkopíruj záznamy z Vercel dashboardu 1:1 |
| WWW nefunguje | Přidej CNAME `www` |

---

## Související docs v repu

- [SHOPIFY-INTEGRATION.md](./SHOPIFY-INTEGRATION.md) — celkové napojení
- [SHOPIFY-STEP-1.md](./SHOPIFY-STEP-1.md) — Headless API token
