// Grammatik-Quiz: richtige Form wählen. Zwei Quellen, zufällig gemischt:
//  • Paradigmen (Verbendung, Possessivsuffix, Pronomen) — Form zu einer Person.
//  • Verbstämme — den (oft unregelmäßigen) Präsensstamm zum Infinitiv wählen.
// Nach der Antwort löst jede Option auf, wozu sie gehört.

import { useState } from 'react'
import { paradigms } from '../data/paradigms'
import { verbStems } from '../data/verbstems'
import { TranslitText } from '../translit'

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

interface Opt {
  key: string
  label: string // die zur Auswahl stehende Form
  reveal: string // Auflösung (Person bzw. Infinitiv + Bedeutung)
  correct: boolean
}
interface GQ {
  context: string // kleine Aufgabenzeile
  focus: string // groß hervorgehoben (Person oder Infinitiv)
  focusScript?: string // optionale persische Schrift zum Fokus
  options: Opt[]
  note?: string
}

function fromParadigm(): GQ {
  const p = paradigms[rand(paradigms.length)]
  const target = p.rows[rand(p.rows.length)]
  const distractors = shuffle(p.rows.filter((r) => r.form !== target.form)).slice(0, 3)
  const options: Opt[] = shuffle([target, ...distractors]).map((r) => ({
    key: r.form,
    label: r.form,
    reveal: r.person,
    correct: r.form === target.form,
  }))
  return { context: `${p.title} — ${p.question}`, focus: target.person, options, note: p.note }
}

function fromVerbStem(): GQ {
  const v = verbStems[rand(verbStems.length)]
  const distractors = shuffle(verbStems.filter((x) => x.presentStem !== v.presentStem)).slice(0, 3)
  const options: Opt[] = shuffle([v, ...distractors]).map((x) => ({
    key: x.id,
    label: x.presentStem,
    reveal: `${x.translit} (${x.meaning})`,
    correct: x.id === v.id,
  }))
  return {
    context: 'Welcher Präsensstamm gehört zu diesem Verb?',
    focus: `${v.translit} — ${v.meaning}`,
    focusScript: v.scriptFa,
    options,
    note: `Vergangenheitsstamm: ${v.pastStem}`,
  }
}

function newQuestion(): GQ {
  return Math.random() < 0.4 ? fromVerbStem() : fromParadigm()
}

export function GrammarQuiz() {
  const [q, setQ] = useState<GQ>(newQuestion)
  const [answered, setAnswered] = useState<Opt | null>(null)

  function answer(opt: Opt) {
    if (answered) return
    setAnswered(opt)
  }

  return (
    <div className="grammar-quiz">
      <div className="card-main">
        <p className="prompt">{q.context}</p>
        {q.focusScript && (
          <div className="fa-script small" dir="rtl" lang="fa">
            {q.focusScript}
          </div>
        )}
        <div className="stem-text">
          <TranslitText value={q.focus} />
        </div>

        <div className="options">
          {q.options.map((opt) => {
            let cls = 'option'
            if (answered) {
              if (opt.correct) cls += ' option-correct'
              else if (opt === answered) cls += ' option-wrong'
              else cls += ' option-dimmed'
            }
            return (
              <button
                key={opt.key}
                className={cls}
                disabled={!!answered}
                onClick={() => answer(opt)}
              >
                <span className="option-main">
                  <TranslitText value={opt.label} />
                </span>
                {answered && (
                  <span className="option-reveal">
                    <TranslitText value={opt.reveal} />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {answered && (
          <>
            <p className={answered.correct ? 'feedback feedback-ok' : 'feedback feedback-no'}>
              {answered.correct ? 'Richtig' : 'Leider falsch'}
            </p>
            {q.note && <p className="muted">{q.note}</p>}
            <button
              className="next-btn"
              onClick={() => {
                setQ(newQuestion())
                setAnswered(null)
              }}
              autoFocus
            >
              Weiter
            </button>
          </>
        )}
      </div>
    </div>
  )
}
