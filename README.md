# LearnFarsi

Persönliche Web-App zum Lernen von umgangssprachlichem (Teherani-)Persisch, mit Fokus auf
Aussprache, durchgängige Romanisierung und Etymologie. Einzelnutzer, statisch deploybar.

## Module
- **Üben** — Vokabeltrainer als Multiple Choice (Übersetzung in beide Richtungen), mit
  SM-2-Wiederholungsplanung. Nach jeder Antwort volle Wort-Info inkl. Etymologie.
- **Alphabet** — Referenz aller 32 Buchstaben + Quiz (Schrift ↔ Umschrift) mit persischer
  Bildschirm-Tastatur und optionalem Toleranzmodus (gleicher Laut zählt).
- **Grammatik** — Referenztabellen (Pronomen, Präsenskonjugation, Possessivsuffixe),
  umgangssprachlich vs. schriftsprachlich getrennt.

## Technik
- React + Vite + TypeScript
- Vokabeln/Alphabet/Grammatik als statische Datenmodule (`src/data/`)
- Lernfortschritt lokal in IndexedDB (Dexie), mit JSON-Export/-Import

## Entwicklung
```bash
npm install
npm run dev      # Dev-Server
npm run build    # Produktions-Build nach dist/
```

Deployment: statisch (GitHub Pages), `base` in `vite.config.ts` gesetzt.

Entscheidungen und Kontext werden in `NOTES.md` festgehalten.
