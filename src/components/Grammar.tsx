// Grammatik-Modul: Referenztabellen + Quiz.

import { useState } from 'react'
import { GrammarTables } from './GrammarTables'
import { GrammarQuiz } from './GrammarQuiz'

type Mode = 'reference' | 'quiz'

export function Grammar() {
  const [mode, setMode] = useState<Mode>('reference')

  return (
    <div>
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

      {mode === 'reference' ? <GrammarTables /> : <GrammarQuiz />}
    </div>
  )
}
