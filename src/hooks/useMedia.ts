import { useSyncExternalStore } from 'react'

// Media query segura para SSR: en el servidor (y en la hidratación) devuelve `serverValue`.
export function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)', false)
/** Ratón o trackpad con hover real: aquí sí se activan los efectos pesados. */
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)', false)
