import { process } from '../content/site'

export default function Process() {
  const last = process.steps.length - 1
  return (
    <section id="proceso" aria-labelledby="process-title" className="px-5 pb-[clamp(7.5rem,14vw,14rem)] md:px-8">
      <div className="grid grid-cols-4 gap-x-5 gap-y-12 md:grid-cols-12 md:gap-x-8">
        <div className="col-span-4 md:col-span-4">
          <div className="md:sticky md:top-28">
            <h2 data-reveal id="process-title" className="font-display text-head font-extrabold tracking-[-0.04em] uppercase">
              {process.title}
            </h2>
            <p data-reveal className="mt-6 max-w-[34ch]">
              Cuatro pasos claros, con entregas que puedes ver y comentar. Sabes en todo momento qué estoy haciendo y qué
              viene después.
            </p>
          </div>
        </div>
        <ol data-process className="col-span-4 md:col-span-7 md:col-start-6">
          {process.steps.map((s, i) => (
            <li key={s.lead} data-step className="relative pb-16 pl-12 last:pb-0 md:pb-20 md:pl-16">
              {i < last && (
                <>
                  {/* Tramo de línea hasta el siguiente paso: pista y relleno que se dibuja con el scroll */}
                  <span aria-hidden="true" className="absolute top-[26px] -bottom-[9px] left-[7px] w-[3px] bg-surface" />
                  <span
                    aria-hidden="true"
                    data-step-line
                    className="scroll-draw absolute top-[26px] -bottom-[9px] left-[7px] w-[3px] origin-top bg-ink"
                  />
                </>
              )}
              <span aria-hidden="true" data-step-dot className="scroll-dot absolute top-[9px] left-0 size-[17px] rounded-full bg-ink" />
              <p data-reveal className="max-w-[52ch] text-lead">
                <strong className="font-medium">{s.lead}</strong> {s.text}
              </p>
              <p data-reveal className="mt-4 text-muted">{s.output}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
