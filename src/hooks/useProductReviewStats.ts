import { useEffect, useState } from 'react'

type StatsResponse = {
  ok: boolean
  stats?: Record<string, { count: number; averageRating: number }>
}

export type ProductReviewStats = {
  count: number
  averageRating: number
}

type StatsMap = Map<string, ProductReviewStats>

let cachedStats: StatsMap | null = null
let pendingStats: Promise<StatsMap> | null = null

async function loadProductReviewStats(): Promise<StatsMap> {
  if (cachedStats && cachedStats.size > 0) return cachedStats
  if (pendingStats) return pendingStats

  pendingStats = (async () => {
    const response = await fetch('/api/judgeme-reviews?stats=1')
    if (!response.ok) return new Map()

    const data = (await response.json()) as StatsResponse
    if (!data.ok || !data.stats) return new Map()

    const next: StatsMap = new Map(Object.entries(data.stats))
    if (next.size > 0) cachedStats = next
    return next
  })()
    .catch(() => new Map<string, ProductReviewStats>())
    .finally(() => {
      pendingStats = null
    })

  return pendingStats
}

export function useProductReviewStats() {
  const [statsByHandle, setStatsByHandle] = useState<StatsMap>(
    () => cachedStats ?? new Map(),
  )

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const next = await loadProductReviewStats()
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
