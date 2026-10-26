// Efectos de puntero solo para escritorio (hover real, sin movimiento reducido).
// Se carga con import() dinámico: el móvil nunca descarga Lenis ni Motion.
import Lenis from 'lenis'
// motion/mini: animate sobre WAAPI (≈2 kB) con muelles de Motion convertidos a easing linear().
import { animate } from 'motion/mini'
import { spring as springType } from 'motion'

const spring = { type: springType, duration: 0.5, bounce: 0.2 }
const follow = { type: springType, stiffness: 260, damping: 22, mass: 0.6 }

export function startDesktopEffects() {
  // Smooth scroll con peso, sin secuestrar anclas ni teclado.
  const lenis = new Lenis({ lerp: 0.12, autoRaf: true, anchors: { offset: -80 } })
  window.__lenis = lenis

  // Cursor sutil: un punto que sigue al ratón y crece sobre lo clicable. El cursor nativo se queda.
  const dot = document.createElement('div')
  dot.setAttribute('aria-hidden', 'true')
  dot.className =
    'pointer-events-none fixed top-0 left-0 z-[70] -mt-6 -ml-6 size-12 rounded-full bg-ink opacity-0 transition-[opacity,background-color] duration-200'
  document.body.append(dot)
  let x = -100
  let y = -100
  let cx = x
  let cy = y
  let scale = 0.22
  let targetScale = 0.22
  let frame = 0
  const loop = () => {
    cx += (x - cx) * 0.28
    cy += (y - cy) * 0.28
    scale += (targetScale - scale) * 0.2
    dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(${scale})`
    frame = Math.abs(x - cx) + Math.abs(y - cy) + Math.abs(targetScale - scale) > 0.1 ? requestAnimationFrame(loop) : 0
  }
  const kick = () => {
    if (!frame) frame = requestAnimationFrame(loop)
  }

  // Magnético y tilt por delegación de eventos.
  let magnet: HTMLElement | null = null
  let tilt: HTMLElement | null = null
  const release = (el: HTMLElement | null, kind: 'magnet' | 'tilt') => {
    if (!el) return
    if (kind === 'magnet') animate(el, { translate: '0px 0px' }, spring)
    else animate(el, { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }, spring)
  }

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    x = e.clientX
    y = e.clientY
    const target = e.target as Element
    const clickable = target.closest('a, button, select, label, [role="button"]')
    const inverse = !!target.closest('[data-inverse]')
    dot.style.opacity = clickable ? '0.35' : '0.9'
    dot.classList.toggle('bg-ink', !inverse)
    dot.classList.toggle('bg-bg', inverse)
    targetScale = clickable ? 1 : 0.22
    kick()

    const m = target.closest<HTMLElement>('[data-magnetic]')
    if (m !== magnet) {
      release(magnet, 'magnet')
      magnet = m
    }
    if (m) {
      const r = m.getBoundingClientRect()
      const dx = Math.max(-6, Math.min(6, (e.clientX - (r.left + r.width / 2)) * 0.18))
      const dy = Math.max(-6, Math.min(6, (e.clientY - (r.top + r.height / 2)) * 0.3))
      animate(m, { translate: `${dx}px ${dy}px` }, follow)
    }

    const t = target.closest<HTMLElement>('[data-tilt]')
    if (t !== tilt) {
      release(tilt, 'tilt')
      tilt = t
    }
    if (t) {
      const r = t.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      animate(t, { transform: `perspective(1000px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)` }, follow)
    }
  }
  const onLeave = () => {
    dot.style.opacity = '0'
    release(magnet, 'magnet')
    release(tilt, 'tilt')
    magnet = tilt = null
  }

  document.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
}
