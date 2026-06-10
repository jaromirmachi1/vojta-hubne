import { useEffect } from 'react'
import { useHashScroll } from '../hooks/useHashScroll'
import { BenefitsSection } from '../sections/BenefitsSection'
import { BestsellersSection } from '../sections/BestsellersSection'
import { CategoryTeasersSection } from '../sections/CategoryTeasersSection'
import { HomeHeroSection } from '../sections/HomeHeroSection'
import { ProductComparisonSection } from '../sections/ProductComparisonSection'
import { StorySection } from '../sections/StorySection'
import { ShopLayout } from '../layouts/ShopLayout'
import { homePageMeta } from '../seo/homePageMeta'

export function HomePage() {
  useHashScroll()

  useEffect(() => {
    document.title = homePageMeta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', homePageMeta.description)
    }
  }, [])

  return (
    <ShopLayout>
      <HomeHeroSection />
      <BestsellersSection />
      <CategoryTeasersSection />
      <StorySection />
      <ProductComparisonSection />
      <BenefitsSection />
    </ShopLayout>
  )
}
