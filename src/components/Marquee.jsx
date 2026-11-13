import { Sparkle } from './Ornament'
import { useDatesRevealed } from '../lib/dateReveal'

const base = ['Princy & Sahil', 'Jammu', 'Save the Date', 'Barat', 'With Love']

export default function Marquee() {
  const revealed = useDatesRevealed()
  const items = revealed ? ['Princy & Sahil', '04 · 12 · 2026', 'Jammu', 'Save the Date', 'Barat', 'With Love'] : base
  const row = [...items, ...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-deepmaroon/60 py-6">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl italic text-lightgold/90 md:text-3xl">
              {t}
            </span>
            <Sparkle className="h-4 w-4 text-gold/60" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  )
}
