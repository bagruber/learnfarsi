// Alphabet-Quiz, beide Richtungen.
//  • Umschrift → Schrift: Buchstabe auf der persischen Tastatur anklicken.
//    Toleranz-Modus akzeptiert alle Buchstaben mit gleichem Laut (s → س ص ث).
//  • Schrift → Umschrift: aus 4 Romanisierungen die richtige wählen.

import { useState } from 'react'
import { alphabet, letterForm, LETTER_FORMS, type Letter, type LetterForm } from '../data/alphabet'
import { TranslitText } from '../translit'

type Direction = 'toScript' | 'toTranslit'

function rand(n: number) {
  return Math.floor(Math.random() * n)
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
function buildOptions(t: Letter): Letter[] {
  const distractors = shuffle(alphabet.filter((l) => l.translit !== t.translit)).slice(0, 3)
  return shuffle([t, ...distractors])
}

interface Answer {
  picked: string // gewählter char (toScript) bzw. translit (toTranslit)
  correct: boolean
}

export function AlphabetQuiz({ baseline }: { baseline: boolean }) {
  const [direction, setDirection] = useState<Direction>('toScript')
  const [tolerant, setTolerant] = useState(false)
  const [form, setForm] = useState<LetterForm>('isolated')
  const [target, setTarget] = useState<Letter>(() => alphabet[rand(alphabet.length)])
  const [options, setOptions] = useState<Letter[]>(() => buildOptions(target))
  const [answered, setAnswered] = useState<Answer | null>(null)

  function next() {
    const t = alphabet[rand(alphabet.length)]
    setTarget(t)
    setOptions(buildOptions(t))
    setAnswered(null)
  }

  // Buchstaben, die als richtig gelten (toScript). Toleranz → alle mit gleichem Laut.
  const correctChars = new Set(
    tolerant
      ? alphabet.filter((l) => l.sound === target.sound).map((l) => l.char)
      : [target.char],
  )

  function answerScript(l: Letter) {
    if (answered) return
    const ok = tolerant ? l.sound === target.sound : l.char === target.char
    setAnswered({ picked: l.char, correct: ok })
  }
  function answerTranslit(l: Letter) {
    if (answered) return
    setAnswered({ picked: l.translit, correct: l.translit === target.translit })
  }

  return (
    <div className="alpha-quiz">
      <div className="alpha-controls">
        <div className="seg">
          <button
            className={direction === 'toScript' ? 'seg-btn seg-active' : 'seg-btn'}
            onClick={() => {
              setDirection('toScript')
              setAnswered(null)
            }}
          >
            Umschrift → Schrift
          </button>
          <button
            className={direction === 'toTranslit' ? 'seg-btn seg-active' : 'seg-btn'}
            onClick={() => {
              setDirection('toTranslit')
              setAnswered(null)
            }}
          >
            Schrift → Umschrift
          </button>
        </div>
        {direction === 'toScript' && (
          <label className="tolerance">
            <input
              type="checkbox"
              checked={tolerant}
              onChange={(e) => {
                setTolerant(e.target.checked)
                setAnswered(null)
              }}
            />{' '}
            Toleranz (gleicher Laut zählt)
          </label>
        )}
      </div>

      <div className="card-main">
        {direction === 'toScript' ? (
          <>
            <p className="prompt">Welcher Buchstabe {tolerant ? 'klingt so' : 'ist das'}?</p>
            <div className="alpha-target">
              {tolerant ? target.sound : <TranslitText value={target.translit} />}
            </div>
            {tolerant && <p className="muted">alle gleichklingenden zählen</p>}

            <div className="keyboard" dir="rtl" lang="fa">
              {alphabet.map((l) => {
                let cls = baseline ? 'key baseline' : 'key'
                if (answered) {
                  if (correctChars.has(l.char)) cls += ' key-correct'
                  else if (l.char === answered.picked) cls += ' key-wrong'
                  else cls += ' key-dimmed'
                }
                return (
                  <button
                    key={l.char}
                    className={cls}
                    disabled={!!answered}
                    onClick={() => answerScript(l)}
                  >
                    {l.char}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <p className="prompt">Wie wird dieser Buchstabe umschrieben?</p>
            <div className="seg form-seg">
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
            <div className={baseline ? 'alpha-char big baseline' : 'alpha-char big'} dir="rtl" lang="fa">
              {letterForm(target.char, form)}
            </div>
            <div className="options">
              {options.map((l) => {
                let cls = 'option'
                if (answered) {
                  if (l.translit === target.translit) cls += ' option-correct'
                  else if (l.translit === answered.picked) cls += ' option-wrong'
                  else cls += ' option-dimmed'
                }
                return (
                  <button
                    key={l.char}
                    className={cls}
                    disabled={!!answered}
                    onClick={() => answerTranslit(l)}
                  >
                    <span className="option-main">
                      <TranslitText value={l.translit} />
                    </span>
                    {answered && <span className="option-reveal">{l.name}</span>}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {answered && (
          <>
            <p className={answered.correct ? 'feedback feedback-ok' : 'feedback feedback-no'}>
              {answered.correct ? 'Richtig' : 'Leider falsch'}
            </p>
            <p className="muted">
              {target.name} · <TranslitText value={target.translit} /> ·{' '}
              {target.origin === 'arabic' ? 'arabische Herkunft' : 'persisch'}
              {target.note ? ` · ${target.note}` : ''}
            </p>
            <button className="next-btn" onClick={next}>
              Weiter
            </button>
          </>
        )}
      </div>
    </div>
  )
}
