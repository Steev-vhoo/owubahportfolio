import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data.js'
import { SparkleField, Petals, Star, burstFromEvent } from './Sparkle.jsx'
import Crown from './Crown.jsx'

const ease = [0.22, 1, 0.36, 1]
const letters = 'OWUBAH'.split('')

// Magazine-cover hero: giant masthead behind the cut-out portrait,
// script overlay, cover lines and a spinning pageant badge.
export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mastY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const fadeMV = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 961px)').matches)
  useEffect(() => {
    const m = window.matchMedia('(min-width: 961px)')
    const on = () => setWide(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  const fade = wide ? fadeMV : 1

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero__spot" aria-hidden="true" />
      <div className="hero__spot hero__spot--2" aria-hidden="true" />
      {ready && <Petals count={16} />}
      {ready && <SparkleField count={22} />}

      {ready && (
        <>
          <motion.div className="hero__meta" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
            <span>Issue Nº 25</span>
            <span className="hero__meta-mid"><Star size={10} /> The Creative Portfolio <Star size={10} /></span>
            <span>Western Region · Ghana</span>
          </motion.div>

          <motion.h1 className="masthead" style={{ y: mastY }} aria-label="Owubah — Creative Portfolio">
            {letters.map((l, i) => (
              <span className="masthead__mask" key={i} aria-hidden="true">
                <motion.span
                  className="masthead__l"
                  initial={{ y: '110%', rotate: 8 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 1.1, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div className="hero__stage" style={{ y: imgY, scale: imgScale }}>
            <div className="halo" aria-hidden="true" />
            <div className="hero__crown"><Crown size={104} delay={1.1} /></div>
            <motion.img
              className="hero__img"
              src="/img/hero-portrait.webp"
              alt="Portrait of Francisca Nana Owubah wearing a patterned head wrap"
              width="857"
              height="1200"
              fetchPriority="high"
              initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.35, duration: 1.4, ease }}
            />
          </motion.div>

          <motion.p
            className="script hero__script shimmer"
            initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ delay: 1.0, duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            aria-hidden="true"
          >
            Creative Portfolio
          </motion.p>

          <motion.div className="cover-line cover-line--left" style={{ opacity: fade }}
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.9, ease }}>
            <span className="cover-line__kicker">Exclusive</span>
            <p className="cover-line__big">{profile.crownTitle}</p>
            <p className="cover-line__small">{profile.crownEvent}</p>
          </motion.div>

          <motion.div className="cover-line cover-line--right" style={{ opacity: fade }}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.55, duration: 0.9, ease }}>
            <span className="cover-line__kicker">Inside</span>
            <p className="cover-line__big"><em>{profile.fullName}</em></p>
            <p className="cover-line__small">{profile.title}</p>
            <div className="hero__actions">
              <a className="btn btn--gold" href="#work" onClick={burstFromEvent}>See the collection</a>
              <a className="btn btn--line" href="#contact">Let’s talk</a>
            </div>
          </motion.div>

          <motion.div
            className="badge"
            initial={{ opacity: 0, scale: 0.4, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ delay: 1.7, type: 'spring', stiffness: 180, damping: 12 }}
          >
            <span className="badge__ring" aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <defs><path id="circ" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
                <text><textPath href="#circ">GHANA’S MOST BEAUTIFUL · 2025 · WESTERN REGION ·</textPath></text>
              </svg>
            </span>
            <Star size={24} />
          </motion.div>

          <motion.a href="#about" className="scroll-cue" aria-label="Scroll to About" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            <span>Scroll</span>
            <i aria-hidden="true" />
          </motion.a>
        </>
      )}
    </section>
  )
}
