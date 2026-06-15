import styled from 'styled-components'
import { ALT_SECTION_IDS, getProgramProductUrl, reviews } from '../../data/altHomepage'
import { Reveal } from './motion'
import { AltInner, AltSection, PrimaryButton, SectionTitle } from './shared'

const Track = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(16.5rem, 20rem);
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-auto-flow: row;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: visible;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const Card = styled.article`
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100%;
  padding: 1.35rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const Quote = styled.blockquote`
  margin: 0;
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

const Meta = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Name = styled.span`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Product = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Stars = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gold};
`

const CtaWrap = styled.div`
  margin-top: 2rem;
  text-align: center;
`

function renderStars(rating: number) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

export function Reviews() {
  const programUrl = getProgramProductUrl()

  return (
    <AltSection id={ALT_SECTION_IDS.reviews}>
      <AltInner>
        <Reveal>
          <SectionTitle>Co říkají ostatní</SectionTitle>
        </Reveal>
        <Track>
          {reviews.map((review, index) => (
            <Card key={review.id}>
              <Reveal delay={index * 0.06}>
                <Stars aria-label={`Hodnocení ${review.rating} z 5`}>
                  {renderStars(review.rating)}
                </Stars>
                <Quote>„{review.quote}"</Quote>
                <Meta>
                  <Name>
                    {review.name}, {review.city}
                  </Name>
                  <Product>{review.product}</Product>
                </Meta>
              </Reveal>
            </Card>
          ))}
        </Track>
        <CtaWrap>
          <PrimaryButton href={programUrl}>Přidej se k nim →</PrimaryButton>
        </CtaWrap>
      </AltInner>
    </AltSection>
  )
}
