// Verbstämme. Der Präsensstamm ist oft stark unregelmäßig (raftan → rav), der
// Vergangenheitsstamm meist Infinitiv minus -an. Grundlage für Referenz + Quiz.

export interface VerbStem {
  id: string
  scriptFa: string
  translit: string // Infinitiv romanisiert
  meaning: string // Deutsch
  presentStem: string
  pastStem: string
}

export const verbStems: VerbStem[] = [
  { id: 'raftan', scriptFa: 'رفتن', translit: 'raftan', meaning: 'gehen', presentStem: 'rav', pastStem: 'raft' },
  { id: 'amadan', scriptFa: 'آمدن', translit: 'āmadan', meaning: 'kommen', presentStem: 'āy', pastStem: 'āmad' },
  { id: 'didan', scriptFa: 'دیدن', translit: 'didan', meaning: 'sehen', presentStem: 'bin', pastStem: 'did' },
  { id: 'goftan', scriptFa: 'گفتن', translit: 'goftan', meaning: 'sagen', presentStem: 'gu', pastStem: 'goft' },
  { id: 'kardan', scriptFa: 'کردن', translit: 'kardan', meaning: 'machen', presentStem: 'kon', pastStem: 'kard' },
  { id: 'dashtan', scriptFa: 'داشتن', translit: 'dāshtan', meaning: 'haben', presentStem: 'dār', pastStem: 'dāsht' },
  { id: 'dadan', scriptFa: 'دادن', translit: 'dādan', meaning: 'geben', presentStem: 'deh', pastStem: 'dād' },
  { id: 'shodan', scriptFa: 'شدن', translit: 'shodan', meaning: 'werden', presentStem: 'shav', pastStem: 'shod' },
  { id: 'gereftan', scriptFa: 'گرفتن', translit: 'gereftan', meaning: 'nehmen', presentStem: 'gir', pastStem: 'gereft' },
  { id: 'khastan', scriptFa: 'خواستن', translit: 'khāstan', meaning: 'wollen', presentStem: 'khāh', pastStem: 'khāst' },
  { id: 'neveshtan', scriptFa: 'نوشتن', translit: 'neveshtan', meaning: 'schreiben', presentStem: 'nevis', pastStem: 'nevesht' },
  { id: 'khandan', scriptFa: 'خواندن', translit: 'khāndan', meaning: 'lesen', presentStem: 'khān', pastStem: 'khānd' },
  { id: 'danestan', scriptFa: 'دانستن', translit: 'dānestan', meaning: 'wissen', presentStem: 'dān', pastStem: 'dānest' },
  { id: 'tavanestan', scriptFa: 'توانستن', translit: 'tavānestan', meaning: 'können', presentStem: 'tavān', pastStem: 'tavānest' },
  { id: 'khordan', scriptFa: 'خوردن', translit: 'khordan', meaning: 'essen', presentStem: 'khor', pastStem: 'khord' },
  { id: 'kharidan', scriptFa: 'خریدن', translit: 'kharidan', meaning: 'kaufen', presentStem: 'khar', pastStem: 'kharid' },
  { id: 'residan', scriptFa: 'رسیدن', translit: 'residan', meaning: 'ankommen', presentStem: 'res', pastStem: 'resid' },
  { id: 'neshastan', scriptFa: 'نشستن', translit: 'neshastan', meaning: 'sitzen', presentStem: 'neshin', pastStem: 'neshast' },
  { id: 'sakhtan', scriptFa: 'ساختن', translit: 'sākhtan', meaning: 'bauen / machen', presentStem: 'sāz', pastStem: 'sākht' },
  { id: 'andakhtan', scriptFa: 'انداختن', translit: 'andākhtan', meaning: 'werfen', presentStem: 'andāz', pastStem: 'andākht' },
  { id: 'pokhtan', scriptFa: 'پختن', translit: 'pokhtan', meaning: 'kochen', presentStem: 'paz', pastStem: 'pokht' },
  { id: 'sukhtan', scriptFa: 'سوختن', translit: 'sukhtan', meaning: 'brennen', presentStem: 'suz', pastStem: 'sukht' },
  { id: 'rikhtan', scriptFa: 'ریختن', translit: 'rikhtan', meaning: 'gießen / schütten', presentStem: 'riz', pastStem: 'rikht' },
  { id: 'shekastan', scriptFa: 'شکستن', translit: 'shekastan', meaning: 'brechen', presentStem: 'shekan', pastStem: 'shekast' },
  { id: 'ferestadan', scriptFa: 'فرستادن', translit: 'ferestādan', meaning: 'senden', presentStem: 'ferest', pastStem: 'ferestād' },
  { id: 'yaftan', scriptFa: 'یافتن', translit: 'yāftan', meaning: 'finden', presentStem: 'yāb', pastStem: 'yāft' },
  { id: 'oftadan', scriptFa: 'افتادن', translit: 'oftādan', meaning: 'fallen', presentStem: 'oft', pastStem: 'oftād' },
  { id: 'istadan', scriptFa: 'ایستادن', translit: 'istādan', meaning: 'stehen', presentStem: 'ist', pastStem: 'istād' },
  { id: 'avardan', scriptFa: 'آوردن', translit: 'āvardan', meaning: 'bringen', presentStem: 'āvar', pastStem: 'āvard' },
  { id: 'khabidan', scriptFa: 'خوابیدن', translit: 'khābidan', meaning: 'schlafen', presentStem: 'khāb', pastStem: 'khābid' },
  { id: 'shenidan', scriptFa: 'شنیدن', translit: 'shenidan', meaning: 'hören', presentStem: 'shenav', pastStem: 'shenid' },
  { id: 'bastan', scriptFa: 'بستن', translit: 'bastan', meaning: 'schließen / binden', presentStem: 'band', pastStem: 'bast' },
  { id: 'zadan', scriptFa: 'زدن', translit: 'zadan', meaning: 'schlagen', presentStem: 'zan', pastStem: 'zad' },
  { id: 'forukhtan', scriptFa: 'فروختن', translit: 'forukhtan', meaning: 'verkaufen', presentStem: 'forush', pastStem: 'forukht' },
  { id: 'porsidan', scriptFa: 'پرسیدن', translit: 'porsidan', meaning: 'fragen', presentStem: 'pors', pastStem: 'porsid' },
  { id: 'shostan', scriptFa: 'شستن', translit: 'shostan', meaning: 'waschen', presentStem: 'shur', pastStem: 'shost' },
]
