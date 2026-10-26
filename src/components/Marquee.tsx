import { useState } from 'react'
import { stack } from '../content/site'

export default function Marquee() {
  const [paused, setPaused] = useState(false)
  return (
    <div className="relative overflow-clip bg-surface py-7 md:py-9">
      <h2 className="sr-only">Tecnologías que uso</h2>
      <div
        className={`flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused] ${
          paused ? '[animation-play-state:paused]' : ''
        }`}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
            {stack.map((tech) => (
              <li
                key={tech}
                className="flex items-center gap-8 pr-8 font-display text-title font-extrabold tracking-[-0.04em] uppercase md:gap-12 md:pr-12"
              >
                {tech}
                <span aria-hidden="true" className="size-[0.28em] rounded-full bg-ink" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute right-5 bottom-1 py-1 text-small font-medium opacity-80 hover:opacity-100 md:right-8 motion-reduce:hidden"
      >
        {paused ? 'Reanudar' : 'Pausar'} <span className="sr-only">la cinta de tecnologías</span>
      </button>
    </div>
  )
}
