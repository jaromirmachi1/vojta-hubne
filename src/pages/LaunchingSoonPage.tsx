import { useEffect } from 'react'
import styled from 'styled-components'
import { LaunchHeroSection } from '../sections/LaunchHeroSection'

const Page = styled.main`
  height: 100svh;
  max-height: 100svh;
  overflow: hidden;
`

export function LaunchingSoonPage() {
  useEffect(() => {
    const html = document.documentElement
    const { body } = document
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
    }
  }, [])

  return (
    <Page>
      <LaunchHeroSection />
    </Page>
  )
}
