import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Fade + rise when scrolled into view.
export function Reveal({ as = 'div', delay = 0, y = 36, className, children, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </M>
  )
}

// Headline whose lines glide up from behind a mask, like a curtain reveal.
export function MaskedTitle({ lines, as = 'h2', className = '', delay = 0, animateOnMount = false }) {
  const M = motion[as]
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <M className={className} initial="hidden" {...trigger} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span className="mask" key={i} aria-hidden="true">
          <motion.span
            className="mask__inner"
            variants={{
              hidden: { y: '110%', rotate: 3 },
              show: { y: '0%', rotate: 0, transition: { duration: 1, delay: delay + i * 0.12, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </M>
  )
}
