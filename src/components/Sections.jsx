import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { profile, journey, projects, projectFilters, services, clients, contact } from '../data.js'
import { Reveal, MaskedTitle } from './Reveal.jsx'
import { Star, SparkleField, burstFromEvent } from './Sparkle.jsx'
import { BrandMark } from './Nav.jsx'
import Crown from './Crown.jsx'

const ease = [0.22, 1, 0.36, 1]

function useMedia(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatch(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return match
}

/* ---------------- Crossed sash ribbons ---------------- */
const ribbonWords = ['Design the future', 'Brand storytelling', 'Ghana’s Most Beautiful 2025', 'Western Region', 'Culture & tourism']

function Tape({ reverse, className }) {
  const items = [...ribbonWords, ...ribbonWords]
  return (
    <div className={`tape ${className}`} aria-hidden="true">
      <div className={`tape__track ${reverse ? 'tape__track--rev' : ''}`}>
        {items.map((w, i) => (
          <span key={i}>{w}<Star size={16} /></span>
        ))}
      </div>
    </div>
  )
}

export function Ribbons() {
  return (
    <div className="ribbons">
      <Tape className="tape--gold" />
      <Tape className="tape--peach" reverse />
    </div>
  )
}

/* ---------------- About ---------------- */
export function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const archY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const bigY = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])

  return (
    <section className="about" id="about" ref={ref}>
      <motion.span className="about__ghost" style={{ y: bigY }} aria-hidden="true">Queen</motion.span>
      <div className="wrap about__grid">
        <motion.div className="about__arch-wrap" style={{ y: archY }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.div
            className="about__arch"
            variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } } }}
          >
            <img src="/img/gmb-western-region.webp" alt="Owubah, Western Region representative for Ghana’s Most Beautiful 2025" width="1010" height="1200" loading="lazy" />
            <motion.div
              className="sash"
              variants={{
                hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
                show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, delay: 1.1, ease: [0.76, 0, 0.24, 1] } },
              }}
            >
              <span className="shimmer-dark">{profile.crownTitle}</span>
              <small>{profile.crownEvent}</small>
            </motion.div>
          </motion.div>
          <div className="about__arch-ring" aria-hidden="true" />
          <SparkleField count={10} className="about__sparkles" />
        </motion.div>

        <div className="about__copy">
          <Reveal as="p" className="kicker"><Star size={10} /> The Address</Reveal>
          <MaskedTitle className="display" lines={['A storyteller', 'with a crown.']} />
          <Reveal as="p" className="about__intro dropcap" delay={0.1}>{profile.intro}</Reveal>
          <div className="about__cols">
            {profile.about.map((p, i) => (
              <Reveal as="p" key={i} delay={0.15 + i * 0.1}>{p}</Reveal>
            ))}
          </div>
          <Reveal className="facts" delay={0.25}>
            <span className="fact fact--lime">BA Communications · GIJ</span>
            <span className="fact fact--sky">Mastercard Foundation certified</span>
            <span className="fact fact--lilac">GHOne TV · 3Music TV</span>
            <span className="fact fact--peach">GMB 2025 · Western Region</span>
          </Reveal>
          <Reveal as="p" className="script about__sign" delay={0.3}>Francisca</Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Runway (journey) ---------------- */
const tones = ['lilac', 'lime', 'sky', 'peach']

function RunwayCard({ j, i }) {
  return (
    <article className={`walk walk--${tones[i % tones.length]}`}>
      <span className="walk__no">{String(i + 1).padStart(2, '0')}</span>
      <span className="tag">{j.tag}</span>
      <h3>{j.title}</h3>
      <p>{j.text}</p>
      <Star size={22} className="walk__star" />
    </article>
  )
}

