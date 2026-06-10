import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

export function useHashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/' || !hash) return

    const sectionId = hash.replace(/^#/, '')
    if (!sectionId) return

    const run = () => scrollToSection(sectionId, 'smooth')
    requestAnimationFrame(() => requestAnimationFrame(run))
  }, [pathname, hash])
}
