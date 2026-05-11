# 🔧 HANDOFF – DAHL VVS Lathund

## Vad är detta?
En mobilanpassad HTML-lathund för rörläggare med verifierade artikelnummer från dahl.se.
Sidan är live på: **https://eriksssonm.github.io/Dahl-Lathund/**
GitHub-repo: **https://github.com/eriksssonm/Dahl-Lathund**

---

## Git-anslutning (VIKTIGT för framtida agenter)

Repot hanteras via **HTTPS med Personal Access Token (PAT)**.
SSH fungerar INTE i Claude-miljön (ssh-keygen/ssh saknas).

### Så här klonar och konfigurerar du:
```bash
git clone https://[PAT]@github.com/Eriksssonm/Dahl-Lathund.git
cd Dahl-Lathund
git config user.email "claude@anthropic.com"
git config user.name "Claude"
git remote set-url origin https://[PAT]@github.com/Eriksssonm/Dahl-Lathund.git
```

### PAT-behörigheter som krävs:
- **Fine-grained token** (github.com/settings/tokens)
- Repository: `Dahl-Lathund`
- Permissions → **Contents: Read and write**
- Inget annat behövs

### Deploy keys fungerar EJ:
Deploy keys kräver SSH-klient som inte finns i Claude-miljön.

---

## Filstruktur (i /home/claude/)
Filen byggs av 4 delar som sammanfogas med:
```bash
cat lathund_header.html part_avlopp2.html part_va2.html part_footer.html > /mnt/user-data/outputs/DAHL_avlopp_lathund.html
```

| Fil | Innehåll |
|-----|----------|
| `lathund_header.html` | CSS, header, filtertabbar, sökruta |
| `part_avlopp2.html` | Wafix 50/75/110mm + Faluplast |
| `part_va2.html` | Vatette, Altech Cu, Uponor RiR, Övrigt |
| `part_footer.html` | Footer + all JavaScript (filter + sök) |

**Output:** `/mnt/user-data/outputs/DAHL_avlopp_lathund.html` (440 rader)

---

## Innehåll/sektioner i lathunden

| Sektion | ID | data-d | Innehåll |
|---------|-----|--------|----------|
| Wafix 50mm | s50 | 50 | Rör, böjar, muff, propp |
| Wafix 75mm | s75 | 75 | Rör, böjar, propp |
| Wafix 110mm | s110 | 110 | Rör, böjar, grenrör, förminskningar, propp |
| Faluplast FaluVULK | sfalu | falu | PP-rör, böjar 30/45/90°, T-rör, muffar, klammor |
| Vatette | sku | ku | Kulventiler rak+vinkel, T-kopplingar, Planadapter, Dubbelmuttrar |
| Altech Cu-rör | scu | cu | CR6 förkromade, R290 hårda, Stödhylsor, Klämringskoppl. rak+vinkel förkromad+mässing |
| Uponor RiR | supo | upo | Combi Pipe 12/15mm + klammor |
| Övrigt | sov | ov | Lock m. packning, Sexkantnipplar mässing+krom, Novipro slangklämmor, Gumminipplar Faluplast |

---

## Tekniska detaljer

### Filter-system
Varje produktrad har `data-d="[dim]"` och `data-s="[sökord]"`.
JS-funktioner i `part_footer.html`:
- `f(dim, el)` – filtrera på flik
- `s(q)` – sök (döljer hela sektioner + grupp-rubriker utan träffar)

### CSS-nyckelklasser
- `.grp` – underrubriker (mörk gradient, gul text)
- `.hdr` – topheader (mörk gradient med röd accent)
- `.sinput` – sökruta (vit bakgrund, rött fokus)
- `.sec-head` – sektionsrubrik
- `.lnk` – Dahl-knapp (röd, öppnar produktsida)

---

## Senaste ändringar (uppladdade till GitHub)
1. ✅ Modernare header (gradient, silver-logga, röd accent-prick)
2. ✅ Tydligare sökruta (vit bakgrund, röd fokus-ram)
3. ✅ Borttagen Tips-text i infopanelen
4. ✅ Förbättrad sökfunktion (döljer tomma sektioner + grupp-rubriker)
5. ✅ Tydligare underrubriker (mörk blå gradient, gul text)
6. ✅ Alla Altech klämringskopplingar verifierade mot dahl.se
7. ✅ Sexkantnipplar förkromade G6/G10/G15/G20/G25/G32 tillagda

---

## Verifierade artikelnummer – nyckelprodukter
Alla art.nr är verifierade via dahl.se om inte annat anges.

### Altech Klämringskoppling RAK förkromad
10=1965549, 12=1965550, 15=1965551, 18=1965552, 22=1965553

### Altech Klämringskoppling RAK mässing
10=1965530, 12=1965531, 15=1965532, 18=1965533, 22=1965534

### Altech Klämringskoppling VINKEL förkromad
10=1966438, 12=1966439, 15=1966440, 18=1966441, 22=1966442

### Altech Klämringskoppling VINKEL mässing
10=1966428, 12=1966429, 15=1966430, 18=1966431, 22=1966432

### Sexkantnipplar förkromade
G6=1985241, G10=1985357, G15=1985365, G20=1985373, G25=1985381, G32=1985399

### Sexkantnipplar mässing
G6=1985209, G10=1985225, G15=1985233, G20=1985258, G25=1985274

---

## Kvarstående uppgifter / förbättringsförslag
- [ ] Verifiera Faluplast rör/böjar 30°/45° art.nr mot dahl.se (några är educated guesses baserade på URL-mönster)
- [ ] T-kopplingar Vatette krom saknar fortfarande 15mm (ej funnen på dahl.se)
- [ ] Stödhylsor för 10×0,8mm (1866014) – URL-mönster, ej verifierad via web_fetch
- [ ] Testa mobilvy och responsivitet på faktisk telefon

---

## Användarens önskemål/preferenser
- Vill ha **verifierade art.nr** – inga gissningar utan tydlig markering
- Föredrar **direktlänkar** till dahl.se-produktsidor, inte kategorisidor
- Lathunden ska vara **snabb och enkel** för rörläggare på plats
- Använder **GitHub Pages** för hosting (gratis, permanent)
- Vill att Claude hanterar repot direkt via git – **inte via Chrome/browser**

---

*Senast uppdaterad av Claude Sonnet 4.6 – session 2026-05-11*
