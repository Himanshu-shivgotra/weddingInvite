import { useEffect, useRef } from 'react'

// Sceneai "Stories in Light" style: drifting golden embers + soft light rays
// on additive blend. Pure canvas, no deps. Sits over a darkened photo.
export default function StoriesInLight({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w, h, raf
    const rnd = (a, b) => a + Math.random() * (b - a)

    const resize = () => {
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const COUNT = w < 700 ? 46 : 80
    const embers = Array.from({ length: COUNT }).map(() => ({
      x: rnd(0, w), y: rnd(0, h),
      r: rnd(0.8, 3.2), sp: rnd(0.15, 0.7), sway: rnd(0, Math.PI * 2), swaySp: rnd(0.4, 1.2),
      base: rnd(0.25, 0.85), pulse: rnd(0.6, 1.6), phase: rnd(0, Math.PI * 2),
    }))
    // a few soft light rays
    const rays = Array.from({ length: 4 }).map((_, i) => ({
      x: rnd(0.15, 0.85), width: rnd(0.06, 0.14), o: rnd(0.04, 0.1), drift: rnd(-0.02, 0.02), t: rnd(0, 10),
    }))

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)

      // light rays (soft vertical gradients)
      ctx.globalCompositeOperation = 'screen'
      rays.forEach((r) => {
        const cx = (r.x + Math.sin(t * 0.0002 + r.t) * 0.04) * w
        const g = ctx.createLinearGradient(cx, 0, cx, h)
        g.addColorStop(0, `rgba(255,225,150,${r.o})`)
        g.addColorStop(0.5, `rgba(230,200,120,${r.o * 0.5})`)
        g.addColorStop(1, 'rgba(230,200,120,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.moveTo(cx - r.width * w * 0.5, 0)
        ctx.lineTo(cx + r.width * w * 0.5, 0)
        ctx.lineTo(cx + r.width * w * 1.4, h)
        ctx.lineTo(cx - r.width * w * 1.4, h)
        ctx.closePath()
        ctx.fill()
      })

      // embers
      embers.forEach((e) => {
        e.y -= e.sp
        e.sway += 0.01 * e.swaySp
        if (e.y < -6) { e.y = h + 6; e.x = rnd(0, w) }
        const x = e.x + Math.sin(e.sway) * 14
        const a = e.base * (0.55 + 0.45 * Math.sin(t * 0.002 * e.pulse + e.phase))
        const grd = ctx.createRadialGradient(x, e.y, 0, x, e.y, e.r * 6)
        grd.addColorStop(0, `rgba(255,240,200,${a})`)
        grd.addColorStop(0.4, `rgba(230,200,120,${a * 0.5})`)
        grd.addColorStop(1, 'rgba(201,162,75,0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(x, e.y, e.r * 6, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalCompositeOperation = 'source-over'

      raf = requestAnimationFrame(draw)
    }

    if (reduce) {
      draw(0)
    } else {
      raf = requestAnimationFrame(draw)
    }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />
}
