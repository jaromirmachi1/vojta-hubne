import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 1.25rem;
  }
`

const Fact = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.15rem 1.1rem;
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const FactTitle = styled.b`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`

const FactText = styled.p`
  margin: 0.5rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 0.95rem;
`

export function FactsGrid({
  items,
}: {
  items: { title: string; text: string }[]
}) {
  return (
    <Grid aria-label="Přehled">
      {items.map((item) => (
        <Fact key={item.title}>
          <FactTitle>{item.title}</FactTitle>
          <FactText>{item.text}</FactText>
        </Fact>
      ))}
    </Grid>
  )
}

