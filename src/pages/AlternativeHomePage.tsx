import { usePageMeta } from '../hooks/usePageMeta'
import { ShopLayout } from '../layouts/ShopLayout'
import { altHomePageMeta } from '../seo/altHomePageMeta'
import { ComparisonTable } from '../sections/alt/ComparisonTable'
import { CustomerPaths } from '../sections/alt/CustomerPaths'
import { FAQ } from '../sections/alt/FAQ'
import { HeroSection } from '../sections/alt/HeroSection'
import { HowItWorks } from '../sections/alt/HowItWorks'
import { MainOffer } from '../sections/alt/MainOffer'
import { Reviews } from '../sections/alt/Reviews'
import { VojtaStory } from '../sections/alt/VojtaStory'

export function AlternativeHomePage() {
  usePageMeta(altHomePageMeta)

  return (
    <ShopLayout>
      <HeroSection />
      <CustomerPaths />
      <MainOffer />
      <ComparisonTable />
      <VojtaStory />
      <HowItWorks />
      <FAQ />
      <Reviews />
    </ShopLayout>
  )
}
