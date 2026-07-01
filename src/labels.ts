// Geteilte Anzeige-Labels (in mehreren Komponenten genutzt).

import type { Origin, CognateLang, Register } from './types'

export const ORIGIN_LABEL: Record<Origin, string> = {
  pie: 'Indoeuropäisch (PIE)',
  arabic_loan: 'arabisches Lehnwort',
  turkic_loan: 'türkisches Lehnwort',
  french_loan: 'französisches Lehnwort',
  other: 'andere / unsichere Herkunft',
}

export const LANG_LABEL: Record<CognateLang, string> = {
  la: 'Latein',
  de: 'Deutsch',
  en: 'Englisch',
}

export const REGISTER_LABEL: Record<Register, string> = {
  colloquial: 'umgangssprachlich',
  formal: 'schriftsprachlich',
  both: 'beides',
}
