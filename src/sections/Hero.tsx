import { hero, person, projects } from '../content/site'
import Button, { Arrow } from '../components/Button'
import LoadTime from '../components/LoadTime'
import Monument from '../components/Monument'

// Primer proyecto (no "Este portafolio": su captura es la portada y se vería duplicada)
const shot = projects[0].image
const blank = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

const social = [
  ['GitHub', person.github],
  ['LinkedIn', person.linkedin],
  ['WhatsApp', person.whatsappUrl],
]

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col px-5 pt-20 md:px-8 md:pt-28 md:pb-10"
    >
      <div className="@container order-1 pt-4 md:order-2 md:my-auto md:pt-12 md:pb-10">
        <p className="text-lead font-medium">{hero.greeting}</p>
        <h1
          id="hero-title"
          aria-label={`${person.name}, ${person.role.toLowerCase()}`}
          className="font-display text-[calc(100cqw/5.78)] leading-[0.86]"
        >
          <Monument first={person.firstName} last={person.lastName} />
        </h1>
      </div>

      <div className="order-2 mt-8 grid grid-cols-4 gap-x-5 gap-y-4 md:order-1 md:mt-0 md:grid-cols-12 md:gap-x-8">
        <div className="col-span-4 md:col-span-6 lg:col-span-5">
          <p className="max-w-[22ch] text-lead font-medium">{hero.headline}</p>
          <div className="mt-6 hidden flex-wrap items-center gap-x-8 gap-y-1 whitespace-nowrap md:flex">
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="text">
              {hero.secondary.label}
            </Button>
          </div>
        </div>
        <p className="col-span-4 max-w-[46ch] md:col-span-6 lg:col-span-4 lg:col-start-6">{hero.sub}</p>
        <div className="col-span-4 mt-4 flex flex-col gap-2 md:hidden">
          <Button href={hero.primary.href} className="w-full">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} variant="text" className="self-start">
            {hero.secondary.label}
          </Button>
        </div>
        <div className="hidden text-right text-small lg:col-span-3 lg:col-start-10 lg:block">
          <p className="inline-flex items-center gap-2 font-medium">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-success" />
            {hero.availability}
          </p>
          <p>{person.location}</p>
        </div>
      </div>

      <div className="order-3 mt-6 flex items-end justify-between gap-8 text-small md:mt-0">
        <LoadTime />
        <ul className="hidden gap-6 font-medium md:flex">
          {social.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-2 hover:underline hover:underline-offset-4"
              >
                {label}
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* En el móvil la pantalla termina con la primera captura del trabajo, cortada por el borde. */}
      <figure className="order-4 mt-8 pb-8 md:hidden">
        <div className="aspect-[4/5] max-h-[62svh] overflow-clip bg-surface">
          <picture>
            <source media="(min-width: 768px)" srcSet={blank} />
            <source type="image/avif" srcSet={shot.sources.avif} sizes="calc(100vw - 40px)" />
            <source type="image/webp" srcSet={shot.sources.webp} sizes="calc(100vw - 40px)" />
            <img
              src={shot.img.src}
              width={shot.img.w}
              height={shot.img.h}
              alt={projects[0].alt}
              // El LCP es texto: la captura no debe robar ancho de banda a las fuentes
              fetchPriority="low"
              decoding="async"
              className="size-full object-cover object-[0%_62%]"
            />
          </picture>
        </div>
        
      </figure>
    </section>
  )
}
