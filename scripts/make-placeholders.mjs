// Genera las imágenes de marcador (capturas de proyectos, retrato, og.jpg e iconos)
// renderizando HTML con las fuentes del proyecto en Chrome/Edge sin cabeza.
// Uso: npm run placeholders   (reemplaza luego los PNG de src/assets por tus capturas reales)
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const fonts = pathToFileURL(path.join(root, 'public/fonts')).href
const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]
const browser = browsers.find((b) => fs.existsSync(b))
if (!browser) throw new Error('No se encontró Chrome/Edge')
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ch-ph-'))

const NAVY = '#fafafa' // fondo
const PINK = '#18181b' // tinta

const page = (w, h, body, bg = NAVY, ink = PINK) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:U;src:url(${fonts}/unbounded-latin.woff2) format('woff2');font-weight:200 900}
@font-face{font-family:O;src:url(${fonts}/onest-latin.woff2) format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;overflow:hidden;background:${bg};color:${ink};font-family:O}
.d{font-family:U;font-weight:800;text-transform:uppercase;letter-spacing:-.04em;line-height:.86}
</style></head><body>${body}</body></html>`

function shoot(name, w, h, html, out) {
  const file = path.join(tmp, `${name}.html`)
  fs.writeFileSync(file, html)
  const png = path.join(tmp, `${name}.png`)
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--window-size=${w},${h}`, '--virtual-time-budget=3000', `--screenshot=${png}`, pathToFileURL(file).href,
  ], { stdio: 'ignore' })
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.copyFileSync(png, out)
  return out
}

// Capturas de proyecto (1600×1000): tarjeta de título en los colores de cada proyecto.
const projects = [
  { slug: 'tostadora', name: 'Tostadora', kind: 'Landing page · cafetería', bg: '#2b1d14', ink: '#f2c49b', field: '#3a281c' },
  { slug: 'ruta-clara', name: 'Ruta Clara', kind: 'App de tareas', bg: '#e9efe4', ink: '#1f3b2c', field: '#d6e2cf' },
  { slug: 'pulso', name: 'Pulso', kind: 'Panel del clima', bg: '#0f2a33', ink: '#8fe3d1', field: '#163944' },
  { slug: 'portafolio', name: 'Portafolio', kind: 'Este sitio', bg: NAVY, ink: PINK, field: '#f0f0f2' },
]
for (const p of projects) {
  const body = `<div style="position:absolute;inset:0;padding:64px;display:flex;flex-direction:column;justify-content:space-between;background:${p.bg};color:${p.ink}">
    <div style="display:flex;justify-content:space-between;font-size:26px"><span>${p.kind}</span><span>[PLACEHOLDER] Reemplazar por captura real 1600×1000</span></div>
    <div class="d" style="font-size:${p.name.length > 8 ? 190 : 250}px">${p.name}</div>
    <div style="display:flex;gap:24px">${[0, 1, 2].map((i) => `<div style="flex:${i === 0 ? 2 : 1};height:180px;background:${p.field}"></div>`).join('')}</div>
  </div>`
  shoot(p.slug, 1600, 1000, page(1600, 1000, body, p.bg, p.ink), path.join(root, `src/assets/projects/${p.slug}.png`))
}

// Retrato (900×1125, 4:5)
shoot('portrait', 900, 1125, page(900, 1125, `<div style="position:absolute;inset:0;background:#f0f0f2;display:flex;flex-direction:column;justify-content:flex-end;padding:56px">
  <div class="d" style="font-size:300px;opacity:.9">CH</div>
  <p style="font-size:34px;margin-top:32px">[PLACEHOLDER] Tu foto 4:5<br>mínimo 900×1125</p></div>`), path.join(root, 'src/assets/portrait.png'))

// Imagen Open Graph 1200×630
const og = shoot('og', 1200, 630, page(1200, 630, `<div style="position:absolute;inset:0;padding:56px;display:flex;flex-direction:column;justify-content:space-between">
  <p style="font-size:30px;max-width:760px;line-height:1.3">Webs rápidas que convierten visitas en clientes.</p>
  <div class="d" style="font-size:162px">Camilo<br>Higuera</div>
  <p style="font-size:26px">Desarrollador web · React · TypeScript · Tailwind CSS</p></div>`), path.join(tmp, 'og-out.png'))
await sharp(og).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(root, 'public/og.jpg'))

// Iconos: monograma CH
const icon = (s) => page(s, s, `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span class="d" style="font-size:${Math.round(s * 0.46)}px;letter-spacing:-.06em">CH</span></div>`)
const big = shoot('icon-512', 512, 512, icon(512), path.join(tmp, 'icon-512.png'))
for (const [name, size] of [['icon-512.png', 512], ['icon-192.png', 192], ['apple-touch-icon.png', 180]]) {
  await sharp(big).resize(size, size).png().toFile(path.join(root, 'public', name))
}
// favicon.ico con un PNG de 32×32 dentro
const png32 = await sharp(big).resize(32, 32).png().toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4)
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12)
header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18)
fs.writeFileSync(path.join(root, 'public/favicon.ico'), Buffer.concat([header, png32]))

fs.rmSync(tmp, { recursive: true, force: true })
console.log('Placeholders generados.')
