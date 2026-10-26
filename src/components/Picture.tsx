import type { Picture as Pic } from '../types'

type Props = {
  picture: Pic
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}

const order = ['avif', 'webp']

/** <picture> con AVIF y WebP en srcset, width/height reales y lazy loading por defecto. */
export default function Picture({ picture, alt, sizes, className, priority = false }: Props) {
  return (
    <picture>
      {order
        .filter((f) => picture.sources[f])
        .map((f) => (
          <source key={f} type={`image/${f}`} srcSet={picture.sources[f]} sizes={sizes} />
        ))}
      <img
        src={picture.img.src}
        srcSet={picture.sources.jpeg ?? picture.sources.jpg}
        sizes={sizes}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
      />
    </picture>
  )
}
