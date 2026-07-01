// Multiple-Choice-Karte. Zeigt Frage + 4 Optionen. Nach der Antwort: richtig/falsch
// markiert, plus komplette Wort-Info als Feedback/Weiterlernen.

import type { Question, Option } from '../quiz'
import { TranslitText } from '../translit'
import { EtymologySidebar } from './EtymologySidebar'
import { REGISTER_LABEL } from '../labels'

interface Props {
  question: Question
  answered: Option | null
  onAnswer: (option: Option) => void
  onNext: () => void
}

export function QuizCard({ question, answered, onAnswer, onNext }: Props) {
  const { word } = question

  function optionClass(opt: Option): string {
    if (!answered) return 'option'
    if (opt.correct) return 'option option-correct'
    if (opt === answered) return 'option option-wrong'
    return 'option option-dimmed'
  }

  return (
    <div className="card">
      <div className="card-main">
        <p className="prompt">{question.prompt}</p>

        {question.stemScript && (
          <div className="fa-script" dir="rtl" lang="fa">
            {question.stemScript}
          </div>
        )}
        {question.stemText && <div className="stem-text">{question.stemText}</div>}

        <div className="options">
          {question.options.map((opt) => (
            <button
              key={opt.key}
              className={optionClass(opt)}
              disabled={!!answered}
              onClick={() => onAnswer(opt)}
            >
              <span className="option-label">{opt.label}</span>
              {opt.scriptFa && (
                <span className="option-script" dir="rtl" lang="fa">
                  {opt.scriptFa}
                </span>
              )}
            </button>
          ))}
        </div>

        {answered && (
          <>
            <p className={answered.correct ? 'feedback feedback-ok' : 'feedback feedback-no'}>
              {answered.correct ? 'Richtig' : 'Leider falsch'}
            </p>

            {/* Komplette Wort-Info als Hilfe / weiterführende Info. */}
            <div className="word-info">
              <div className="fa-script small" dir="rtl" lang="fa">
                {word.scriptFa}
              </div>
              <div className="translit">
                <TranslitText value={word.translit} />
              </div>
              <div className="translation">
                <span className="lang-tag">DE</span> {word.translationDe}
              </div>
              <div className="translation">
                <span className="lang-tag">EN</span> {word.translationEn}
              </div>
              <div className="pos">
                {word.partOfSpeech} · {word.category} · {REGISTER_LABEL[word.register]}
              </div>
            </div>

            <button className="next-btn" onClick={onNext} autoFocus>
              Weiter
            </button>
          </>
        )}
      </div>

      {answered && <EtymologySidebar word={word} />}
    </div>
  )
}
