import { useId, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import heroImage from '../assets/vojta-alt-hero.webp'
import { PageContainer } from '../components/PageContainer'
import {
  ZACNETE_NEWSLETTER_ID,
  ZACNETE_PRODUCTS_ID,
  zacneteArticles,
  zacneteDisclosure,
  zacneteGuides,
  zacneteHero,
  zacneteNewsletter,
  zacneteProductIds,
  zacneteQuote,
} from '../data/zacnete'
import {
  getAltV4ProductHref,
  getAltV4ProductPrice,
  altV4Hero,
} from '../data/altHomeV4'
import { useAltV4Catalog } from '../hooks/useAltV4Catalog'
import { usePageMeta } from '../hooks/usePageMeta'
import { ShopLayout } from '../layouts/ShopLayout'
import { zacnetePageMeta } from '../seo/zacnetePageMeta'
import { appendCampaignParams } from '../utils/campaignLinks'
import {
  getPrivacyPolicyPageUrl,
  getShopifyBlogUrl,
  getShopifyNovinkyArticleUrl,
  getShopifyProductUrl,
  getShopifyStoreUrl,
} from '../utils/shopify'
import { subscribeToNewsletter } from '../utils/subscribeToNewsletter'

const PageSection = styled.section`
  padding-block: clamp(2.75rem, 7vw, 4.5rem);
`

const Inner = styled(PageContainer)`
  display: grid;
  gap: clamp(2.5rem, 6vw, 4rem);
`

const Hero = styled.header`
  display: grid;
  gap: clamp(1.25rem, 3vw, 2rem);
  padding-block: clamp(0.5rem, 2vw, 1.25rem);
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    column-gap: clamp(2rem, 5vw, 3.5rem);
  }
`

const HeroCopy = styled.div`
  display: grid;
  gap: 1.15rem;
  max-width: 40rem;
`

const HeroFigure = styled.figure`
  position: relative;
  margin: 0;
  align-self: start;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 0;
    height: 100%;
  }
`

const HeroMedia = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: min(100%, 36rem);
  }
`

const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1600 / 1586;
  object-fit: contain;
  border-radius: 1.125rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-height: calc(100svh - 7.25rem - 9.5rem);
  }
`

const HeroBadge = styled.div`
  position: absolute;
  left: 0.85rem;
  bottom: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.88);
  border: 1px solid rgba(238, 220, 130, 0.5);
`

const HeroBadgeValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.gold};
`

const HeroBadgeNote = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 8vw, 4.25rem);
  line-height: 0.95;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  text-wrap: balance;
`

const Lead = styled.p`
  margin: 0;
  max-width: 36rem;
  font-size: clamp(1rem, 2.2vw, 1.125rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`

const SocialProof = styled.p`
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.5;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.35rem;
`

const GoldButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.85rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
    background 160ms ease-out,
    opacity 160ms ease-out;

  &:hover {
    background: #f5e7a0;
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`

const GhostButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.85rem 1.35rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.gold};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
    border-color 160ms ease-out,
    color 160ms ease-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    transform: scale(0.97);
  }
`

const QuoteBlock = styled.blockquote`
  margin: 0;
  max-width: 42rem;
  padding: clamp(1.35rem, 3.5vw, 2rem) 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const QuoteText = styled.p`
  margin: 0;
  font-size: clamp(1.15rem, 2.8vw, 1.45rem);
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};
  text-wrap: pretty;
`

const QuoteBy = styled.footer`
  margin-top: 0.85rem;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const BlockTitle = styled.h2`
  margin: 0 0 0.35rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.65rem, 4vw, 2.35rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const BlockLead = styled.p<{ $flush?: boolean }>`
  margin: ${({ $flush }) => ($flush ? '0' : '0 0 1.25rem')};
  max-width: 38rem;
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

