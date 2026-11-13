import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Full-bleed photographic backdrop with slow parallax and a gold frame —
// the same cinematic treatment used for the finale, reusable anywhere.
export default function CinematicBg({
  src,
  position = 'center',
  strength = 0.55, // how dark the wash is (0 = bright photo, 1 = near solid)
  frame = true,
}) {
  const wrap = useRef(null)
  const img = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.fromTo(
        img.current,
        { scale: 1.18, yPercent: -4 },
        {
          scale: 1,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <img
        ref={img}
        src={src}
        alt=""
        className="h-full w-full object-cover will-change-transform"
        style={{ objectPosition: position }}
        loading="lazy"
      />
      {/* darkening wash so text always reads */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 45%, rgba(30,6,12,${0.35 * strength}) 0%, rgba(26,5,11,${0.85 * strength + 0.12}) 68%, rgba(20,3,8,${0.95 * strength + 0.05}) 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(59,10,22,${0.55 * strength + 0.25}) 0%, rgba(59,10,22,${0.35 * strength}) 45%, rgba(59,10,22,${0.6 * strength + 0.3}) 100%)`,
        }}
      />
      {frame && (
        <div className="pointer-events-none absolute inset-5 rounded-[1.4rem] border border-gold/25 md:inset-9" />
      )}
    </div>
  )
}
