import type Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export {}
