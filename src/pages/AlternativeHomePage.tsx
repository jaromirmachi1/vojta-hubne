import { usePageMeta } from '../hooks/usePageMeta'
import { useHashScroll } from '../hooks/useHashScroll'
import { AltShopLayout } from '../layouts/AltShopLayout'
import { NewsletterPopup } from '../components/NewsletterPopup'
import { ALT_HOME_PATH } from '../data/altHomepage'
import { altHomePageMeta } from '../seo/altHomePageMeta'
import { AltShopCatalog } from '../sections/alt/AltShopCatalog'
import { ComparisonTable } from '../sections/alt/ComparisonTable'
import { ContactChannelsSection } from '../sections/alt/ContactChannelsSection'
import { ContactSection } from '../sections/alt/ContactSection'
import { FAQ } from '../sections/alt/FAQ'
import { HeroSection } from '../sections/alt/HeroSection'
import { HowItWorks } from '../sections/alt/HowItWorks'
import { RegimeGuideSection } from '../sections/alt/RegimeGuideSection'
import { RegimeQuizSection } from '../sections/alt/RegimeQuizSection'
import { Reviews } from '../sections/alt/Reviews'
import { VojtaStory } from '../sections/alt/VojtaStory'

export function AlternativeHomePage() {
  usePageMeta(altHomePageMeta)
  useHashScroll(ALT_HOME_PATH)

  return (
    <AltShopLayout>
      <HeroSection />
      <RegimeQuizSection />
      <VojtaStory />
      <AltShopCatalog />
      <ComparisonTable />
      <HowItWorks />
      <RegimeGuideSection />
      <ContactSection />
      <FAQ />
      <ContactChannelsSection />
      <Reviews />
      <NewsletterPopup />
    </AltShopLayout>
  )
}
