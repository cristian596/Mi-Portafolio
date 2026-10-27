import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import Root from './Root'
import { initConsent } from './cookies/consent'
import { runPreloader } from './preloader'
import { setupReveal } from './reveal'
import './index.css'

runPreloader()
initConsent()

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <Root path={location.pathname.replace(/\/+$/, '') || '/'} />
  </StrictMode>
)

// En producción el HTML viene prerenderizado: se hidrata. En desarrollo se monta.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

setupReveal()
