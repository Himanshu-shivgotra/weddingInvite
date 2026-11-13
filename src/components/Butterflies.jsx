import { motion } from 'framer-motion'

// Gold butterflies that drift upward — used while the celebration lights up.
const FLY = [
  { l: '6%', d: 0.0, s: 1, dur: 7 },
  { l: '14%', d: 0.28, s: 0.7, dur: 8.6 },
  { l: '22%', d: 0.56, s: 1.1, dur: 7.4 },
  { l: '31%', d: 0.1, s: 0.85, dur: 9.2 },
  { l: '39%', d: 0.73, s: 1, dur: 6.8 },
  { l: '47%', d: 0.39, s: 0.75, dur: 8.2 },
  { l: '55%', d: 0.21, s: 1.15, dur: 7.8 },
  { l: '63%', d: 0.84, s: 0.9, dur: 9 },
  { l: '71%', d: 0.49, s: 1, dur: 7.2 },
  { l: '79%', d: 0.07, s: 0.8, dur: 8.8 },
  { l: '87%', d: 0.66, s: 1.05, dur: 7.6 },
  { l: '94%', d: 0.35, s: 0.7, dur: 9.4 },
]

export default function Butterflies({ show }) {
  if (!show) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-[25] overflow-hidden" aria-hidden="true">
      {FLY.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-12%]"
          style={{ left: b.l }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: ['0%', '-130vh'],
            x: [0, i % 2 ? 60 : -60, i % 2 ? -30 : 30, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: b.dur * 0.72,
            delay: b.d,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0.3,
          }}
        >
          <motion.div
            animate={{ rotateY: [0, 70, 0] }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transform: `scale(${b.s})` }}
          >
            <Wing />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

function Wing() {
  return (
    <svg width="34" height="34" viewBox="0 0 100 100" className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
      <g fill="#e6c878" stroke="#8a6a2a" strokeWidth="1.1" opacity="0.95">
        <path d="M50 50 C30 20 5 25 12 45 C4 60 30 62 50 50Z" />
        <path d="M50 50 C70 20 95 25 88 45 C96 60 70 62 50 50Z" />
        <path d="M50 50 C34 60 18 72 28 84 C40 92 50 68 50 50Z" />
        <path d="M50 50 C66 60 82 72 72 84 C60 92 50 68 50 50Z" />
      </g>
      <rect x="48.5" y="38" width="3" height="30" rx="1.5" fill="#5A1220" />
      <circle cx="50" cy="37" r="3" fill="#5A1220" />
    </svg>
  )
}
