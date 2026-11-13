import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Divider } from './Ornament'
import { couple } from '../lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Blessing() {
  const root = useRef(null)
  const img = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.fromTo(
        img.current,
        { scale: 1.12, y: 30 },
        {
          scale: 1,
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_30%,rgba(201,162,75,0.16),transparent_60%)]" />

      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mb-10 w-full max-w-md overflow-hidden rounded-t-[14rem] rounded-b-[2rem] border border-gold/40 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
          >
            <video
              ref={img}
              src="/video/ganesha.mp4"
              className="aspect-[3/4] h-full w-full object-cover will-change-transform"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Shree Ganeshay Namah"
            />
            <div className="pointer-events-none absolute inset-0 rounded-t-[14rem] rounded-b-[2rem] ring-1 ring-inset ring-gold/30" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif2 text-lg leading-relaxed tracking-wide text-lightgold md:text-2xl"
          >
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
            <br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
            <br />
            <span className="mt-2 inline-block text-sm text-gold/90 md:text-base">— श्री गणेशाय नमः —</span>
          </motion.p>

          <Divider className="my-8" />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow"
          >
            With the blessings of our elders
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mx-auto mt-9 grid max-w-4xl items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-8"
          >
            <ParentBlock
              label="वधू परिचय · The Bride"
              names={couple.bride.parents.replace('D/o ', '')}
            />
            <div className="flex items-center justify-center">
              <span className="font-script text-5xl leading-none text-gold md:text-6xl">
                &amp;
              </span>
            </div>
            <ParentBlock
              label="वर परिचय · The Groom"
              names={couple.groom.parents.replace('S/o ', '')}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-10 max-w-xl font-quote text-2xl italic leading-relaxed text-cream md:text-3xl"
          >
            request the honour of your presence
            <br />
            as they joyfully give in marriage
          </motion.p>
        </div>
      </div>
    </section>
  )
}

function ParentBlock({ label, names }) {
  return (
    <div className="text-center">
      <p className="font-title text-[0.6rem] uppercase tracking-[0.3em] text-gold/75">
        {label}
      </p>
      <span className="gold-line mx-auto my-3 block w-16" />
      <p className="text-balance font-serif2 text-base leading-relaxed tracking-wide text-cream/90 md:text-lg">
        {names}
      </p>
    </div>
  )
}