export function Journey() {
  const wide = useMedia('(min-width: 961px)')
  const section = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])

  useLayoutEffect(() => {
    if (!wide) return
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [wide])

  if (!wide) {
    return (
      <section className="runway runway--stack" id="journey">
        <div className="wrap">
          <Reveal as="p" className="kicker"><Star size={10} /> Her journey so far</Reveal>
          <MaskedTitle className="display" lines={['The Runway']} />
          <div className="runway__stack">
            {journey.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.05}><RunwayCard j={j} i={i} /></Reveal>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="runway" id="journey" ref={section} style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="runway__sticky">
        <motion.div className="runway__track" ref={track} style={{ x }}>
          <div className="runway__intro">
            <p className="kicker"><Star size={10} /> Her journey so far</p>
            <MaskedTitle className="display" lines={['The', 'Runway']} />
            <p className="script runway__script">walk with me →</p>
          </div>
          {journey.map((j, i) => <RunwayCard key={j.title} j={j} i={i} />)}
          <div className="runway__end">
            <Crown size={140} />
            <p className="script">and the crown.</p>
          </div>
        </motion.div>
        <div className="runway__floor" aria-hidden="true">
          <motion.span style={{ scaleX: line }} />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Collection (work) ---------------- */
function TiltCard({ p, onOpen, index }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })
  const glintX = useTransform(mx, [0, 1], ['0%', '100%'])
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }

  return (
    <motion.article
      layout
      className={`look look--${index % 6}`}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, delay: index * 0.07, ease }}
    >
      <button className="look__btn" onClick={() => onOpen(p)} aria-label={`View ${p.title}`}>
        <motion.div className={`look__media tint-${p.tint}`} style={{ rotateX: rx, rotateY: ry }} onPointerMove={onMove} onPointerLeave={reset}>
          <img src={p.img} alt={p.alt} width={p.w} height={p.h} loading="lazy" />
          <motion.span className="look__glint" style={{ left: glintX }} aria-hidden="true" />
          <span className="look__stars" aria-hidden="true"><Star size={14} /><Star size={10} /><Star size={18} /></span>
          <span className="look__view" aria-hidden="true">View</span>
        </motion.div>
        <div className="look__meta">
          <span className="look__no">Look {String(index + 1).padStart(2, '0')}</span>
          <h3>{p.title}</h3>
          <p>{p.tag} — {p.text}</p>
        </div>
      </button>
    </motion.article>
  )
}

export function Work() {
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)
  const list = projects.filter((p) => filter === 'all' || p.cats.includes(filter))

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <section className="collection" id="work">
      <div className="wrap">
        <div className="collection__head">
          <div>
            <Reveal as="p" className="kicker"><Star size={10} /> Selected work</Reveal>
            <MaskedTitle className="display" lines={['The', 'Collection']} />
          </div>
          <Reveal className="filters" role="group" aria-label="Filter projects">
            {projectFilters.map((f) => (
              <button key={f.id} className={`chip ${filter === f.id ? 'is-active' : ''}`} onClick={() => setFilter(f.id)} aria-pressed={filter === f.id}>
                {f.label}
              </button>
            ))}
          </Reveal>
        </div>
        <motion.div layout className="collection__grid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <TiltCard key={p.title} p={p} index={i} onOpen={setOpen} />)}
          </AnimatePresence>
        </motion.div>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={open.title}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
              <motion.figure className="lightbox__fig"
                initial={{ scale: 0.9, y: 30, rotate: -2 }} animate={{ scale: 1, y: 0, rotate: 0 }} exit={{ scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 240, damping: 24 }} onClick={(e) => e.stopPropagation()}>
                <img src={open.img} alt={open.alt} />
                <figcaption>
                  <span className="tag">{open.tag}</span>
                  <h3>{open.title}</h3>
                  <p>{open.text}</p>
                </figcaption>
                <button className="lightbox__close" onClick={() => setOpen(null)} aria-label="Close" autoFocus>×</button>
              </motion.figure>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}

