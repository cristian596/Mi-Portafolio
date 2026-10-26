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

## Despliegue (Vercel)

Framework «Other», build `npm run build`, salida `dist`. `vercel.json` ya define caché inmutable para
`/assets` y `/fonts`, HTML sin caché y cabeceras de seguridad. Vercel comprime con Brotli/gzip automáticamente.
Añade `VITE_SITE_URL` y `VITE_WEB3FORMS_KEY` en las variables de entorno del proyecto.
