import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLORS = ['#E6C878', '#C9A24B', '#F4E3A1', '#B23A48', '#E7A11A', '#E9B7B0', '#FFFFFF']
const DURATION = 3200 // whole-site celebration ~3s

// Full-screen celebration: confetti + rose petals + rising sky lanterns.
export default function Celebration({ show, onDone }) {
  const canvas = useRef(null)

  useEffect(() => {
    if (!show) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const done = setTimeout(() => onDone?.(), DURATION)
    if (reduce) return () => clearTimeout(done)

    const cv = canvas.current
    if (!cv) return () => clearTimeout(done)
    const ctx = cv.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = (cv.width = window.innerWidth * dpr)
    let H = (cv.height = window.innerHeight * dpr)
    cv.style.width = window.innerWidth + 'px'
    cv.style.height = window.innerHeight + 'px'
    ctx.scale(dpr, dpr)
    const w = window.innerWidth
    const h = window.innerHeight
    const rnd = (a, b) => a + Math.random() * (b - a)

    // burst from two lower corners + center
    const sources = [
      { x: w * 0.5, y: h * 0.62 },
      { x: w * 0.12, y: h * 0.8 },
      { x: w * 0.88, y: h * 0.8 },
    ]
    const N = w < 600 ? 160 : 320
    const parts = Array.from({ length: N }).map(() => {
      const s = sources[(Math.random() * sources.length) | 0]
      const ang = -Math.PI / 2 + rnd(-0.9, 0.9)
      const sp = rnd(8, 20)
      return {
        x: s.x + rnd(-30, 30), y: s.y,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
        w: rnd(5, 12), h: rnd(7, 16), rot: rnd(0, 6.28), vr: rnd(-0.25, 0.25),
        color: COLORS[(Math.random() * COLORS.length) | 0], petal: Math.random() > 0.5, life: 0,
      }
    })

    let raf, t0 = performance.now(), start = t0
    const tick = (now) => {
      const dt = Math.min(32, now - t0) / 16.67
      t0 = now
      ctx.clearRect(0, 0, w, h)
      const fadeAll = Math.max(0, 1 - (now - start - DURATION * 0.55) / (DURATION * 0.45))
      let alive = 0
      for (const p of parts) {
        p.life += dt
        p.vy += 0.32 * dt
        p.vx *= 0.99
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.rot += p.vr * dt
        if (p.y > h + 30) continue
        alive++
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = fadeAll
        ctx.fillStyle = p.color
        if (p.petal) { ctx.beginPath(); ctx.ellipse(0, 0, p.w * 0.6, p.h * 0.5, 0, 0, 6.28); ctx.fill() }
        else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      if (now - start < DURATION && (alive > 0 || now - start < 900)) raf = requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, w, h)
    }
    raf = requestAnimationFrame(tick)
    const onResize = () => { W = cv.width = window.innerWidth * dpr; H = cv.height = window.innerHeight * dpr }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(done); cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [show, onDone])

  const lamps = [
    { l: '8%', d: 0, s: 1 }, { l: '20%', d: 0.4, s: 0.8 }, { l: '32%', d: 0.15, s: 1.1 },
    { l: '46%', d: 0.6, s: 0.9 }, { l: '58%', d: 0.25, s: 1 }, { l: '70%', d: 0.5, s: 0.85 },
    { l: '82%', d: 0.1, s: 1.05 }, { l: '92%', d: 0.7, s: 0.75 },
  ]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[70]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 55%, rgba(255,224,150,0.55), rgba(230,180,90,0.15) 35%, transparent 65%)' }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.3, 1.6] }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
          <canvas ref={canvas} className="absolute inset-0" />
          {lamps.map((b, i) => (
            <motion.div
              key={i}
              className="absolute bottom-[-14%]"
              style={{ left: b.l }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: '-125vh', opacity: [0, 1, 1, 0.9, 0] }}
              transition={{ duration: 6.5 + b.d, delay: b.d, ease: 'easeOut' }}
            >
              <motion.div
                animate={{ x: [0, i % 2 ? 24 : -24, 0], rotate: [0, i % 2 ? 3 : -3, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: `scale(${b.s})` }}
              >
                <Lantern />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Lantern() {
  return (
    <svg width="44" height="64" viewBox="0 0 44 64" fill="none">
      <defs>
        <radialGradient id="lampGlow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="55%" stopColor="#ffb84a" />
          <stop offset="100%" stopColor="#e7791a" />
        </radialGradient>
      </defs>
      <ellipse cx="22" cy="30" rx="30" ry="34" fill="#ffb84a" opacity="0.16" />
      <path d="M10 16 Q22 4 34 16 L36 40 Q22 52 8 40 Z" fill="url(#lampGlow)" stroke="#C9A24B" strokeWidth="1.2" />
      <rect x="14" y="12" width="16" height="5" rx="2" fill="#8a6a2a" />
      <path d="M14 44 h16 M17 44 v6 M22 44 v7 M27 44 v6" stroke="#c9a24b" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="22" cy="30" r="5" fill="#fff6d8" opacity="0.9" />
    </svg>
  )
}
