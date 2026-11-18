import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { nav, contact } from '../data.js'
import { Star, burstFromEvent } from './Sparkle.jsx'

export function BrandMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M2 4h14L8 14h10L2 30l6-12H2z" />
      <path d="M18 4h12l-8 10h6L14 30l6-12h-2z" />
    </svg>
  )
}

// Floating pill nav, centred at the top, with a gold progress thread.
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 400 && y > lastY + 4)
      if (y < lastY - 4 || y < 400) setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = [...nav, { id: 'contact' }].map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.header
        className="nav"
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav__pill">
          <a href="#home" className="brand" aria-label="Owubah, back to top">
            <BrandMark />
            <span>Owubah</span>
          </a>
          <nav className="nav__menu" aria-label="Primary">
            {nav.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''}>
                {active === n.id && <motion.span layoutId="nav-pill" className="nav__hl" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <sup>{String(i + 1).padStart(2, '0')}</sup>
                <span>{n.label}</span>
              </a>
            ))}
          </nav>
          <a href="#contact" className="nav__cta" onClick={burstFromEvent}>
            <Star size={12} /> Work with me
          </a>
          <button
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
          <motion.span className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ clipPath: 'circle(0% at 50% 0%)' }}
            animate={{ clipPath: 'circle(150% at 50% 0%)' }}
            exit={{ clipPath: 'circle(0% at 50% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="script mobile-menu__script">the show</p>
            {[...nav, { id: 'contact', label: 'Contact' }].map((n, i) => (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 40, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 0, transition: { delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.7 } }}
              >
                <sup>{String(i + 1).padStart(2, '0')}</sup>{n.label}
              </motion.a>
            ))}
            <p className="mobile-menu__foot">{contact.handle}</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
