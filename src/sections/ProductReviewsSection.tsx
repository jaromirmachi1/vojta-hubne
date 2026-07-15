import { useEffect, useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { PageContainer } from '../components/PageContainer'
import { eyebrowText } from '../styles/eyebrow'
import { getShopifyProductUrl } from '../utils/shopify'

type ProductReview = {
  id: number
  title: string | null
  body: string
  rating: number
  reviewerName: string
  productTitle: string | null
  productHandle: string | null
  verified: boolean
  createdAt: string | null
}

type ReviewsResponse = {
  ok: boolean
  reviews?: ProductReview[]
}

const Section = styled.section`
  overflow: hidden;
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
  background:
    radial-gradient(
      circle at 12% 20%,
      rgba(238, 220, 130, 0.1),
      transparent 25rem
    ),
    ${({ theme }) => theme.colors.background};
`

const Inner = styled(PageContainer)``

const Header = styled.header`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }
`

const Eyebrow = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  ${eyebrowText}
`

const Title = styled.h2`
  max-width: 42rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 6vw, 4rem);
  line-height: 0.95;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const RatingSummary = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  justify-self: start;
  padding: 0.7rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(238, 220, 130, 0.06);
`

const SummaryRating = styled.strong`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1;
  color: ${({ theme }) => theme.colors.white};
`

const SummaryCopy = styled.span`
  font-size: 0.68rem;
  line-height: 1.35;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Viewport = styled.div`
  width: 100%;

  @media (max-width: calc(${({ theme }) => theme.breakpoints.tablet} - 1px)) {
    overflow-x: auto;
    overflow-y: hidden;
    margin-inline: calc(-1 * ${({ theme }) => theme.layout.contentPadding});
    padding-inline: ${({ theme }) => theme.layout.contentPadding};
    padding-bottom: 0.35rem;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: ${({ theme }) => theme.layout.contentPadding};
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    mask-image: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent,
      black 4%,
      black 96%,
      transparent
    );

    &:hover > div,
    &:focus-within > div {
      animation-play-state: paused;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    overflow-x: auto;
    mask-image: none;
    scroll-snap-type: x mandatory;
  }
`

const marquee = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 0.5rem));
  }
`

const Rail = styled.div`
  display: flex;
  width: max-content;
  gap: 1rem;

  @media (max-width: calc(${({ theme }) => theme.breakpoints.tablet} - 1px)) {
    animation: none;
    transform: none;
    will-change: auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    animation: ${marquee} 80s linear infinite;
    will-change: transform;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
  }
`

const ReviewGroup = styled.div`
  display: flex;
  gap: 1rem;
`

const DesktopReviewGroup = styled(ReviewGroup)`
  @media (max-width: calc(${({ theme }) => theme.breakpoints.tablet} - 1px)) {
    display: none;
  }
`

const Card = styled.article`
  position: relative;
  display: flex;
  flex: 0 0 clamp(17.5rem, 80vw, 23rem);
  flex-direction: column;
  min-height: 20rem;
  padding: 1.4rem;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(145deg, rgba(238, 220, 130, 0.09), transparent 45%),
    ${({ theme }) => theme.colors.surfaceRaised};
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.22);
  scroll-snap-align: start;

  &::after {
    content: '”';
    position: absolute;
    top: -0.5rem;
    right: 1rem;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 7rem;
    line-height: 1;
    color: rgba(238, 220, 130, 0.1);
    pointer-events: none;
  }
`

const CardTop = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const Stars = styled.span`
  font-size: 0.86rem;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gold};
`

const Verified = styled.span`
  padding: 0.35rem 0.55rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(238, 220, 130, 0.12);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const ReviewTitle = styled.h3`
  position: relative;
  z-index: 1;
  margin-top: 1.35rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.45rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.white};
`

const Quote = styled.blockquote`
  position: relative;
  z-index: 1;
  display: -webkit-box;
  flex: 1;
  margin: 0.8rem 0 1.4rem;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  font-size: 0.9rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

const CardFooter = styled.footer`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Reviewer = styled.div`
  display: grid;
  gap: 0.25rem;
`

const ReviewerName = styled.strong`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`

const ReviewDate = styled.time`
  font-size: 0.67rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ProductLink = styled.a`
  max-width: 10rem;
  font-size: 0.68rem;
  line-height: 1.4;
  text-align: right;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.goldMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const StatusMessage = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const LoadingCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(17.5rem, 1fr));
  gap: 1rem;
