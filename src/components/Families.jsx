import { motion } from 'framer-motion'
import { Divider, Sparkle } from './Ornament'
import { couple } from '../lib/data'
import CinematicBg from './CinematicBg'

function Card({ role, name, parents, city, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      className="glass grain relative flex flex-col items-center overflow-hidden rounded-3xl px-8 py-12 text-center"
    >
      <Sparkle className="mb-5 h-6 w-6 text-gold/70" />
      <p className="eyebrow">{role}</p>
      <h3 className="mt-3 font-script text-5xl text-lightgold md:text-6xl">
        {name}
      </h3>
      <p className="mt-1 font-body text-[0.7rem] uppercase tracking-[0.3em] text-gold/80">
        {city}
      </p>
      <span className="gold-line my-6 w-24" />
      <p className="max-w-xs font-display text-lg italic leading-relaxed text-cream/80">
        {parents}
      </p>
    </motion.div>
  )
}

export default function Families() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <CinematicBg src="/images/welcome.jpg" position="center 30%" strength={0.72} />
      <div className="container-wide relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl text-cream md:text-5xl"
        >
          Two hearts, <span className="gold-text">two families</span>
        </motion.h2>
        <Divider className="my-8" />

        <div className="mx-auto grid max-w-5xl items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <Card
            role="The Bride"
            name={couple.bride.name}
            parents={couple.bride.parents}
            city={couple.bride.city}
            delay={0}
          />
          <div className="flex items-center justify-center py-2">
            <span className="font-script text-6xl text-gold md:text-7xl">&amp;</span>
          </div>
          <Card
            role="The Groom"
            name={couple.groom.name}
            parents={couple.groom.parents}
            city={couple.groom.city}
            delay={0.15}
          />
        </div>
      </div>
    </section>
  )
}
