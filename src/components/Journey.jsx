import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Divider } from './Ornament'
import StoriesInLight from './StoriesInLight'

gsap.registerPlugin(ScrollTrigger)

function Portrait({ src, focus, label, rot, depth, className }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(el, { rotateY: px * 12, rotateX: -py * 12, duration: 0.5, ease: 'power2.out', transformPerspective: 900 })
  }
  const onLeave = () => gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' })
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: rot * 2, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      data-depth={depth}
      className={`parallax-photo ${className}`}
      style={{ perspective: 1000 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative overflow-hidden rounded-t-[9rem] rounded-b-[1.3rem] border border-gold/45 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.9)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img src={src} alt={label} className="aspect-[3/4.2] w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" style={{ objectPosition: focus }} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-deepmaroon/80 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-2 rounded-t-[8.4rem] rounded-b-[1rem] ring-1 ring-inset ring-gold/25" />
        <p className="absolute inset-x-0 bottom-0 p-4 text-center font-title text-[0.55rem] uppercase tracking-[0.3em] text-lightgold/90">
          {label}
        </p>
      </div>
    </motion.div>
  )
}

export default function Journey() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.utils.toArray('.parallax-photo').forEach((el) => {
        const d = parseFloat(el.dataset.depth || '1')
        gsap.to(el, { yPercent: -10 * d, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="story" ref={root} className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_50%_35%,rgba(201,162,75,0.14),transparent_62%)]" />
      <StoriesInLight className="absolute inset-0 z-[1] h-full w-full opacity-70" />

      <div className="container-wide relative z-10">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_1.15fr_1fr] md:gap-6">
          {/* left portrait */}
          <Portrait src="/images/doors.jpg" focus="center 26%" label="where two worlds met" rot={-2.5} depth={1.3} className="mx-auto w-[72%] md:w-full md:mt-10" />

          {/* center text column */}
          <div className="order-first text-center md:order-none">
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow">
              Written in the stars
            </motion.p>
            <motion.h2
              initial="hide" whileInView="show" viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              className="mt-2 flex justify-center overflow-hidden px-4 pb-3 pt-1 font-script leading-[1.1]"
              style={{ fontSize: 'clamp(3.2rem, 9vw, 6.5rem)' }}
            >
              {'Together'.split('').map((l, i) => (
                <motion.span key={i} variants={{ hide: { y: '115%', opacity: 0, rotate: 8 }, show: { y: '0%', opacity: 1, rotate: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="inline-block text-[#f3d98f] [text-shadow:0_2px_18px_rgba(0,0,0,0.55),0_0_28px_rgba(230,200,120,0.25)]">{l}</motion.span>
              ))}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-1 font-quote text-xl italic text-cream md:text-2xl">
              two hearts, one journey
            </motion.p>
            <Divider className="mx-auto my-6" />
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }} className="mx-auto max-w-xs font-body text-sm leading-relaxed text-cream/85">
              From a first hello to a lifetime promise — two families, two cities, one beautiful beginning.
            </motion.p>
          </div>

          {/* right portrait */}
          <Portrait src="/images/welcomearch.jpg" focus="center 20%" label="and forever after" rot={2.5} depth={0.8} className="mx-auto w-[72%] md:w-full md:mb-10" />
        </div>
      </div>
    </section>
  )
}
