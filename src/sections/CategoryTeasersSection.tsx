import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PageContainer } from '../components/PageContainer'

const teasers = [
  {
    title: 'Doplňky stravy',
    text: 'GLP-1 Support — kapsle pro energii, spalování a kontrolu chuti.',
    href: '/homepage#produkty',
  },
  {
    title: 'Proteiny & shaky',
    text: 'Lean Shake GLP-1 — 22 g bílkovin, vláknina a vitamíny v jedné dávce.',
    href: '/homepage#produkty',
  },
  {
    title: 'Péče o tělo',
    text: 'Regenerační krémy s GHK-Cu pro prokrvení a obnovu pokožky.',
    href: '/homepage#produkty',
  },
]

const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
`

const Inner = styled(PageContainer)``

const Title = styled.h2`
  margin: 0 0 2rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 10rem;
  padding: 1.5rem;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.surfaceRaised} 0%,
    ${({ theme }) => theme.colors.black} 100%
  );
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-2px);
  }
`

const CardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const CardText = styled.p`
  margin: 0;
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

const CardCta = styled.span`
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

export function CategoryTeasersSection() {
  return (
    <Section>
      <Inner>
        <Title>Prozkoumej kategorie</Title>
        <Grid>
          {teasers.map((teaser) => (
            <Card key={teaser.title} to={teaser.href}>
              <CardTitle>{teaser.title}</CardTitle>
              <CardText>{teaser.text}</CardText>
              <CardCta>Zobrazit produkty →</CardCta>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}
