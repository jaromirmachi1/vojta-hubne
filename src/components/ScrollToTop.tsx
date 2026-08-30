import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Reset scroll position on route changes. Without this, client-side navigation
 * keeps the previous page's scroll offset — e.g. clicking a footer CTA on the
 * homepage and landing mid-page on /co-chystame.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
