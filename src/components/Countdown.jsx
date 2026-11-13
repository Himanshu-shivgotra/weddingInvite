import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Divider } from './Ornament'
import { weddingDate } from '../lib/data'

function diff() {
  const now = new Date()
  let ms = weddingDate - now
  if (ms < 0) ms = 0
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  }
}

function Units() {
  const [t, setT] = useState(diff())
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Days', value: t.days },
    { label: 'Hours', value: t.hours },
    { label: 'Minutes', value: t.minutes },
    { label: 'Seconds', value: t.seconds },
  ]

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {units.map((u, i) => (
        <motion.div
          key={u.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.55 }}
          className="glass grain relative overflow-hidden rounded-2xl px-3 py-6 text-center md:py-8"
        >
          <div className="font-display text-4xl font-semibold tabular-nums text-lightgold md:text-6xl">
            {String(u.value).padStart(2, '0')}
          </div>
          <div className="mt-1.5 font-body text-[0.6rem] uppercase tracking-[0.3em] text-cream/70 md:text-[0.68rem]">
            {u.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Countdown({ embedded = false }) {
  if (embedded) {
    return (
      <div className="pt-10 text-center">
        <p className="font-display text-2xl italic text-lightgold md:text-3xl">
          Friday, 4 December 2026
        </p>
        <Divider className="my-6" />
        <Units />

      </div>
    )
  }

  return (
    <section id="countdown" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_0%,rgba(201,162,75,0.14),transparent_55%)]" />
      <div className="container-wide relative text-center">
        <p className="eyebrow">Counting every moment</p>
        <h2 className="mt-3 font-display text-4xl text-cream md:text-6xl">
          Until two souls <span className="gold-text">become one</span>
        </h2>
        <Divider className="my-8" />
        <Units />
        <p className="mt-10 font-display text-xl italic text-cream/80 md:text-2xl">
          Friday, 4 December 2026
        </p>
      </div>
    </section>
  )
}