const GuideList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
`

const GuideLink = styled(Link)`
  display: grid;
  gap: 0.45rem;
  height: 100%;
  padding: 1.15rem 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: inherit;
  text-decoration: none;
  transition:
    transform 180ms cubic-bezier(0.23, 1, 0.32, 1),
    border-color 180ms ease-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.99);
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.35rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gold};
  }

  span {
    font-size: 0.88rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const ProductGrid = styled.div<{ $spaced?: boolean }>`
  display: grid;
  gap: 1rem;
  margin-top: ${({ $spaced }) => ($spaced ? '1.25rem' : '0')};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
`

const ProductCard = styled.article`
  display: grid;
  gap: 1rem;
  padding: 1.15rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(155deg, rgba(238, 220, 130, 0.1), transparent 45%),
    ${({ theme }) => theme.colors.surfaceRaised};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: center;
  }
`

const ProductImage = styled.img`
  display: block;
  width: 100%;
  max-height: 14rem;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(0, 0, 0, 0.35);
`

const ProductBody = styled.div`
  display: grid;
  gap: 0.55rem;
`

const ProductName = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.45rem, 3vw, 1.85rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const ProductPrice = styled.p`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text};
`

const ProductBenefit = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ArticleList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const ArticleLink = styled.a`
  display: grid;
  gap: 0.4rem;
  padding: 1.1rem 1.15rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: inherit;
  text-decoration: none;
  transition: border-color 160ms ease-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
  }

  strong {
    font-size: 1rem;
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-size: 0.85rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const TodoNote = styled.p`
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const FooterPair = styled.div`
  display: grid;
  gap: 1rem;
  align-items: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
`

const NewsletterPanel = styled.div`
  display: grid;
  gap: 1rem;
  height: 100%;
  padding: clamp(1.35rem, 3.5vw, 2rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const NewsletterForm = styled.form`
  display: grid;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: stretch;
  }
`

const EmailInput = styled.input`
  width: 100%;
  min-height: 3rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: rgba(0, 0, 0, 0.35);
  color: ${({ theme }) => theme.colors.text};
  font: inherit;

  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const SubmitButton = styled.button`
  min-height: 3rem;
  padding: 0.75rem 1.35rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 160ms ease-out;

  &:hover:not(:disabled) {
    opacity: 0.92;
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

const Status = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme, $error }) =>
    $error ? '#ffb4b4' : theme.colors.goldMuted};
`

const Legal = styled.p`
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: ${({ theme }) => theme.colors.goldMuted};
    text-underline-offset: 0.15em;
  }
`

const VisuallyHidden = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

