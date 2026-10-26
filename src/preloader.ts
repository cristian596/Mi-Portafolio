// Preloader: cuenta la carga real (DOM, fuentes, load) y se retira como un telón.
// Si la página carga rápido se disuelve sin contar; nunca dura más de MAX_MS.
const MAX_MS = 900
const FAST_MS = 700

export function runPreloader() {
  const el = document.getElementById('preloader')
  if (!el) return
  const root = document.documentElement
  if (root.classList.contains('no-preloader') || getComputedStyle(el).display === 'none') {
    root.classList.remove('loading')
    el.remove()
    return
  }

  const counter = el.querySelector<HTMLElement>('[data-count]')
  let target = 30
  let shown = 0
  let finished = false
  let loaded = false

  const onLoaded = () => {
    loaded = true
    target = 100
    if (performance.now() < FAST_MS) leave(true)
  }
  document.fonts?.ready.then(() => (target = Math.max(target, 80)))
  if (document.readyState === 'complete') onLoaded()
  else window.addEventListener('load', onLoaded, { once: true })

  const tick = () => {
    if (finished) return
    // Al acercarse al límite fuerza el final para no bloquear la lectura.
    const goal = loaded || performance.now() > MAX_MS - 300 ? 100 : target
    shown += (goal - shown) * 0.22
    if (goal - shown < 0.6) shown = goal
    if (counter) counter.textContent = String(Math.round(shown)).padStart(3, '0')
    if (shown >= 100) return leave(false)
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)

  function leave(fast: boolean) {
    if (finished) return
    finished = true
    root.classList.remove('loading')
    if (counter) counter.textContent = '100'
    const anim = el!.animate(
      fast
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(0,-100%,0)' }],
      { duration: fast ? 240 : 600, easing: fast ? 'ease' : 'cubic-bezier(0.76, 0, 0.24, 1)', fill: 'forwards' },
    )
    anim.finished.then(() => el!.remove(), () => el!.remove())
  }
}
