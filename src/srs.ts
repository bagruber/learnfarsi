// SM-2 (klassischer Anki-Algorithmus). Reine Funktionen, kein State, kein I/O —
// damit leicht testbar und nachvollziehbar. Referenz: super-memo.com/english/ol/sm2.htm

import type { CardState } from './types'

const DAY_MS = 24 * 60 * 60 * 1000
const MIN_EASE = 1.3
const DEFAULT_EASE = 2.5

// Antwortqualität 0–5. Wir mappen die UI-Buttons hierauf:
export type Grade = 0 | 3 | 4 | 5
export const GRADES: Record<'again' | 'hard' | 'good' | 'easy', Grade> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
}

export function newCard(wordId: string, now = Date.now()): CardState {
  return {
    wordId,
    easeFactor: DEFAULT_EASE,
    intervalDays: 0,
    repetitions: 0,
    due: now, // sofort fällig
    lastReviewed: null,
  }
}

// Neuer Kartenzustand nach einer Bewertung. Verändert das Eingabeobjekt nicht.
export function schedule(card: CardState, quality: Grade, now = Date.now()): CardState {
  let { easeFactor, intervalDays, repetitions } = card

  if (quality < 3) {
    // Falsch → Wiederholungen zurücksetzen, morgen wieder dran.
    repetitions = 0
    intervalDays = 1
  } else {
    if (repetitions === 0) intervalDays = 1
    else if (repetitions === 1) intervalDays = 6
    else intervalDays = Math.round(intervalDays * easeFactor)
    repetitions += 1
  }

  // EF-Anpassung (auch bei Fehler, wie im Original).
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (easeFactor < MIN_EASE) easeFactor = MIN_EASE

  return {
    ...card,
    easeFactor,
    intervalDays,
    repetitions,
    due: now + intervalDays * DAY_MS,
    lastReviewed: now,
  }
}

export function isDue(card: CardState, now = Date.now()): boolean {
  return card.due <= now
}
