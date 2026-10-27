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
const site = (env.VITE_SITE_URL || 'https://camilohiguera.com').replace(/\/$/, '')

const { render } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href)
const appHtml = await render('/')
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Falta <!--app-html--> en index.html')
// CSS crítico incrustado: la hoja completa pesa ~7 kB gzip, así se evita una petición que bloquea el render.
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
const css = cssLink ? await fs.readFile(path.join(dist, cssLink[1]), 'utf8') : ''
const build = (body) => {
  const h = template.replace('<!--app-html-->', body)
  return cssLink ? h.replace(cssLink[0], () => `<style>${css}</style>`) : h
}
const setTag = (h, re, tag) => h.replace(re, () => tag)
await fs.writeFile(path.join(dist, 'index.html'), build(appHtml))

// /privacidad: misma plantilla con su propio título, descripción y canonical.
const privacyHtml = await render('/privacidad')
const privacyUrl = `${site}/privacidad`
const privacyTitle = 'Política de privacidad · Camilo Higuera'
const privacyDesc =
  'Cómo trato tus datos personales en camilohiguera.com conforme a la Ley 1581 de 2012: finalidades, derechos, cookies y cómo ejercerlos.'
let privacy = build(privacyHtml)
privacy = setTag(privacy, /<title>[\s\S]*?<\/title>/, `<title>${privacyTitle}</title>`)
privacy = setTag(privacy, /<meta name="description"[^>]*>/, `<meta name="description" content="${privacyDesc}" />`)
privacy = setTag(privacy, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${privacyUrl}" />`)
privacy = setTag(privacy, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${privacyUrl}" />`)
privacy = setTag(privacy, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${privacyTitle}" />`)
privacy = setTag(privacy, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${privacyDesc}" />`)
privacy = setTag(privacy, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${privacyTitle}" />`)
privacy = setTag(privacy, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${privacyDesc}" />`)
await fs.mkdir(path.join(dist, 'privacidad'), { recursive: true })
await fs.writeFile(path.join(dist, 'privacidad', 'index.html'), privacy)

const today = new Date().toISOString().slice(0, 10)
await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${site}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${site}/privacidad</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.3</priority>\n  </url>\n</urlset>\n`,
)
await fs.rm(ssr, { recursive: true, force: true })
console.log(`Prerender OK · ${(appHtml.length / 1024).toFixed(1)} kB de HTML · ${site}`)
