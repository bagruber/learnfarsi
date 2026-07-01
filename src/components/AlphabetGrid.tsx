// Alphabet-Referenz: alle Buchstaben als Kacheln. Diacritic-Translit = arabische Herkunft.
// Positionsform und Hilfslinie werden von außen gesteuert.

import { alphabet, letterForm, type LetterForm } from '../data/alphabet'
import { TranslitText } from '../translit'

interface Props {
  form: LetterForm
  baseline: boolean
}

export function AlphabetGrid({ form, baseline }: Props) {
  return (
    <div className="alpha-grid">
      {alphabet.map((l) => (
        <div key={l.char} className={`alpha-cell alpha-${l.origin}`} title={l.note ?? ''}>
          <span className={baseline ? 'alpha-char baseline' : 'alpha-char'} dir="rtl" lang="fa">
            {letterForm(l.char, form)}
          </span>
          <span className="alpha-translit">
            <TranslitText value={l.translit} />
          </span>
          <span className="alpha-name">{l.name}</span>
        </div>
      ))}
    </div>
  )
}
