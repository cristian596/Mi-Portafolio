// Todo el contenido editable del sitio vive aquí.
// Busca "[PLACEHOLDER]" para ver lo que falta por completar con tus datos reales.

import shotTostadora from '../assets/projects/tostadora.png?w=640;960;1280;1600&format=avif;webp;jpg&as=picture'
import shotRuta from '../assets/projects/ruta-clara.png?w=640;960;1280;1600&format=avif;webp;jpg&as=picture'
import shotPulso from '../assets/projects/pulso.png?w=640;960;1280;1600&format=avif;webp;jpg&as=picture'
import shotPortfolio from '../assets/projects/portafolio.png?w=640;960;1280;1600&format=avif;webp;jpg&as=picture'
import portrait from '../assets/portrait.png?w=400;640;900&format=avif;webp;jpg&as=picture'
import type { Picture } from '../types'

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://camilohiguera.dev').replace(/\/$/, '')

export const person = {
  name: 'Camilo Higuera',
  firstName: 'Camilo',
  lastName: 'Higuera',
  role: 'Desarrollador web',
  location: '[PLACEHOLDER] Ciudad, País',
  email: 'hola@camilohiguera.dev', // [PLACEHOLDER]
  whatsapp: '+57 300 000 0000', // [PLACEHOLDER] número con prefijo de país
  whatsappUrl: 'https://wa.me/573000000000', // [PLACEHOLDER]
  linkedin: 'https://www.linkedin.com/in/camilo-higuera', // [PLACEHOLDER]
  github: 'https://github.com/camilohiguera', // [PLACEHOLDER]
  portrait: portrait as Picture,
  portraitAlt: '[PLACEHOLDER] Retrato de Camilo Higuera',
}

export const hero = {
  greeting: 'Hola, soy',
  headline: 'Webs rápidas que convierten visitas en clientes.',
  sub: 'Diseño y programo landing pages y aplicaciones web con React, TypeScript y Tailwind: cargan en menos de dos segundos, se leen bien en el móvil y están listas para Google.',
  primary: { label: 'Hablemos de tu proyecto', href: '#contacto' },
  secondary: { label: 'Ver proyectos', href: '#proyectos' },
  availability: 'Disponible para proyectos nuevos',
}

export const stack = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Framer Motion',
  'JavaScript',
  'HTML semántico',
  'Node.js',
  'Git y GitHub',
  'Figma',
  'SEO técnico',
  'Accesibilidad',
  'Core Web Vitals',
]

export const about = {
  title: 'Sobre mí',
  statement:
    'Empiezo donde muchas webs fallan: la velocidad, los detalles y que cada sección tenga un motivo.',
  body: [
    '[PLACEHOLDER] Soy desarrollador web junior. Me formé construyendo proyectos propios de principio a fin: desde el boceto en Figma hasta el despliegue, midiendo cada página con Lighthouse antes de darla por terminada.',
    '[PLACEHOLDER] Busco mis primeros proyectos con negocios y personas que necesiten una web clara, rápida y fácil de mantener. A cambio pongo tiempo, cuidado y comunicación directa en cada paso.',
  ],
  facts: [
    { term: 'Base', value: '[PLACEHOLDER] Ciudad, País · trabajo en remoto' },
    { term: 'Stack', value: 'React, TypeScript, Vite, Tailwind CSS' },
    { term: 'Idiomas', value: '[PLACEHOLDER] Español nativo, inglés' },
    { term: 'Ahora', value: 'Disponible para proyectos freelance' },
  ],
}

export type Project = {
  slug: string
  title: string
  summary: string
  tags: string[]
  demo: string
  repo: string
  image: Picture
  alt: string
}

export const projects: Project[] = [
  {
    slug: 'tostadora',
    title: 'Tostadora',
    summary:
      '[PLACEHOLDER] Landing page para una cafetería de barrio: carta, horarios y pedidos por WhatsApp en una sola página que carga en menos de un segundo.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    demo: 'https://example.com', // [PLACEHOLDER]
    repo: 'https://github.com/camilohiguera', // [PLACEHOLDER]
    image: shotTostadora as Picture,
    alt: '[PLACEHOLDER] Captura de la landing page Tostadora',
  },
  {
    slug: 'ruta-clara',
    title: 'Ruta Clara',
    summary:
      '[PLACEHOLDER] Aplicación de tareas por proyectos con arrastrar y soltar, filtros y guardado local. Pensada para usarse con el teclado.',
    tags: ['React', 'TypeScript', 'Zustand'],
    demo: 'https://example.com', // [PLACEHOLDER]
    repo: 'https://github.com/camilohiguera', // [PLACEHOLDER]
    image: shotRuta as Picture,
    alt: '[PLACEHOLDER] Captura de la aplicación Ruta Clara',
  },
  {
    slug: 'pulso',
    title: 'Pulso',
    summary:
      '[PLACEHOLDER] Panel del clima que consume una API pública, con búsqueda de ciudades, gráficas ligeras y estados de carga y error cuidados.',
    tags: ['TypeScript', 'API REST', 'Charts'],
    demo: 'https://example.com', // [PLACEHOLDER]
    repo: 'https://github.com/camilohiguera', // [PLACEHOLDER]
    image: shotPulso as Picture,
    alt: '[PLACEHOLDER] Captura del panel Pulso',
  },
  {
    slug: 'portafolio',
    title: 'Este portafolio',
    summary:
      'La página que estás leyendo: prerenderizada para buscadores, con animaciones que respetan el movimiento reducido y Lighthouse por encima de 95.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    demo: SITE_URL,
    repo: 'https://github.com/camilohiguera', // [PLACEHOLDER]
    image: shotPortfolio as Picture,
    alt: 'Captura de la portada de este portafolio con el nombre Camilo Higuera a toda la anchura',
  },
]

