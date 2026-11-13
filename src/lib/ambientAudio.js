// Looping wedding music. Falls back silently if the browser blocks playback.
let el = null

function ensure() {
  if (el) return el
  el = new Audio('/audio/music.mp3')
  el.loop = true
  el.preload = 'auto'
  el.volume = 0
  return el
}

function fade(to, ms = 1200) {
  if (!el) return
  const from = el.volume
  const start = performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - start) / ms)
    el.volume = from + (to - from) * t
    if (t < 1) requestAnimationFrame(step)
    else if (to === 0) el.pause()
  }
  requestAnimationFrame(step)
}

export function startAmbient() {
  const a = ensure()
  const p = a.play()
  if (p && typeof p.catch === 'function') p.catch(() => {})
  fade(0.55, 1800)
}

export function stopAmbient() {
  if (!el) return
  fade(0, 700)
}
