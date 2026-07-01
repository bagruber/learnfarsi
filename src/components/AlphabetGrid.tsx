// Alphabet-Referenz: alle Buchstaben als Kacheln. Diacritic-Translit = arabische Herkunft.

import { alphabet } from '../data/alphabet'
import { TranslitText } from '../translit'

export function AlphabetGrid() {
  return (
    <div className="alpha-grid">
      {alphabet.map((l) => (
        <div key={l.char} className={`alpha-cell alpha-${l.origin}`} title={l.note ?? ''}>
          <span className="alpha-char" dir="rtl" lang="fa">
            {l.char}
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
