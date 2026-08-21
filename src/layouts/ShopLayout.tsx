import type { ReactNode } from 'react'
import styled from 'styled-components'
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from '../components/Breadcrumbs'
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
  breadcrumbs?: BreadcrumbItem[]
}

export function ShopLayout({ children, breadcrumbs }: ShopLayoutProps) {
  return (
    <Page>
      <PromoBar />
      <ReviewTickerBar />
      <SiteHeader />
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      <Main>{children}</Main>
      <SiteFooter />
    </Page>
  )
}
