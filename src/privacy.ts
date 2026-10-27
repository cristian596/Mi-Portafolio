import type { MouseEvent } from 'react'

export const PRIVACY_EVENT = 'ch:privacy-open'

/**
 * Abre la política en una ventana emergente. Los enlaces conservan href="/privacidad":
 * con Ctrl/Cmd/clic central (o sin JS) se abre la página normal.
 */
export function openPrivacy(e?: MouseEvent) {
  if (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
  }
  window.dispatchEvent(new Event(PRIVACY_EVENT))
}
