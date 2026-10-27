import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { GA_ID, SETTINGS_EVENT, readConsent, saveConsent } from '../cookies/consent'
import { openPrivacy } from '../privacy'

type View = 'hidden' | 'banner' | 'settings'

const primary =
  'inline-flex flex-1 items-center justify-center bg-accent px-5 py-3.5 font-medium text-accent-ink transition-[scale,filter] duration-150 ease-(--ease-out) hover:brightness-110 active:scale-[0.97]'
const secondary =
  'inline-flex flex-1 items-center justify-center border-2 border-current px-5 py-3 font-medium transition-[scale,background-color] duration-150 ease-(--ease-out) hover:bg-current/10 active:scale-[0.97]'

function Banner() {
  const [view, setView] = useState<View>('hidden')
  const [analytics, setAnalytics] = useState(false)
  const opener = useRef<Element | null>(null)
  const dialog = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = readConsent()
    setAnalytics(stored?.analytics ?? false)
    if (!stored) setView('banner')
    const open = () => {
      opener.current = document.activeElement
      setAnalytics(readConsent()?.analytics ?? false)
      setView('settings')
    }
    window.addEventListener(SETTINGS_EVENT, open)
    return () => window.removeEventListener(SETTINGS_EVENT, open)
  }, [])

  useEffect(() => {
    if (view === 'settings') dialog.current?.focus()
  }, [view])

  const restoreFocus = () => {
    ;(opener.current as HTMLElement | null)?.focus?.()
    opener.current = null
  }

  const decide = (value: boolean) => {
    saveConsent(value)
    setAnalytics(value)
    setView('hidden')
    restoreFocus()
  }

  const close = () => {
    setView(readConsent() ? 'hidden' : 'banner')
    restoreFocus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') return close()
    if (e.key !== 'Tab') return
    const items = dialog.current?.querySelectorAll<HTMLElement>('button, input, a[href]')
    if (!items?.length) return
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement
    if (e.shiftKey && (active === first || active === dialog.current)) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  if (view === 'banner') {
    return (
      <section
        aria-label="Aviso de cookies"
        className="fixed inset-x-3 bottom-3 z-[65] bg-ink p-5 text-bg shadow-2xl md:right-auto md:bottom-6 md:left-6 md:max-w-[28rem] md:p-6"
      >
        <p className="font-medium">Cookies de analítica</p>
        <p className="mt-2 text-small">
          Uso Google Analytics para entender cómo se usa el sitio y mejorarlo. Solo se activa si lo aceptas. Puedes
          cambiarlo cuando quieras. Más información en la{' '}
          <a href="/privacidad" onClick={openPrivacy} className="font-medium underline underline-offset-4">
            Política de privacidad
          </a>
          .
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => decide(true)} className={primary}>
            Aceptar
          </button>
          <button type="button" onClick={() => decide(false)} className={secondary}>
            Rechazar
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            opener.current = null
            setView('settings')
          }}
          className="mt-3 py-2 text-small font-medium underline underline-offset-4"
        >
          Configurar
        </button>
      </section>
    )
  }

  if (view === 'settings') {
    return (
      <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 p-3 md:items-center">
        <div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className="max-h-full w-full max-w-[34rem] overflow-y-auto bg-bg p-6 text-ink outline-none md:p-8"
        >
          <div className="flex items-start justify-between gap-6">
            <h2 id="cookie-title" className="text-statement font-medium">
              Configuración de cookies
            </h2>
            <button type="button" onClick={close} className="-mt-1 -mr-2 px-2 py-1 text-small font-medium underline underline-offset-4">
              Cerrar
            </button>
          </div>

          <div className="mt-6 flex items-start justify-between gap-6 border-t-2 border-raised pt-5">
            <div>
              <p className="font-medium">Necesarias</p>
              <p className="mt-1 text-small text-muted">
                Guardan tu elección de cookies y ajustes técnicos del sitio. No te identifican y no se pueden desactivar.
              </p>
            </div>
            <span className="shrink-0 text-small font-medium">Siempre activas</span>
          </div>

          <div className="mt-5 flex items-start justify-between gap-6 border-t-2 border-raised pt-5">
            <div>
              <p id="cookie-analytics" className="font-medium">
                Analítica (Google Analytics)
              </p>
              <p className="mt-1 text-small text-muted">
                Estadísticas anónimas de uso: páginas vistas, tiempo en el sitio y tipo de dispositivo. Sin publicidad ni
                remarketing.
              </p>
            </div>
            <label className="relative shrink-0 cursor-pointer">
              <input
                type="checkbox"
                role="switch"
                aria-labelledby="cookie-analytics"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="peer sr-only"
              />
              <span className="relative block h-7 w-12 rounded-full bg-muted transition-colors duration-200 peer-checked:bg-accent peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink after:absolute after:top-1 after:left-1 after:size-5 after:rounded-full after:bg-white after:transition-transform after:duration-200 peer-checked:after:translate-x-5" />
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => decide(analytics)} className={primary}>
              Guardar selección
            </button>
            <button type="button" onClick={() => decide(true)} className={secondary}>
              Aceptar todas
            </button>
          </div>
          <p className="mt-5 text-small text-muted">
            Detalle de cada cookie y cómo ejercer tus derechos en la{' '}
            <a
              href="/privacidad"
              onClick={(e) => {
                openPrivacy(e)
                // La ventana de la política queda por encima: se cierra el panel de cookies sin devolver el foco
                if (e.defaultPrevented) setView(readConsent() ? 'hidden' : 'banner')
              }}
              className="font-medium text-ink underline underline-offset-4"
            >
              Política de privacidad
            </a>
            .
          </p>
        </div>
      </div>
    )
  }

  return null
}

/** Solo existe si hay analítica configurada (VITE_GA_ID); sin ella el sitio no usa cookies que pidan consentimiento. */
export default function CookieBanner() {
  return GA_ID ? <Banner /> : null
}
