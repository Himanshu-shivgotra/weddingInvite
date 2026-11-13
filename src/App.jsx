import { useEffect, useState } from 'react'
import { useSmoothScroll } from './lib/useSmoothScroll'
import { startAmbient, stopAmbient } from './lib/ambientAudio'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Blessing from './components/Blessing'
import Journey from './components/Journey'
import Families from './components/Families'
import SaveTheDate from './components/SaveTheDate'
import Marquee from './components/Marquee'
import Timeline from './components/Timeline'
import Venue from './components/Venue'
import Blessings from './components/Blessings'
import Finale from './components/Finale'
import PetalRain from './components/PetalRain'
import ScrollBorder from './components/ScrollBorder'
import MusicToggle from './components/MusicToggle'
import Butterflies from './components/Butterflies'
import Celebration from './components/Celebration'
import FlyingLamps from './components/FlyingLamps'

const DEV =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : null
const PREVIEW = DEV ? DEV.has('preview') : false
const ONLY = DEV ? DEV.get('only') : null

export default function App() {
  useSmoothScroll(!PREVIEW)
  const [started, setStarted] = useState(PREVIEW)
  const [musicOn, setMusicOn] = useState(false)
  const [flutter, setFlutter] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    if (!PREVIEW) return
    const s = DEV.get('scroll')
    if (!s) return
    const t = setTimeout(() => {
      window.scrollTo(0, +s)
    }, 1500)
    return () => clearTimeout(t)
  }, [])

  const handleOpen = () => {
    setStarted(true)
    setFlutter(true)
    setTimeout(() => setFlutter(false), 11000)
    startAmbient()
    setMusicOn(true)
    window.scrollTo(0, 0)
  }

  const toggleMusic = () => {
    setMusicOn((on) => {
      if (on) stopAmbient()
      else startAmbient()
      return !on
    })
  }

  useEffect(() => {
    const t = setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) =>
        ScrollTrigger.refresh()
      )
    }, 1200)
    return () => clearTimeout(t)
  }, [started])

  if (ONLY) {
    const map = {
      hero: <Hero started />,
      blessing: <Blessing />,
      journey: <Journey />,
      families: <Families />,
      savethedate: <SaveTheDate />,
      timeline: <Timeline />,
      venue: <Venue />,
      blessings: <Blessings />,
      finale: <Finale />,
    }
    return (
      <main className="relative w-full max-w-full overflow-x-hidden">
        {DEV.has('reveal') && (
          <style>{`main *{opacity:1 !important;transform:none !important;max-height:none !important;}`}</style>
        )}
        {map[ONLY] || <div className="p-10 text-cream">unknown: {ONLY}</div>}
      </main>
    )
  }

  return (
    <>
      {!PREVIEW && <Intro onOpen={handleOpen} />}
      <PetalRain density={14} />
      <FlyingLamps />
      <ScrollBorder />
      <MusicToggle on={musicOn} onToggle={toggleMusic} />
      <Celebration show={celebrate} onDone={() => setCelebrate(false)} />
      {flutter && (
        <div className="pointer-events-none fixed inset-0 z-[55]">
          <Butterflies show />
        </div>
      )}

      <main className="relative w-full max-w-full overflow-x-hidden">
        <Hero started={started} />
        <Blessing />
        <Journey />
        <Families />
        <SaveTheDate onReveal={() => setCelebrate(true)} />
        <Marquee />
        <Timeline />
        <Venue />
        <Blessings />
        <Finale />
      </main>
    </>
  )
}
