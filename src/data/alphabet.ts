// Persisches Alphabet (32 Buchstaben). translit = unsere 1:1-Romanisierung (mit
// Diacritic bei arabischer Herkunft). sound = Basislaut ohne Diacritic — dient der
// Toleranz-Prüfung im Quiz (mehrere Buchstaben, gleicher Laut, z.B. س ص ث → s).

export interface Letter {
  char: string
  name: string // persischer Buchstabenname
  translit: string // eindeutige Romanisierung
  sound: string // Basislaut (für Toleranz-Gruppierung)
  origin: 'persian' | 'arabic'
  note?: string
}

export const alphabet: Letter[] = [
  { char: 'ا', name: 'alef', translit: 'ā', sound: 'ā', origin: 'persian', note: 'Träger für Langvokal ā / Vokalzeichen am Wortanfang' },
  { char: 'ب', name: 'be', translit: 'b', sound: 'b', origin: 'persian' },
  { char: 'پ', name: 'pe', translit: 'p', sound: 'p', origin: 'persian' },
  { char: 'ت', name: 'te', translit: 't', sound: 't', origin: 'persian' },
  { char: 'ث', name: 'se', translit: 's̱', sound: 's', origin: 'arabic' },
  { char: 'ج', name: 'jim', translit: 'j', sound: 'j', origin: 'persian' },
  { char: 'چ', name: 'che', translit: 'ch', sound: 'ch', origin: 'persian' },
  { char: 'ح', name: 'ḥe', translit: 'ḥ', sound: 'h', origin: 'arabic' },
  { char: 'خ', name: 'khe', translit: 'kh', sound: 'kh', origin: 'persian' },
  { char: 'د', name: 'dāl', translit: 'd', sound: 'd', origin: 'persian' },
  { char: 'ذ', name: 'zāl', translit: 'ẕ', sound: 'z', origin: 'arabic' },
  { char: 'ر', name: 're', translit: 'r', sound: 'r', origin: 'persian' },
  { char: 'ز', name: 'ze', translit: 'z', sound: 'z', origin: 'persian' },
  { char: 'ژ', name: 'zhe', translit: 'zh', sound: 'zh', origin: 'persian' },
  { char: 'س', name: 'sin', translit: 's', sound: 's', origin: 'persian' },
  { char: 'ش', name: 'shin', translit: 'sh', sound: 'sh', origin: 'persian' },
  { char: 'ص', name: 'sād', translit: 'ṣ', sound: 's', origin: 'arabic' },
  { char: 'ض', name: 'zād', translit: 'ẓ', sound: 'z', origin: 'arabic' },
  { char: 'ط', name: 'tā', translit: 'ṭ', sound: 't', origin: 'arabic' },
  { char: 'ظ', name: 'zā', translit: 'ż', sound: 'z', origin: 'arabic' },
  { char: 'ع', name: 'eyn', translit: 'ʿ', sound: 'ʿ', origin: 'arabic', note: 'Knacklaut, kein persisches Gegenstück' },
  { char: 'غ', name: 'gheyn', translit: 'q̇', sound: 'q', origin: 'arabic' },
  { char: 'ف', name: 'fe', translit: 'f', sound: 'f', origin: 'persian' },
  { char: 'ق', name: 'qāf', translit: 'q', sound: 'q', origin: 'persian' },
  { char: 'ک', name: 'kāf', translit: 'k', sound: 'k', origin: 'persian' },
  { char: 'گ', name: 'gāf', translit: 'g', sound: 'g', origin: 'persian' },
  { char: 'ل', name: 'lām', translit: 'l', sound: 'l', origin: 'persian' },
  { char: 'م', name: 'mim', translit: 'm', sound: 'm', origin: 'persian' },
  { char: 'ن', name: 'nun', translit: 'n', sound: 'n', origin: 'persian' },
  { char: 'و', name: 'vāv', translit: 'v', sound: 'v', origin: 'persian', note: 'auch Vokal u / ū / ow' },
  { char: 'ه', name: 'he', translit: 'h', sound: 'h', origin: 'persian' },
  { char: 'ی', name: 'ye', translit: 'y', sound: 'y', origin: 'persian', note: 'auch Vokal i / ī / ey' },
]
