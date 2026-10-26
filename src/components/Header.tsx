import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const Menu = lazy(() => import('./Menu'))

const quick = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuWanted, setMenuWanted] = useState(false)
  const [inverse, setInverse] = useState(false)
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Fondo al bajar y tinta invertida cuando pasa sobre un campo rosa ([data-inverse]).
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
      const under = document.elementsFromPoint(window.innerWidth / 2, 36)
      setInverse(under.some((el) => !el.closest('header') && el.closest('[data-inverse]')))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const toggle = () => {
    setMenuWanted(true)
    setOpen((o) => !o)
  }
  const close = (restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) button.current?.focus()
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-(--ease-out) ${
        inverse && !open ? 'text-bg' : 'text-ink'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-[opacity,background-color] ${inverse ? 'bg-ink' : 'bg-bg'} duration-300 ease-(--ease-out) ${
          scrolled && !open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 top-0 z-20 h-[3px] origin-left bg-current" />
      <div className="relative z-10 flex h-16 items-center justify-between px-5 md:h-20 md:px-8">
        <a
          href="#inicio"
          className="font-display text-lead font-extrabold tracking-[-0.06em] uppercase"
          onClick={() => open && close(false)}
        >
          CH<span className="sr-only">, Camilo Higuera: volver al inicio</span>
        </a>
        <div className="flex items-center gap-8">
          <nav aria-label="Accesos rápidos" className={`hidden md:block ${open ? 'invisible' : ''}`}>
            <ul className="flex gap-8 text-small font-medium">
              {quick.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group relative inline-block py-2">
                    {l.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-1 h-0.5 origin-right scale-x-0 bg-current transition-transform duration-300 ease-(--ease-out) group-hover:origin-left group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            ref={button}
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            onClick={toggle}
            onPointerEnter={() => setMenuWanted(true)}
            onFocus={() => setMenuWanted(true)}
            className="group flex items-center gap-3 py-2 font-medium"
          >
            <span className="relative block h-[1.5em] overflow-clip">
              <span
                className={`block transition-transform duration-500 ease-(--ease-expo) ${open ? '-translate-y-1/2' : ''}`}
              >
                <span className="block" aria-hidden={open || undefined}>
                  Menú
                </span>
                <span className="block" aria-hidden={!open || undefined}>
                  Cerrar<span className="sr-only"> menú</span>
                </span>
              </span>
            </span>
            <span aria-hidden="true" className="relative block size-5">
              <span
                className={`absolute top-[6px] left-0 h-0.5 w-5 bg-current transition-transform duration-500 ease-(--ease-expo) ${
                  open ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute top-[12px] left-0 h-0.5 w-5 bg-current transition-transform duration-500 ease-(--ease-expo) ${
                  open ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      {menuWanted && (
        <Suspense fallback={null}>
          <Menu open={open} onClose={close} />
        </Suspense>
      )}
    </header>
  )
}
