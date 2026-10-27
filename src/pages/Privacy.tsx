import { legal, person } from '../content/site'
import { Arrow } from '../components/Button'
import { GA_ID, openCookieSettings } from '../cookies/consent'
import PolicyContent from './PolicyContent'

export default function Privacy() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-[200%] bg-ink px-4 py-3 font-medium text-bg focus-visible:translate-y-0"
      >
        Saltar al contenido
      </a>
      <header className="flex h-16 items-center justify-between px-5 md:h-20 md:px-8">
        <a href="/" className="font-display text-lead font-extrabold tracking-[-0.06em] uppercase">
          CH<span className="sr-only">, Camilo Higuera: volver al inicio</span>
        </a>
        <a href="/" className="group inline-flex items-center gap-2 py-3 font-medium">
          <Arrow className="-rotate-90" />
          Volver al inicio
        </a>
      </header>

      <main id="main" tabIndex={-1} className="px-5 pt-8 pb-24 outline-none md:px-8 md:pt-14">
        <div className="max-w-[72ch] text-body">
          <h1 className="font-display text-title font-extrabold tracking-[-0.04em] uppercase">Política de privacidad</h1>
          <p className="mt-4 text-muted">
            Política de tratamiento de datos personales · Última actualización: {legal.privacyUpdated}
          </p>
          <div className="mt-8">
            <PolicyContent onOpenCookies={openCookieSettings} />
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-raised px-5 py-8 text-small md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {person.name}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {GA_ID && (
              <button type="button" onClick={openCookieSettings} className="py-1.5 font-medium hover:underline hover:underline-offset-4">
                Configuración de cookies
              </button>
            )}
            <a href="/" className="inline-block py-1.5 font-medium hover:underline hover:underline-offset-4">
              Volver al inicio
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
