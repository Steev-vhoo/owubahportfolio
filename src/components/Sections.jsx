import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { profile, journey, projects, projectFilters, services, clients, contact } from '../data.js'
import { Reveal, MaskedTitle } from './Reveal.jsx'
import { Star, SparkleField } from './Sparkle.jsx'
import { BrandMark } from './Nav.jsx'

/* ---------------- About ---------------- */
export function About() {
  return (
    <section className="about section" id="about">
      <div className="wrap about__grid">
        <div className="about__head">
          <MaskedTitle className="display display--md" lines={['About', 'Francisca', 'Nana Owubah']} />
          {profile.about.map((p, i) => (
            <Reveal as="p" key={i} delay={0.15 + i * 0.1}>{p}</Reveal>
          ))}
        </div>
        <div className="about__side">
          <Reveal as="p" className="about__intro">{profile.intro}</Reveal>
          <motion.div
            className="about__photo"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <img src="/img/gmb-western-region.webp" alt="Owubah, Western Region representative for Ghana’s Most Beautiful 2025" width="1010" height="1200" loading="lazy" />
            <motion.div
              className="sash"
              variants={{
                hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
                show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] } },
              }}
            >
              <span className="shimmer-dark">{profile.crownTitle}</span>
              <small>{profile.crownEvent}</small>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Journey ---------------- */
export function Journey() {
  return (
    <section className="journey section" id="journey">
      <div className="wrap">
        <div className="section__head">
          <MaskedTitle className="display display--md" lines={['Journey']} />
          <Reveal as="p" className="eyebrow">Media · Marketing · Culture</Reveal>
        </div>
        <ol className="journey__list">
          <motion.span
            className="journey__line"
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
          />
          {journey.map((j, i) => (
            <Reveal as="li" className="journey__item" key={j.title} delay={i * 0.12}>
              <span className="journey__no"><Star size={14} />{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </div>
              <span className="tag">{j.tag}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------- Work ---------------- */
function TiltCard({ p, onOpen, index }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })
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
      className={`project tint-${p.tint} ${p.tall ? 'project--tall' : ''}`}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <button className="project__btn" onClick={() => onOpen(p)} aria-label={`View ${p.title}`}>
        <div className="project__media">
          <img src={p.img} alt={p.alt} width={p.w} height={p.h} loading="lazy" />
          <motion.span className="project__glint" style={{ left: glintX }} aria-hidden="true" />
          <span className="project__stars" aria-hidden="true">
            <Star size={14} /><Star size={10} /><Star size={18} />
          </span>
        </div>
        <div className="project__meta">
          <span className="tag">{p.tag}</span>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
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
    <section className="work section" id="work">
      <div className="wrap">
        <div className="section__head">
          <MaskedTitle className="display display--md" lines={['Projects']} />
          <Reveal className="filters" role="group" aria-label="Filter projects">
            {projectFilters.map((f) => (
              <button key={f.id} className={`chip ${filter === f.id ? 'is-active' : ''}`} onClick={() => setFilter(f.id)} aria-pressed={filter === f.id}>
                <span>{f.label}</span>
              </button>
            ))}
          </Reveal>
        </div>

        <motion.div layout className="work__grid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <TiltCard key={p.title} p={p} index={i} onOpen={setOpen} />)}
          </AnimatePresence>
        </motion.div>
      </div>

      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              className="lightbox__fig"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
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
  return (
    <section className="services section" id="services">
      <div className="wrap services__grid">
        <div>
          <MaskedTitle className="display display--md" lines={['Services']} />
          <Reveal as="p" className="eyebrow services__eyebrow">Let your brand’s vision<br />become a reality.</Reveal>
          <Reveal className="services__photo" delay={0.15}>
            <img src="/img/portrait-white.webp" alt="" width="800" height="1200" loading="lazy" />
            <SparkleField count={8} />
          </Reveal>
        </div>
        <ul className="services__list">
          {services.map((s, i) => (
            <Reveal as="li" key={s.name} className={`svc ${s.tone ? `svc--${s.tone}` : ''}`} delay={i * 0.07} y={20}>
              <span className="svc__name">{s.name}</span>
              <span className="svc__no">{String(i + 1).padStart(2, '0')}</span>
              <Star size={16} className="svc__star" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------- Clients ---------------- */
export function Clients() {
  const row = [...clients, ...clients]
  return (
    <section className="clients" id="clients">
      <div className="wrap clients__head">
        <MaskedTitle className="display display--md" lines={['Clients']} />
      </div>
      <div className="clients__band">
        <ul className="sr-only">
          {clients.map((c) => <li key={c.name}>{c.name}</li>)}
        </ul>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {row.map((c, i) => (
              <span key={i} className={`cl cl--${c.style}`}>
                {c.name}
                <Star size={12} className="cl__star" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable; the mailto link still works */ }
  }
  return (
    <section className="contact" id="contact">
      <div className="contact__band">
        <div className="wrap contact__bar">
          <a href="#home" className="brand" aria-label="Back to top"><BrandMark /><span>Owubah</span></a>
          <p className="eyebrow">Work with me</p>
        </div>
      </div>
      <div className="contact__card">
        <SparkleField count={10} />
        <div className="wrap contact__grid">
          <MaskedTitle className="display display--lg" lines={['Let’s', 'get started.']} />
          <ul className="contact__list">
            <Reveal as="li">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3z M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <button className="copy" onClick={copy} aria-live="polite">{copied ? 'Copied ✦' : 'Copy'}</button>
            </Reveal>
            <Reveal as="li" delay={0.08}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></svg>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </Reveal>
            <Reveal as="li" delay={0.16}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.5" cy="6.5" r="1.1" /></svg>
              <span>{contact.handle} <small>{contact.handleNetworks}</small></span>
            </Reveal>
            <Reveal as="li" delay={0.24}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" fill="#fff" /></svg>
              <span>{contact.youtube} <small>YouTube</small></span>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  )
}
