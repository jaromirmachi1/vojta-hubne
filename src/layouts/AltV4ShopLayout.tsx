import type { ReactNode } from 'react'
import { RegimeQuizProvider } from '../contexts/RegimeQuizContext'
import {
  AltV4BottomNav,
  AltV4BottomNavSpacer,
} from '../sections/alt/v4/AltV4BottomNav'
import { AltV4Chrome } from '../sections/alt/v4/AltV4Chrome'
import { V4Main, V4Page } from '../sections/alt/v4/shared'

type AltV4ShopLayoutProps = {
  children: ReactNode
}

/** Light paper shell for Homepage v4 on `/alt`. */
export function AltV4ShopLayout({ children }: AltV4ShopLayoutProps) {
  return (
    <RegimeQuizProvider>
      <V4Page>
        <AltV4Chrome />
        <V4Main>
          {children}
          <AltV4BottomNavSpacer />
        </V4Main>
        <AltV4BottomNav />
      </V4Page>
    </RegimeQuizProvider>
  )
}
