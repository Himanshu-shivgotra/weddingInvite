import { useEffect, useRef, useState } from 'react'

// Canvas scratch-off. Drag to erase the gold foil and reveal the children.
export default function ScratchCard({
  children,
  onRevealed,
  threshold = 0.42,
  brush = 34,
}) {
  const wrap = useRef(null)
  const canvas = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const drawing = useRef(false)
  const last = useRef(null)
  const checking = useRef(false)
  const scratched = useRef(false)
  const fired = useRef(false)

  // Reveal exactly once, no matter how many taps follow.
  const reveal = () => {
    if (fired.current) return
    fired.current = true
    setRevealed(true)
    onRevealed?.()
  }

  useEffect(() => {
    const el = wrap.current
    const cv = canvas.current
    if (!el || !cv) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      reveal()
      return
    }

    const ctx = cv.getContext('2d', { willReadFrequently: true })
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const paintFoil = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return false
      cv.width = w * dpr
      cv.height = h * dpr
      cv.style.width = w + 'px'
      cv.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalCompositeOperation = 'source-over'

      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, '#b58f3d')
      g.addColorStop(0.25, '#e6c878')
      g.addColorStop(0.45, '#f7ecc0')
      g.addColorStop(0.65, '#dfb95f')
      g.addColorStop(1, '#a8842f')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // subtle sheen streaks
      ctx.globalAlpha = 0.12
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      for (let i = -h; i < w; i += 26) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + h, h)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      ctx.fillStyle = 'rgba(59,10,22,0.82)'
      ctx.textAlign = 'center'
      ctx.font = `600 ${Math.max(11, Math.min(15, w * 0.028))}px Outfit, sans-serif`
      ctx.letterSpacing = '4px'
      ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2 - 4)
      ctx.font = `400 ${Math.max(10, Math.min(13, w * 0.024))}px Outfit, sans-serif`
      ctx.fillStyle = 'rgba(59,10,22,0.6)'
      ctx.fillText('THE DATE', w / 2, h / 2 + 18)
      return true
    }

    // The wrapper only gets a height once the image inside has loaded, so
    // repaint whenever the box resizes — until the guest starts scratching.
    let painted = paintFoil()
    let lastW = el.clientWidth
    let lastH = el.clientHeight
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      if (scratched.current) return
      if (painted && w === lastW && h === lastH) return
      lastW = w
      lastH = h
      painted = paintFoil()
    })
    ro.observe(el)

    const pos = (e) => {
      const r = cv.getBoundingClientRect()
      const t = e.touches ? e.touches[0] : e
      return { x: t.clientX - r.left, y: t.clientY - r.top }
    }

    const erase = (a, b) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = brush * 2
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(b.x, b.y, brush, 0, Math.PI * 2)
      ctx.fill()
    }

    const checkPct = () => {
      if (fired.current || checking.current) return
      checking.current = true
      requestAnimationFrame(() => {
        try {
          const d = ctx.getImageData(0, 0, cv.width, cv.height).data
          let clear = 0
          const step = 16 * 4
          let n = 0
          for (let i = 3; i < d.length; i += step) {
            if (d[i] < 20) clear++
            n++
          }
          if (n && clear / n >= threshold) reveal()
        } catch (_) {
          /* ignore */
        }
        checking.current = false
      })
    }

    const down = (e) => {
      if (fired.current) return
      drawing.current = true
      scratched.current = true
      last.current = pos(e)
      erase(last.current, last.current)
    }
    const move = (e) => {
      if (!drawing.current) return
      e.preventDefault()
      const p = pos(e)
      erase(last.current || p, p)
      last.current = p
      checkPct()
    }
    const up = () => {
      if (!drawing.current) return
      drawing.current = false
      last.current = null
      checkPct()
    }

    cv.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)


    return () => {
      cv.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={wrap}
      className="relative overflow-hidden rounded-[1.75rem] border border-gold/35 shadow-[0_40px_110px_-35px_rgba(0,0,0,0.85)]"
    >
      {children}
      <canvas
        ref={canvas}
        className="absolute inset-0 touch-none transition-opacity duration-[900ms] ease-out"
        style={{
          opacity: revealed ? 0 : 1,
          pointerEvents: revealed ? 'none' : 'auto',
          cursor: 'grab',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
