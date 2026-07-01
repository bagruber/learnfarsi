// Grammatik-Referenz als Tabellen (Latein-Stil). Gesprochenes Persisch primär,
// Schriftsprache getrennt markiert. Romanisierte Zellen bekommen im UI die Translit-Tooltips.

export interface GrammarTable {
  id: string
  title: string
  note?: string
  columns: string[]
  rows: string[][]
  scriptColumn?: number // Spaltenindex, der als persische Schrift (RTL) gerendert wird
}

export const grammarTables: GrammarTable[] = [
  {
    id: 'personal-pronouns',
    title: 'Personalpronomen',
    note: 'Umgangssprache weicht in der 3. Person ab (un statt u, unā statt ānhā).',
    columns: ['Person', 'umgangssprachlich', 'schriftsprachlich', 'Schrift'],
    scriptColumn: 3,
    rows: [
      ['1. Sg.', 'man', 'man', 'من'],
      ['2. Sg.', 'to', 'to', 'تو'],
      ['3. Sg.', 'un', 'u', 'اون'],
      ['1. Pl.', 'mā', 'mā', 'ما'],
      ['2. Pl.', 'shomā', 'shomā', 'شما'],
      ['3. Pl.', 'unā', 'ānhā', 'اونا'],
    ],
  },
  {
    id: 'present-tense',
    title: 'Präsens — Konjugation',
    note: 'Bildung: mi- (Präfix) + Präsensstamm + Personalendung. Beispiel: kharidan „kaufen", '
      + 'Präsensstamm khar-. Abweichung umg./schriftspr. nur in 3. Sg., 2. Pl., 3. Pl.',
    columns: ['Person', 'umgangssprachlich', 'schriftsprachlich'],
    rows: [
      ['1. Sg.', 'mi-khar-am', 'mi-khar-am'],
      ['2. Sg.', 'mi-khar-i', 'mi-khar-i'],
      ['3. Sg.', 'mi-khar-e', 'mi-khar-ad'],
      ['1. Pl.', 'mi-khar-im', 'mi-khar-im'],
      ['2. Pl.', 'mi-khar-in', 'mi-khar-id'],
      ['3. Pl.', 'mi-khar-an', 'mi-khar-and'],
    ],
  },
  {
    id: 'possessive-clitics',
    title: 'Enklitische Possessivpronomen',
    note: 'Suffix direkt ans Nomen. Beispiel mit ketāb „Buch". Umgangssprachlich -un in der Pluralreihe.',
    columns: ['Person', 'umg. Suffix', 'schriftspr. Suffix', 'Beispiel (umg.)'],
    rows: [
      ['1. Sg.', '-am', '-am', 'ketāb-am'],
      ['2. Sg.', '-et', '-at', 'ketāb-et'],
      ['3. Sg.', '-esh', '-ash', 'ketāb-esh'],
      ['1. Pl.', '-emun', '-emān', 'ketāb-emun'],
      ['2. Pl.', '-etun', '-etān', 'ketāb-etun'],
      ['3. Pl.', '-eshun', '-eshān', 'ketāb-eshun'],
    ],
  },
]
