import { contact, person } from '../content/site'
import { Arrow } from '../components/Button'
import ContactForm from './ContactForm'

export const channels = [
  { label: 'WhatsApp', value: person.whatsapp, href: person.whatsappUrl },
  { label: 'LinkedIn', value: 'Camilo Higuera', href: person.linkedin },
  { label: 'GitHub', value: '@camilohiguera', href: person.github },
  { label: 'Email', value: person.email, href: `mailto:${person.email}` },
]

export default function Contact() {
  return (
    <section
      id="contacto"
      data-inverse
      aria-labelledby="contact-title"
      className="bg-ink px-5 pt-[clamp(6rem,12vw,11rem)] pb-[clamp(5rem,9vw,9rem)] text-bg md:px-8"
    >
      <div className="grid grid-cols-4 gap-x-5 gap-y-14 md:grid-cols-12 md:gap-x-8">
        <div className="col-span-4 md:col-span-5">
          <h2
            data-reveal
            id="contact-title"
            className="max-w-[12ch] font-display text-head font-extrabold tracking-[-0.04em] uppercase"
          >
            {contact.title}
          </h2>
          <p data-reveal className="mt-6 max-w-[34ch] text-lead">{contact.sentence}</p>
          <ul className="mt-10 flex flex-col gap-1 md:mt-14">
            {channels.map((c) => (
              <li data-reveal key={c.label}>
                <a
                  href={c.href}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-baseline justify-between gap-6 py-3"
                >
                  <span className="font-medium">{c.label}</span>
                  <span className="flex items-center gap-2 text-right transition-transform duration-300 ease-(--ease-out) group-hover:-translate-x-1">
                    <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] duration-300 group-hover:decoration-current">
                      {c.value}
                    </span>
                    <Arrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="col-span-4 md:col-span-6 md:col-start-7">
          <ContactForm />
        </div>
      </div>
      <a
        href={`mailto:${person.email}`}
        data-reveal
        className="group mt-[clamp(5rem,10vw,9rem)] block font-display text-[clamp(1.6rem,6.1vw,7rem)] leading-[1] font-extrabold tracking-[-0.05em]"
      >
        <span className="sr-only">Escríbeme a </span>
        <span className="inline-block transition-transform duration-500 ease-(--ease-expo) group-hover:translate-x-3">
          {/* En el móvil la dirección corta después de la arroba */}
          {person.email.split('@')[0]}@<wbr />
          {person.email.split('@')[1]}
        </span>
      </a>
    </section>
  )
}