`

const LoadingCard = styled.div`
  min-height: 20rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: linear-gradient(
    110deg,
    ${({ theme }) => theme.colors.surfaceRaised} 30%,
    rgba(238, 220, 130, 0.08) 45%,
    ${({ theme }) => theme.colors.surfaceRaised} 60%
  );
  background-size: 220% 100%;
  animation: loading 1.8s linear infinite;

  @keyframes loading {
    to {
      background-position-x: -220%;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    &:not(:first-child) {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const dateFormatter = new Intl.DateTimeFormat('cs-CZ', {
  month: 'short',
  year: 'numeric',
})

function formatReviewDate(value: string | null): string | null {
  if (!value) return null

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date)
}

function ReviewCard({
  review,
  duplicate = false,
}: {
  review: ProductReview
  duplicate?: boolean
}) {
  const productUrl = review.productHandle
    ? getShopifyProductUrl(review.productHandle)
    : null
  const reviewDate = formatReviewDate(review.createdAt)

  return (
    <Card>
      <CardTop>
        <Stars aria-label={`Hodnocení ${review.rating} z 5`}>
          {'★'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </Stars>
        {review.verified ? <Verified>Ověřený nákup</Verified> : null}
      </CardTop>
      {review.title ? <ReviewTitle>{review.title}</ReviewTitle> : null}
      <Quote>„{review.body}“</Quote>
      <CardFooter>
        <Reviewer>
          <ReviewerName>{review.reviewerName}</ReviewerName>
          {reviewDate ? (
            <ReviewDate dateTime={review.createdAt ?? undefined}>
              {reviewDate}
            </ReviewDate>
          ) : null}
        </Reviewer>
        {productUrl && review.productTitle ? (
          <ProductLink href={productUrl} tabIndex={duplicate ? -1 : undefined}>
            {review.productTitle} →
          </ProductLink>
        ) : null}
      </CardFooter>
    </Card>
  )
}

export function ProductReviewsSection() {
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadReviews() {
      try {
        const response = await fetch('/api/judgeme-reviews', {
          signal: controller.signal,
        })

        if (!response.ok) throw new Error('Reviews request failed')

        const data = (await response.json()) as ReviewsResponse
        const nextReviews = data.reviews ?? []

        if (!data.ok || nextReviews.length === 0) {
          throw new Error('No reviews returned')
        }

        setReviews(nextReviews)
        setStatus('ready')
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setStatus('error')
      }
    }

    void loadReviews()
    return () => controller.abort()
  }, [])

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  }, [reviews])

  if (status === 'error') {
    return (
      <Section aria-labelledby="product-reviews-title">
        <Inner>
          <Header>
            <div>
              <Eyebrow>Ověřeno zákazníky</Eyebrow>
              <Title id="product-reviews-title">Produkty v reálném životě</Title>
            </div>
          </Header>
          <StatusMessage>
            Recenze se teď nepodařilo načíst. Zkuste stránku obnovit za chvíli.
          </StatusMessage>
        </Inner>
      </Section>
    )
  }

  return (
    <Section id="recenze" aria-labelledby="product-reviews-title">
      <Inner>
        <Header>
          <div>
            <Eyebrow>Ověřeno zákazníky</Eyebrow>
            <Title id="product-reviews-title">Produkty v reálném životě</Title>
          </div>
          {status === 'ready' ? (
            <RatingSummary aria-label={`Průměrné hodnocení ${averageRating.toFixed(1)} z 5`}>
              <SummaryRating>{averageRating.toFixed(1)}</SummaryRating>
              <SummaryCopy>
                ★ z 5
                <br />
                Judge.me
              </SummaryCopy>
            </RatingSummary>
          ) : null}
        </Header>

        {status === 'loading' ? (
          <LoadingCards aria-label="Načítám recenze">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </LoadingCards>
        ) : (
          <Viewport>
            <Rail>
              <ReviewGroup>
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </ReviewGroup>
              <DesktopReviewGroup aria-hidden="true">
                {reviews.map((review) => (
                  <ReviewCard
                    key={`duplicate-${review.id}`}
                    review={review}
                    duplicate
                  />
                ))}
              </DesktopReviewGroup>
            </Rail>
          </Viewport>
        )}
      </Inner>
    </Section>
  )
}
