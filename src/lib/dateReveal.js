import { useSyncExternalStore } from 'react'

// Global flag: wedding dates stay hidden across the whole site until the
// guest scratches the Save-the-Date card. Session-only (resets on reload,
// so the surprise works every visit).
let revealed = false
const subs = new Set()

export function revealDates() {
  if (revealed) return
  revealed = true
  subs.forEach((f) => f())
}

function subscribe(cb) {
  subs.add(cb)
  return () => subs.delete(cb)
}

export function useDatesRevealed() {
  return useSyncExternalStore(subscribe, () => revealed, () => revealed)
}
