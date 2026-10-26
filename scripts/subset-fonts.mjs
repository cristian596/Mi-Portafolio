// Recorta las fuentes variables a lo que usa la página: Unbounded fija en 800 y Onest entre 400 y 500,
// solo latín básico + español + signos. Uso: npm run fonts
import fs from 'node:fs/promises'
import path from 'node:path'
import subsetFont from 'subset-font'

const root = path.resolve(import.meta.dirname, '..')
const ranges = [
  [0x20, 0x7e], [0xa0, 0xff], [0x2013, 0x2014], [0x2018, 0x201e], [0x2022, 0x2022], [0x2026, 0x2026],
  [0x20ac, 0x20ac], [0x2190, 0x2199], [0x2212, 0x2212],
]
const text = ranges.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i))).join('')

const jobs = [
  { from: 'node_modules/@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2', to: 'public/fonts/unbounded-latin.woff2', axes: { wght: 800 } },
  { from: 'node_modules/@fontsource-variable/onest/files/onest-latin-wght-normal.woff2', to: 'public/fonts/onest-latin.woff2', axes: { wght: { min: 400, max: 500 } } },
]
for (const j of jobs) {
  const input = await fs.readFile(path.join(root, j.from))
  const out = await subsetFont(input, text, { targetFormat: 'woff2', variationAxes: j.axes })
  await fs.writeFile(path.join(root, j.to), out)
  console.log(`${path.basename(j.to)}: ${(input.length / 1024).toFixed(1)} kB → ${(out.length / 1024).toFixed(1)} kB`)
}
