# NOTES — Entscheidungen, Kontext, offene Fragen

Laufendes Projektgedächtnis. **Vor neuer Arbeit lesen.** Neue Entscheidungen + Begründung
hier festhalten, verworfene Alternativen inklusive Grund.

## Stack
- **React 19 + Vite 8 + TypeScript** (Scaffold `create-vite react-ts`).
- **Dexie 4** (IndexedDB-Wrapper) für veränderlichen State (Lernfortschritt).
- **Seed-Vokabeln als typisiertes TS-Modul** (`src/data/words.ts`), statisch gebundelt.
- Deployment: GitHub Pages, `vite.config.ts` `base: '/learnfarsi/'`.

## Getroffene Entscheidungen (+ warum)

### Kein SQLite
Briefing schlug SQLite vor. Verworfen: `better-sqlite3` braucht Node (auf statischem
GitHub Pages nicht verfügbar), `sql.js` wäre ~1 MB WASM + manuelle Persistierung — Overkill
für 1 Nutzer / ~1500 read-only Wörter. Stattdessen: Vokabeln = JSON/TS-Seed, Fortschritt =
IndexedDB via Dexie. Weniger bewegliche Teile.

### Storage-Grenze (wichtig, ehrlich halten)
GitHub Pages ist statisch → **kein** serverseitiger Speicher, also **keine** native
Geräte-Sync. v1: Dexie (pro Browser) + JSON-Export/Import-Button, damit Fortschritt nicht
im Browser gefangen ist. Echte Sync = eigenes späteres Modul (Optionen: GitHub-Gist mit PAT,
oder Supabase Free-Tier). Bewusst vertagt (YAGNI).

### Trainer = Multiple Choice statt Selbstbewertung
Erste Version war eine Anki-artige Aufdeck-Karte mit Selbstbewertung (Gut/Schwer…).
Bene fand das unintuitiv/passiv. Pivot auf **Multiple Choice** (`src/quiz.ts`): `fa_to_de`
(reine Übersetzung), `de_to_fa` (richtige Formulierung wählen). Nach der Antwort erscheint
die **komplette Wort-Info** als Feedback/Weiterlernen. SM-2 läuft weiter, Bewertung
automatisch: richtig → "gut", falsch → "nochmal".
Ein dritter Typ `origin` (Sprachschicht bestimmen) wurde gebaut und **wieder entfernt** —
Bene fand ihn unsinnig (immer dieselben 5 Optionen, absehbar). Fragetypen bleiben erweiterbar.

### SRS: SM-2
Klassischer Anki-Algorithmus, ~30 Zeilen, selbst implementiert statt Library (keine sinnvolle
Abhängigkeit für so wenig Code). FSRS (moderner Nachfolger, `ts-fsrs`) als möglicher Upgrade
notiert, für v1 zu viel.

### Transkription: Langvokale = macron (ā ī ū)
Briefing war intern inkonsistent (Vokaltabelle `ā/ī/ū` vs. Konsonanten-Beispiele `â`).
Entschieden: **Vokaltabelle ist verbindlich** → durchgängig `ā ī ū`. Alle Seed-Daten so.

### TTS / Audio
Web Speech API für Persisch ist unzuverlässig (fa-IR-Stimmen meist nicht installiert).
Entscheidung: Datenmodell bekommt jetzt ein optionales `audioUrl`-Feld, konkrete Audioquelle
wird später geklärt (vorab-generierte Files bevorzugt vor Live-TTS).

### Alphabet-Modul
`src/data/alphabet.ts` (32 Buchstaben: char, name, translit, `sound`, origin). Referenz-Grid
+ Quiz in beide Richtungen: „Umschrift → Schrift" mit persischer Bildschirm-Tastatur,
„Schrift → Umschrift" als MC. **Toleranz-Modus** nutzt das Feld `sound` (Basislaut ohne
Diacritic): im Toleranzmodus zählen alle gleichklingenden Buchstaben (s → س ص ث). Alphabet-Quiz
hat bewusst **kein** SRS/Dexie — reines Übungsquiz, State nur lokal.
**Positionsformen** (isoliert/initial/medial/final) via Zero-Width-Joiner (U+200D) erzwungen
statt eigener Glyph-Tabellen — Font-Shaping erledigt die Formwahl. **Hilfslinie** ist ein
Overlay via `::after`-Pseudoelement (kollidiert nicht mit den grün/rot-Antwortmarkierungen).

