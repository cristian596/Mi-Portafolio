# Portafolio · Camilo Higuera

One-page en React 19 + Vite 8 + TypeScript + Tailwind CSS v4, prerenderizada (SSG) para SEO.

## Comandos

```bash
npm install
npm run dev          # desarrollo (sin prerender)
npm run build        # typecheck + build cliente + build SSR + prerender → dist/
npm run preview      # sirve dist/ en http://localhost:4173
npm run analyze      # genera stats.html con el mapa del bundle
npm run fonts        # recorta las fuentes variables a lo que usa la página
npm run placeholders # regenera imágenes de marcador, og.jpg e iconos
node scripts/shoot-portfolio.mjs   # captura real de la portada (con preview en marcha)
```

## Contenido

Todo el texto y los datos están en `src/content/site.ts`. Busca `[PLACEHOLDER]`.
Las capturas van en `src/assets/projects/*.png` (1600×1000) y la foto en `src/assets/portrait.png` (900×1125, 4:5);
se convierten solas a AVIF/WebP/JPG con `srcset` al hacer build. El dominio y la clave del formulario van en `.env`
(copia `.env.example`). Recuerda cambiar también el email y las redes del JSON-LD en `index.html`.

## Privacidad y cookies

- `/privacidad` (`src/pages/Privacy.tsx`) es la política de tratamiento de datos (Ley 1581 de 2012). Se prerenderiza junto a la portada.
  Los datos legales (titular, domicilio, fecha) están en `legal` dentro de `src/content/site.ts`.
- El formulario exige aceptar la política antes de enviar.
- Google Analytics: pon el ID `G-XXXXXXXXXX` en `VITE_GA_ID`. Hasta entonces no hay analítica ni aviso de cookies. Con el ID aparecen el
  aviso (Aceptar / Rechazar / Configurar) y el enlace «Configuración de cookies» en el pie; Analytics solo se carga tras aceptar
  (`src/cookies/consent.ts`). En GA4 configura la retención de datos a 14 meses o menos.

## Cómo funciona el prerender

`scripts/prerender.mjs` (sin plugins): Vite compila `src/entry-server.tsx` en modo SSR, el script llama a
`prerenderToNodeStream` de `react-dom/static` —que espera a todos los `React.lazy`— e inyecta el HTML en
`dist/index.html`. También incrusta el CSS (≈7 kB gzip) para no bloquear el render y genera `robots.txt` y
`sitemap.xml` con `VITE_SITE_URL`. En el navegador, `hydrateRoot` reutiliza ese HTML.

## Movimiento

- Scroll ligado (escala del nombre, frase que se llena de tinta, apilado de proyectos, línea del proceso,
  parallax, barra de progreso): animaciones CSS por scroll (`animation-timeline`), sin JS. Donde no hay
  soporte o con movimiento reducido queda el estado final.
- Entradas por sección: `src/reveal.ts` con WAAPI; sin JS todo es visible.
- Escritorio con ratón: Lenis, cursor, botones magnéticos y tilt (`src/effects/desktop.ts`, Motion mini),
  cargados con `import()` solo si hay `hover: hover` y sin movimiento reducido.

## Despliegue (Cloudflare)

**Cloudflare Pages** (conectado a GitHub): framework «None», comando de build `npm run build`, directorio de salida `dist`.
En *Settings → Variables* añade `VITE_SITE_URL` (tu dominio, sin barra final) y `VITE_WEB3FORMS_KEY`. La versión de Node
sale de `.node-version` (22).

`public/_headers` se copia a `dist/` y define caché inmutable para `/assets` y `/fonts`, HTML sin caché y las cabeceras de
seguridad (equivale al antiguo `vercel.json`). Cloudflare comprime con Brotli/gzip y sirve `/` sin extensión por sí mismo.

Dominio propio: *Custom domains* en el proyecto de Pages. Si despliegas como Worker con assets estáticos, `_headers`
también funciona; apunta el directorio de assets a `dist`.
