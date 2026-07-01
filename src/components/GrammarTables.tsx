// Grammatik-Referenztabellen aus data/grammar.ts.
// Romanisierte Zellen laufen durch TranslitText, die Schrift-Spalte wird RTL dargestellt.

import { grammarTables } from '../data/grammar'
import { TranslitText } from '../translit'

export function GrammarTables() {
  return (
    <div className="grammar">
      {grammarTables.map((table) => (
        <section key={table.id} className="grammar-table">
          <h2>{table.title}</h2>
          {table.note && <p className="grammar-note">{table.note}</p>}
          <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {table.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    ci === table.scriptColumn ? (
                      <td key={ci} className="cell-script" dir="rtl" lang="fa">
                        {cell}
                      </td>
                    ) : ci === 0 ? (
                      <th key={ci} scope="row" className="cell-person">
                        <TranslitText value={cell} />
                      </th>
                    ) : (
                      <td key={ci}>
                        <TranslitText value={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </section>
      ))}
    </div>
  )
}
