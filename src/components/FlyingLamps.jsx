import { motion } from 'framer-motion'

// Gentle sky lamps drifting up across the whole site, here and there.
const LAMPS = [
  { l: '6%', delay: 0, dur: 20, s: 0.8, o: 0.5 },
  { l: '22%', delay: 6, dur: 26, s: 1, o: 0.55 },
  { l: '40%', delay: 12, dur: 23, s: 0.7, o: 0.45 },
  { l: '58%', delay: 3, dur: 28, s: 0.9, o: 0.5 },
  { l: '75%', delay: 9, dur: 22, s: 1.05, o: 0.55 },
  { l: '90%', delay: 15, dur: 25, s: 0.75, o: 0.45 },
]

export default function FlyingLamps() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[8] overflow-hidden" aria-hidden="true">
      {LAMPS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-12%]"
          style={{ left: b.l, opacity: b.o }}
          initial={{ y: 0 }}
          animate={{ y: '-118vh', x: [0, i % 2 ? 40 : -40, 0] }}
          transition={{
            y: { duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: b.dur / 2, delay: b.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <motion.div
            animate={{ rotate: [0, i % 2 ? 4 : -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transform: `scale(${b.s})` }}
          >
            <svg width="34" height="48" viewBox="0 0 44 64">
              <ellipse cx="22" cy="30" rx="26" ry="30" fill="#ffb84a" opacity="0.12" />
              <path d="M10 16 Q22 4 34 16 L36 40 Q22 52 8 40 Z" fill="#ffb84a" opacity="0.5" stroke="#C9A24B" strokeWidth="1" />
              <rect x="15" y="12" width="14" height="4" rx="2" fill="#8a6a2a" />
              <circle cx="22" cy="30" r="5" fill="#fff6d8" opacity="0.85" />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
