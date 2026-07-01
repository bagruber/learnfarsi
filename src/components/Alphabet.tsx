// Alphabet-Modul: Referenz-Grid und Quiz. Positionsform + Hilfslinie steuerbar.

import { useState } from 'react'
import { AlphabetGrid } from './AlphabetGrid'
import { AlphabetQuiz } from './AlphabetQuiz'
import { LETTER_FORMS, type LetterForm } from '../data/alphabet'

type Mode = 'reference' | 'quiz'

export function Alphabet() {
  const [mode, setMode] = useState<Mode>('reference')
  const [form, setForm] = useState<LetterForm>('isolated')
  const [baseline, setBaseline] = useState(false)

  return (
    <div className="alphabet">
      <div className="seg alpha-mode">
        <button
          className={mode === 'reference' ? 'seg-btn seg-active' : 'seg-btn'}
          onClick={() => setMode('reference')}
        >
          Referenz
        </button>
        <button
          className={mode === 'quiz' ? 'seg-btn seg-active' : 'seg-btn'}
          onClick={() => setMode('quiz')}
        >
          Quiz
        </button>
      </div>

      <div className="alpha-controls">
        {mode === 'reference' && (
          <div className="seg">
            {LETTER_FORMS.map((f) => (
              <button
                key={f.value}
                className={form === f.value ? 'seg-btn seg-active' : 'seg-btn'}
                onClick={() => setForm(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
        <label className="tolerance">
          <input type="checkbox" checked={baseline} onChange={(e) => setBaseline(e.target.checked)} />{' '}
          Hilfslinie
        </label>
      </div>

      {mode === 'reference' ? (
        <AlphabetGrid form={form} baseline={baseline} />
      ) : (
        <AlphabetQuiz baseline={baseline} />
      )}
    </div>
  )
}
