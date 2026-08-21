import styled from 'styled-components'
import { AffiliateForm } from '../components/AffiliateForm'
import { PageContainer } from '../components/PageContainer'
import { usePageMeta } from '../hooks/usePageMeta'
import { ShopLayout } from '../layouts/ShopLayout'
import { affiliatePageMeta } from '../seo/affiliatePageMeta'
import { eyebrowText } from '../styles/eyebrow'

/* ─────────────────────────────────────────
   Hero
───────────────────────────────────────── */

const HeroSection = styled.section`
  position: relative;
  padding-block: clamp(4rem, 12vw, 8rem);
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(238, 220, 130, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`

const HeroInner = styled(PageContainer)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 760px;
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.26em;
  ${eyebrowText}
`

const HeroTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.8rem, 7vw, 5rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  line-height: 1.05;
`

const HeroLead = styled.p`
  margin: 0;
  max-width: 560px;
  font-size: clamp(1rem, 1.8vw, 1.1rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`

const HeroCta = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.88;
  }
`

/* ─────────────────────────────────────────
   How it works
───────────────────────────────────────── */

const StepsSection = styled.section`
  padding-block: clamp(3rem, 8vw, 5rem);
  background: ${({ theme }) => theme.colors.surface};
`

const StepsInner = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`

const SectionTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  text-align: center;
`

const StepsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const StepCard = styled.div`
  padding: clamp(1.5rem, 3vw, 2rem);
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const StepNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.gold};
  opacity: 0.35;
`

const StepTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`

const StepText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

/* ─────────────────────────────────────────
   Benefits
───────────────────────────────────────── */

const BenefitsSection = styled.section`
  padding-block: clamp(3rem, 8vw, 5rem);
`

const BenefitsInner = styled(PageContainer)`
  display: grid;
  gap: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`

const BenefitsTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const BodyText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
`

const BenefitsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.92rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: '—';
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gold};
    font-weight: 600;
    margin-top: 0.05em;
  }
`

const RequirementsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1.5rem, 3vw, 2rem);
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
`

const ReqLabel = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const ReqList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`

const ReqItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};

  &::before {
    content: '✓';
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gold};
    font-weight: 700;
    font-size: 0.82rem;
    margin-top: 0.1em;
  }
`

/* ─────────────────────────────────────────
   Form section
───────────────────────────────────────── */

const FormSection = styled.section`
  padding-block: clamp(3rem, 8vw, 5rem);
  background: ${({ theme }) => theme.colors.surface};
`

const FormInner = styled(PageContainer)`
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
  max-width: 900px;
`

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const FormTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const FormLead = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 560px;
`

const FormPanel = styled.div`
  padding: clamp(1.5rem, 4vw, 2.5rem);
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
`

/* ─────────────────────────────────────────
   Steps data
───────────────────────────────────────── */

const STEPS = [
  {
    n: '01',
    title: 'Vyplníš přihlášku',
    text: 'Pošleš nám základní informace o sobě a své komunitě. Formulář zabere 3 minuty.',
  },
  {
    n: '02',
    title: 'Ozveme se ti',
    text: 'Během 3–5 pracovních dnů se ozve náš tým. Domluvíme se na podmínkách spolupráce.',
  },
  {
    n: '03',
    title: 'Začneme spolupracovat',
    text: 'Dostaneš svůj unikátní kód, produkty a přístup k materiálům. Tvoříš podle svého.',
  },
]

const BENEFITS = [
  'Produkty zdarma každý měsíc — vyber si sám, co ti pošleme',
  'Unikátní slevový kód pro tvou komunitu',
  'Provize z každé objednávky přes tvůj kód',
  'Přímý kontakt s týmem — žádná byrokracie',
  'Kreativní svoboda — obsah tvoříš ty, my do toho nemluvíme',
  'Dlouhodobá spolupráce, ne jednorázový post',
]

const REQUIREMENTS = [
  'Zajímáš se o zdravý životní styl, sport nebo wellness',
  'Aktivní účet na Instagramu, TikToku nebo YouTube',
  'Alespoň 10 000 sledujících na jednom kanálu',
  'Schopnost pravidelně tvořit obsah v rámci spolupráce',
  'Otevřená komunikace a dodržování domluvených termínů',
]

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */

export function AffiliatePage() {
  usePageMeta(affiliatePageMeta)

  return (
    <ShopLayout
      breadcrumbs={[
        { label: 'Domů', to: '/' },
        { label: 'Spolupráce' },
      ]}
    >
      {/* Hero */}
      <HeroSection>
        <HeroInner>
          <Eyebrow>Affiliate program</Eyebrow>
          <HeroTitle>Spolupráce pro&nbsp;influencery</HeroTitle>
          <HeroLead>
            Propaguj produkty, které sám používáš. Sdílej výsledky se svou komunitou
            a vydělávej provize z každé objednávky.
          </HeroLead>
          <HeroCta href="#prihlaska">Chci spolupracovat</HeroCta>
        </HeroInner>
      </HeroSection>

      {/* How it works */}
      <StepsSection>
        <StepsInner>
          <SectionTitle>Jak to funguje</SectionTitle>
          <StepsGrid>
            {STEPS.map((step) => (
              <StepCard key={step.n}>
                <StepNumber>{step.n}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepText>{step.text}</StepText>
              </StepCard>
            ))}
          </StepsGrid>
        </StepsInner>
      </StepsSection>

      {/* Benefits + Requirements */}
      <BenefitsSection>
        <BenefitsInner>
          <BenefitsTextBlock>
            <Eyebrow>Co z toho máš</Eyebrow>
            <SectionTitle style={{ textAlign: 'left' }}>Výhody spolupráce</SectionTitle>
            <BodyText>
              Spolupráce s Vojta Hubne není o jednorázovém postu. Chceme budovat
              komunitu lidí, kteří naše produkty opravdu používají a věří jim.
            </BodyText>
            <BenefitsList>
              {BENEFITS.map((b) => (
                <BenefitItem key={b}>{b}</BenefitItem>
              ))}
            </BenefitsList>
          </BenefitsTextBlock>

          <RequirementsBlock>
            <ReqLabel>Hledáme někoho, kdo…</ReqLabel>
            <ReqList>
              {REQUIREMENTS.map((r) => (
                <ReqItem key={r}>{r}</ReqItem>
              ))}
            </ReqList>
          </RequirementsBlock>
        </BenefitsInner>
      </BenefitsSection>

      {/* Form */}
      <FormSection id="prihlaska">
        <FormInner>
          <FormHeader>
            <Eyebrow>Přihláška</Eyebrow>
            <FormTitle>Jdeme do toho?</FormTitle>
            <FormLead>
              Vyplň přihlášku a my se ti ozveme. Žádné závazky — jen první krok
              ke spolupráci.
            </FormLead>
          </FormHeader>
          <FormPanel>
            <AffiliateForm />
          </FormPanel>
        </FormInner>
      </FormSection>
    </ShopLayout>
  )
}
