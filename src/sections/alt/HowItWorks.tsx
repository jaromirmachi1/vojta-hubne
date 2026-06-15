import styled from 'styled-components'
import { ALT_SECTION_IDS, howItWorksSteps } from '../../data/altHomepage'
import { Reveal } from './motion'
import { AltInner, AltSection, SectionTitle } from './shared'

const Steps = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1.25rem;
  }
`

const Step = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const StepIcon = styled.span`
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
`

const StepLabel = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const StepText = styled.p`
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const stepIcons = ['01', '02', '03', '04', '05']

export function HowItWorks() {
  return (
    <AltSection id={ALT_SECTION_IDS.howItWorks}>
      <AltInner>
        <Reveal>
          <SectionTitle>Jak to funguje</SectionTitle>
        </Reveal>
        <Steps>
          {howItWorksSteps.map((step, index) => (
            <Step key={step.id}>
              <Reveal delay={index * 0.08}>
                <StepContent>
                  <StepIcon aria-hidden>{stepIcons[index]}</StepIcon>
                  <StepLabel>{step.label}</StepLabel>
                  <StepText>{step.description}</StepText>
                </StepContent>
              </Reveal>
            </Step>
          ))}
        </Steps>
      </AltInner>
    </AltSection>
  )
}
