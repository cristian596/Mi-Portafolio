// SSG mínimo: renderiza <App/> a HTML y lo inyecta en dist/index.html.
// También genera robots.txt y sitemap.xml con el dominio de VITE_SITE_URL.
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const ssr = path.join(root, 'dist-ssr')
const env = loadEnv('production', root, 'VITE_')
const site = (env.VITE_SITE_URL || 'https://camilohiguera.dev').replace(/\/$/, '')

const { render } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href)
const appHtml = await render()
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Falta <!--app-html--> en index.html')
// CSS crítico incrustado: la hoja completa pesa ~7 kB gzip, así se evita una petición que bloquea el render.
let html = template.replace('<!--app-html-->', appHtml)
const cssLink = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
if (cssLink) {
  const css = await fs.readFile(path.join(dist, cssLink[1]), 'utf8')
  html = html.replace(cssLink[0], () => `<style>${css}</style>`)
}
await fs.writeFile(path.join(dist, 'index.html'), html)

const today = new Date().toISOString().slice(0, 10)
await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${site}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
)
await fs.rm(ssr, { recursive: true, force: true })
console.log(`Prerender OK · ${(appHtml.length / 1024).toFixed(1)} kB de HTML · ${site}`)
