import { useState } from 'react'
import { motion } from 'framer-motion'
import { Divider } from './Ornament'
import { rsvpWhatsApp } from '../lib/data'
import CinematicBg from './CinematicBg'

export default function Blessings() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const send = (e) => {
    e.preventDefault()
    const text = `Blessings for Princy & Sahil — from ${name || 'a well-wisher'}:\n\n${
      message || 'Wishing you both a lifetime of love and happiness.'
    }`
    window.open(
      `https://wa.me/${rsvpWhatsApp.number}?text=${encodeURIComponent(text)}`,
      '_blank'
    )
  }

  return (
    <section id="blessings" className="relative overflow-hidden py-24 md:py-40">
      <CinematicBg src="/images/finallyus.jpg" position="center 20%" strength={0.8} />
      <div className="pointer-events-none absolute inset-0 z-[1] [background:radial-gradient(circle_at_50%_100%,rgba(201,162,75,0.16),transparent_60%)]" />

      <div className="container-wide relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            Your words mean everything
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-3 font-display text-4xl text-cream md:text-6xl"
          >
            Shower your <span className="gold-text">blessings</span>
          </motion.h2>

          <Divider className="my-8" />

          <p className="mb-10 font-body text-cream/75">
            Leave a message for the couple — a wish, a prayer, a memory. Every
            blessing will be read and treasured.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={send}
            className="glass grain rounded-3xl p-7 text-left md:p-10"
          >
            <label
              htmlFor="blessing-name"
              className="mb-2 block font-body text-xs uppercase tracking-[0.25em] text-gold/80"
            >
              Your Name
            </label>
            <input
              id="blessing-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="mb-6 w-full rounded-xl border border-gold/30 bg-deepmaroon/40 px-4 py-3 font-body text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-gold"
            />

            <label
              htmlFor="blessing-message"
              className="mb-2 block font-body text-xs uppercase tracking-[0.25em] text-gold/80"
            >
              Your Blessing
            </label>
            <textarea
              id="blessing-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="May your journey together be filled with love, laughter and endless joy…"
              className="mb-7 w-full resize-none rounded-xl border border-gold/30 bg-deepmaroon/40 px-4 py-3 font-body leading-relaxed text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-gold"
            />

            <button type="submit" className="btn-gold w-full">
              Send your blessing
            </button>
            <p className="mt-4 text-center font-body text-[0.7rem] text-cream/50">
              Opens WhatsApp with your message ready to send.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
