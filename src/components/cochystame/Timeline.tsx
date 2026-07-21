import styled from 'styled-components'

const List = styled.ol`
  display: grid;
  gap: 1.2rem;
  margin: 1.25rem 0 0;
  padding: 0;
`

const Step = styled.li<{ $done?: boolean }>`
  display: grid;
  grid-template-columns: 2.35rem 1fr;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  &:first-child {
    border-top: 0;
    padding-top: 0;
  }
`

const Index = styled.span<{ $done?: boolean }>`
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 50%;
  border: 1px solid #444;
  color: #8d8b82;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  ${({ $done, theme }) =>
    $done
      ? `
        background: ${theme.colors.gold};
        border-color: ${theme.colors.gold};
        color: ${theme.colors.black};
      `
      : ''}
`

const Content = styled.div`
  display: grid;
  gap: 0.35rem;
`

const StepTitle = styled.b`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 400;
`

const StepText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 0.95rem;
`

export function Timeline({
  steps,
}: {
  steps: { title: string; text: string; done?: boolean }[]
}) {
  return (
    <List aria-label="Průběh vývoje">
      {steps.map((step, index) => (
        <Step key={step.title} $done={step.done}>
          <Index $done={step.done}>{String(index + 1).padStart(2, '0')}</Index>
          <Content>
            <StepTitle>{step.title}</StepTitle>
            <StepText>{step.text}</StepText>
          </Content>
        </Step>
      ))}
    </List>
  )
}

