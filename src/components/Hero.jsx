import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GoldParticles from './GoldParticles'
import { Divider } from './Ornament'
import { couple } from '../lib/data'
import { useDatesRevealed } from '../lib/dateReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ started }) {
  const datesOn = useDatesRevealed()
  const root = useRef(null)
  const content = useRef(null)
  const bg = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.to(content.current, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(bg.current, {
        scale: 1.14,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={root}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden"
    >
      <div ref={bg} className="absolute inset-0 z-0 will-change-transform">
        <img
          src="/images/hero.jpg"
          alt="Princy and Sahil"
          className="h-full w-full object-cover object-[center_34%] md:object-[center_42%]"
          fetchpriority="high"
        />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_50%_38%,transparent_28%,rgba(28,5,11,0.45)_72%,rgba(20,3,8,0.9)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-deepmaroon/60 via-deepmaroon/10 to-deepmaroon" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-deepmaroon via-deepmaroon/75 to-transparent" />
      </div>

      <GoldParticles />

      <div className="pointer-events-none absolute inset-4 z-20 rounded-[1.5rem] border border-gold/30 md:inset-8" />

      <div
        ref={content}
        className="relative z-10 flex h-full w-full flex-col items-center justify-end px-6 pb-[12vh] text-center md:pb-[10vh]"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="eyebrow !text-[0.52rem] !tracking-[0.28em] md:!text-[0.68rem] md:!tracking-[0.42em]"
        >
          Together with their families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-3 w-full max-w-full px-2 font-script leading-[1.12] drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)]"
          style={{ fontSize: 'clamp(1.9rem, 6.4vw, 5.2rem)' }}
        >
          <span className="gold-text animate-shimmer">{couple.bride.name}</span>
          <span className="mx-3 font-display italic text-lightgold">&amp;</span>
          <span className="gold-text animate-shimmer">
            {couple.groom.name.split(' ')[0]}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          <Divider className="my-5" />
          {datesOn && (
            <p className="font-display text-lg tracking-[0.32em] text-cream md:text-2xl">
              4 <span className="text-gold">·</span> 12{' '}
              <span className="text-gold">·</span> 2026
            </p>
          )}
          <p className="mt-2 font-title text-[0.62rem] uppercase tracking-[0.34em] text-cream/80 md:text-xs">
            Jammu <span className="text-gold">&#10022;</span> Punjab
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2"
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-gold/50 p-1">
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1.5 rounded-full bg-lightgold"
          />
        </div>
      </motion.div>
    </section>
  )
}
