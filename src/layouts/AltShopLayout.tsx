import type { ReactNode } from 'react'
import styled from 'styled-components'
import { AltSiteHeader } from '../components/AltSiteHeader'
import { PromoBar } from '../components/PromoBar'
import { ReviewTickerBar } from '../components/ReviewTickerBar'
import { SiteFooter } from '../components/SiteFooter'
import { RegimeQuizProvider } from '../contexts/RegimeQuizContext'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 100svh;
  overflow-x: clip;
  background: ${({ theme }) => theme.colors.background};
`

const Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow-x: clip;
`

type AltShopLayoutProps = {
  children: ReactNode
}

export function AltShopLayout({ children }: AltShopLayoutProps) {
  return (
    <RegimeQuizProvider>
      <Page>
        <PromoBar />
        <ReviewTickerBar />
        <AltSiteHeader />
        <Main>{children}</Main>
        <SiteFooter />
      </Page>
    </RegimeQuizProvider>
  )
}
