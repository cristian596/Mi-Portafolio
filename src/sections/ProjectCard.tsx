import type { Project } from '../content/site'
import Picture from '../components/Picture'
import { Arrow } from '../components/Button'

type Props = { project: Project; index: number; total: number }

const linkClass = 'group inline-flex items-center gap-2 py-2 underline decoration-2 underline-offset-[0.35em]'
const arrowClass =
  'transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5'

/**
 * Tarjeta del apilado: en escritorio cada tarjeta se fija una pestaña más abajo que la anterior,
 * así los títulos anteriores quedan visibles como un índice mientras la nueva entra encima.
 */
export default function ProjectCard({ project, index, total }: Props) {
  // La tarjeta cubierta encoge y su contenido se apaga (el fondo sigue opaco) mientras entra la siguiente.
  const covered = index < total - 1
  const dim = covered ? 'lg:scroll-dim' : ''
  const dimStyle = covered ? { animationTimeline: `--card-${index + 1}` } : undefined
  return (
    <li
      className="lg:sticky lg:top-[calc(5rem+var(--i)*5.25rem)]"
      data-reveal
      style={{ ['--i' as string]: index, viewTimelineName: `--card-${index}` }}
    >
      <article
        aria-labelledby={`p-${project.slug}`}
        // Se aleja mientras la tarjeta siguiente la cubre (solo en el apilado de escritorio)
        className={`relative origin-top bg-surface ${index < total - 1 ? 'lg:scroll-stack' : ''}`}
        style={index < total - 1 ? { animationTimeline: `--card-${index + 1}` } : undefined}
      >
        <header
          className={`flex ${dim} items-center justify-between gap-6 px-4 pt-5 lg:h-[5.25rem] md:px-8 md:pt-6 lg:pt-0`}
          style={dimStyle}
        >
          <h3
            id={`p-${project.slug}`}
            className="font-display text-title font-extrabold tracking-[-0.04em] uppercase"
          >
            {project.title}
          </h3>
          <p className="shrink-0 text-small text-muted tabular-nums">
            {index + 1} de {total}
          </p>
        </header>
        <div style={dimStyle} className={`${dim} grid grid-cols-1 gap-6 p-4 md:grid-cols-12 md:gap-8 md:px-8 md:pt-2 md:pb-8`}>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            data-tilt
            className="group block self-start overflow-clip bg-raised md:col-span-6"
          >
            <Picture
              picture={project.image}
              alt=""
              sizes="(min-width: 768px) 48vw, calc(100vw - 72px)"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.04]"
            />
          </a>
          <div className="flex flex-col md:col-span-5 md:col-start-8">
            <p className="max-w-[44ch]">{project.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Tecnologías de ${project.title}`}>
              {project.tags.map((t) => (
                <li key={t} className="bg-raised px-3 py-1.5 text-small font-medium">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-8 font-medium md:mt-auto md:pt-8">
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Ver demo <span className="sr-only">de {project.title}</span>
                <Arrow className={arrowClass} />
              </a>
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Código <span className="sr-only">de {project.title} en GitHub</span>
                <Arrow className={arrowClass} />
              </a>
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}
