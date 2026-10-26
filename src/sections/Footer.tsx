import { nav, person } from '../content/site'
import { Arrow } from '../components/Button'

const social = [
  ['GitHub', person.github],
  ['LinkedIn', person.linkedin],
  ['WhatsApp', person.whatsappUrl],
]

export default function Footer() {
  return (
    <footer data-inverse className="overflow-clip bg-ink px-5 pt-10 text-bg md:px-8">
      <div className="grid grid-cols-4 gap-x-5 gap-y-12 bg-bg/[0.07] p-6 md:grid-cols-12 md:gap-x-8 md:p-10">
        <div className="col-span-4 md:col-span-5">
          <p className="text-lead font-medium">{person.name}</p>
          <p className="mt-2">
            {person.role} · {person.location}
          </p>
        </div>
        <nav aria-label="Enlaces del pie" className="col-span-2 md:col-span-3 md:col-start-7">
          <h2 className="text-small text-bg/80">Secciones</h2>
          <ul className="mt-3 flex flex-col">
            {nav.slice(1).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block py-1.5 font-medium hover:underline hover:underline-offset-4">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-2 md:col-span-3">
          <h2 className="text-small text-bg/80">Redes</h2>
          <ul className="mt-3 flex flex-col">
            {social.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-1.5 font-medium hover:underline hover:underline-offset-4"
                >
                  {label}
                  <Arrow />
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${person.email}`} className="inline-block py-1.5 font-medium hover:underline hover:underline-offset-4">
                Email
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-4 flex flex-wrap items-center justify-between gap-4 text-small md:col-span-12">
          <p>© {new Date().getFullYear()} Camilo Higuera. Hecho a mano con React, Vite y Tailwind CSS.</p>
          <a href="#inicio" className="inline-flex items-center gap-2 py-1.5 font-medium hover:underline hover:underline-offset-4">
            Volver arriba
            <Arrow className="-rotate-45" />
          </a>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="@container mt-10 -mb-[0.16em] font-display leading-[0.86] font-extrabold tracking-[-0.025em] whitespace-nowrap uppercase"
      >
        <span data-footer-name className="scroll-grow block origin-bottom text-[calc(100cqw/5.78)]">
          {person.lastName}
        </span>
      </p>
    </footer>
  )
}
