import { useHashScroll } from '../hooks/useHashScroll'
import { usePageMeta } from '../hooks/usePageMeta'
import { useJsonLd } from '../hooks/useJsonLd'
import { ALT_HOME_PATH } from '../data/altHomepage'
import { AltV4ShopLayout } from '../layouts/AltV4ShopLayout'
import { altHomePageMeta } from '../seo/altHomePageMeta'
import { getHomePageSchema } from '../seo/homePageSchema'
import { AltV4FirstFold } from '../sections/alt/v4/shared'
import { AltHeroV4Section } from '../sections/alt/v4/AltHeroV4Section'
import { AltTrustStripSection } from '../sections/alt/v4/AltTrustStripSection'
import { AltBestsellersV4Section } from '../sections/alt/v4/AltBestsellersV4Section'
import { AltSituationQuizSection } from '../sections/alt/v4/AltSituationQuizSection'
import { AltDailyV4Section } from '../sections/alt/v4/AltDailyV4Section'
import { AltBundlesV4Section } from '../sections/alt/v4/AltBundlesV4Section'
import { AltRestV4Section } from '../sections/alt/v4/AltRestV4Section'
import { AltPipelineV4Section } from '../sections/alt/v4/AltPipelineV4Section'
import { AltStoryV4Section } from '../sections/alt/v4/AltStoryV4Section'
import { AltGlossaryV4Section } from '../sections/alt/v4/AltGlossaryV4Section'
import { AltReviewsV4Section } from '../sections/alt/v4/AltReviewsV4Section'
import { AltClubV4Section } from '../sections/alt/v4/AltClubV4Section'
import { AltBlogV4Section } from '../sections/alt/v4/AltBlogV4Section'
import { AltFaqV4Section } from '../sections/alt/v4/AltFaqV4Section'
import { AltNewsletterV4Section } from '../sections/alt/v4/AltNewsletterV4Section'

export function AlternativeHomePage() {
  usePageMeta(altHomePageMeta)
  useJsonLd('vh-home-schema', getHomePageSchema())
  useHashScroll(ALT_HOME_PATH)

  return (
    <AltV4ShopLayout>
      <AltV4FirstFold>
        <AltHeroV4Section />
        <AltTrustStripSection />
      </AltV4FirstFold>
      <AltSituationQuizSection />
      <AltBestsellersV4Section />
      <AltDailyV4Section />
      <AltBundlesV4Section />
      <AltRestV4Section />
      <AltPipelineV4Section />
      <AltStoryV4Section />
      <AltGlossaryV4Section />
      <AltReviewsV4Section />
      <AltClubV4Section />
      <AltBlogV4Section />
      <AltFaqV4Section />
      <AltNewsletterV4Section />
    </AltV4ShopLayout>
  )
}
