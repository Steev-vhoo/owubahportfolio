import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Intro from './components/Intro.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import { Ribbons, About, Journey, Work, Services, Clients, Contact } from './components/Sections.jsx'
import { CursorGlitter } from './components/Sparkle.jsx'

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [intro, setIntro] = useState(!reduced)
  const done = useCallback(() => setIntro(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Skip to content</a>
      <AnimatePresence>{intro && <Intro key="intro" onDone={done} />}</AnimatePresence>
      <CursorGlitter />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero ready={!intro} />
        <Ribbons />
        <About />
        <Journey />
        <Work />
        <Services />
        <Clients />
        <Contact />
      </main>
    </MotionConfig>
  )
}
