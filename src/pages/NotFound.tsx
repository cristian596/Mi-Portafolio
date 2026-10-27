import Button from '../components/Button'

/** Página 404. En producción Cloudflare la sirve (con estado 404) para cualquier dirección que no exista. */
export default function NotFound() {
  return (
    <>
      <header className="flex h-16 items-center px-5 md:h-20 md:px-8">
        <a href="/" className="font-display text-lead font-extrabold tracking-[-0.06em] uppercase">
          CH<span className="sr-only">, Camilo Higuera: volver al inicio</span>
        </a>
      </header>
      <main
        id="main"
        tabIndex={-1}
        className="flex min-h-[calc(100svh-5rem)] flex-col justify-center px-5 pb-20 outline-none md:px-8"
      >
        <p
          aria-hidden="true"
          className="font-display text-[clamp(6rem,30vw,22rem)] leading-[0.86] font-extrabold tracking-[-0.04em] text-ink"
        >
          404
        </p>
        <h1 className="mt-6 max-w-[20ch] text-statement font-medium md:mt-8">Esta página no existe o cambió de lugar.</h1>
        <p className="mt-4 max-w-[46ch] text-muted">
          Revisa que la dirección esté bien escrita o vuelve al inicio para ver mis proyectos y escribirme.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-1">
          <Button href="/">Volver al inicio</Button>
          <Button href="/#proyectos" variant="text">
            Ver proyectos
          </Button>
          <Button href="/#contacto" variant="text">
            Contacto
          </Button>
        </div>
      </main>
    </>
  )
}
