// Todo el contenido editable del sitio vive aquí.
// Busca "[PLACEHOLDER]" para ver lo que falta por completar con tus datos reales.

import shotAbogados from '../assets/projects/abogados.png?w=640;960;1280;1600&format=avif;webp;jpg&as=picture'
import shotBarberia from '../assets/projects/black-iron.png?w=640;960;1280;1600&format=avif;webp;jpg&as=picture'
import shotHotel from '../assets/projects/hotel.png?w=640;960;1280;1600&format=avif;webp;jpg&as=picture'
import shotSalon from '../assets/projects/salon.png?w=640;960;1280;1600&format=avif;webp;jpg&as=picture'
import portrait from '../assets/portrait.png?w=400;640;900&format=avif;webp;jpg&as=picture'
import type { Picture } from '../types'

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://camilohiguera.com').replace(/\/$/, '')

export const person = {
  name: 'Camilo Higuera',
  firstName: 'Camilo',
  lastName: 'Higuera',
  role: 'Desarrollador web',
  location: 'Facatativá, Colombia',
  email: 'camilithopks6@gmail.com',
  whatsapp: '+57 321 984 1852',
  whatsappUrl: `https://wa.me/573219841852?text=${encodeURIComponent('Hola, quiero hablar contigo sobre un proyecto web.')}`,
  linkedin: 'https://www.linkedin.com/in/cristian-higuera',
  github: 'https://github.com/cristian596',
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
    'Soy desarrollador web independiente y creo landing pages y webs para negocios que quieren verse profesionales en internet. Mi enfoque es que tu cliente se vea bien en el celular, cargue rápido y tenga una forma clara de contactarte, como un botón directo a WhatsApp.',
    'Tengo plantillas listas para barberías, despachos de abogados, clínicas dentales, constructoras, salones de belleza y hoteles, y también desarrollo proyectos a medida según lo que necesite tu negocio.',
    'Escríbeme con los datos de tu negocio y te digo qué tipo de web te conviene.',
  ],
  facts: [
    { term: 'Base', value: 'Facatativá, Colombia · trabajo en remoto' },
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
  image: Picture
  alt: string
}

export const projects: Project[] = [
  {
    slug: 'abogados',
    title: 'Altamira Ferrer Abogados',
    summary:
      'Plantilla de landing para despachos de abogados: presentación de especialidades, equipo y metodología, y una evaluación inicial del caso que lleva al contacto. Disponible en español e inglés.',
    tags: ['Plantilla', 'Despachos de abogados', 'Español / inglés'],
    demo: 'https://abogados-demo-bc8.pages.dev/es',
    image: shotAbogados as Picture,
    alt: 'Landing de Altamira Ferrer Abogados en escritorio y móvil, con fondo azul noche y detalles dorados',
  },
  {
    slug: 'black-iron-barbers',
    title: 'Black Iron Barbers',
    summary:
      'Sistema completo para una barbería: reserva de citas en línea con horarios por bloques, correo de confirmación con archivo de calendario y un panel de administración con agenda, empleados y reportes.',
    tags: ['React 19', 'Express', 'PostgreSQL', 'Docker'],
    demo: 'https://black-iron-barbers.camilithopks6.workers.dev/',
    image: shotBarberia as Picture,
    alt: 'Black Iron Barbers: landing, reserva de citas en el móvil y panel de administración con indicadores',
  },
  {
    slug: 'hotel',
    title: 'Hotel Ejemplo',
    summary:
      'Plantilla de landing para hoteles: habitaciones, servicios y galería, con una consulta de estancia que calcula al momento el precio de cada habitación según las fechas y los huéspedes. Español e inglés.',
    tags: ['Plantilla', 'Hoteles', 'Español / inglés'],
    demo: 'https://hotel-demo-bg1.pages.dev/',
    image: shotHotel as Picture,
    alt: 'Landing de Hotel Ejemplo en escritorio y móvil, con consulta de fechas y precio por habitación',
  },
  {
    slug: 'salon-de-belleza',
    title: 'Salón de belleza',
    summary:
      'Plantilla de landing para salones de belleza: tratamientos, resultados, promociones y equipo. La solicitud de cita abre WhatsApp con el mensaje ya preparado.',
    tags: ['Plantilla', 'Salones de belleza', 'WhatsApp'],
    demo: 'https://salon-de-belleza-demo.pages.dev/',
    image: shotSalon as Picture,
    alt: 'Landing de un salón de belleza en escritorio y móvil, con formulario de solicitud de cita',
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
  { label: 'Proyectos', href: '#proyectos', preview: 'Plantillas y proyectos a medida' },
  { label: 'Servicios', href: '#servicios', preview: 'Lo que puedo construir para ti' },
  { label: 'Proceso', href: '#proceso', preview: 'Cuatro pasos, sin sorpresas' },
  { label: 'Contacto', href: '#contacto', preview: 'Escríbeme hoy mismo' },
]
