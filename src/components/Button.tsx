import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'text'
  inverse?: boolean
  className?: string
  external?: boolean
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`size-[0.8em] shrink-0 ${className}`}>
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

/** El único botón sólido de la página: rectángulo recto, un relleno. */
export default function Button({ href, children, variant = 'solid', inverse = false, className = '', external }: Props) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  if (variant === 'text') {
    return (
      <a
        href={href}
        {...ext}
        className={`group inline-flex items-center gap-2 py-4 font-medium underline decoration-2 underline-offset-[0.35em] ${className}`}
      >
        {children}
        <Arrow className="transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    )
  }
  return (
    <a
      href={href}
      {...ext}
      data-magnetic
      className={`group relative inline-flex items-center justify-center gap-3 px-6 py-4 font-medium transition-[scale] duration-150 ease-(--ease-out) active:scale-[0.97] ${
        inverse ? 'bg-bg text-ink' : 'bg-ink text-bg'
      } ${className}`}
    >
      <span data-magnetic-inner className="inline-flex items-center gap-3">
        {children}
        <Arrow className="transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  )
}
