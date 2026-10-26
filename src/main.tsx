import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { runPreloader } from './preloader'
import { setupReveal } from './reveal'
import './index.css'

runPreloader()

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción el HTML viene prerenderizado: se hidrata. En desarrollo se monta.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

setupReveal()
