import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Divider } from './Ornament'
import ScratchCard from './ScratchCard'
import Countdown from './Countdown'
import { revealDates } from '../lib/dateReveal'

export default function SaveTheDate({ onReveal }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <section id="countdown" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-10">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_15%,rgba(201,162,75,0.15),transparent_58%)]" />

      <div className="container-wide relative">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            A little surprise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-2 font-display text-3xl text-cream md:text-5xl"
          >
            Save the <span className="gold-text">Date</span>
          </motion.h2>
          <Divider className="my-4" />
          <AnimatePresence mode="wait">
            {!revealed && (
              <motion.p
                key="hint"
                exit={{ opacity: 0, y: -8 }}
                className="mb-4 font-body text-xs text-cream/70 md:text-sm"
              >
                Scratch the golden foil with your finger to uncover the day.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-[min(20rem,42svh)]"
        >
          <ScratchCard onRevealed={() => { setRevealed(true); onReveal?.(); revealDates() }}>
            <img
              src="/images/savethedate.jpg"
              alt="Save the date — 4 December 2026"
              width={1360}
              height={1700}
              className="block aspect-[4/5] w-full object-cover"
            />
          </ScratchCard>
        </motion.div>

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3"
            >
              <Countdown embedded />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
