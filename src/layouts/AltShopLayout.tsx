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
import { RegimeQuizProvider } from '../contexts/RegimeQuizContext'
import { ALT_HOME_PATH } from '../data/altHomepage'

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
  breadcrumbs?: BreadcrumbItem[]
}

export function AltShopLayout({ children, breadcrumbs }: AltShopLayoutProps) {
  return (
    <RegimeQuizProvider>
      <Page>
        <SiteChrome />
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
        <Main>
          {children}
          <MobileBottomNavSpacer />
        </Main>
        <SiteFooter />
        <MobileBottomNav homeTo={ALT_HOME_PATH} />
      </Page>
    </RegimeQuizProvider>
  )
}
