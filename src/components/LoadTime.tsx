import { useEffect, useState } from 'react'

/**
 * Lo vivo de la página: el tiempo real que tardó en pintarse el contenido principal
 * en *esta* visita (Largest Contentful Paint). Sin JavaScript no se muestra nada.
 */
export default function LoadTime() {
  const [ms, setMs] = useState<number | null>(null)

  useEffect(() => {
    let lcp = 0
    let raf = 0
    let po: PerformanceObserver | undefined
    try {
      po = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) lcp = e.startTime
      })
      po.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {
      /* navegador sin soporte: se usa el tiempo de navegación */
    }
    const settle = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
      const value = lcp || nav?.domContentLoadedEventEnd || performance.now()
      po?.disconnect()
      const final = Math.max(1, Math.round(value))
      // Contador: sube de 0 a la cifra real una sola vez (600ms, ease-out). Sin movimiento: directo.
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setMs(final)
      const t0 = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / 600)
        setMs(Math.round(final * (1 - Math.pow(1 - p, 4))))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    // El LCP se fija con la primera interacción o al poco de cargar.
    const t = window.setTimeout(settle, document.readyState === 'complete' ? 600 : 1800)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      po?.disconnect()
    }
  }, [])

  const seconds = ms === null ? null : (ms / 1000).toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <p aria-live="polite" className="min-h-[1.45em] max-w-[34ch]">
      {seconds && (
        <>
          Esta página mostró su contenido principal en <span className="tabular-nums">{seconds} s</span> en tu dispositivo.
        </>
      )}
    </p>
  )
}
