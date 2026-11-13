import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // expose for anchor scrolling
    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = null
    }
  }, [enabled])
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -10, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
