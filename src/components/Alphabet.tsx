// Alphabet-Modul: Referenz-Grid und Quiz.

import { useState } from 'react'
import { AlphabetGrid } from './AlphabetGrid'
import { AlphabetQuiz } from './AlphabetQuiz'

type Mode = 'reference' | 'quiz'

export function Alphabet() {
  const [mode, setMode] = useState<Mode>('reference')

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

      {mode === 'reference' ? <AlphabetGrid /> : <AlphabetQuiz />}
    </div>
  )
}
