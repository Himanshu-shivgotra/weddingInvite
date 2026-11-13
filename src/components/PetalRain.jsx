import { useEffect, useRef } from 'react'

// Lightweight 2D canvas petal system — soft falling rose / marigold petals.
export default function PetalRain({ density = 26 }) {
  const ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let raf
    const count = window.innerWidth < 768 ? Math.round(density * 0.6) : density

    const colors = ['#B23A48', '#E7A11A', '#E9B7B0', '#C9A24B', '#8E2436']

    const rnd = (a, b) => a + Math.random() * (b - a)

    const petals = Array.from({ length: count }).map(() => ({
      x: rnd(0, w),
      y: rnd(-h, 0),
      r: rnd(6, 15),
      speed: rnd(0.5, 1.6),
      sway: rnd(0.4, 1.4),
      swayOffset: rnd(0, Math.PI * 2),
      rot: rnd(0, Math.PI * 2),
      rotSpeed: rnd(-0.02, 0.02),
      color: colors[(Math.random() * colors.length) | 0],
      opacity: rnd(0.35, 0.8),
    }))

    const drawPetal = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = p.opacity
      ctx.fillStyle = p.color
      ctx.beginPath()
      // simple petal shape: two curves
      ctx.moveTo(0, -p.r)
      ctx.bezierCurveTo(p.r, -p.r * 0.5, p.r, p.r * 0.5, 0, p.r)
      ctx.bezierCurveTo(-p.r, p.r * 0.5, -p.r, -p.r * 0.5, 0, -p.r)
      ctx.fill()
      ctx.restore()
    }

    let t = 0
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.01
      for (const p of petals) {
        p.y += p.speed
        p.x += Math.sin(t + p.swayOffset) * p.sway
        p.rot += p.rotSpeed
        if (p.y > h + 20) {
          p.y = -20
          p.x = rnd(0, w)
        }
        drawPetal(p)
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [density])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[5]"
      aria-hidden="true"
    />
  )
}
