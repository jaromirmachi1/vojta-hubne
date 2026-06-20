import type { ReactNode } from 'react'
import styled from 'styled-components'
import { AltSiteHeader } from '../components/AltSiteHeader'
import { PromoBar } from '../components/PromoBar'
import { SiteFooter } from '../components/SiteFooter'
import { RegimeQuizProvider } from '../contexts/RegimeQuizContext'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  background: ${({ theme }) => theme.colors.background};
`

const Main = styled.main`
  flex: 1;
`

type AltShopLayoutProps = {
  children: ReactNode
}

export function AltShopLayout({ children }: AltShopLayoutProps) {
  return (
    <RegimeQuizProvider>
      <Page>
        <PromoBar />
        <AltSiteHeader />
        <Main>{children}</Main>
        <SiteFooter />
      </Page>
    </RegimeQuizProvider>
  )
}
