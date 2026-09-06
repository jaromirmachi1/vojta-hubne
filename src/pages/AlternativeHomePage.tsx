import { usePageMeta } from '../hooks/usePageMeta'
import { useHashScroll } from '../hooks/useHashScroll'
import { ALT_HOME_PATH } from '../data/altHomepage'
import { AltV4ShopLayout } from '../layouts/AltV4ShopLayout'
import { altHomePageMeta } from '../seo/altHomePageMeta'
import { AltV4FirstFold } from '../sections/alt/v4/shared'
import { AltHeroV4Section } from '../sections/alt/v4/AltHeroV4Section'
import { AltTrustStripSection } from '../sections/alt/v4/AltTrustStripSection'
import { AltSituationQuizSection } from '../sections/alt/v4/AltSituationQuizSection'
import { AltBestsellersV4Section } from '../sections/alt/v4/AltBestsellersV4Section'
import { AltBundlesV4Section } from '../sections/alt/v4/AltBundlesV4Section'
import { AltClubV4Section } from '../sections/alt/v4/AltClubV4Section'
import { AltBiomeV4Section } from '../sections/alt/v4/AltBiomeV4Section'
import { AltComparisonV4Section } from '../sections/alt/v4/AltComparisonV4Section'
import { AltStoryV4Section } from '../sections/alt/v4/AltStoryV4Section'
import { AltPrinciplesV4Section } from '../sections/alt/v4/AltPrinciplesV4Section'
import { AltMenShopV4Section } from '../sections/alt/v4/AltMenShopV4Section'
import { AltReviewsV4Section } from '../sections/alt/v4/AltReviewsV4Section'
import { AltBlogV4Section } from '../sections/alt/v4/AltBlogV4Section'
import { AltFaqV4Section } from '../sections/alt/v4/AltFaqV4Section'
import { AltNewsletterV4Section } from '../sections/alt/v4/AltNewsletterV4Section'

export function AlternativeHomePage() {
  usePageMeta(altHomePageMeta)
  useHashScroll(ALT_HOME_PATH)

  return (
    <AltV4ShopLayout>
      <AltV4FirstFold>
        <AltHeroV4Section />
        <AltTrustStripSection />
      </AltV4FirstFold>
      <AltSituationQuizSection />
      <AltBestsellersV4Section />
      <AltBundlesV4Section />
      <AltClubV4Section />
      <AltBiomeV4Section />
      <AltComparisonV4Section />
      <AltStoryV4Section />
      <AltPrinciplesV4Section />
      <AltMenShopV4Section />
      <AltReviewsV4Section />
      <AltBlogV4Section />
      <AltFaqV4Section />
      <AltNewsletterV4Section />
    </AltV4ShopLayout>
  )
}
