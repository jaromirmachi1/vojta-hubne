import type { MouseEvent, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

type HashLinkProps = {
  sectionId: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function HashLink({
  sectionId,
  children,
  className,
  onClick,
}: HashLinkProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const href = `/#${sectionId}`

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (location.pathname === '/') {
      window.history.pushState(null, '', href)

      if (onClick) {
        onClick()
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToSection(sectionId))
        })
      } else {
        scrollToSection(sectionId)
      }

      return
    }

    navigate({ pathname: '/', hash: `#${sectionId}` })
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
