// Multiple-Choice-Fragengenerator. Erzeugt aus einem Zielwort + Pool eine Frage
// mit vier Optionen (1 richtig, 3 Distraktoren). Rein funktional, kein State.

import type { Word } from './types'

export type QuestionKind = 'fa_to_de' | 'de_to_fa'

// Jede Option trägt die vollen Felder ihres Worts, damit nach der Auflösung jede
// Option ihre echte Identität zeigen kann (Distraktoren inklusive).
export interface Option {
  key: string
  correct: boolean
  scriptFa: string
  translit: string
  translationDe: string
}

export interface Question {
  kind: QuestionKind
  word: Word // Zielwort (für SRS + volle Info)
  prompt: string // Aufgabenstellung
  stemScript?: string // persische Schrift im Fragekopf (RTL)
  stemText?: string // Text im Fragekopf (z.B. deutsches Wort)
  options: Option[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Distraktoren wählen: andere Wörter mit abweichendem Schlüssel (keyFn), gleiche
// Kategorie bevorzugt (plausiblere Ablenker), auf n eindeutige begrenzt.
function pickDistractors(target: Word, pool: Word[], keyFn: (w: Word) => string, n: number): Word[] {
  const targetKey = keyFn(target)
  const seen = new Set([targetKey])
  const unique: Word[] = []
  for (const w of shuffle(pool)) {
    if (w.id === target.id) continue
    const k = keyFn(w)
    if (seen.has(k)) continue
    seen.add(k)
    unique.push(w)
  }
  unique.sort(
    (a, b) => Number(b.category === target.category) - Number(a.category === target.category),
  )
  return unique.slice(0, n)
}

function toOption(w: Word, correct: boolean): Option {
  return {
    key: w.id,
    correct,
    scriptFa: w.scriptFa,
    translit: w.translit,
    translationDe: w.translationDe,
  }
}

export function generateQuestion(target: Word, pool: Word[]): Question {
  const kinds: QuestionKind[] = ['fa_to_de', 'de_to_fa']
  const kind = kinds[Math.floor(Math.random() * kinds.length)]

  // Distraktoren unterscheiden sich bei fa_to_de in der Übersetzung, bei de_to_fa im Wort.
  const keyFn = kind === 'fa_to_de' ? (w: Word) => w.translationDe : (w: Word) => w.translit
  const distractors = pickDistractors(target, pool, keyFn, 3)
  const options = shuffle([toOption(target, true), ...distractors.map((d) => toOption(d, false))])

  if (kind === 'fa_to_de') {
    return { kind, word: target, prompt: 'Was bedeutet dieses Wort?', stemScript: target.scriptFa, options }
  }
  return { kind, word: target, prompt: 'Welches Wort ist das?', stemText: target.translationDe, options }
}
