# Shopify — potvrzení objednávky (e-mail od Vojty)

Soubor: **`vojta-hubne-order-confirmation-email.liquid`**

E-mail obsahuje:

- osobní poděkování od Vojty
- informaci o odeslání **čtvrtek 18. 6. 2026**
- zmínku o dárku v balíčku
- přehled objednávky (produkty, cena)
- tlačítko „Zobrazit stav objednávky“
- kontakt **info@vojtahubne.cz**

---

## Logo (`Vojta_Hubne_logo`)

E-mailové notifikace **nečtou theme Assets** přímo. Logo se načte takto:

1. **Doporučeno:** **Content → Files** → nahrajte `Vojta_Hubne_logo.png` (stejný soubor jako v theme Assets)
2. **Záloha:** **Settings → Brand** → nastavte logo obchodu (`shop.email_logo_url`)

Šablona používá:

```liquid
{{ 'Vojta_Hubne_logo.png' | file_img_url: '400x' }}
```

Pokud soubor v Files chybí, použije se logo z Brand nastavení. Jinak text „Vojta Hubne“.

---

## Předmět e-mailu (Subject)

V Notifications u **Order confirmation** nastavte předmět např.:

```text
Děkujeme za objednávku {{ order.name }} — Vojta Hubne
```

**Nepoužívejte** výchozí „Potvrzení objednávky“ — ten text jde z předmětu / staré šablony Shopify.

---

## Bílý pruh kolem e-mailu

Šablona používá `bgcolor` + `color-scheme: dark` na všech vrstvách (kvůli Gmailu, Outlooku a Apple Mail).

1. V **Edit code** musí být **celá** šablona nahrazena tímto souborem (ne jen vložený blok uvnitř staré bílé šablony).
2. Logo `Vojta_Hubne_logo.png` ideálně s **průhledným pozadím** (PNG bez bílého čtverce).
3. Po uložení znovu **Send test** — ověřte v Gmailu (mobil) i Apple Mail.
4. Pokud bílý okraj zůstane, v „Zobrazit původní“ zkontrolujte, zda Shopify nepřidává vlastní obal mimo váš HTML.

---

## Jak nahrát do Shopify

1. **Shopify Admin** → **Settings** → **Notifications**
2. Otevřete **Order confirmation** (Potvrzení objednávky zákazníkovi)
3. Klikněte **Edit code** (Upravit kód)
4. **Zkopírujte celý obsah** souboru `vojta-hubne-order-confirmation-email.liquid`
5. **Vložte** místo stávajícího kódu
6. **Save**
7. Klikněte **Send test** a pošlete test na svůj e-mail

---

## Důležité

| Co                       | Poznámka                                                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Datum odeslání           | V šabloně je natvrdo **18. 6. 2026** — po tomto termínu text v liquid souboru upravte                                        |
| Jméno zákazníka          | Pokud má Shopify jméno, použije se `Dobrý den {{ jméno }},`                                                                  |
| Notifikace vs. marketing | Toto je **transakční** e-mail (potvrzení objednávky), ne newsletter                                                          |
| Shipping confirmation    | Pro samostatný e-mail „zásilka odeslána“ použijte šablonu **Shipping confirmation** a zkopírujte jen blok „Personal message“ |

---

## Jen osobní zpráva (bez přepsání celé šablony)

Pokud nechcete měnit celý e-mail, v existující šabloně najděte úvodní odstavec a **nahraďte** ho tímto blokem:

```liquid
<p>
  {% if customer.first_name != blank %}
    Dobrý den {{ customer.first_name }},
  {% else %}
    Dobrý den,
  {% endif %}
</p>
<p>
  chtěl bych Vám touto cestou z celého srdce poděkovat za Vaši objednávku...
</p>
```

(Celý text je v souboru `vojta-hubne-order-confirmation-email.liquid` v sekci Personal message.)

---

## Test před odesláním zákazníkům

1. Notifications → Order confirmation → **Send test**
2. Zkontrolujte na mobilu i v Gmailu
3. Ověřte, že se zobrazují produkty a správná částka
