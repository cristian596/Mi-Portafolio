// Consentimiento de cookies y carga condicionada de Google Analytics.
// Analytics NO se carga hasta que la persona lo acepta; si lo rechaza o lo retira, se desactiva y se borran sus cookies.
// Sin VITE_GA_ID no hay analítica, así que tampoco se muestra aviso de cookies.

export const GA_ID = import.meta.env.VITE_GA_ID as string | undefined

const KEY = 'ch-cookies'
export const SETTINGS_EVENT = 'ch:cookie-settings'

export type Consent = { analytics: boolean; v: 1; at: string }

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const v = JSON.parse(raw) as Partial<Consent>
    return typeof v.analytics === 'boolean' ? { analytics: v.analytics, v: 1, at: String(v.at ?? '') } : null
  } catch {
    return null
  }
}

let loaded = false

function loadAnalytics(id: string) {
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = false
  if (loaded) return
  loaded = true
  window.dataLayer = window.dataLayer || []
  // gtag necesita el objeto `arguments`, no un array
  const gtag = function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', id, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.append(s)
}

function disableAnalytics(id: string) {
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = true
  const host = location.hostname
  const root = host.split('.').slice(-2).join('.')
  const domains = [host, `.${host}`, `.${root}`]
  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((n) => n === '_ga' || n.startsWith('_ga_') || n === '_gid' || n.startsWith('_gat'))
    .forEach((n) => {
      document.cookie = `${n}=; ${expired}`
      domains.forEach((d) => (document.cookie = `${n}=; ${expired}; domain=${d}`))
    })
}

export function saveConsent(analytics: boolean) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics, v: 1, at: new Date().toISOString() }))
  } catch {
    /* sin almacenamiento: la elección vale solo para esta visita */
  }
  if (!GA_ID) return
  if (analytics) loadAnalytics(GA_ID)
  else disableAnalytics(GA_ID)
}

/** Al arrancar: si ya había aceptado analítica, se carga; si no, no se toca nada. */
export function initConsent() {
  if (GA_ID && readConsent()?.analytics) loadAnalytics(GA_ID)
}

/** Abre el panel de configuración (desde el pie o la política). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(SETTINGS_EVENT))
}
