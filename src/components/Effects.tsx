import { useEffect } from 'react'

// Capa de efectos solo de cliente. Los efectos de puntero y Lenis se descargan
// únicamente con ratón real y sin movimiento reducido.
export default function Effects() {
  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const start = () => import('../effects/desktop').then((m) => m.startDesktopEffects())
    // Fuera del camino crítico: cuando el navegador quede libre.
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2000 })
    else setTimeout(start, 1200)
  }, [])
  return null
}
