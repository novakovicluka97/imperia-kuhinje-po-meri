# Imperia — šta je urađeno i šta još treba

Kratak vodič kroz sajt. Sajt je **gotov i funkcionalan** — ovde je popisano samo
ono što treba da **vi** dopunite ili zamenite, plus uputstva za izmene.

---

## 1. Šta je urađeno

- **3 stranice:** `index.html` (početna), `galerija.html`, `kontakt.html`.
- Dizajn po uzoru na referencu (Smallbone): tamna pozadina, zlatni detalji,
  elegantan serifni font, full-screen hero.
- **47 slika** preuzeto sa Instagrama (`kuhinje_po_meri_bg_ns`), optimizovano u
  WebP + JPG (pune verzije + tambnejli), galerija generisana automatski.
- Hero slika preko celog ekrana (desktop + mobilni); spremno da se kasnije
  zameni snimkom (videom).
- Forma za upit sa proverom polja; šalje upit preko **WhatsApp**-a.
- Tehnički SEO: meta tagovi, Open Graph, Twitter kartice, JSON-LD
  (LocalBusiness), `sitemap.xml`, `robots.txt`, `favicon`, manifest.
- Brzo učitavanje: slike su lazy-load, hero se preučitava, CSS modularan.

---

## 2. ⚠️ Šta treba da dopunite (obavezno pre objave)

| Šta | Trenutno stanje | Šta uraditi |
|-----|-----------------|-------------|
| **Telefon / WhatsApp** | `+381 62 835 0793` (preuzeto sa Instagram opisa) | Potvrdite da je tačan ili zamenite — vidi tačku 3. |
| **Email** | `kuhinjepomeribgns@gmail.com` (sa Instagrama) | Potvrdite ili zamenite — vidi tačku 3. |
| **Domen** | `https://imperia-kuhinje.rs` (pretpostavka) | Zamenite pravim domenom — vidi tačku 3. |
| **Logo** | Tekstualni natpis „Imperia" (font Cormorant) | Kada napravite logo, vidi tačku 6. |
| **Favicon / share slika** | Privremeni (zlatno „I" + share slika) | Zamenite finalnim brendom — vidi tačku 6. |
| **Radno vreme** | „Ponedeljak — subota, po dogovoru" | Upišite tačno vreme u `kontakt.html` ako želite. |
| **Adresa** | Samo grad (Beograd) u JSON-LD | Dodajte ulicu i broj ako želite javnu adresu. |

---

## 3. Kako promeniti kontakt podatke i domen

Podaci se pojavljuju na više mesta. Najlakše je u editoru uraditi
**„Find & Replace u svim fajlovima"**:

- **Telefon:** zamenite svuda `381628350793` i `+381 62 835 0793`
  (pojavljuje se u sve 3 HTML stranice — u podnožju, meniju, JSON-LD; i u
  `kontakt.html` — dugmad i atribut `data-whatsapp` na formi).
- **Email:** zamenite svuda `kuhinjepomeribgns@gmail.com`.
- **Domen:** zamenite svuda `imperia-kuhinje.rs` pravim domenom
  (HTML `<link rel="canonical">`, `og:url`, JSON-LD, `sitemap.xml`, `robots.txt`).

> WhatsApp broj na formi se čita iz atributa `data-whatsapp="381628350793"`
> na `<form>` u `kontakt.html` — bez `+` i razmaka.

---

## 4. Kako promeniti IZGLED (fontovi, boje, veličine)

Sve je u **jednom fajlu — kontrolnoj tabli**: [`css/dashboard.css`](css/dashboard.css).
Otvorite ga — na vrhu je detaljno uputstvo, a sve je podeljeno u jasne sekcije:

1. FONTOVI · 2. BOJE · 3. LOGO · 4. HEADER · 5. HERO · 6. DUGMAD ·
7. GALERIJA · 8. VELIČINE TEKSTA · 9. RAZMACI · 10. RASPORED · 11. DETALJI

Svaka veličina (logo i njegov podnaslov, hero, header, dugmad galerije i
kontakta, itd.) ima imenovano podešavanje sa komentarom šta radi. Promenite
samo vrednost, sačuvajte, osvežite stranicu — ništa drugo se ne dira.

> Fontovi: izmenite `@import` liniju (URL sa Google Fonts) i imena u
> `--font-heading` / `--font-body` u sekciji 1.

---

## 5. Kako osvežiti slike sa Instagrama

Slike se vremenom menjaju. Da povučete najnovije:

1. Ponovo pokrenite Apify scraper „apify/instagram-scraper" nad profilom i
   sačuvajte rezultat u `tools/data/instagram-raw.json`
   (format je opisan u tom fajlu).
2. U folderu `tools/` pokrenite:
   ```
   npm run build
   ```
   Ovo preuzme slike → optimizuje ih → upiše galeriju u `index.html` i
   `galerija.html`. Folder `tools/` se **ne objavljuje** — služi samo za pripremu.

---

## 6. Kako promeniti hero sliku, logo i favicon

- **Hero slika:** u `tools/2-optimize-images.mjs` izmenite `HERO_ID = '23'`
  na redni broj druge slike, pa pokrenite `npm run optimize` u `tools/`.
- **Logo:** trenutno je tekst „Imperia". Kada napravite logo (npr. SVG/PNG),
  zamenite `<a class="wordmark">Imperia</a>` u sve 3 stranice slikom.
- **Favicon i share slika:** zamenite `favicon.svg` svojim, pa pokrenite
  `node make-icons.mjs` u `tools/` da se ponovo naprave PNG ikonice i
  `og-image.jpg`.

---

## 7. Opciono / kasnije

- **Video u hero sekciji:** kada snimite video, zamenite `<picture>` blok
  unutar `<div class="hero__media">` u `index.html` `<video>` elementom.
- **Slanje forme na email:** forma sada ide preko WhatsApp-a. Za email dostavu
  bez servera preporučuje se besplatan servis (npr. Web3Forms) — dodaje se
  jedno dugme i pristupni ključ u `js/contact-form.js`. Recite kada želite.
- **Više polja u formi:** lako se dodaju u `kontakt.html` po uzoru na postojeća
  (validacija se uključuje dodavanjem imena polja u listu `FIELDS` u
  `js/contact-form.js`).
- **Traka sa promocijom** na vrhu (kao na referentnom sajtu) — može se dodati.
- **Samostalno hostovanje fontova** za još brže učitavanje.

---

## 8. Pregled i objava

- **Lokalni pregled:** u root folderu pokrenite `npx serve .` pa otvorite
  prikazani `http://localhost:3000`.
- **Objava:** sajt je čist statički HTML/CSS/JS — može na bilo koji hosting
  (Netlify, Vercel, GitHub Pages, klasičan hosting). Objavljuju se svi fajlovi
  **osim foldera `tools/`** (on je samo za pripremu sadržaja).