const Disclosure = styled.aside`
  display: grid;
  gap: 0.75rem;
  align-content: start;
  height: 100%;
  padding: clamp(1.35rem, 3.5vw, 2rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const DisclosureBody = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

function articleHref(
  article: (typeof zacneteArticles)[number],
  search: string,
): string {
  if (article.kind === 'novinky' && article.handle) {
    return appendCampaignParams(
      getShopifyNovinkyArticleUrl(article.handle),
      search,
    )
  }
  if (article.kind === 'blog' && article.handle) {
    return appendCampaignParams(
      `${getShopifyStoreUrl()}/blogs/blog/${encodeURIComponent(article.handle)}`,
      search,
    )
  }
  return appendCampaignParams(getShopifyBlogUrl(), search)
}

export function ZacnetePage() {
  usePageMeta(zacnetePageMeta)
  const { search } = useLocation()
  const { get } = useAltV4Catalog()
  const products = zacneteProductIds.map((id) => get(id)).filter(Boolean)
  const emailId = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )

  async function onNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return
    const value = email.trim()
    if (!value) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      await subscribeToNewsletter(value, { source: 'zacnete' })
      setEmail('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <ShopLayout
      breadcrumbs={[
        { label: 'Domů', to: appendCampaignParams('/', search) },
        { label: 'Začněte' },
      ]}
    >
      <PageSection>
        <Inner>
          <Hero>
            <HeroCopy>
              <Title>{zacneteHero.title}</Title>
              <Lead>{zacneteHero.lead}</Lead>
              <SocialProof>{zacneteHero.socialProof}</SocialProof>
              <CtaRow>
                <GoldButton
                  href={appendCampaignParams(
                    getShopifyProductUrl(zacneteHero.startBundleHandle) ?? '#',
                    search,
                  )}
                  rel="noopener noreferrer"
                >
                  {zacneteHero.primaryCta}
                </GoldButton>
                <GhostButton href={`#${ZACNETE_PRODUCTS_ID}`}>
                  Jednotlivé produkty
                </GhostButton>
              </CtaRow>
            </HeroCopy>
            <HeroFigure>
              <HeroMedia>
                <HeroImage
                  src={heroImage}
                  alt="Vojta Hubne před a po zhubnutí 61 kilogramů"
                  width={1600}
                  height={1586}
                  fetchPriority="high"
                />
                <HeroBadge>
                  <HeroBadgeValue>{altV4Hero.badgeValue}</HeroBadgeValue>
                  <HeroBadgeNote>{altV4Hero.badgeNote}</HeroBadgeNote>
                </HeroBadge>
              </HeroMedia>
            </HeroFigure>
          </Hero>

          <QuoteBlock>
            <QuoteText>{zacneteQuote.text}</QuoteText>
            <QuoteBy>{zacneteQuote.by}</QuoteBy>
          </QuoteBlock>

          <section aria-labelledby="zacnete-guides">
            <BlockTitle id="zacnete-guides">Kam dál</BlockTitle>
            <BlockLead>
              Tři rychlé směry — jídlo, čísla a příběh. Vyberte, co potřebujete
              teď.
            </BlockLead>
            <GuideList>
              {zacneteGuides.map((guide) => {
                const [pathPart, hashPart] = guide.to.split('#')
                const pathname = pathPart || '/'
                return (
                  <li key={guide.id}>
                    <GuideLink
                      to={{
                        pathname,
                        search,
                        hash: hashPart ? `#${hashPart}` : undefined,
                      }}
                    >
                      <strong>{guide.title}</strong>
                      <span>{guide.lead}</span>
                    </GuideLink>
                  </li>
                )
              })}
            </GuideList>
          </section>

          <section id={ZACNETE_PRODUCTS_ID} aria-labelledby="zacnete-products">
            <BlockTitle id="zacnete-products">Start balíček</BlockTitle>
            <BlockLead>
              Lean Shake + GLP-1 Support v jednom — praktický výživový základ
              na cca 14 dní. Jednotlivé produkty níž, pokud chcete koupit
              zvlášť.
            </BlockLead>
            <CtaRow>
              <GoldButton
                href={appendCampaignParams(
                  getShopifyProductUrl(zacneteHero.startBundleHandle) ?? '#',
                  search,
                )}
                rel="noopener noreferrer"
              >
                {zacneteHero.primaryCta}
              </GoldButton>
            </CtaRow>
            <ProductGrid $spaced>
              {products.map((product) => {
                const href = appendCampaignParams(
                  getAltV4ProductHref(product),
                  search,
                )
                return (
                  <ProductCard key={product.id}>
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      width={480}
                      height={480}
                      loading="lazy"
                    />
                    <ProductBody>
                      <ProductName>{product.name}</ProductName>
                      <ProductPrice>
                        {getAltV4ProductPrice(product)}
                      </ProductPrice>
                      <ProductBenefit>{product.bullets[0]}</ProductBenefit>
                      <GoldButton href={href} rel="noopener noreferrer">
                        Chci to
                      </GoldButton>
                    </ProductBody>
                  </ProductCard>
                )
              })}
            </ProductGrid>
          </section>

          <section aria-labelledby="zacnete-articles">
            <BlockTitle id="zacnete-articles">Navazující články</BlockTitle>
            <BlockLead>
              Přečtěte si, co se děje v e-shopu — ať víte, do čeho jdete.
            </BlockLead>
            <ArticleList>
              {zacneteArticles.map((article) => (
                <li key={article.id}>
                  <ArticleLink
                    href={articleHref(article, search)}
                    rel="noopener noreferrer"
                  >
                    <strong>{article.title}</strong>
                    <span>{article.lead}</span>
                    {article.kind === 'todo' ? (
                      <TodoNote>TODO · zatím odkaz na blog hub</TodoNote>
                    ) : null}
                  </ArticleLink>
                </li>
              ))}
            </ArticleList>
          </section>

          <FooterPair>
            <section
              id={ZACNETE_NEWSLETTER_ID}
              aria-labelledby="zacnete-newsletter"
            >
              <NewsletterPanel>
                <BlockTitle id="zacnete-newsletter">
                  {zacneteNewsletter.title}
                </BlockTitle>
                <BlockLead $flush>{zacneteNewsletter.lead}</BlockLead>
                <NewsletterForm onSubmit={onNewsletterSubmit} noValidate>
                  <VisuallyHidden htmlFor={emailId}>E-mail</VisuallyHidden>
                  <EmailInput
                    id={emailId}
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="vas@email.cz"
                    aria-label="E-mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status !== 'idle') setStatus('idle')
                    }}
                  />
                  <SubmitButton type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Odesílám…' : 'Chci novinky'}
                  </SubmitButton>
                </NewsletterForm>
                {status === 'success' ? (
                  <Status role="status">Děkujeme, e-mail je přihlášen.</Status>
                ) : null}
                {status === 'error' ? (
                  <Status $error role="alert">
                    Zkontrolujte e-mail a zkuste to znovu.
                  </Status>
                ) : null}
                <Legal>
                  {zacneteNewsletter.legal}{' '}
                  <a href={getPrivacyPolicyPageUrl()}>Zásady ochrany údajů</a>.
                </Legal>
              </NewsletterPanel>
            </section>

            <Disclosure aria-labelledby="zacnete-vztah">
              <BlockTitle id="zacnete-vztah">{zacneteDisclosure.title}</BlockTitle>
              <DisclosureBody>{zacneteDisclosure.body}</DisclosureBody>
              <GhostButton
                href={zacneteDisclosure.linkHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {zacneteDisclosure.linkLabel}
              </GhostButton>
            </Disclosure>
          </FooterPair>
        </Inner>
      </PageSection>
    </ShopLayout>
  )
}
