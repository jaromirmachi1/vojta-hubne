import { useHashScroll } from '../hooks/useHashScroll'
import { useJsonLd } from '../hooks/useJsonLd'
import { usePageMeta } from '../hooks/usePageMeta'
import { RegimeQuizProvider } from '../contexts/RegimeQuizContext'
import { BenefitsSection } from '../sections/BenefitsSection'
import { CoVhNedelaSection } from '../sections/CoVhNedelaSection'
import { SupplementChecklistSection } from '../sections/SupplementChecklistSection'
import { BestsellersSection } from '../sections/BestsellersSection'
import { CuratedProductsSection } from '../sections/CuratedProductsSection'
import { CoChystameTeaserSection } from '../sections/CoChystameTeaserSection'
import { HomeHeroSection } from '../sections/HomeHeroSection'
import { MenShopHereSection } from '../sections/MenShopHereSection'
import { HomeMobilePromoScroll } from '../sections/HomeMobilePromoScroll'
import { NovinkyTeaserSection } from '../sections/NovinkyTeaserSection'
import { ProductComparisonSection } from '../sections/ProductComparisonSection'
import { ProductReviewsSection } from '../sections/ProductReviewsSection'
import { RegimeQuizSection } from '../sections/alt/RegimeQuizSection'
import { StorySection } from '../sections/StorySection'
import { ShopLayout } from '../layouts/ShopLayout'
import { homePageMeta } from '../seo/homePageMeta'
import { getHomePageSchema } from '../seo/homePageSchema'
import { NewsletterPopup } from '../components/NewsletterPopup'

export function HomePage() {
  useHashScroll()
  usePageMeta(homePageMeta)
  useJsonLd('vh-home-schema', getHomePageSchema())

  return (
    <ShopLayout>
      <RegimeQuizProvider>
        <HomeHeroSection />
        <HomeMobilePromoScroll />
        <RegimeQuizSection showProblems={false} />
        <BestsellersSection />
        <CuratedProductsSection />
        <NovinkyTeaserSection />
        <CoChystameTeaserSection />
        <ProductReviewsSection />
        <StorySection />
        <SupplementChecklistSection />
        <ProductComparisonSection />
        <BenefitsSection />
        <CoVhNedelaSection />
        <MenShopHereSection />
        <NewsletterPopup />
      </RegimeQuizProvider>
    </ShopLayout>
  )
}
