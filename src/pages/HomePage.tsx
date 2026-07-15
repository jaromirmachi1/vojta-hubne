import { useHashScroll } from '../hooks/useHashScroll'
import { useJsonLd } from '../hooks/useJsonLd'
import { usePageMeta } from '../hooks/usePageMeta'
import { BenefitsSection } from '../sections/BenefitsSection'
import { BestsellersSection } from '../sections/BestsellersSection'
import { CategoryTeasersSection } from '../sections/CategoryTeasersSection'
import { HomeHeroSection } from '../sections/HomeHeroSection'
import { ProductComparisonSection } from '../sections/ProductComparisonSection'
import { ProductReviewsSection } from '../sections/ProductReviewsSection'
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
      <HomeHeroSection />
      <BestsellersSection />
      <ProductReviewsSection />
      <CategoryTeasersSection />
      <StorySection />
      <ProductComparisonSection />
      <BenefitsSection />
      <NewsletterPopup />
    </ShopLayout>
  )
}
