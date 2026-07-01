// Multiple-Choice-Karte. Zeigt Frage + 4 Optionen. Nach der Antwort: richtig/falsch
// markiert, jede Option löst ihre echte Bedeutung auf, plus komplette Info zum Zielwort.

import type { Question, Option } from '../quiz'
import { TranslitText } from '../translit'
import { EtymologySidebar } from './EtymologySidebar'
import { REGISTER_LABEL } from '../labels'

interface Props {
  question: Question
  answered: Option | null
  showTranslitHelp: boolean
  onAnswer: (option: Option) => void
  onNext: () => void
}

export function QuizCard({ question, answered, showTranslitHelp, onAnswer, onNext }: Props) {
  const { word, kind } = question

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
              {kind === 'de_to_fa' ? (
                <span className="option-main" dir="rtl" lang="fa">
                  {opt.scriptFa}
                </span>
              ) : (
                <span className="option-main">{opt.translationDe}</span>
              )}

              {/* optionale Transkriptions-Hilfe (nur de→fa, vor der Antwort) */}
              {kind === 'de_to_fa' && showTranslitHelp && !answered && (
                <span className="option-help">
                  <TranslitText value={opt.translit} />
                </span>
              )}

              {/* Auflösung: echte Identität jeder Option */}
              {answered &&
                (kind === 'de_to_fa' ? (
                  <span className="option-reveal">
                    <TranslitText value={opt.translit} /> · {opt.translationDe}
                  </span>
                ) : (
                  <span className="option-reveal">
                    <span dir="rtl" lang="fa" className="reveal-script">
                      {opt.scriptFa}
                    </span>{' '}
                    · <TranslitText value={opt.translit} />
                  </span>
                ))}
            </button>
          ))}
        </div>

        {answered && (
          <>
            <p className={answered.correct ? 'feedback feedback-ok' : 'feedback feedback-no'}>
              {answered.correct ? 'Richtig' : 'Leider falsch'}
            </p>

            {/* Komplette Info zum Zielwort. */}
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

            <button className="next-btn" onClick={onNext}>
              Weiter
            </button>
          </>
        )}
      </div>

      {answered && <EtymologySidebar word={word} />}
    </div>
  )
}
