// Captura real de la portada de este portafolio para la tarjeta "Este portafolio".
// Uso: npm run build && npm run preview  (en otra terminal)  →  node scripts/shoot-portfolio.mjs
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const url = process.argv[2] ?? 'http://localhost:4173/'
const out = path.resolve(import.meta.dirname, '../src/assets/projects/portafolio.png')
const browser = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((b) => fs.existsSync(b))
if (!browser) throw new Error('No se encontró Chrome/Edge')

execFileSync(browser, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--force-prefers-reduced-motion', '--window-size=1600,1000', '--virtual-time-budget=4000',
  `--screenshot=${out}`, url,
], { stdio: 'ignore' })
console.log('Captura guardada en', path.relative(process.cwd(), out))
