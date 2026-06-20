import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

export function useHashScroll(pathnames: string | string[] = '/') {
  const { pathname, hash } = useLocation()
  const allowed = Array.isArray(pathnames) ? pathnames : [pathnames]

  useEffect(() => {
    if (!allowed.includes(pathname) || !hash) return

    const sectionId = hash.replace(/^#/, '')
    if (!sectionId) return

    const run = () => scrollToSection(sectionId, 'smooth')
    requestAnimationFrame(() => requestAnimationFrame(run))
  }, [allowed, pathname, hash])
}
