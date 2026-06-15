import styled from 'styled-components'
import {
  ALT_SECTION_IDS,
  customerPaths,
  getPathCollectionUrl,
} from '../../data/altHomepage'
import { Reveal } from './motion'
import { AltInner, AltSection, GhostButton, SectionTitle } from './shared'

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }
`

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100%;
  padding: clamp(1.35rem, 3vw, 1.75rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: 0 0 0 1px rgba(238, 220, 130, 0.12);
  }
`

const CardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3vw, 1.85rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const CardText = styled.p`
  margin: 0;
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

const CardCta = styled(GhostButton)`
  align-self: flex-start;
  margin-top: auto;
`

export function CustomerPaths() {
  return (
    <AltSection id={ALT_SECTION_IDS.customerPaths}>
      <AltInner>
        <Reveal>
          <SectionTitle>Tři cesty — vyber si tu svou</SectionTitle>
        </Reveal>
        <Grid>
          {customerPaths.map((path, index) => (
            <Reveal key={path.id} delay={index * 0.08}>
              <Card>
                <CardTitle>{path.headline}</CardTitle>
                <CardText>{path.subtext}</CardText>
                <CardCta href={getPathCollectionUrl(path.collectionHandle)}>
                  {path.cta}
                </CardCta>
              </Card>
            </Reveal>
          ))}
        </Grid>
      </AltInner>
    </AltSection>
  )
}
