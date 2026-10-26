// Entradas por sección con WAAPI (sin librería). Cada [data-reveal] bajo el pliegue sube 24px y aparece
// una sola vez; los que entran juntos se escalonan 70ms en orden de lectura.
// No toca atributos del DOM: el estado oculto es una animación en pausa, así que sin JS todo es visible
// y la hidratación de React no ve diferencias.
const EASE_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'
const STAGGER = 70

export function setupReveal() {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const pending = new Map<Element, Animation>()
  const seen = new WeakSet<Element>()

  const io = new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
      entering.forEach((el, i) => {
        const anim = pending.get(el)
        io.unobserve(el)
        pending.delete(el)
        if (!anim) return
        anim.effect?.updateTiming({ delay: i * STAGGER })
        anim.play()
      })
    },
    { rootMargin: '0px 0px -10% 0px' },
  )

  const register = (el: Element) => {
    if (seen.has(el)) return
    seen.add(el)
    // Lo que ya está en pantalla se queda quieto: nada se oculta delante del lector.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return
    const kind = (el as HTMLElement).dataset.reveal
    const keyframes: Keyframe[] = reduce
      ? [{ opacity: 0 }, { opacity: 1 }]
      : kind === 'picture'
        ? [
            { opacity: 0, transform: 'scale(1.04)' },
            { opacity: 1, transform: 'scale(1)' },
          ]
        : [
            { opacity: 0, transform: 'translate3d(0, 24px, 0)' },
            { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          ]
    const anim = el.animate(keyframes, {
      duration: reduce ? 300 : kind === 'picture' ? 1100 : 800,
      easing: reduce ? 'ease' : EASE_EXPO,
      fill: 'both',
    })
    anim.pause()
    // Al terminar se suelta la animación para no dejar capas compuestas vivas.
    anim.finished.then(() => anim.cancel(), () => {})
    pending.set(el, anim)
    io.observe(el)
  }

  const scan = (root: ParentNode) => root.querySelectorAll('[data-reveal]').forEach(register)
  scan(document)
  // En desarrollo (sin prerender) las secciones diferidas aparecen después.
  new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && scan(n.parentNode ?? n))
  }).observe(document.getElementById('root')!, { childList: true, subtree: true })
}
