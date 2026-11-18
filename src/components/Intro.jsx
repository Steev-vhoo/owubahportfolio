import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Crown from './Crown.jsx'

// Short "curtain call" overlay: crown draws in, name shimmers, curtain lifts.
export default function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="intro"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      onClick={onDone}
      role="presentation"
    >
      <Crown size={110} />
      <motion.p
        className="intro__name shimmer"
        initial={{ opacity: 0, y: 18, letterSpacing: '0.4em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.02em' }}
        transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Owubah
      </motion.p>
      <motion.p
        className="intro__sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        Design the future
      </motion.p>
    </motion.div>
  )
}
