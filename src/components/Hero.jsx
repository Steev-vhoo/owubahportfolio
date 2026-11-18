import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data.js'
import { MaskedTitle } from './Reveal.jsx'
import { SparkleField, Petals, Star } from './Sparkle.jsx'
import Crown from './Crown.jsx'

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  if (!ready) return <section className="hero" id="home" ref={ref} />

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="wrap hero__top">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          {profile.tagline[0]}<br />{profile.tagline[1]}
        </motion.p>
      </div>
      <div className="wrap">
        <motion.div
          className="hero__card"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Petals />
          <SparkleField count={16} />

          <motion.div className="hero__text" style={{ y: textY }}>
            <motion.p
              className="hero__kicker"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Star size={12} /> {profile.fullName}
            </motion.p>
            <MaskedTitle as="h1" className="display" lines={['Creative', 'Portfolio']} delay={0.3} animateOnMount />
            <motion.p
              className="hero__lede"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {profile.title}
            </motion.p>
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8 }}
            >
              <a className="btn btn--dark" href="#work">See the work</a>
              <a className="btn btn--ghost" href="#contact">Let’s talk</a>
            </motion.div>
          </motion.div>

          <motion.div className="hero__visual" style={{ y: imgY }}>
            <div className="halo" aria-hidden="true" />
            <div className="hero__crown"><Crown size={92} delay={0.9} /></div>
            <motion.img
              className="hero__img"
              src="/img/hero-portrait.webp"
              alt="Portrait of Francisca Nana Owubah wearing a patterned head wrap"
              width="857"
              height="1200"
              fetchPriority="high"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="badge"
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ delay: 1.4, type: 'spring', stiffness: 200, damping: 12 }}
            >
              <span className="badge__ring" aria-hidden="true">
                <svg viewBox="0 0 100 100">
                  <defs><path id="circ" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
                  <text><textPath href="#circ">GHANA’S MOST BEAUTIFUL · 2025 · WESTERN REGION ·</textPath></text>
                </svg>
              </span>
              <Star size={22} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
