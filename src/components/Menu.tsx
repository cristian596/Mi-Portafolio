import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { nav, person, projects } from '../content/site'
import Picture from './Picture'
import { Arrow } from './Button'

const previews = [projects[3], { image: person.portrait, alt: person.portraitAlt }, projects[0], projects[1], projects[2], projects[3]]

type Props = { open: boolean; onClose: (restoreFocus?: boolean) => void }

export default function Menu({ open, onClose }: Props) {
  // `shown` va un fotograma por detrás de `open` para que la transición de entrada siempre se vea.
  const [shown, setShown] = useState(false)
  const [active, setActive] = useState(0)
  const panel = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    let id = requestAnimationFrame(() => (id = requestAnimationFrame(() => setShown(open))))
    return () => cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    window.__lenis?.stop()
    const first = panel.current?.querySelector<HTMLElement>('a')
    const t = setTimeout(() => first?.focus({ preventScroll: true }), 60)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return closeRef.current()
      if (e.key !== 'Tab') return
      // Foco atrapado entre el botón del menú y los enlaces del panel.
      const header = panel.current?.closest('header')
      const items = Array.from(header?.querySelectorAll<HTMLElement>('button, #menu a') ?? [])
      if (!items.length) return
      const i = items.indexOf(document.activeElement as HTMLElement)
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i === items.length - 1 ? 0 : i + 1
      e.preventDefault()
      items[next].focus()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      root.style.overflow = ''
      window.__lenis?.start()
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Cierra y luego desplaza: con el scroll bloqueado el ancla nativa no llegaría a su sitio.
  const go = (e: MouseEvent, href: string) => {
    e.preventDefault()
    onClose(false)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(href)
        if (!target) return
        if (window.__lenis) window.__lenis.scrollTo(target, { offset: -80 })
        else target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
        history.replaceState(null, '', href)
        target.focus({ preventScroll: true })
      }),
    )
  }

  return (
    <div
      id="menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      inert={!open}
      className={`fixed inset-0 bg-surface transition-[translate,visibility] ease-(--ease-in-out) motion-reduce:transition-[opacity,visibility] ${
        shown
          ? 'visible translate-y-0 duration-500 motion-reduce:opacity-100'
          : 'invisible -translate-y-full duration-[350ms] motion-reduce:translate-y-0 motion-reduce:opacity-0'
      }`}
    >
      <div className="grid h-full grid-cols-4 content-between gap-x-5 px-5 pt-24 pb-6 md:grid-cols-12 md:gap-x-8 md:px-8 md:pt-28 md:pb-8">
        <nav aria-label="Secciones" className="col-span-4 md:col-span-7">
          <ul onPointerLeave={() => setActive(0)}>
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-clip">
                <a
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group block py-1 font-display text-[clamp(2.25rem,6.4vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.04em] uppercase transition-opacity duration-200 ease-(--ease-out) ${
                    active === i ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {/* Sube desde su máscara con 50ms entre enlaces cuando el panel ya casi llegó */}
                  <span
                    style={{ transitionDelay: shown ? `${180 + i * 50}ms` : '0ms' }}
                    className={`block transition-transform ease-(--ease-expo) motion-reduce:transition-none ${
                      shown ? 'translate-y-0 duration-700' : 'translate-y-full duration-200'
                    }`}
                  >
                    <span className="block transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-3 md:group-hover:translate-x-6">
                      {item.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div aria-hidden="true" className="relative hidden md:col-span-4 md:col-start-9 md:block">
          <div className="relative aspect-[4/5] w-full overflow-clip bg-raised">
            {open &&
              previews.map((p, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-[opacity,scale] duration-500 ease-(--ease-out) ${
                    active === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                  }`}
                >
                  <Picture picture={p.image} alt="" sizes="30vw" className="size-full object-cover" />
                </div>
              ))}
          </div>
          <p className="mt-4 text-lead font-medium">{nav[active].preview}</p>
        </div>

        <div
          className={`col-span-4 flex flex-col gap-3 text-small font-medium transition-opacity duration-500 md:col-span-12 md:flex-row md:justify-between ${
            shown ? 'opacity-100 delay-500' : 'opacity-0'
          }`}
        >
          <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 py-1 underline-offset-4 hover:underline">
            {person.email}
          </a>
          <ul className="flex gap-6">
            {[
              ['GitHub', person.github],
              ['LinkedIn', person.linkedin],
              ['WhatsApp', person.whatsappUrl],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-1 underline-offset-4 hover:underline">
                  {label}
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
