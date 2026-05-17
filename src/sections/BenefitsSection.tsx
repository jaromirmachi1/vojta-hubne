import styled from 'styled-components'
import { PageContainer } from '../components/PageContainer'

const benefits = [
  {
    title: 'Čisté složení',
    text: 'Transparentní etikety bez zbytečných výplní — víte přesně, co užíváte.',
  },
  {
    title: 'GLP-1 řada',
    text: 'Produkty navržené pro podporu sytosti, metabolismu a každodenní kontrolu.',
  },
  {
    title: 'Regenerace',
    text: 'Krémy s GHK-Cu a Emulfeel® pro pokožku po tréninku i každodenní péči.',
  },
  {
    title: 'Shopify ready',
    text: 'E-shop připravujeme — produkty jsou strukturované pro snadné napojení.',
  },
]

const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
  background: ${({ theme }) => theme.colors.surface};
`

const Inner = styled(PageContainer)``

const Header = styled.header`
  margin-bottom: 2.5rem;
  text-align: center;
`

const Eyebrow = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Card = styled.article`
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const CardTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const CardText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

export function BenefitsSection() {
  return (
    <Section>
      <Inner>
        <Header>
          <Eyebrow>Proč Vojta Hubne</Eyebrow>
          <Title>Základ pro každý den</Title>
        </Header>
        <Grid>
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardTitle>{benefit.title}</CardTitle>
              <CardText>{benefit.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}
