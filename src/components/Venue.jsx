import { motion } from 'framer-motion'
import { Divider } from './Ornament'
import { venue } from '../lib/data'
import CinematicBg from './CinematicBg'

export default function Venue() {
  return (
    <section id="venue" className="relative overflow-hidden py-28 md:py-40">
      <CinematicBg src="/images/doli.jpg" position="center 25%" strength={0.78} />
      <div className="container-wide relative z-10">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            Where the magic happens
          </motion.p>
          <h2 className="mt-3 font-display text-4xl text-cream md:text-5xl">
            The <span className="gold-text">Venue</span>
          </h2>
          <Divider className="my-8" />
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass grain relative overflow-hidden rounded-3xl p-9 md:p-12"
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold/80">
              Barat &middot; Doli
            </p>
            <h3 className="mt-4 font-display text-3xl text-cream md:text-4xl">
              {venue.name}
            </h3>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-cream/80">
              {venue.address}
            </p>
            <span className="gold-line my-7 block w-32" />
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
            >
              Get Directions
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          <motion.a
            href={venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative block h-[340px] overflow-hidden rounded-3xl border border-gold/25 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] md:h-[420px]"
          >
            {/* Stylised map backdrop */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 420"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <rect width="400" height="420" fill="#2A0E0E" />
              <g stroke="#5A1220" strokeWidth="14" fill="none" opacity="0.9">
                <path d="M-20 120 L 180 90 L 420 160" />
                <path d="M-20 300 L 220 320 L 440 270" />
                <path d="M60 -20 L 90 200 L 60 440" />
                <path d="M280 -20 L 250 220 L 300 440" />
              </g>
              <g stroke="#C9A24B" strokeWidth="2" fill="none" opacity="0.35">
                <path d="M-20 120 L 180 90 L 420 160" />
                <path d="M-20 300 L 220 320 L 440 270" />
                <path d="M60 -20 L 90 200 L 60 440" />
                <path d="M280 -20 L 250 220 L 300 440" />
                <path d="M120 40 L 340 60" />
                <path d="M40 240 L 380 400" strokeDasharray="6 8" />
              </g>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-deepmaroon via-transparent to-deepmaroon/40" />

            {/* Pulsing pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/30" />
              <svg
                width="46"
                height="46"
                viewBox="0 0 24 24"
                className="relative text-lightgold drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              >
                <path
                  d="M12 2C7.6 2 4 5.6 4 10c0 5.4 8 12 8 12s8-6.6 8-12c0-4.4-3.6-8-8-8z"
                  fill="currentColor"
                />
                <circle cx="12" cy="10" r="3" fill="#3B0A16" />
              </svg>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-6">
              <div>
                <p className="font-display text-xl text-cream">{venue.name}</p>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-lightgold/80">
                  Domana, Jammu
                </p>
              </div>
              <span className="btn-gold !px-5 !py-2.5 !text-xs">
                Open Map
              </span>
            </div>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
