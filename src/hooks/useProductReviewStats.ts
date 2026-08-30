import { useEffect, useState } from 'react'

type StatsResponse = {
  ok: boolean
  stats?: Record<string, { count: number; averageRating: number }>
}

export type ProductReviewStats = {
  count: number
  averageRating: number
}

export function useProductReviewStats() {
  const [statsByHandle, setStatsByHandle] = useState<
    Map<string, ProductReviewStats>
  >(new Map())

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const response = await fetch('/api/judgeme-reviews?stats=1')
        if (!response.ok) return

        const data = (await response.json()) as StatsResponse
        if (!data.ok || !data.stats) return

        const next = new Map<string, ProductReviewStats>(
          Object.entries(data.stats),
        )

        if (!cancelled) setStatsByHandle(next)
      } catch {
        // Reviews are optional — cards still render without ratings.
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return statsByHandle
}