### Grammatik-Quiz
`src/data/paradigms.ts` (strukturierte Paradigmen: Präsens mehrerer Verben, Possessivsuffixe,
Pronomen — umgangssprachliche Formen). `GrammarQuiz` lässt die richtige Form zu einer Person
wählen, Auflösung zeigt für jede Option die zugehörige Person. Paradigmen bewusst **getrennt**
von den Anzeigetabellen (`grammar.ts`), damit der Generator simpel bleibt (kleine Duplizierung
in Kauf genommen). Grammatik-Tab hat jetzt Sub-Modi Referenz/Quiz (wie Alphabet).

### Verbstämme
`src/data/verbstems.ts` (Infinitiv, Präsensstamm, Vergangenheitsstamm). Als Referenztabelle
(generiert in `grammar.ts`) und als Quizfragen (in `GrammarQuiz` gemischt, ~40% Verbstamm,
sonst Paradigma): gefragt wird der oft unregelmäßige Präsensstamm zum Infinitiv.
`GrammarQuiz` wurde dafür auf ein neutrales Frageformat (context/focus/options) generalisiert.

### Deployment (GitHub Pages)
`.github/workflows/deploy.yml`: baut bei Push auf `main` und deployt `dist/` via GitHub
Actions auf Pages. `base: '/learnfarsi/'` setzt Repo-Name voraus. **Manuell einmalig nötig:**
Repo-Settings → Pages → Source = „GitHub Actions". Der lokale Fortschritt (IndexedDB) läuft
auf Pages; nur echte Geräte-Sync fehlt weiterhin (bewusst).

### Vokabelumfang
Von ~32 → ~67 → **~155** Wörter (Familie, Körper, Natur, Essen, Farben, Zeit, Verben,
Präpositionen, Grußformeln). Viele echte PIE-Cognates als Etymologie-Anker. „bad" als
**falscher Freund** markiert. Mehrdeutige Schreibungen notiert (شیر = Milch/Löwe, کی = wer/wann,
نه = neun/nein). Kanten mit arabisch-stämmigen Buchstaben in nativen Wörtern (غ in morgh, ذ in
gozāshtan) bewusst **ausgelassen**, um die „kein Diacritic = persisch"-Regel nicht zu untergraben.

### Mobile-Layout
Media-Query < 600px: kleinere Schrift/Karten, Alphabet-Grid & Tastatur kompakter (Tastatur
6 statt 8 Spalten für größere Tap-Ziele), Grammatik-Tabellen in `.table-scroll` (horizontal
scrollbar). Export/Import hinter `<details>`-Menü (⋯) im Header. **autoFocus** auf den
„Weiter"-Buttons entfernt — verursachte beim Antworten einen Scroll-Sprung (Button wurde
in den Viewport gescrollt).

## Geplant / als Nächstes
- **Grammatik-Tabellen** (Präpositionen, Pronomen, Verbkonjugation) — eigenes Modul.
- **Grammatik-Quiz** (Bene-Wunsch): richtige Form/„Fall" wählen — Verbkonjugation
  (Person/Endung), Präpositionen, enklitische Possessivpronomen. Das ist der nächste
  sinnvolle Quiz-Typ statt `origin`.

## Offene Fragen
- Cloud-Sync: wann/ob (GitHub-Gist vs. Supabase)?
- Audioquelle für Aussprachemodul (Cloud-TTS-Batch vs. eigene Aufnahmen)?
- Frequenzliste als Quelle für die ~500-Wort-Erweiterung (welches Korpus)?

## Projekt-Eigenheiten
- Gemischtes RTL/LTR: `dir="rtl"` nur scoped auf persische Schrift-Elemente, nie global.
- Kombinierende Diacritics (s̱, q̇, ż …) — Font-Rendering früh visuell prüfen.
