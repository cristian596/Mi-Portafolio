import { useId, useRef, useState, type FormEvent } from 'react'
import { contact, person } from '../content/site'

type Field = 'name' | 'email' | 'type' | 'message'
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(data: Record<Field, string>): Errors {
  const e: Errors = {}
  if (data.name.trim().length < 2) e.name = 'Escribe tu nombre (mínimo 2 letras).'
  if (!EMAIL.test(data.email.trim())) e.email = 'Revisa el email: debe tener la forma nombre@dominio.com.'
  if (!data.type) e.type = 'Elige el tipo de proyecto.'
  if (data.message.trim().length < 10) e.message = 'Cuéntame un poco más (mínimo 10 caracteres).'
  return e
}

const inputClass =
  'mt-2 block w-full rounded-none border-0 border-b-2 border-bg/45 bg-bg/[0.07] px-4 py-3.5 text-body text-bg placeholder:text-bg/65 transition-[border-color,background-color] duration-200 hover:border-bg/70 focus:border-bg focus:bg-bg/[0.11] focus-visible:outline-offset-0 aria-invalid:border-bg'

export default function ContactForm() {
  const id = useId()
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [touched, setTouched] = useState(false)

  const read = () => {
    const fd = new FormData(form.current!)
    return {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      type: String(fd.get('type') ?? ''),
      message: String(fd.get('message') ?? ''),
    }
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setTouched(true)
    const data = read()
    const e = validate(data)
    setErrors(e)
    const first = (Object.keys(e) as Field[])[0]
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    if (!ACCESS_KEY) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Nuevo proyecto (${data.type}) desde el portafolio`,
          from_name: 'Portafolio Camilo Higuera',
          botcheck: (form.current?.elements.namedItem('botcheck') as HTMLInputElement | null)?.checked ?? false,
          ...data,
        }),
      })
      const json = await res.json().catch(() => ({}))
      setStatus(res.ok && json.success !== false ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const onChange = () => {
    if (touched) setErrors(validate(read()))
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="flex min-h-full flex-col items-start justify-center bg-bg/[0.07] p-8 transition-[opacity,translate] duration-500 ease-(--ease-expo) starting:translate-y-3 starting:opacity-0 motion-reduce:starting:translate-y-0 md:p-12"
      >
        <svg viewBox="0 0 64 64" className="size-16" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="currentColor" />
          <path
            d="M19 33.5 28 42l17-19"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="5"
            strokeLinecap="square"
            pathLength={1}
            className="[stroke-dasharray:1] motion-safe:animate-[draw_700ms_var(--ease-expo)_200ms_both]"
          />
        </svg>
        <p className="mt-8 font-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-[1] font-extrabold tracking-[-0.04em] uppercase">
          Mensaje enviado
        </p>
        <p className="mt-4 max-w-[36ch] text-lead">Gracias. Te respondo en menos de 48 horas, normalmente antes.</p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setTouched(false)
            setErrors({})
          }}
          className="mt-8 py-2 font-medium underline decoration-2 underline-offset-[0.35em]"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  const err = (f: Field) =>
    errors[f] ? (
      <p
        id={`${id}-${f}-err`}
        className="mt-2 text-small font-medium transition-[opacity,translate] duration-200 ease-(--ease-out) starting:-translate-y-1 starting:opacity-0"
      >
        {errors[f]}
      </p>
    ) : null
  const aria = (f: Field) => ({
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? `${id}-${f}-err` : undefined,
  })

  const mailto = (() => {
    const d = form.current ? read() : { name: '', email: '', type: '', message: '' }
    const body = `Hola Camilo,\n\n${d.message}\n\n${d.name} · ${d.email}`
    return `mailto:${person.email}?subject=${encodeURIComponent(`Proyecto: ${d.type || 'web'}`)}&body=${encodeURIComponent(body)}`
  })()

  return (
    <form ref={form} noValidate onSubmit={onSubmit} onChange={onChange} aria-labelledby={`${id}-title`} className="flex flex-col gap-6">
      <h3 id={`${id}-title`} className="sr-only">
        Formulario de contacto
      </h3>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-small font-medium">
            Nombre
          </label>
          <input id={`${id}-name`} name="name" autoComplete="name" placeholder="Tu nombre" className={inputClass} {...aria('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-small font-medium">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tu@email.com"
            className={inputClass}
            {...aria('email')}
          />
          {err('email')}
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-type`} className="text-small font-medium">
          Tipo de proyecto
        </label>
        <select id={`${id}-type`} name="type" defaultValue="" className={`${inputClass} appearance-none`} {...aria('type')}>
          <option value="" disabled>
            Elige una opción
          </option>
          {contact.projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {err('type')}
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="text-small font-medium">
          Mensaje
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          placeholder="Qué necesitas, para cuándo y cualquier enlace útil"
          className={`${inputClass} resize-y`}
          {...aria('message')}
        />
        {err('message')}
      </div>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          data-magnetic
          className="inline-flex items-center gap-3 bg-bg px-6 py-4 font-medium text-ink transition-[scale] duration-150 ease-(--ease-out) active:scale-[0.97] disabled:opacity-70"
        >
          <span data-magnetic-inner>{status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}</span>
        </button>
        <p aria-live="polite" className="text-small font-medium">
          {status === 'error' &&
            (ACCESS_KEY ? (
              <>
                No se pudo enviar. Inténtalo de nuevo o{' '}
                <a href={mailto} className="underline underline-offset-4">
                  escríbeme por email
                </a>
                .
              </>
            ) : (
              <>
                El envío directo aún no está configurado.{' '}
                <a href={mailto} className="underline underline-offset-4">
                  Envíalo por email
                </a>
                .
              </>
            ))}
        </p>
      </div>
    </form>
  )
}
