import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './sections/Hero'
import Marquee from './components/Marquee'
import Effects from './components/Effects'

const About = lazy(() => import('./sections/About'))
const Projects = lazy(() => import('./sections/Projects'))
const Services = lazy(() => import('./sections/Services'))
const Process = lazy(() => import('./sections/Process'))
const Contact = lazy(() => import('./sections/Contact'))
const Footer = lazy(() => import('./sections/Footer'))

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-[200%] bg-ink px-4 py-3 font-medium text-bg focus-visible:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <Suspense fallback={null}>
          <About />
        </Suspense>
        <Suspense fallback={null}>
          <Projects />
        </Suspense>
        <Suspense fallback={null}>
          <Services />
        </Suspense>
        <Suspense fallback={null}>
          <Process />
        </Suspense>
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Effects />
    </>
  )
}