/* ---------------- Services ---------------- */
export function Services() {
  const [hover, setHover] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 26 })
  const sy = useSpring(y, { stiffness: 260, damping: 26 })
  const rot = useTransform(sx, (v) => Math.max(-10, Math.min(10, v / 80)))
  const list = useRef(null)

  const onMove = (e) => {
    const r = list.current.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section className="services" id="services">
      <SparkleField count={14} />
      <div className="wrap">
        <div className="services__head">
          <div>
            <Reveal as="p" className="kicker"><Star size={10} /> What I offer</Reveal>
            <MaskedTitle className="display" lines={['Services']} />
          </div>
          <Reveal as="p" className="script services__script">Let your brand’s vision become a reality.</Reveal>
        </div>
        <ul className="svc-list" ref={list} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          {services.map((s, i) => (
            <Reveal as="li" key={s.name} className={`svc svc--${s.tone}`} delay={i * 0.06} y={30} onPointerEnter={() => setHover(i)}>
              <span className="svc__no">{String(i + 1).padStart(2, '0')}</span>
              <span className="svc__name">{s.name}</span>
              <img className="svc__thumb" src={s.img} alt="" loading="lazy" />
              <Star size={20} className="svc__star" />
            </Reveal>
          ))}
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                className="svc-float"
                style={{ x: sx, y: sy, rotate: rot }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={hover}
                    src={services[hover].img}
                    alt=""
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                  />
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  )
}

/* ---------------- Clients ---------------- */
function ClientRow({ reverse }) {
  const row = [...clients, ...clients]
  return (
    <div className="marquee" aria-hidden="true">
      <div className={`marquee__track ${reverse ? 'marquee__track--rev' : ''}`}>
        {row.map((c, i) => (
          <span key={i} className={`cl cl--${c.style}`}>{c.name}<Star size={14} className="cl__star" /></span>
        ))}
      </div>
    </div>
  )
}

export function Clients() {
  return (
    <section className="clients" id="clients">
      <div className="wrap clients__head">
        <Reveal as="p" className="script clients__script">Applause from</Reveal>
        <MaskedTitle className="display" lines={['Clients']} />
      </div>
      <ul className="sr-only">{clients.map((c) => <li key={c.name}>{c.name}</li>)}</ul>
      <ClientRow />
      <ClientRow reverse />
    </section>
  )
}

/* ---------------- Contact / finale ---------------- */
export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async (e) => {
    burstFromEvent(e)
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable; the mailto link still works */ }
  }
  return (
    <section className="finale" id="contact">
      <div className="finale__spot" aria-hidden="true" />
      <div className="curtain curtain--l" aria-hidden="true" />
      <div className="curtain curtain--r" aria-hidden="true" />
      <SparkleField count={24} />
      <div className="wrap finale__inner">
        <Reveal className="finale__crown"><Crown size={120} /></Reveal>
        <Reveal as="p" className="kicker kicker--center"><Star size={10} /> The final walk</Reveal>
        <MaskedTitle className="display finale__title" lines={['Let’s get', 'started.']} />
        <Reveal className="finale__email" delay={0.15}>
          <a href={`mailto:${contact.email}`} className="shimmer" onClick={burstFromEvent}>{contact.email}</a>
          <button className="copy" onClick={copy} aria-live="polite">{copied ? 'Copied ✦' : 'Copy email'}</button>
        </Reveal>
        <Reveal className="finale__row" delay={0.25}>
          <a className="pill-link" href={contact.phoneHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></svg>
            {contact.phone}
          </a>
          <span className="pill-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.5" cy="6.5" r="1.1" /></svg>
            {contact.handle}<small>{contact.handleNetworks}</small>
          </span>
          <span className="pill-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" fill="#1a0f0c" /></svg>
            {contact.youtube}<small>YouTube</small>
          </span>
        </Reveal>
      </div>
      <footer className="footer">
        <div className="wrap footer__inner">
          <a href="#home" className="brand" aria-label="Back to top"><BrandMark /><span>Owubah</span></a>
          <span>© {new Date().getFullYear()} Francisca Nana Owubah</span>
          <a href="#home" className="footer__top">Back to top ↑</a>
        </div>
      </footer>
    </section>
  )
}
