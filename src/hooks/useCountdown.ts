import { useEffect, useState } from 'react'

export type CountdownValues = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

function getCountdown(target: Date): CountdownValues {
  const diff = target.getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isComplete: false }
}

export function useCountdown(target: Date): CountdownValues {
  const [countdown, setCountdown] = useState(() => getCountdown(target))

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(target))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [target])

  return countdown
}
