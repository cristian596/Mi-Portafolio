import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import Root from './Root'

// prerenderToNodeStream espera a que se resuelvan todos los React.lazy/Suspense,
// así el HTML estático contiene todas las secciones para los buscadores.
export async function render(path = '/'): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <Root path={path} />
    </StrictMode>,
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}
