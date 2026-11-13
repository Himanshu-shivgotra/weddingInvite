import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
  animate,
} from 'framer-motion'
import { couple } from '../lib/data'
import Butterflies from './Butterflies'

// Night scene + bell rope. Pulling the rope lights the whole celebration.
export default function Intro({ onOpen }) {
  const [opened, setOpened] = useState(false)
  const [gone, setGone] = useState(false)
  const [ready, setReady] = useState(false)

  const y = useMotionValue(0)
  const MAX = 230
  const THRESHOLD = 85

  const sy = useSpring(y, { stiffness: 210, damping: 28, mass: 0.7 })
  const p = useTransform(sy, [0, MAX], [0, 1])

  // Night -> lit
  const brightness = useTransform(p, [0, 1], [0.42, 1.08])
  const saturate = useTransform(p, [0, 1], [0.45, 1.15])
  const sceneFilter = useMotionTemplate`brightness(${brightness}) saturate(${saturate})`
  const nightVeil = useTransform(p, [0, 1], [0.58, 0])
  const warmGlow = useTransform(p, [0, 0.4, 1], [0, 0.35, 0.85])
  const sceneScale = useTransform(p, [0, 1], [1.12, 1])

  const nameOpacity = useTransform(p, [0.45, 0.9], [0, 1])
  const nameY = useTransform(p, [0.45, 0.9], [26, 0])
  const hintOpacity = useTransform(y, [0, 50], [1, 0])
  const ropeScaleY = useTransform(y, [0, MAX], [1, 2.3])

  // Warm the big images first so the reveal is instant.
  useEffect(() => {
    let alive = true
    const srcs = ['/images/cutout.jpg', '/images/hero.jpg']
    let left = srcs.length
    const done = () => {
      if (!alive) return
      left -= 1
      if (left <= 0) setReady(true)
    }
    srcs.forEach((src) => {
      const im = new Image()
      im.onload = done
      im.onerror = done
      im.src = src
    })
    const t = setTimeout(() => alive && setReady(true), 4000)
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [])

  const open = () => {
    if (opened) return
    setOpened(true)
    animate(y, MAX, { duration: 1.5, ease: [0.16, 1, 0.3, 1] })
    onOpen?.()
    setTimeout(() => setGone(true), 3000)
  }

  const onDragEnd = () => {
    if (y.get() >= THRESHOLD) open()
    else animate(y, 0, { type: 'spring', stiffness: 250, damping: 24 })
  }

  return (
    <motion.div
      id="intro-root"
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0b0510]"
      animate={{ opacity: gone ? 0 : 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      style={{ pointerEvents: gone ? 'none' : 'auto' }}
    >
      {/* The scene */}
      <motion.div
        className="absolute inset-0"
        style={{ filter: sceneFilter, scale: sceneScale }}
      >
        <img
          src="/images/cutout.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[center_top]"
        />
      </motion.div>

      {/* Night veil */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[#0a0a1e]"
        style={{ opacity: nightVeil }}
      />

      {/* Warm bloom as it lights */}
      <motion.div
        className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_58%,rgba(255,206,120,0.5),rgba(201,162,75,0.18)_38%,transparent_70%)]"
        style={{ opacity: warmGlow }}
      />

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_35%,rgba(8,3,12,0.8)_100%)]" />

      {/* Names revealed as the lamps come up */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: nameOpacity, y: nameY }}
      >
        <p className="font-body text-[0.6rem] uppercase tracking-[0.45em] text-lightgold/90 md:text-xs">
          The wedding of
        </p>
        <p className="mt-3 font-script text-5xl text-cream drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:text-7xl">
          {couple.bride.name} <span className="text-gold">&amp;</span>{' '}
          {couple.groom.name.split(' ')[0]}
        </p>
        <p className="mt-4 font-body text-[0.65rem] uppercase tracking-[0.4em] text-cream/85 md:text-xs">
          4 December 2026
        </p>
      </motion.div>

      <Butterflies show={opened} />

      {/* Bell rope */}
      <div
        className="absolute inset-x-0 top-0 z-30 flex flex-col items-center transition-opacity duration-700"
        style={{ opacity: opened ? 0 : ready ? 1 : 0, pointerEvents: opened || !ready ? "none" : "auto" }}
      >
        <motion.div
          style={{ scaleY: ropeScaleY }}
          className="h-16 w-[5px] origin-top rounded-full sm:h-24"
          // braided gold rope
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                'repeating-linear-gradient(135deg,#f4e3a1 0 3px,#c9a24b 3px 6px,#8a6a2a 6px 9px)',
            }}
          />
        </motion.div>

        <motion.button
          drag="y"
          dragConstraints={{ top: 0, bottom: MAX }}
          dragElastic={0.1}
          dragMomentum={false}
          style={{ y }}
          onDragEnd={onDragEnd}
          onClick={open}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Pull the ribbon to open the invitation"
          className="cursor-grab touch-none active:cursor-grabbing"
        >
          <Tassel />
        </motion.button>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none mt-7 flex flex-col items-center text-center"
        >
          <p className="font-title text-[0.55rem] uppercase tracking-[0.45em] text-lightgold/80">
            You are invited
          </p>
          <p className="mt-2 font-script text-3xl text-cream/90 sm:text-4xl">
            Princy <span className="text-gold">&amp;</span> Sahil
          </p>
          <motion.p
            animate={{ y: [0, 7, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="mt-4 font-title text-[0.58rem] uppercase tracking-[0.4em] text-lightgold/90"
          >
            Pull the ribbon to open &#8595;
          </motion.p>
        </motion.div>
      </div>
      {/* Loading veil */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0b0510]"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="gold-text animate-shimmer font-script text-6xl sm:text-8xl"
            >
              Welcome
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="mt-4 font-title text-[0.6rem] uppercase tracking-[0.5em] text-lightgold/70"
            >
              Princy &amp; Sahil
            </motion.p>
            <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-gold/15">
              <motion.div
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-lightgold to-transparent"
                animate={{ x: ['-120%', '320%'] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Tassel() {
  return (
    <div className="flex flex-col items-center drop-shadow-[0_6px_16px_rgba(0,0,0,0.65)]">
      {/* top bead */}
      <div
        className="h-5 w-5 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 34% 30%, #fdf3c8, #e6c878 45%, #a8842f)',
        }}
      />
      {/* cap */}
      <div
        className="-mt-1 h-9 w-9 rounded-b-[999px] rounded-t-md"
        style={{
          background:
            'linear-gradient(180deg,#f4e3a1,#c9a24b 55%,#8a6a2a)',
          boxShadow: 'inset 0 -3px 8px rgba(90,60,10,0.6)',
        }}
      />
      {/* skirt of threads: green / red / gold */}
      <div className="-mt-0.5 flex h-24 gap-[1.5px]">
        {[
          '#1f6b3a','#2e8b4f','#1f6b3a','#b02b2b','#d64545','#b02b2b',
          '#e6c878','#f4e3a1','#c9a24b','#d64545','#b02b2b','#2e8b4f',
          '#1f6b3a','#2e8b4f','#c9a24b','#e6c878',
        ].map((c, i) => (
          <span
            key={i}
            className="w-[3.5px] rounded-b-full"
            style={{
              background: `linear-gradient(180deg,${c},rgba(0,0,0,0.35))`,
              height: `${78 + Math.sin(i * 1.1) * 14}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
