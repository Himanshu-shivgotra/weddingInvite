import { useEffect, useRef } from 'react'

// A fixed ornamental gold frame. Corners tilt in 3D and the rails fill
// as the guest scrolls — a quiet progress indicator around the whole page.
export default function ScrollBorder() {
  const rail = useRef(null)
  const corners = useRef([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const max =
          document.documentElement.scrollHeight - window.innerHeight || 1
        const p = Math.min(1, Math.max(0, window.scrollY / max))

        if (rail.current) rail.current.style.transform = `scaleX(${p})`

        if (!reduce) {
          const rot = p * 26
          corners.current.forEach((c, i) => {
            if (!c) return
            const dir = i % 2 === 0 ? 1 : -1
            c.style.transform = `perspective(600px) rotateX(${rot * dir * 0.5}deg) rotateY(${rot * dir}deg) scale(${1 + p * 0.12})`
          })
        }
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const cornerPos = [
    'left-2 top-2 md:left-3 md:top-3',
    'right-2 top-2 rotate-90 md:right-3 md:top-3',
    'right-2 bottom-2 rotate-180 md:right-3 md:bottom-3',
    'left-2 bottom-2 -rotate-90 md:left-3 md:bottom-3',
  ]

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    >
      {/* frame hairline */}
      <div className="absolute inset-2 rounded-[1.1rem] border border-gold/20 md:inset-3" />

      {/* scroll progress rail along the top */}
      <div className="absolute inset-x-2 top-2 h-[2px] overflow-hidden rounded-full md:inset-x-3 md:top-3">
        <div
          ref={rail}
          className="h-full w-full origin-left"
          style={{
            transform: 'scaleX(0)',
            background:
              'linear-gradient(90deg,transparent,#c9a24b 15%,#f4e3a1 50%,#c9a24b 85%,transparent)',
          }}
        />
      </div>

      {/* 3D corner filigree */}
      {cornerPos.map((cls, i) => (
        <div key={i} className={`absolute ${cls}`}>
          <div
            ref={(el) => (corners.current[i] = el)}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <Filigree />
          </div>
        </div>
      ))}
    </div>
  )
}

function Filigree() {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 64 64"
      fill="none"
      className="text-gold/70 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] md:h-[70px] md:w-[70px]"
    >
      <path
        d="M4 20 C4 10 10 4 20 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 32 C4 16 16 4 32 4"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M12 22 C12 16 16 12 22 12"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="2.1" fill="currentColor" />
      <path
        d="M20 4 l3 4 -3 4 -3 -4z M4 20 l4 3 -4 3 -3 -3z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  )
}
