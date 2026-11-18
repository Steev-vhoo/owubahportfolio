import { motion } from 'framer-motion'

// Tiara outline that draws itself in, with jewels popping on afterwards.
export default function Crown({ size = 120, delay = 0, className = '' }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { delay, duration: 1.1, ease: [0.65, 0, 0.35, 1] } },
  }
  const jewel = (i) => ({
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { delay: delay + 0.9 + i * 0.08, type: 'spring', stiffness: 380, damping: 14 } },
  })
  const jewels = [
    [8, 14], [22, 9], [32, 4], [42, 9], [56, 14],
  ]
  return (
    <motion.svg
      className={`crown ${className}`}
      width={size}
      height={size * 0.62}
      viewBox="0 0 64 40"
      initial="hidden"
      animate="show"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f6dc8a" />
          <stop offset="0.5" stopColor="#d8ae5e" />
          <stop offset="1" stopColor="#b8862f" />
        </linearGradient>
      </defs>
      <motion.path
        d="M4 34 L8 14 L18 24 L22 9 L28 22 L32 4 L36 22 L42 9 L46 24 L56 14 L60 34 Z"
        fill="none"
        stroke="url(#gold)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        variants={draw}
      />
      <motion.path d="M4 34 H60" stroke="url(#gold)" strokeWidth="3" strokeLinecap="round" variants={draw} />
      {jewels.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={i === 2 ? 3 : 2.2} fill="url(#gold)" variants={jewel(i)} style={{ originX: `${x}px`, originY: `${y}px` }} />
      ))}
      <motion.circle cx="32" cy="29" r="2.4" fill="#ff9764" variants={jewel(5)} />
    </motion.svg>
  )
}
