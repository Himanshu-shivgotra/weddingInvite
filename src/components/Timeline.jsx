import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Divider } from './Ornament'
import { events } from '../lib/data'
import { useDatesRevealed } from '../lib/dateReveal'

gsap.registerPlugin(ScrollTrigger)

const STEP = 0.6
const DEG = 180 / Math.PI
const PER_CARD = 620 // scroll distance per ceremony — higher = slower

export default function Timeline() {
  const datesOn = useDatesRevealed()
  const section = useRef(null)
  const pinEl = useRef(null)
  const cardEls = useRef([])
  const progress = useRef(0)
  const target = useRef(0)
  const raf = useRef(0)
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const [metrics, setMetrics] = useState({ cardW: 250, cardH: 355 })
  const [active, setActive] = useState(0)

  // Size cards from viewport height so the whole section always fits one screen
  useEffect(() => {
    const onResize = () => {
      const h = window.innerHeight
      const w = window.innerWidth
      let cardH = Math.round(Math.min(430, Math.max(240, h * 0.44)))
      let cardW = Math.round(cardH / 1.42)
      const maxW = w * 0.62
      if (cardW > maxW) {
        cardW = Math.round(maxW)
        cardH = Math.round(cardW * 1.42)
      }
      setMetrics({ cardW, cardH })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Pointer parallax with inertia
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.tx = Math.max(-1, Math.min(1, (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)))
      mouse.current.ty = Math.max(-1, Math.min(1, (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)))
    }
    const onLeave = () => {
      mouse.current.tx = 0
      mouse.current.ty = 0
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Scroll drives the sequence — the WHOLE section is pinned so nothing drifts.
  useEffect(() => {
    const N = events.length
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const st = ScrollTrigger.create({
      trigger: section.current,
      start: 'top top',
      end: '+=' + N * PER_CARD,
      pin: pinEl.current,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        target.current = self.progress * (N - 1)
      },
    })
    return () => st.kill()
  }, [metrics])

  // Render loop
  useEffect(() => {
    const N = events.length
    const R = metrics.cardW * 1.75
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const tick = () => {
      progress.current += (target.current - progress.current) * 0.1
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06

      let nearest = 0
      let nearestAbs = Infinity

      for (let i = 0; i < N; i++) {
        const el = cardEls.current[i]
        if (!el) continue

        let off = i - progress.current
        while (off > N / 2) off -= N
        while (off < -N / 2) off += N

        const abs = Math.abs(off)
        if (abs < nearestAbs) {
          nearestAbs = abs
          nearest = i
        }

        if (abs > 3.2) {
          el.style.visibility = 'hidden'
          continue
        }
        el.style.visibility = 'visible'

        const a = off * STEP
        const x = Math.sin(a) * R
        const z = Math.cos(a) * R - R
        const rotY = -a * DEG * 0.82

        const t = Math.min(1, Math.max(0, (3.2 - abs) / 1.2))
        const opacity = t * t * (3 - 2 * t)

        const center = Math.max(0, 1 - abs)
        const tiltX = reduce ? 0 : -mouse.current.y * 9 * center
        const tiltY = reduce ? 0 : mouse.current.x * 11 * center

        // light focus: the centre card is lit, the rest fall back
        const lit = 0.42 + 0.58 * Math.max(0, 1 - abs * 0.85)
        el.style.filter = `brightness(${lit.toFixed(3)})`
        el.style.opacity = opacity.toFixed(3)
        el.style.zIndex = String(Math.round(1000 + z))
        el.style.transform = `translate3d(${x.toFixed(2)}px, 0px, ${z.toFixed(2)}px) rotateY(${(rotY + tiltY).toFixed(2)}deg) rotateX(${tiltX.toFixed(2)}deg)`
      }

      setActive((prev) => (prev === nearest ? prev : nearest))
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [metrics])

  const go = (dir) => {
    const y = window.scrollY + dir * PER_CARD
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 0.8 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const current = events[active] || events[0]

  return (
    <section id="events" ref={section} className="relative">
      <div
        ref={pinEl}
        className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_55%,rgba(201,162,75,0.16),transparent_58%)]" />

        {/* heading */}
        <div className="relative z-10 shrink-0 px-6 text-center">
          <p className="eyebrow">Nine days of celebration</p>
          <h2 className="mt-1.5 font-display text-3xl text-cream md:text-4xl">
            The <span className="gold-text">Celebrations</span>
          </h2>
          <Divider className="mx-auto mt-3 scale-75" />
        </div>

        {/* focused ceremony — zooms in above the lit card */}
        <div className="relative z-20 mt-3 flex h-[4.6rem] shrink-0 items-center justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, scale: 0.8, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-title text-[0.58rem] uppercase tracking-[0.4em] text-lightgold/90">
                {datesOn ? current.weekday : 'Scratch the card to see dates'}
              </p>
              <p className="gold-text animate-shimmer mt-0.5 font-display text-2xl font-semibold tracking-[0.12em] md:text-3xl">
                {datesOn ? current.dateLabel : 'Save the Date'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D cylinder */}
        <div
          className="relative z-10 w-full shrink-0"
          style={{ perspective: '1350px', height: metrics.cardH + 40 }}
        >
          {/* spotlight pool under the focused card */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: metrics.cardW * 2.1,
              height: metrics.cardH * 1.25,
              background:
                'radial-gradient(ellipse at center, rgba(230,200,120,0.20), transparent 68%)',
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: metrics.cardW,
              height: metrics.cardH,
              transformStyle: 'preserve-3d',
            }}
          >
            {events.map((ev, i) => (
              <div
                key={ev.key}
                ref={(el) => (cardEls.current[i] = el)}
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform, filter' }}
              >
                <Card ev={ev} index={i} datesOn={datesOn} />
              </div>
            ))}
          </div>
        </div>

        {/* caption + controls */}
        <div className="relative z-10 mt-4 shrink-0 px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-xl font-quote text-lg italic leading-relaxed text-cream md:text-xl"
            >
              {current.blurb}
            </motion.p>
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-center gap-4">
            <Arrow dir={-1} onClick={() => go(-1)} label="Previous ceremony" />
            <div className="flex items-center gap-1.5">
              {events.map((ev, i) => (
                <span
                  key={ev.key}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === active ? 20 : 6,
                    background: i === active ? '#E6C878' : 'rgba(201,162,75,0.32)',
                  }}
                />
              ))}
            </div>
            <Arrow dir={1} onClick={() => go(1)} label="Next ceremony" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Arrow({ dir, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/45 text-lightgold transition-colors hover:bg-gold/15"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d={dir === 1 ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

const SLABS = [-2.2, -1.1, 0, 1.1, 2.2]

function Card({ ev, index, datesOn }) {
  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {SLABS.map((z, li) => {
        const isFront = li === SLABS.length - 1
        if (!isFront) {
          return (
            <div
              key={li}
              className="absolute inset-0 rounded-t-[7rem] rounded-b-[1.1rem]"
              style={{
                transform: `translateZ(${z}px)`,
                background: li === 0 ? '#3B0A16' : '#7d5f26',
                border: '1px solid rgba(201,162,75,0.35)',
              }}
            />
          )
        }
        return (
          <div
            key={li}
            className="absolute inset-0 overflow-hidden rounded-t-[7rem] rounded-b-[1.1rem] border border-gold/50 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)]"
            style={{ transform: `translateZ(${z}px)`, backgroundColor: '#3B0A16' }}
          >
            <img
              src={ev.image}
              alt={ev.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deepmaroon via-deepmaroon/20 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: ev.accent }} />
            <div className="pointer-events-none absolute inset-2 rounded-t-[6.4rem] rounded-b-[0.8rem] ring-1 ring-inset ring-gold/30" />

            <span
              className="absolute left-1/2 top-4 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full font-display text-[0.65rem] font-semibold text-deepmaroon shadow"
              style={{ background: ev.accent }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {ev.isMain && (
              <span className="absolute right-2.5 top-3.5 rounded-full border border-gold/70 bg-deepmaroon/75 px-1.5 py-0.5 font-title text-[0.4rem] uppercase tracking-[0.18em] text-lightgold">
                Main
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 p-3 text-center">
              <h3 className="font-script text-2xl leading-none text-cream md:text-3xl">
                {ev.name}
              </h3>
              {datesOn && (
                <p className="mt-1.5 font-title text-[0.52rem] uppercase tracking-[0.2em] text-lightgold/90">
                  {ev.dateLabel}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
