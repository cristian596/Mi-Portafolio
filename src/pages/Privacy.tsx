import type { ReactNode } from 'react'
import { legal, person } from '../content/site'
import { Arrow } from '../components/Button'
import { GA_ID, openCookieSettings } from '../cookies/consent'

const link = 'font-medium underline decoration-2 underline-offset-4'
const mail = person.email

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`s${n}`} className="mt-12 md:mt-14">
      <h2 id={`s${n}`} className="text-statement font-medium">
        {n}. {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

const cookies = [
  ['ch-cookies', 'Almacenamiento local (propia)', 'Guarda tu elección sobre las cookies.', 'Hasta que la cambies o borres los datos del navegador', 'Necesaria'],
  ['ch-seen', 'Almacenamiento de sesión (propia)', 'Recuerda que ya viste la pantalla de carga.', 'Hasta cerrar la pestaña', 'Necesaria'],
  ['_ga', 'Cookie (Google)', 'Distingue visitantes de forma anónima para las estadísticas.', 'Hasta 2 años', 'Analítica'],
  ['_ga_<ID>', 'Cookie (Google)', 'Mantiene el estado de la sesión en Google Analytics.', 'Hasta 2 años', 'Analítica'],
]

export default function Privacy() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-[200%] bg-ink px-4 py-3 font-medium text-bg focus-visible:translate-y-0"
      >
        Saltar al contenido
      </a>
      <header className="flex h-16 items-center justify-between px-5 md:h-20 md:px-8">
        <a href="/" className="font-display text-lead font-extrabold tracking-[-0.06em] uppercase">
          CH<span className="sr-only">, Camilo Higuera: volver al inicio</span>
        </a>
        <a href="/" className="group inline-flex items-center gap-2 py-3 font-medium">
          <Arrow className="-rotate-90" />
          Volver al inicio
        </a>
      </header>

      <main id="main" tabIndex={-1} className="px-5 pt-8 pb-24 outline-none md:px-8 md:pt-14">
        <div className="max-w-[72ch] text-body">
          <h1 className="font-display text-title font-extrabold tracking-[-0.04em] uppercase">Política de privacidad</h1>
          <p className="mt-4 text-muted">
            Política de tratamiento de datos personales · Última actualización: {legal.privacyUpdated}
          </p>
          <p className="mt-8">
            Esta política explica qué datos personales recojo en camilohiguera.com, para qué los uso, con quién los
            comparto y cómo puedes ejercer tus derechos. Está redactada conforme a la legislación colombiana de protección
            de datos.
          </p>

          <Section n={1} title="Responsable del tratamiento">
            <p>
              <strong className="font-medium">{legal.holder}</strong>, conocido en este sitio como {person.name}, persona
              natural con domicilio en {legal.domicile}, es el responsable del tratamiento de los datos personales que se
              recogen a través de camilohiguera.com (el «Sitio»).
            </p>
            <p>
              Contacto para cualquier asunto de datos personales:{' '}
              <a href={`mailto:${mail}`} className={link}>
                {mail}
              </a>
              .
            </p>
          </Section>

          <Section n={2} title="Marco normativo">
            <p>
              Esta política se rige por el artículo 15 de la Constitución Política de Colombia, la Ley 1581 de 2012
              (régimen general de protección de datos personales), el Decreto 1377 de 2013 y las demás normas que los
              modifiquen o complementen, hoy compilados en el Decreto 1074 de 2015. La autoridad de protección de datos
              es la Superintendencia de Industria y Comercio (SIC).
            </p>
          </Section>

          <Section n={3} title="Datos que recojo">
            <List
              items={[
                <>
                  <strong className="font-medium">Formulario de contacto:</strong> tu nombre, el medio por el que prefieres
                  que te escriba (WhatsApp o correo), tu número de WhatsApp o tu correo, el tipo de proyecto y el mensaje
                  que escribas.
                </>,
                <>
                  <strong className="font-medium">Mensajes directos:</strong> si me escribes por correo o por WhatsApp,
                  los datos que incluyas en la conversación, como tu nombre y tu número o correo.
                </>,
                <>
                  <strong className="font-medium">Datos de navegación (solo si aceptas las cookies de analítica):</strong>{' '}
                  páginas visitadas, tiempo en el Sitio, tipo de dispositivo y navegador, ubicación aproximada y un
                  identificador anónimo. No te identifican por tu nombre.
                </>,
              ]}
            />
            <p>
              No solicito datos sensibles (por ejemplo, de salud, origen racial, orientación sexual, creencias religiosas
              o políticas, o datos biométricos). Te pido que no los incluyas en tus mensajes.
            </p>
          </Section>

          <Section n={4} title="Para qué uso tus datos">
            <p>Uso tus datos únicamente para estas finalidades:</p>
            <List
              items={[
                'Responder tu solicitud: contactarte por el medio que elegiste para hablar de tu proyecto y enviarte información o una propuesta.',
                'Llevar un registro de la comunicación para darle seguimiento y atender cualquier reclamo.',
                'Solo si aceptas las cookies de analítica: medir cómo se usa el Sitio y mejorarlo, con estadísticas agregadas.',
              ]}
            />
            <p>
              No envío boletines, publicidad ni promociones. No vendo ni cedo tus datos a terceros con fines comerciales y
              no los uso para finalidades distintas sin pedirte antes una nueva autorización.
            </p>
          </Section>

          <Section n={5} title="Tu autorización">
            <p>
              Trato tus datos solo con tu autorización previa, expresa e informada. En el formulario la das al marcar la
              casilla de aceptación antes de enviar el mensaje. Para las cookies de analítica la das desde el aviso de
              cookies. Si me escribes directamente por correo o WhatsApp, entiendo que me autorizas a usar los datos que
              me compartes solo para responderte. Puedes revocar tu autorización cuando quieras (sección 8).
            </p>
          </Section>

          <Section n={6} title="Proveedores y transferencia internacional de datos">
            <p>Para que el Sitio funcione me apoyo en estos proveedores, que tratan datos por cuenta mía:</p>
            <List
              items={[
                <>
                  <strong className="font-medium">Web3Forms:</strong> recibe el formulario de contacto y me lo reenvía por
                  correo.
                </>,
                <>
                  <strong className="font-medium">Cloudflare:</strong> aloja el Sitio, gestiona el dominio y la seguridad
                  y reenvía el correo {mail}. Puede registrar datos técnicos como la dirección IP.
                </>,
                <>
                  <strong className="font-medium">Google:</strong> Gmail, donde recibo los mensajes, y Google Analytics,
                  solo si aceptas las cookies de analítica.
                </>,
                <>
                  <strong className="font-medium">WhatsApp (Meta):</strong> si decides escribirme por WhatsApp, la
                  conversación se rige además por sus propios términos.
                </>,
              ]}
            />
            <p>
              Algunos de estos proveedores tienen servidores fuera de Colombia, por ejemplo en Estados Unidos. Al aceptar
              esta política autorizas de manera expresa e inequívoca la transmisión y transferencia de tus datos a esos
              proveedores, solo para las finalidades de la sección 4. No comparto tus datos con nadie más, salvo que una
              autoridad competente me lo exija conforme a la ley.
            </p>
          </Section>

          <Section n={7} title="Tus derechos como titular">
            <p>De acuerdo con el artículo 8 de la Ley 1581 de 2012, puedes:</p>
            <List
              items={[
                'Conocer, actualizar y rectificar tus datos personales.',
                'Solicitar prueba de la autorización que me diste.',
                'Ser informado, si lo pides, del uso que le he dado a tus datos.',
                'Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.',
                'Revocar la autorización y/o solicitar la supresión de tus datos cuando no se respeten los principios, derechos y garantías legales.',
                'Acceder de forma gratuita a tus datos personales que hayan sido objeto de tratamiento.',
              ]}
            />
          </Section>

          <Section n={8} title="Cómo ejercer tus derechos">
            <p>
              Escribe a{' '}
              <a href={`mailto:${mail}`} className={link}>
                {mail}
              </a>{' '}
              con el asunto «Datos personales». Indica tu nombre completo, el medio por el que quieres recibir la
              respuesta, qué pides (consulta, actualización, rectificación, supresión o revocatoria de la autorización) y
              una descripción de los hechos. Para proteger tus datos, puedo pedirte información que coincida con la del
              mensaje que enviaste.
            </p>
            <List
              items={[
                <>
                  <strong className="font-medium">Consultas:</strong> las respondo en un máximo de 10 días hábiles desde
                  que las recibo. Si no puedo hacerlo en ese plazo, te aviso el motivo y la nueva fecha, que no superará
                  5 días hábiles adicionales.
                </>,
                <>
                  <strong className="font-medium">Reclamos</strong> (corrección, actualización, supresión, revocatoria o
                  presunto incumplimiento de la ley): los resuelvo en un máximo de 15 días hábiles. Si no puedo, te aviso
                  el motivo y la nueva fecha, que no superará 8 días hábiles adicionales. Si tu reclamo está incompleto,
                  te lo indicaré dentro de los 5 días siguientes; si pasan dos meses sin que lo completes, se entenderá
                  que desistes.
                </>,
              ]}
            />
            <p>
              La supresión de los datos o la revocatoria de la autorización no procede cuando exista un deber legal o
              contractual de conservarlos. Solo puedes presentar una queja ante la SIC (
              <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className={link}>
                sic.gov.co
              </a>
              ) después de haber agotado este trámite conmigo.
            </p>
          </Section>

          <Section n={9} title="Cuánto tiempo conservo tus datos">
            <p>
              Conservo los datos del formulario y de los mensajes mientras sean necesarios para atender tu solicitud y
              hasta 12 meses después del último contacto, salvo que se inicie una relación contractual o la ley exija
              conservarlos por más tiempo. Después los elimino o los anonimizo. Los datos de analítica se conservan por el
              periodo configurado en Google Analytics, que no supera los 14 meses.
            </p>
          </Section>

          <Section n={10} title="Cookies y almacenamiento del navegador">
            <p>
              El Sitio usa únicamente lo necesario para funcionar y, solo si lo aceptas, cookies de analítica de Google
              Analytics. No uso cookies de publicidad ni de remarketing. Puedes aceptar, rechazar o cambiar tu elección en
              cualquier momento y también borrar las cookies desde la configuración de tu navegador.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left text-small">
                <caption className="sr-only">Cookies y almacenamiento que usa el Sitio</caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th scope="col" className="py-2 pr-4 font-medium">
                      Nombre
                    </th>
                    <th scope="col" className="py-2 pr-4 font-medium">
                      Tipo
                    </th>
                    <th scope="col" className="py-2 pr-4 font-medium">
                      Finalidad
                    </th>
                    <th scope="col" className="py-2 pr-4 font-medium">
                      Duración
                    </th>
                    <th scope="col" className="py-2 font-medium">
                      Categoría
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map(([name, type, purpose, duration, category]) => (
                    <tr key={name} className="border-b border-raised align-top">
                      <th scope="row" className="py-3 pr-4 font-medium">
                        {name}
                      </th>
                      <td className="py-3 pr-4">{type}</td>
                      <td className="py-3 pr-4">{purpose}</td>
                      <td className="py-3 pr-4">{duration}</td>
                      <td className="py-3">{category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {GA_ID && (
              <p>
                <button type="button" onClick={openCookieSettings} className={link}>
                  Abrir la configuración de cookies
                </button>
              </p>
            )}
          </Section>

          <Section n={11} title="Seguridad">
            <p>
              El Sitio se sirve por HTTPS y uso proveedores reconocidos con medidas de seguridad. Aun así, ningún sistema
              es 100 % seguro. Si ocurre un incidente que afecte tus datos, te lo informaré y lo reportaré a la autoridad
              competente conforme a la ley.
            </p>
          </Section>

          <Section n={12} title="Menores de edad">
            <p>
              El Sitio no está dirigido a menores de 18 años y no recojo de forma consciente datos de menores. Si crees
              que un menor me ha enviado sus datos, escríbeme a{' '}
              <a href={`mailto:${mail}`} className={link}>
                {mail}
              </a>{' '}
              y los eliminaré.
            </p>
          </Section>

          <Section n={13} title="Enlaces a otros sitios">
            <p>
              El Sitio enlaza a servicios de terceros (GitHub, LinkedIn, WhatsApp y las demos de mis proyectos). No
              controlo sus políticas de privacidad ni su contenido; te recomiendo leerlas.
            </p>
          </Section>

          <Section n={14} title="Cambios en esta política">
            <p>
              Si actualizo esta política, publicaré la nueva versión en esta página con su fecha de actualización. Si el
              cambio altera las finalidades para las que usas tu autorización, te pediré una nueva.
            </p>
          </Section>

          <Section n={15} title="Contacto">
            <p>
              Para dudas sobre esta política o sobre tus datos:{' '}
              <a href={`mailto:${mail}`} className={link}>
                {mail}
              </a>
              .
            </p>
          </Section>
        </div>
      </main>

      <footer className="border-t-2 border-raised px-5 py-8 text-small md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {person.name}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {GA_ID && (
              <button type="button" onClick={openCookieSettings} className="py-1.5 font-medium hover:underline hover:underline-offset-4">
                Configuración de cookies
              </button>
            )}
            <a href="/" className="inline-block py-1.5 font-medium hover:underline hover:underline-offset-4">
              Volver al inicio
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
