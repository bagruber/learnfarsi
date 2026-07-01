import { useEffect, useRef, useState } from 'react'
import './App.css'
import { words } from './data/words'
import type { CardState } from './types'
import { db, exportProgress, importProgress } from './db'
import { newCard, schedule, isDue, GRADES } from './srs'
import { generateQuestion, type Question, type Option } from './quiz'
import { QuizCard } from './components/QuizCard'
import { Grammar } from './components/Grammar'
import { Alphabet } from './components/Alphabet'

const wordById = new Map(words.map((w) => [w.id, w]))

type View = 'quiz' | 'alphabet' | 'grammar'

export default function App() {
  const [view, setView] = useState<View>('quiz')
  const [showTranslitHelp, setShowTranslitHelp] = useState(false)
  const [cards, setCards] = useState<Map<string, CardState>>(new Map())
  const [queue, setQueue] = useState<string[]>([])
  const [question, setQuestion] = useState<Question | null>(null)
  const [answered, setAnswered] = useState<Option | null>(null)
  const [loading, setLoading] = useState(true)
  const [reviewedCount, setReviewedCount] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  // Kartenzustände laden (fehlende neu anlegen) und fällige Queue bauen.
  useEffect(() => {
    async function load() {
      const stored = await db.cards.toArray()
      const map = new Map(stored.map((c) => [c.wordId, c]))
      for (const w of words) {
        if (!map.has(w.id)) map.set(w.id, newCard(w.id))
      }
      setCards(map)
      setQueue(buildQueue(map))
      setLoading(false)
    }
    load()
  }, [])

  function buildQueue(map: Map<string, CardState>): string[] {
    return words.filter((w) => isDue(map.get(w.id)!)).map((w) => w.id)
  }

  // Frage für das aktuelle Kopf-Wort erzeugen, wenn sich die Queue ändert.
  useEffect(() => {
    if (loading) return
    const head = queue[0]
    setQuestion(head ? generateQuestion(wordById.get(head)!, words) : null)
    setAnswered(null)
  }, [queue, loading])

  async function handleAnswer(option: Option) {
    if (answered) return
    setAnswered(option)

    const wordId = queue[0]
    const updated = schedule(cards.get(wordId)!, option.correct ? GRADES.good : GRADES.again)
    await db.cards.put(updated)

    const nextCards = new Map(cards)
    nextCards.set(wordId, updated)
    setCards(nextCards)
    setReviewedCount((n) => n + 1)
  }

  function handleNext() {
    setQueue((q) => q.slice(1))
  }

  function studyAll() {
    setReviewedCount(0)
    setQueue(words.map((w) => w.id))
  }

  async function handleExport() {
    const json = await exportProgress()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `learnfarsi-fortschritt-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const n = await importProgress(await file.text())
      const stored = await db.cards.toArray()
      const map = new Map(stored.map((c) => [c.wordId, c]))
      for (const w of words) if (!map.has(w.id)) map.set(w.id, newCard(w.id))
      setCards(map)
      setQueue(buildQueue(map))
      alert(`${n} Karten importiert.`)
    } catch (err) {
      alert(`Import fehlgeschlagen: ${(err as Error).message}`)
    }
    e.target.value = ''
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>LearnFarsi</h1>
        <nav className="tabs">
          <button
            className={view === 'quiz' ? 'tab tab-active' : 'tab'}
            onClick={() => setView('quiz')}
          >
            Üben
          </button>
          <button
            className={view === 'alphabet' ? 'tab tab-active' : 'tab'}
            onClick={() => setView('alphabet')}
          >
            Alphabet
          </button>
          <button
            className={view === 'grammar' ? 'tab tab-active' : 'tab'}
            onClick={() => setView('grammar')}
          >
            Grammatik
          </button>
        </nav>
        <details className="menu">
          <summary aria-label="Daten (Export/Import)">⋯</summary>
          <div className="menu-body">
            <button onClick={handleExport}>Fortschritt exportieren</button>
            <button onClick={() => fileRef.current?.click()}>Fortschritt importieren</button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              onChange={handleImportFile}
              hidden
            />
          </div>
        </details>
      </header>

      <main>
        {view === 'grammar' ? (
          <Grammar />
        ) : view === 'alphabet' ? (
          <Alphabet />
        ) : loading ? (
          <p className="muted">Lädt…</p>
        ) : question ? (
          <>
            <div className="quiz-bar">
              <span className="progress muted">
                {queue.length} in dieser Runde offen · {reviewedCount} gemacht
              </span>
              {question.kind === 'de_to_fa' && (
                <label className="tolerance">
                  <input
                    type="checkbox"
                    checked={showTranslitHelp}
                    onChange={(e) => setShowTranslitHelp(e.target.checked)}
                  />{' '}
                  Transkription als Hilfe
                </label>
              )}
            </div>
            <QuizCard
              key={queue[0]}
              question={question}
              answered={answered}
              showTranslitHelp={showTranslitHelp}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </>
        ) : (
          <div className="done">
            <p>Nichts mehr fällig. 🎉</p>
            <p className="muted">{reviewedCount} Karten in dieser Runde wiederholt.</p>
            <button onClick={studyAll}>Trotzdem alle üben</button>
          </div>
        )}
      </main>
    </div>
  )
}
