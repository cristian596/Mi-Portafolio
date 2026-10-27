import { useId, useRef, useState, type FormEvent } from 'react'
import { contact, legal, person } from '../content/site'
import { openPrivacy } from '../privacy'

type Via = 'WhatsApp' | 'Correo'
type Field = 'name' | 'contact' | 'type' | 'message' | 'consent'
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'
type Data = Record<Field, string> & { via: Via }

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Número de WhatsApp: se aceptan espacios, guiones, paréntesis y el +; deben quedar entre 7 y 15 dígitos.
const phoneDigits = (v: string) => v.replace(/\D/g, '')

function validate(data: Data): Errors {
  const e: Errors = {}
  if (data.name.trim().length < 2) e.name = 'Escribe tu nombre (mínimo 2 letras).'
  if (data.via === 'WhatsApp') {
    const n = phoneDigits(data.contact).length
    if (n < 7 || n > 15) e.contact = 'Revisa tu número de WhatsApp (con el indicativo si es de otro país).'
  } else if (!EMAIL.test(data.contact.trim())) {
    e.contact = 'Revisa el email: debe tener la forma nombre@dominio.com.'
  }
  if (!data.type) e.type = 'Elige el tipo de proyecto.'
  if (data.message.trim().length < 10) e.message = 'Cuéntame un poco más (mínimo 10 caracteres).'
  if (!data.consent) e.consent = 'Para enviar el mensaje debes aceptar la política de privacidad.'
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
  const [via, setVia] = useState<Via>('WhatsApp')

  const read = (): Data => {
    const fd = new FormData(form.current!)
    return {
      name: String(fd.get('name') ?? ''),
      via,
      contact: String(fd.get('contact') ?? ''),
      type: String(fd.get('type') ?? ''),
      message: String(fd.get('message') ?? ''),
      consent: fd.get('consent') ? 'si' : '',
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
          name: data.name,
          type: data.type,
          message: data.message,
          preferencia_de_contacto: data.via,
          autorizacion_datos: `Aceptó la política de privacidad del ${legal.privacyUpdated}`,
          // Web3Forms usa el campo `email` como dirección de respuesta
          ...(data.via === 'WhatsApp'
            ? { whatsapp: data.contact, whatsapp_enlace: `https://wa.me/${phoneDigits(data.contact)}` }
            : { email: data.contact.trim() }),
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
        <p className="mt-4 max-w-[36ch] text-lead">
          Gracias. Te escribo por {via === 'WhatsApp' ? 'WhatsApp' : 'correo'} en menos de 48 horas, normalmente antes.
        </p>
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
    const d = form.current ? read() : { name: '', via, contact: '', type: '', message: '' }
    const body = `Hola Camilo,\n\n${d.message}\n\n${d.name} · ${d.via}: ${d.contact}`
    return `mailto:${person.email}?subject=${encodeURIComponent(`Proyecto: ${d.type || 'web'}`)}&body=${encodeURIComponent(body)}`
  })()

  return (
    <form ref={form} noValidate onSubmit={onSubmit} onChange={onChange} aria-labelledby={`${id}-title`} className="flex flex-col gap-6">
      <h3 id={`${id}-title`} className="sr-only">
        Formulario de contacto
      </h3>
      <div>
        <label htmlFor={`${id}-name`} className="text-small font-medium">
          Nombre
        </label>
        <input id={`${id}-name`} name="name" autoComplete="name" placeholder="Tu nombre" className={inputClass} {...aria('name')} />
        {err('name')}
      </div>
      <fieldset>
        <legend className="text-small font-medium">¿Cómo prefieres que te escriba?</legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {(['WhatsApp', 'Correo'] as const).map((v) => (
            <label key={v} className="relative block cursor-pointer">
              <input
                type="radio"
                name="via"
                value={v}
                checked={via === v}
                onChange={() => {
                  setVia(v)
                  setErrors((e) => ({ ...e, contact: undefined }))
                }}
                className="peer sr-only"
              />
              <span className="block border-2 border-bg/45 px-4 py-3.5 text-center font-medium transition-[background-color,border-color,color] duration-200 hover:border-bg/70 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-bg">
                {v}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor={`${id}-contact`} className="text-small font-medium">
          {via === 'WhatsApp' ? 'Tu número de WhatsApp' : 'Tu email'}
        </label>
        <input
          key={via}
          id={`${id}-contact`}
          name="contact"
          type={via === 'WhatsApp' ? 'tel' : 'email'}
          inputMode={via === 'WhatsApp' ? 'tel' : 'email'}
          autoComplete={via === 'WhatsApp' ? 'tel' : 'email'}
          placeholder={via === 'WhatsApp' ? '+57 300 123 4567' : 'tu@email.com'}
          className={inputClass}
          {...aria('contact')}
        />
        {err('contact')}
      </div>
      <div>
        <label htmlFor={`${id}-type`} className="text-small font-medium">
          Tipo de proyecto
        </label>
        <select id={`${id}-type`} name="type" defaultValue="" className={`${inputClass} appearance-none`} {...aria('type')}>
          <option value="" disabled className="bg-bg text-ink">
            Elige una opción
          </option>
          {contact.projectTypes.map((t) => (
            <option key={t} value={t} className="bg-bg text-ink">
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
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-small">
          <input type="checkbox" name="consent" className="mt-0.5 size-5 shrink-0 accent-accent" {...aria('consent')} />
          <span>
            Acepto la{' '}
            <a href="/privacidad" onClick={openPrivacy} className="font-medium underline underline-offset-4">
              Política de privacidad
            </a>{' '}
            y autorizo el tratamiento de mis datos para responder a mi solicitud, incluida su transmisión a los
            proveedores que allí se indican.
          </span>
        </label>
        {err('consent')}
      </div>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          data-magnetic
          className="inline-flex items-center gap-3 bg-accent px-6 py-4 font-medium text-accent-ink transition-[scale,filter] hover:brightness-110 duration-150 ease-(--ease-out) active:scale-[0.97] disabled:opacity-70"
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
