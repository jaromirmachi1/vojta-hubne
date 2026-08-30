import styled from 'styled-components'
import { PageContainer } from '../components/PageContainer'
import {
  supplementChecklistCopy,
  supplementChecklistQuestions,
} from '../data/supplementChecklist'

const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(PageContainer)`
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: start;
    gap: clamp(2.5rem, 5vw, 4rem);
  }
`

const Header = styled.header`
  max-width: 24rem;
`

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  line-height: 0.95;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.75rem, 3vw, 2.25rem);
  min-width: 0;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
`

const Item = styled.li`
  margin: 0;
  padding: 0.15rem 0 0.15rem 1.15rem;
  border-left: 2px solid ${({ theme }) => theme.colors.gold};
  font-size: clamp(0.95rem, 2.2vw, 1.05rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

const Approach = styled.aside`
  padding: clamp(1.35rem, 3vw, 1.75rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const ApproachTitle = styled.h3`
  margin: 0 0 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const ApproachLead = styled.p`
  margin: 0 0 0.85rem;
  font-size: clamp(0.95rem, 2.2vw, 1.05rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.white};
`

const ApproachNote = styled.p`
  margin: 0;
  font-size: clamp(0.92rem, 2vw, 1rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

export function SupplementChecklistSection() {
  return (
    <Section aria-labelledby="supplement-checklist-title">
      <Inner>
        <Header>
          <Title id="supplement-checklist-title">
            {supplementChecklistCopy.title}
          </Title>
        </Header>

        <Content>
          <List>
            {supplementChecklistQuestions.map((question) => (
              <Item key={question}>{question}</Item>
            ))}
          </List>

          <Approach aria-labelledby="supplement-checklist-approach-title">
            <ApproachTitle id="supplement-checklist-approach-title">
              {supplementChecklistCopy.approachTitle}
            </ApproachTitle>
            <ApproachLead>{supplementChecklistCopy.approachLead}</ApproachLead>
            <ApproachNote>{supplementChecklistCopy.approachNote}</ApproachNote>
          </Approach>
        </Content>
      </Inner>
    </Section>
  )
}
