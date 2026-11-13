import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Divider } from './Ornament'
import { couple } from '../lib/data'
import { useDatesRevealed } from '../lib/dateReveal'

gsap.registerPlugin(ScrollTrigger)

// The closing moment — the whole portrait, never cropped.
export default function Finale() {
  const datesOn = useDatesRevealed()
  const root = useRef(null)
  const bg = useRef(null)
  const card = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      gsap.fromTo(
        card.current,
        { scale: 0.92, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 85%',
            end: 'center center',
            scrub: true,
          },
        }
      )
      gsap.to(bg.current, {
        scale: 1.16,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-[8vh]"
    >
      <div ref={bg} className="absolute inset-0 z-0 will-change-transform">
        <img
          src="/images/jaimala.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-110 object-cover blur-2xl"
        />
        <div className="absolute inset-0 bg-deepmaroon/80" />
      </div>

      <div className="pointer-events-none absolute inset-4 z-20 rounded-[1.5rem] border border-gold/30 md:inset-8" />

      <div
        ref={card}
        className="relative z-10 flex w-full flex-col items-center px-5"
      >
        <div className="relative">
          <img
            src="/images/jaimala.jpg"
            alt="Princy and Sahil"
            className="max-h-[58svh] w-auto max-w-full rounded-[1.5rem] border border-gold/40 object-contain shadow-[0_50px_140px_-40px_rgba(0,0,0,0.95)]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-gold/25" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow mt-8"
        >
          And so, forever begins
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mt-3 max-w-full px-4 text-center font-script leading-[1.1] text-cream drop-shadow-[0_6px_30px_rgba(0,0,0,0.8)]"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          <span className="gold-text animate-shimmer">{couple.bride.name}</span>
          <span className="mx-3 font-display italic text-lightgold">&amp;</span>
          <span className="gold-text animate-shimmer">
            {couple.groom.name.split(' ')[0]}
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-center"
        >
          <Divider className="my-5" />
          <p className="font-quote text-2xl italic text-cream/90 md:text-3xl">
            Two hearts &middot; One journey &middot; Forever
          </p>
          <p className="mt-3 font-title text-[0.65rem] uppercase tracking-[0.35em] text-lightgold/85">
            {datesOn ? '4 December 2026 · Jammu' : 'Jammu, India'}
          </p>
          <p className="mt-4 font-serif2 text-base tracking-wide text-gold/85 md:text-lg">
            सर्वे भवन्तु सुखिनः &middot; शुभं भवतु
          </p>
          <div className="mt-7 flex items-center justify-center gap-5">
            <a href={`https://instagram.com/${couple.bride.ig}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-title text-[0.6rem] uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-lightgold">
              <IgIcon /> @{couple.bride.ig}
            </a>
            <span className="text-gold/50">&middot;</span>
            <a href={`https://instagram.com/${couple.groom.ig}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-title text-[0.6rem] uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-lightgold">
              <IgIcon /> @{couple.groom.ig}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


function IgIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}
