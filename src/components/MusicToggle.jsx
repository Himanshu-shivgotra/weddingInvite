import { motion } from 'framer-motion'

export default function MusicToggle({ on, onToggle }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      onClick={onToggle}
      aria-label={on ? 'Pause music' : 'Play music'}
      className="glass fixed bottom-5 right-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full text-lightgold transition-colors hover:bg-gold/20"
    >
      {on ? (
        <span className="flex items-end gap-[3px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[2.5px] rounded-full bg-lightgold"
              animate={{ height: [6, 15, 8, 13, 6] }}
              transition={{
                repeat: Infinity,
                duration: 1.1 + i * 0.25,
                ease: 'easeInOut',
              }}
            />
          ))}
        </span>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
          <path
            d="M16 9l5 6M21 9l-5 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </motion.button>
  )
}
