import { useEffect, useRef, type KeyboardEvent } from 'react'
import { legal } from '../content/site'
import { openCookieSettings } from '../cookies/consent'
import PolicyContent from '../pages/PolicyContent'

/** Política de privacidad en una ventana centrada, con su propio scroll (la página de fondo no se mueve). */
export default function PolicyModal({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dialog.current?.focus()
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = 'hidden'
    window.__lenis?.stop()
    return () => {
      html.style.overflow = previous
      window.__lenis?.start()
    }
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') return onClose()
    if (e.key !== 'Tab') return
    const items = dialog.current?.querySelectorAll<HTMLElement>('button, a[href]')
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

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/60 p-3 md:p-8"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-title"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="flex max-h-[min(85svh,52rem)] w-full max-w-[46rem] flex-col bg-bg text-ink shadow-2xl outline-none"
      >
        <div className="flex shrink-0 items-start justify-between gap-6 border-b-2 border-raised px-6 py-5 md:px-8">
          <div>
            <h2 id="policy-title" className="text-statement font-medium">
              Política de privacidad
            </h2>
            <p className="mt-1 text-small text-muted">Última actualización: {legal.privacyUpdated}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-2 shrink-0 px-2 py-2 text-small font-medium underline underline-offset-4"
          >
            Cerrar
          </button>
        </div>
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-6 pb-8 md:px-8">
          <PolicyContent
            onOpenCookies={() => {
              onClose()
              openCookieSettings()
            }}
          />
        </div>
      </div>
    </div>
  )
}
