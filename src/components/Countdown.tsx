import styled from 'styled-components'
import type { CountdownValues } from '../hooks/useCountdown'

const Grid = styled.div<{ $compact?: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, minmax(${({ $compact }) => ($compact ? '3.25rem' : '4.5rem')}, 1fr));
  gap: ${({ $compact }) => ($compact ? 'clamp(0.5rem, 2vw, 0.75rem)' : 'clamp(0.75rem, 3vw, 1.5rem)')};
  width: 100%;
`

const Unit = styled.div<{ $compact?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: ${({ $compact }) => ($compact ? '0.65rem 0.35rem' : '1rem 0.5rem')};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const Value = styled.span<{ $compact?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $compact }) =>
    $compact ? 'clamp(1.75rem, 6vw, 2.75rem)' : 'clamp(2.5rem, 10vw, 4rem)'};
  line-height: 1;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.gold};
`

const Label = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`

type CountdownProps = {
  values: CountdownValues
  compact?: boolean
}

const units: { key: keyof Pick<CountdownValues, 'days' | 'hours' | 'minutes' | 'seconds'>; label: string }[] = [
  { key: 'days', label: 'Dní' },
  { key: 'hours', label: 'Hodin' },
  { key: 'minutes', label: 'Minut' },
  { key: 'seconds', label: 'Sekund' },
]

function pad(value: number) {
  return String(value).padStart(2, '0')
}

export function Countdown({ values, compact = false }: CountdownProps) {
  return (
    <Grid role="timer" aria-live="polite" $compact={compact}>
      {units.map(({ key, label }) => (
        <Unit key={key} $compact={compact}>
          <Value $compact={compact}>{pad(values[key])}</Value>
          <Label>{label}</Label>
        </Unit>
      ))}
    </Grid>
  )
}
