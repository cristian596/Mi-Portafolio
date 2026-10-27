import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import App from './App'
import CookieBanner from './components/CookieBanner'
import { PRIVACY_EVENT } from './privacy'

const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))
const PolicyModal = lazy(() => import('./components/PolicyModal'))

export const PRIVACY_PATH = '/privacidad'

/** Ventana emergente de la política: su código solo se descarga cuando alguien la abre. */
function PolicyHost() {
  const [open, setOpen] = useState(false)
  const opener = useRef<Element | null>(null)

  useEffect(() => {
    const show = () => {
      opener.current = document.activeElement
      setOpen(true)
    }
    window.addEventListener(PRIVACY_EVENT, show)
    return () => window.removeEventListener(PRIVACY_EVENT, show)
  }, [])

  if (!open) return null
  return (
    <Suspense fallback={null}>
      <PolicyModal
        onClose={() => {
          setOpen(false)
          ;(opener.current as HTMLElement | null)?.focus?.()
          opener.current = null
        }}
      />
    </Suspense>
  )
}

/** Enrutado mínimo: portada, política de privacidad y 404 (todas prerenderizadas). */
export default function Root({ path }: { path: string }) {
  return (
    <>
      {path === '/' ? (
        <App />
      ) : (
        <Suspense fallback={null}>{path === PRIVACY_PATH ? <Privacy /> : <NotFound />}</Suspense>
      )}
      <CookieBanner />
      <PolicyHost />
    </>
  )
}
