import type { ReactNode } from 'react'
import styled from 'styled-components'
import { PromoBar } from '../components/PromoBar'
import { ReviewTickerBar } from '../components/ReviewTickerBar'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  background: ${({ theme }) => theme.colors.background};
`

const Main = styled.main`
  flex: 1;
`

type ShopLayoutProps = {
  children: ReactNode
}

export function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <Page>
      <PromoBar />
      <ReviewTickerBar />
      <SiteHeader />
      <Main>{children}</Main>
      <SiteFooter />
    </Page>
  )
}