export const services = {
  title: 'Servicios',
  intro: 'Lo que puedo construir para ti hoy, con el mismo cuidado que pongo en mis proyectos.',
  items: [
    {
      n: '01', // taste-skill-ignore: numeración 01–04 pedida explícitamente
      title: 'Landing pages',
      text: 'Una página enfocada en una sola acción: reservar, escribir o comprar. Textos claros, carga rápida y medición desde el primer día.',
      chips: ['Diseño', 'Copy', 'Formulario', 'Analítica'],
    },
    {
      n: '02', // taste-skill-ignore: numeración 01–04 pedida explícitamente
      title: 'Webs en React',
      text: 'Sitios y aplicaciones a medida con React y TypeScript, divididos en componentes fáciles de mantener y ampliar.',
      chips: ['React', 'TypeScript', 'Componentes', 'API'],
    },
    {
      n: '03', // taste-skill-ignore: numeración 01–04 pedida explícitamente
      title: 'Velocidad y SEO',
      text: 'Reviso y corrijo lo que frena tu web: imágenes, fuentes, JavaScript sobrante, metadatos y datos estructurados.',
      chips: ['Lighthouse', 'Core Web Vitals', 'Schema', 'Accesibilidad'],
    },
    {
      n: '04', // taste-skill-ignore: numeración 01–04 pedida explícitamente
      title: 'De Figma a código',
      text: 'Convierto tu diseño en una web responsive fiel al detalle, con animaciones suaves y buena experiencia en el móvil.',
      chips: ['Figma', 'Tailwind CSS', 'Responsive', 'Animación'],
    },
  ],
}

export const process = {
  title: 'Cómo trabajo',
  steps: [
    {
      lead: 'Primero, escucho.',
      text: 'Una llamada corta para entender tu negocio, a quién quieres llegar y qué tiene que pasar cuando alguien entra en tu web.',
      output: 'Resultado: un resumen de una página con objetivos y alcance.',
    },
    {
      lead: 'Después, diseño.',
      text: 'Estructura, textos y una propuesta visual para móvil y escritorio. Lo revisamos juntos antes de escribir una línea de código.',
      output: 'Resultado: prototipo navegable en Figma.',
    },
    {
      lead: 'Luego, construyo.',
      text: 'Desarrollo por secciones con entregas frecuentes, para que veas el avance real y podamos ajustar a tiempo.',
      output: 'Resultado: enlace de pruebas actualizado en cada entrega.',
    },
    {
      lead: 'Por último, lanzo.',
      text: 'Publico, conecto el dominio, mido el rendimiento y te explico cómo actualizar el contenido por tu cuenta.',
      output: 'Resultado: web en línea y una guía breve de mantenimiento.',
    },
  ],
}

export const contact = {
  title: 'Cuéntame tu proyecto',
  sentence: 'Respondo cada mensaje personalmente. Cuéntame qué necesitas y cuándo te gustaría tenerlo.',
  projectTypes: ['Landing page', 'Web corporativa', 'Aplicación web', 'Portafolio', 'Otro'],
}

export const nav = [
  { label: 'Inicio', href: '#inicio', preview: 'Quién soy y qué hago' },
  { label: 'Sobre mí', href: '#sobre-mi', preview: 'Cómo pienso una web' },
  { label: 'Proyectos', href: '#proyectos', preview: 'Cuatro proyectos de portafolio' },
  { label: 'Servicios', href: '#servicios', preview: 'Lo que puedo construir para ti' },
  { label: 'Proceso', href: '#proceso', preview: 'Cuatro pasos, sin sorpresas' },
  { label: 'Contacto', href: '#contacto', preview: 'Escríbeme hoy mismo' },
]
