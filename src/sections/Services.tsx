import { services } from '../content/site'

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="px-5 pb-[clamp(7.5rem,14vw,14rem)] md:px-8">
      <div className="grid grid-cols-4 items-end gap-x-5 gap-y-6 md:grid-cols-12 md:gap-x-8">
        <h2
          data-reveal
          id="services-title"
          className="col-span-4 font-display text-head font-extrabold tracking-[-0.04em] uppercase md:col-span-6"
        >
          {services.title}
        </h2>
        <p data-reveal className="col-span-4 max-w-[44ch] md:col-span-5 md:col-start-8">{services.intro}</p>
      </div>
      <ol className="mt-12 md:mt-16">
        {services.items.map((s) => (
          <li
            key={s.n}
            data-reveal
            className="group relative isolate grid grid-cols-4 gap-x-5 gap-y-4 py-12 md:grid-cols-12 md:gap-x-8 md:py-12"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -inset-x-5 -z-10 origin-left scale-x-[0.98] bg-surface opacity-0 transition-[opacity,scale] duration-500 ease-(--ease-out) group-hover:scale-x-100 group-hover:opacity-100 md:-inset-x-8"
            />
            <span
              aria-hidden="true"
              className="col-span-1 self-center font-display text-title font-extrabold tracking-[-0.04em] text-muted tabular-nums md:col-span-2"
            >
              {s.n}
            </span>
            <h3 className="col-span-3 self-center font-display text-title font-extrabold tracking-[-0.04em] uppercase transition-transform duration-500 ease-(--ease-expo) md:col-span-5 md:group-hover:translate-x-4">
              {s.title}
            </h3>
            <div className="col-span-4 md:col-span-5">
              <p className="max-w-[46ch]">{s.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Incluye en ${s.title}`}>
                {s.chips.map((c) => (
                  <li key={c} className="bg-surface px-3 py-1.5 text-small font-medium transition-colors duration-300 group-hover:bg-raised">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
