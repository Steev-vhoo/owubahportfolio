import { useEffect, useRef } from 'react'

// Four-point star used everywhere a bit of glitter is wanted.
export function Star({ size = 16, className = '', style }) {
  return (
    <svg className={`star ${className}`} style={style} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
    </svg>
  )
}

// A fixed field of twinkling stars, positioned deterministically so SSR/hydration
// and re-renders stay stable.
export function SparkleField({ count = 14, className = '' }) {
  const stars = Array.from({ length: count }, (_, i) => {
    const r = (n) => ((Math.sin(i * 9301 + n * 49297) + 1) / 2)
    return {
      left: `${(r(1) * 100).toFixed(1)}%`,
      top: `${(r(2) * 100).toFixed(1)}%`,
      size: 8 + Math.round(r(3) * 16),
      delay: `${(r(4) * 4).toFixed(2)}s`,
      dur: `${(2.4 + r(5) * 2.6).toFixed(2)}s`,
    }
  })
  return (
    <div className={`sparkle-field ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <Star key={i} size={s.size} className="twinkle" style={{ left: s.left, top: s.top, animationDelay: s.delay, animationDuration: s.dur }} />
      ))}
    </div>
  )
}

// Rose/peach petals drifting down slowly behind the hero.
export function Petals({ count = 12 }) {
  const petals = Array.from({ length: count }, (_, i) => {
    const r = (n) => ((Math.sin(i * 7919 + n * 104729) + 1) / 2)
    return {
      left: `${(r(1) * 100).toFixed(1)}%`,
      size: 10 + Math.round(r(2) * 12),
      delay: `${(-r(3) * 18).toFixed(2)}s`,
      dur: `${(12 + r(4) * 10).toFixed(2)}s`,
      sway: `${(20 + r(5) * 60).toFixed(0)}px`,
      hue: i % 3,
    }
  })
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className={`petal petal--${p.hue}`}
          style={{ left: p.left, width: p.size, height: p.size * 1.3, animationDelay: p.delay, animationDuration: p.dur, '--sway': p.sway }}
        />
      ))}
    </div>
  )
}

// Glitter trail that follows a fine pointer (mouse). Disabled on touch and
// for people who prefer reduced motion.
export function CursorGlitter() {
  const layer = useRef(null)
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced || !layer.current) return
    let last = 0
    const onMove = (e) => {
      const now = performance.now()
      if (now - last < 45) return
      last = now
      const el = document.createElement('span')
      el.className = 'glitter'
      const size = 6 + Math.random() * 8
      el.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;--dx:${(Math.random() - 0.5) * 40}px;--dy:${20 + Math.random() * 30}px`
      layer.current.appendChild(el)
      setTimeout(() => el.remove(), 900)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return <div ref={layer} className="glitter-layer" aria-hidden="true" />
}
