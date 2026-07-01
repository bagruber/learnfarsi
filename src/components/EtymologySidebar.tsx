// Etymologie-Sidebar. Strukturiertes Datenfeld, kein Fließtext.

import type { Word } from '../types'
import { ORIGIN_LABEL, LANG_LABEL } from '../labels'

export function EtymologySidebar({ word }: { word: Word }) {
  return (
    <aside className="etymology">
      <h3>Etymologie</h3>
      <p className={`origin origin-${word.origin}`}>{ORIGIN_LABEL[word.origin]}</p>

      {word.cognates.length > 0 && (
        <>
          <h4>Verwandte Wörter</h4>
          <ul className="cognates">
            {word.cognates.map((c, i) => (
              <li key={i}>
                <span className="cognate-lang">{LANG_LABEL[c.language]}</span>{' '}
                <span className="cognate-form">{c.form}</span>
                {c.note && <span className="cognate-note"> — {c.note}</span>}
              </li>
            ))}
          </ul>
        </>
      )}

      {word.formalNote && (
        <p className="formal-note">
          <strong>Hinweis:</strong> {word.formalNote}
        </p>
      )}
    </aside>
  )
}
