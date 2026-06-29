import styled from 'styled-components'
import { eyebrowText } from '../styles/eyebrow'
import { PageContainer } from '../components/PageContainer'
import { glpSupportComparison } from '../data/productComparison'

const Section = styled.section`
  padding-block: clamp(3.5rem, 8vw, 5.5rem);
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2.5rem, 5vw, 3.5rem);
`

const Header = styled.header`
  max-width: 40rem;
  text-align: center;
`

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`

const Highlight = styled.span`
  position: relative;
  color: ${({ theme }) => theme.colors.gold};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.05em;
    height: 0.28em;
    background: ${({ theme }) => theme.colors.gold};
    opacity: 0.35;
    z-index: -1;
  }
`

const CompareRow = styled.div`
  display: grid;
  width: 100%;
  gap: 1.5rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr auto 1fr;
    gap: 1rem 0.75rem;
  }
`

const Column = styled.div<{ $desktopOrder?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: ${({ $desktopOrder }) => $desktopOrder ?? 'initial'};
  }
`

const ProductVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 14rem;
  min-height: 16rem;
  padding: 0.5rem 1rem;

  img {
    width: 100%;
    height: auto;
    max-height: 18rem;
    object-fit: contain;
  }
`

const VisualPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  min-height: 9rem;
  padding: 1.5rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};

  span:first-child {
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    ${eyebrowText}
  }

  span:last-child {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.text};
  }
`

const Arrow = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.goldMuted};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    order: 2;
  }
`

const Card = styled.div<{ $featured?: boolean }>`
  width: 100%;
  max-width: 24rem;
  padding: 1.35rem 1.5rem 1.5rem;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid
    ${({ theme, $featured }) =>
      $featured ? theme.colors.border : theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
`

const CardTitle = styled.h3<{ $variant: 'competitor' | 'ours' }>`
  margin: 0 0 1.1rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme, $variant }) =>
    $variant === 'ours' ? theme.colors.gold : theme.colors.text};
`

const IngredientList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const IngredientRow = styled.li`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 0.65rem;
`

const IngredientDot = styled.span<{ $tone: 'muted' | 'gold' }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${({ theme, $tone }) =>
    $tone === 'gold'
      ? `radial-gradient(circle at 30% 30%, ${theme.colors.gold}33, ${theme.colors.surfaceRaised})`
      : `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06), ${theme.colors.surface})`};
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === 'gold' ? theme.colors.border : theme.colors.borderSubtle};
`

const GradeBadge = styled.span<{ $variant: 'competitor' | 'ours' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme, $variant }) =>
    $variant === 'ours' ? theme.colors.black : theme.colors.text};
  background: ${({ theme, $variant }) =>
    $variant === 'ours' ? theme.colors.gold : 'rgba(255, 255, 255, 0.06)'};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'ours' ? theme.colors.gold : theme.colors.borderSubtle};
`

const IngredientName = styled.span`
  font-size: 0.875rem;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.text};
`

const IngredientMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  text-align: right;
`

const IngredientPercent = styled.span<{ $variant: 'competitor' | 'ours' }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme, $variant }) =>
    $variant === 'ours' ? theme.colors.gold : theme.colors.text};
`

const IngredientNote = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const CardSummary = styled.p`
  margin: 1.25rem 0 0;
  padding-top: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.gold};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 1rem 2rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

const data = glpSupportComparison

export function ProductComparisonSection() {
  return (
    <Section id="porovnani">
      <Inner>
        <Header>
          <Title>
            {data.headline} <Highlight>{data.headlineHighlight}</Highlight>
          </Title>
        </Header>

        <CompareRow>
          <Column $desktopOrder={3}>
            <ProductVisual>
              {data.competitor.visualImage ? (
                <img src={data.competitor.visualImage} alt="" />
              ) : (
                <VisualPlaceholder>
                  <span>Místo pro obrázek</span>
                  <span>Běžný produkt — brzy</span>
                </VisualPlaceholder>
              )}
            </ProductVisual>
            <Card>
              <CardTitle $variant="competitor">
                {data.competitor.ingredientCountLabel}
              </CardTitle>
              <IngredientList>
                {data.competitor.ingredients.map((item) => (
                  <IngredientRow key={item.name}>
                    <IngredientDot $tone="muted" aria-hidden />
                    <GradeBadge $variant="competitor">{item.grade}</GradeBadge>
                    <IngredientName>{item.name}</IngredientName>
                    <IngredientMeta>
                      <IngredientPercent $variant="competitor">
                        {item.percent}
                      </IngredientPercent>
                    </IngredientMeta>
                  </IngredientRow>
                ))}
              </IngredientList>
            </Card>
          </Column>

          <Arrow aria-hidden>→</Arrow>

          <Column $desktopOrder={1}>
            <ProductVisual>
              {data.ours.visualImage ? (
                <img src={data.ours.visualImage} alt={data.productName} />
              ) : (
                <VisualPlaceholder>
                  <span>Místo pro obrázek</span>
                  <span>{data.productName}</span>
                </VisualPlaceholder>
              )}
            </ProductVisual>
            <Card $featured>
              <CardTitle $variant="ours">{data.ours.ingredientCountLabel}</CardTitle>
              <IngredientList>
                {data.ours.ingredients.map((item) => (
                  <IngredientRow key={item.name}>
                    <IngredientDot $tone="gold" aria-hidden />
                    <GradeBadge $variant="ours">{item.grade}</GradeBadge>
                    <IngredientName>{item.name}</IngredientName>
                    <IngredientMeta>
                      <IngredientPercent $variant="ours">{item.percent}</IngredientPercent>
                      {'note' in item && item.note ? (
                        <IngredientNote>{item.note}</IngredientNote>
                      ) : null}
                    </IngredientMeta>
                  </IngredientRow>
                ))}
              </IngredientList>
              <CardSummary>{data.ours.summary}</CardSummary>
            </Card>
          </Column>
        </CompareRow>

        <Cta href={data.cta.href}>{data.cta.label} →</Cta>
      </Inner>
    </Section>
  )
}
