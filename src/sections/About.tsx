import { about, person } from '../content/site'
import Picture from '../components/Picture'

export default function About() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="px-5 py-[clamp(7.5rem,14vw,14rem)] md:px-8">
      <div className="grid grid-cols-4 gap-x-5 gap-y-12 md:grid-cols-12 md:gap-x-8 lg:gap-y-16">
        <div className="col-span-4 md:col-span-12 lg:col-span-7">
          <h2 data-reveal id="about-title" className="font-display text-head font-extrabold tracking-[-0.04em] uppercase">
            {about.title}
          </h2>
          <p data-reveal className="mt-10 max-w-[40ch] text-statement font-medium md:mt-14">
            {/* Tinta que se llena palabra a palabra al ritmo de la lectura */}
            {about.statement.split(" ").map((w, i) => (
              <span key={i} className="scroll-ink">
                {w}{" "}
              </span>
            ))}
          </p>
          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
            {about.body.map((p) => (
              <p data-reveal key={p.slice(0, 24)} className="max-w-[46ch]">
                {p}
              </p>
            ))}
          </div>
        </div>
        <figure className="col-span-4 md:col-span-5 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:pt-28">
          <div data-reveal="picture" className="aspect-[4/5] overflow-clip bg-surface">
            <div className="scroll-drift h-[110%] w-full -translate-y-[5%]">
              <Picture
                picture={person.portrait}
                alt={person.portraitAlt}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, calc(100vw - 40px)"
                className="size-full object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-small">
            {person.name}, {person.location}
          </figcaption>
        </figure>
        <dl className="col-span-4 grid content-start gap-x-8 gap-y-5 sm:grid-cols-2 md:col-span-7 md:grid-cols-1 lg:col-span-7 lg:row-start-2 lg:grid-cols-2">
          {about.facts.map((f) => (
            <div data-reveal key={f.term} className="bg-surface px-5 py-4">
              <dt className="text-small text-muted">{f.term}</dt>
              <dd className="mt-1 font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
