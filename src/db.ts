// IndexedDB via Dexie. Speichert nur den veränderlichen Teil: den SM-2 Kartenzustand
// pro Wort. Vokabeln selbst sind statische Seed-Daten (src/data/words.ts).

import Dexie, { type EntityTable } from 'dexie'
import type { CardState } from './types'

const db = new Dexie('learnfarsi') as Dexie & {
  cards: EntityTable<CardState, 'wordId'>
}

db.version(1).stores({
  // Primärschlüssel wordId, Index auf due für "was ist fällig".
  cards: 'wordId, due',
})

export { db }

export async function getCard(wordId: string): Promise<CardState | undefined> {
  return db.cards.get(wordId)
}

export async function putCard(card: CardState): Promise<void> {
  await db.cards.put(card)
}

// Fortschritt als JSON exportieren — damit nichts im Browser gefangen ist.
export async function exportProgress(): Promise<string> {
  const cards = await db.cards.toArray()
  return JSON.stringify({ version: 1, exportedAt: Date.now(), cards }, null, 2)
}

// Import überschreibt vorhandenen Fortschritt (bewusst simpel, single-user).
export async function importProgress(json: string): Promise<number> {
  const data = JSON.parse(json)
  if (data?.version !== 1 || !Array.isArray(data.cards)) {
    throw new Error('Unbekanntes oder beschädigtes Export-Format.')
  }
  await db.cards.clear()
  await db.cards.bulkPut(data.cards as CardState[])
  return data.cards.length
}
