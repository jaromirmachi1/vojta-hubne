import type { ReactNode } from 'react'
import styled from 'styled-components'
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from '../components/Breadcrumbs'
import {
  MobileBottomNav,
  MobileBottomNavSpacer,
} from '../components/MobileBottomNav'
import { SiteChrome } from '../components/SiteChrome'
import { SiteFooter } from '../components/SiteFooter'

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
      <SiteChrome />
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      <Main>
        {children}
        <MobileBottomNavSpacer />
      </Main>
      <SiteFooter />
      <MobileBottomNav homeTo="/" />
    </Page>
  )
}
