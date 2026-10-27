import { lazy, Suspense } from 'react'
import App from './App'
import CookieBanner from './components/CookieBanner'

const Privacy = lazy(() => import('./pages/Privacy'))

export const PRIVACY_PATH = '/privacidad'

/** Enrutado mínimo: la portada y la política de privacidad (ambas prerenderizadas). */
export default function Root({ path }: { path: string }) {
  return (
    <>
      {path === PRIVACY_PATH ? (
        <Suspense fallback={null}>
          <Privacy />
        </Suspense>
      ) : (
        <App />
      )}
      <CookieBanner />
    </>
  )
}
