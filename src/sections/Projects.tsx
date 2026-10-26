import { projects } from '../content/site'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="proyectos" aria-labelledby="projects-title" className="px-5 pb-[clamp(7.5rem,14vw,14rem)] md:px-8">
      <div className="grid grid-cols-4 items-end gap-x-5 gap-y-6 md:grid-cols-12 md:gap-x-8">
        <h2
          data-reveal
          id="projects-title"
          className="col-span-4 font-display text-head font-extrabold tracking-[-0.04em] uppercase md:col-span-6"
        >
          Proyectos
        </h2>
        <p data-reveal className="col-span-4 max-w-[44ch] md:col-span-5 md:col-start-8">
          Cuatro proyectos de portafolio hechos de principio a fin: diseño, código, despliegue y medición. Cada uno con su
          demo y su código abierto.
        </p>
      </div>
      <ol className="mt-14 flex flex-col gap-[12svh] [timeline-scope:--card-1,--card-2,--card-3] md:mt-20">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} total={projects.length} />
        ))}
      </ol>
    </section>
  )
}
