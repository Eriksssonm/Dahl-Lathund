# 🔧 HANDOFF – DAHL VVS Lathund

## Vad är detta?
En mobilanpassad HTML-lathund för rörläggare med verifierade artikelnummer från dahl.se.
Sidan är live på: https://eriksssonm.github.io/Dahl-Lathund/
GitHub-repo: https://github.com/Eriksssonm/Dahl-Lathund

## Filstruktur (i repot)
| Fil | Innehåll |
|-----|----------|
| `index.html` | Hela appen – en enda HTML-fil (ca 500+ rader) |
| `sw.js` | Service worker – offline-stöd via cache |
| `manifest.json` | PWA-manifest – lägg till på hemskärmen |
| `HANDOFF.md` | Denna fil |

## Git-access
- Repo: `https://github.com/Eriksssonm/Dahl-Lathund.git`
- Auth: GitHub PAT via HTTPS (be användaren om PAT vid ny session)
- Klona: `git clone https://[PAT]@github.com/Eriksssonm/Dahl-Lathund.git /home/claude/Dahl-Lathund`

## Sektioner och filter-ID:n
| Flik-label | data-d | Sektion-ID | Innehåll |
|------------|--------|------------|----------|
| Alla | all | – | Visar allt |
| 50mm | 50 | s50 | Wafix PP 50mm |
| 75mm | 75 | s75 | Wafix PP 75mm |
| 110mm | 110 | s110 | Wafix PP 110mm |
| Faluplast | falu | sfalu | FaluVULK vit PP |
| VATETTE | ku | sku | Vatette kulventiler, T-koppl, dubbelmuttrar |
| Cu-rör | cu | scu | Altech kopparrör + klämringskopplingar |
| Uponor RiR | upo | supo | Uponor Combi Pipe RiR |
| Skydd & Larm | skydd | sskydd | Tollco, LK Systems |
| Övrigt | ov | sov | Lock, nipplar, slangklämmor, gumminipplar, TEC7 |

## Tekniska detaljer
### Filter-system
- Varje produktrad: `data-d="[dim]"` och `data-s="[sökord]"`
- JS-karta `_dMap` och `_ids`-array i `index.html` måste uppdateras vid ny sektion
- Filterfunktion `f(dim, el)` och sökfunktion `s(q)`

### PWA / Offline
- `sw.js` cachas sidan automatiskt vid första besök
- Funkar utan internet efter första laddning
- Loggan (DAHL) = länk till `./` = laddar om sidan

### Kopiera art.nr
- Klick på art.nr-cellen kopierar till clipboard
- Visar ✓ i 1,2 sekunder

### CSS-nyckelklasser
| Klass | Beskrivning |
|-------|-------------|
| `.hdr` | Topheader (mörk gradient, röd accent) |
| `.fbar` | Filterflikrad |
| `.ftab` | Enskild filterflik |
| `.sinput` | Sökruta |
| `.sec-head` | Sektionsrubrik med badge |
| `.grp` | Underrubrik (mörk blå gradient, gul text) |
| `.nr` | Artikelnummer-cell (klickbar = kopiera) |
| `.lnk` | Dahl-knapp (röd) |
| `.chip` | Dimensionsbricka |
| `.tch` | Typ-tagg (inline i namn-cellen) |

## Verifierade artikelnummer – nyckelprodukter
Alla art.nr verifierade mot dahl.se om inte annat anges.

### TEC7
- Vit: 3829372 | Grå: 3829373 | Transparent (Trans7): 3829382

### Wafix 30°-böjar (2-muff)
- 50mm: 2830681 | 75mm: 2830278 | 110mm: 2830474

### Faluplast 40mm
- 45° muff×slätända: 2316108 | 90° muff×slätända: 2910343 | 90° 2-muff: 2316114
- T-rör 90° 3-muff: 2316126

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

### Vatette T-rörskulventil 3-vägs förkromad
12mm=8541437, 15mm=8546977, 18mm=8546978, 22mm=8546979

## Kvarstående att verifiera / TODO
- [ ] Vatette T-koppling krom 15mm 3×klämring – ej hittad på dahl.se
- [ ] Faluplast böjar 30°/45° 75mm – ej kontrollerade
- [ ] Testa PWA-installation på iPhone och Android

## Användarens preferenser
- Vill ha verifierade art.nr – inga gissningar utan tydlig markering
- Direktlänkar till dahl.se-produktsidor, inte kategorisidor
- Snabb och enkel för rörläggare på plats
- GitHub Pages hosting
- Claude hanterar all versionshantering och Git autonomt
