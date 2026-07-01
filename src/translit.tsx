// Transliterations-Tooltip-System. Erklärt Sonderzeichen der Romanisierung inline.
// Wird in allen Modulen wiederverwendet: einfach <TranslitText value="ṣobh" /> rendern.

import type { ReactNode } from 'react'

// Erklärungen pro Sonderglyph. Nur einzelne Codepoints (in den Seed-Daten sind alle
// Diacritics präkomponiert: ā ī ū ṣ ḥ ż ẓ ṭ …). Später erweiterbar um Affixe (mi-, -e).
const GLYPHS: Record<string, string> = {
  ā: 'Langvokal „a" (persisch الف / ā)',
  ī: 'Langvokal „i"',
  ū: 'Langvokal „u"',
  ṣ: 'arab. ص — Laut = normales s, Diacritic markiert arabische Herkunft',
  s̱: 'arab. ث — Laut = normales s, arabische Herkunft',
  ẕ: 'arab. ذ — Laut = normales z, arabische Herkunft',
  ẓ: 'arab. ض — Laut = normales z, arabische Herkunft',
  ż: 'arab. ظ — Laut = normales z, arabische Herkunft',
  ṭ: 'arab. ط — Laut = normales t, arabische Herkunft',
  ḥ: 'arab. ح — Laut = normales h, arabische Herkunft',
  q̇: 'arab. غ — verlässlicher Arabisch-Marker (vs. q, das auch turkic sein kann)',
  ʿ: 'ayn (ع) — Knacklaut, kein persisches Gegenstück',
  ʾ: 'hamze (ء) — Knacklaut, kein persisches Gegenstück',
}

interface Props {
  value: string
  className?: string
}

export function TranslitText({ value, className }: Props) {
  const out: ReactNode[] = []
  const chars = [...value] // nach Codepoints splitten (Diacritics sind präkomponiert)

  chars.forEach((ch, i) => {
    const explanation = GLYPHS[ch]
    if (explanation) {
      out.push(
        <span key={i} className="glyph" tabIndex={0} role="button" aria-label={explanation}>
          {ch}
          <span className="glyph-tip" role="tooltip">
            {explanation}
          </span>
        </span>,
      )
    } else {
      out.push(ch)
    }
  })

  return <span className={className}>{out}</span>
}
