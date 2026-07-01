// Domänenmodell. Bewusst schmal gehalten — erweitern wenn ein Modul es wirklich braucht.

export type Register = 'colloquial' | 'formal' | 'both'

export type Origin = 'pie' | 'arabic_loan' | 'turkic_loan' | 'french_loan' | 'other'

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'number'
  | 'particle'
  | 'phrase'

export type CognateLang = 'la' | 'de' | 'en'

export interface Cognate {
  language: CognateLang
  form: string
  note: string
}

export interface Word {
  id: string
  scriptFa: string // persische Schrift (RTL)
  translit: string // Romanisierung, Langvokale als ā ī ū
  translationDe: string
  translationEn: string
  category: string
  register: Register
  origin: Origin
  partOfSpeech: PartOfSpeech
  cognates: Cognate[]
  // Formalpersische Variante, nur wenn sie vom gesprochenen Wort deutlich abweicht.
  formalNote?: string
  // Aussprache: Quelle später geklärt, Feld existiert schon fürs Datenmodell.
  audioUrl?: string
}

// SM-2 Karten-Zustand pro Wort (der veränderliche Teil, lebt in IndexedDB).
export interface CardState {
  wordId: string
  easeFactor: number // SM-2 EF, startet bei 2.5
  intervalDays: number // aktuelles Intervall
  repetitions: number // Anzahl korrekter Wiederholungen in Folge
  due: number // nächster Fälligkeitszeitpunkt (epoch ms)
  lastReviewed: number | null // epoch ms
}
