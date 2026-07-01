// Multiple-Choice-Fragengenerator. Erzeugt aus einem Zielwort + Pool eine Frage
// mit vier Optionen (1 richtig, 3 Distraktoren). Rein funktional, kein State.

import type { Word } from './types'

export type QuestionKind = 'fa_to_de' | 'de_to_fa'

export interface Option {
  key: string
  label: string
  scriptFa?: string // nur bei de_to_fa: persische Schrift zusätzlich zur Translit
  correct: boolean
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

export function generateQuestion(target: Word, pool: Word[]): Question {
  const kinds: QuestionKind[] = ['fa_to_de', 'de_to_fa']
  const kind = kinds[Math.floor(Math.random() * kinds.length)]

  if (kind === 'fa_to_de') {
    const distractors = pickDistractors(target, pool, (w) => w.translationDe, 3)
    const options: Option[] = shuffle([
      { key: target.id, label: target.translationDe, correct: true },
      ...distractors.map((d) => ({ key: d.id, label: d.translationDe, correct: false })),
    ])
    return {
      kind,
      word: target,
      prompt: 'Was bedeutet dieses Wort?',
      stemScript: target.scriptFa,
      options,
    }
  }

  // de_to_fa
  const distractors = pickDistractors(target, pool, (w) => w.translit, 3)
  const options: Option[] = shuffle([
    { key: target.id, label: target.translit, scriptFa: target.scriptFa, correct: true },
    ...distractors.map((d) => ({
      key: d.id,
      label: d.translit,
      scriptFa: d.scriptFa,
      correct: false,
    })),
  ])
  return {
    kind,
    word: target,
    prompt: 'Welches Wort ist das?',
    stemText: target.translationDe,
    options,
  }
}
