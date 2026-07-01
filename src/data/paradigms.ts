// Strukturierte Paradigmen für den Grammatik-Quiz (umgangssprachliche Formen).
// Getrennt von den Anzeigetabellen in grammar.ts, damit der Quiz-Generator einfach bleibt.

export interface ParadigmRow {
  person: string // Bedeutung, z.B. „er/sie/es"
  form: string // umgangssprachliche Form (romanisiert)
}

export interface Paradigm {
  id: string
  title: string // Kontext, z.B. 'kharidan „kaufen" — Präsens'
  question: string
  note?: string
  rows: ParadigmRow[]
}

const VERB_PERSONS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie (pl.)']

function verbParadigm(id: string, title: string, forms: string[], note?: string): Paradigm {
  return {
    id,
    title,
    question: 'Welche Präsensform passt?',
    note,
    rows: VERB_PERSONS.map((person, i) => ({ person, form: forms[i] })),
  }
}

export const paradigms: Paradigm[] = [
  verbParadigm('praesens-kharidan', 'kharidan „kaufen" — Präsens', [
    'mi-khar-am',
    'mi-khar-i',
    'mi-khar-e',
    'mi-khar-im',
    'mi-khar-in',
    'mi-khar-an',
  ]),
  verbParadigm('praesens-goftan', 'goftan „sagen" — Präsens', [
    'mi-g-am',
    'mi-g-i',
    'mi-g-e',
    'mi-g-im',
    'mi-g-in',
    'mi-g-an',
  ]),
  verbParadigm('praesens-raftan', 'raftan „gehen" — Präsens', [
    'mi-r-am',
    'mi-r-i',
    'mi-r-e',
    'mi-r-im',
    'mi-r-in',
    'mi-r-an',
  ]),
  verbParadigm(
    'praesens-dashtan',
    'dāshtan „haben" — Präsens',
    ['dār-am', 'dār-i', 'dāre', 'dār-im', 'dār-in', 'dār-an'],
    'Ausnahme: dāshtan bildet das Präsens OHNE mi-.',
  ),
  {
    id: 'possessive-ketab',
    title: 'ketāb „Buch" + Possessivsuffix',
    question: 'Welche Form passt?',
    rows: [
      { person: 'mein', form: 'ketāb-am' },
      { person: 'dein', form: 'ketāb-et' },
      { person: 'sein/ihr', form: 'ketāb-esh' },
      { person: 'unser', form: 'ketāb-emun' },
      { person: 'euer', form: 'ketāb-etun' },
      { person: 'ihr (pl.)', form: 'ketāb-eshun' },
    ],
  },
  {
    id: 'pronouns',
    title: 'Personalpronomen',
    question: 'Welches Pronomen passt?',
    rows: [
      { person: 'ich', form: 'man' },
      { person: 'du', form: 'to' },
      { person: 'er/sie/es', form: 'un' },
      { person: 'wir', form: 'mā' },
      { person: 'ihr', form: 'shomā' },
      { person: 'sie (pl.)', form: 'unā' },
    ],
  },
]
