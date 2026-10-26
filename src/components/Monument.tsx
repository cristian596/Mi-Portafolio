type Props = { first: string; last: string }

const STAGGER = 26

/**
 * El nombre como monumento: dos líneas a toda la anchura del contenedor.
 * La entrada letra a letra es CSS pura (no espera a la hidratación) y queda en pausa
 * mientras el preloader está en pantalla.
 */
export default function Monument({ first, last }: Props) {
  let index = 0
  const line = (word: string, extra: number) => (
    <span className="block overflow-clip pb-[0.02em]">
      {Array.from(word).map((ch) => {
        const delay = 60 + extra + index++ * STAGGER
        return (
          <span
            key={index}
            style={{ animationDelay: `${delay}ms` }}
            className="inline-block motion-safe:in-[.js]:animate-rise in-[.loading]:[animation-play-state:paused]"
          >
            {ch}
          </span>
        )
      })}
    </span>
  )

  return (
    <span className="block">
      <span
        data-monument
        className="scroll-monument block origin-[50%_0%] font-extrabold tracking-[-0.025em] whitespace-nowrap uppercase"
      >
        {line(first, 0)}
        {line(last, 60)}
      </span>
    </span>
  )
}
