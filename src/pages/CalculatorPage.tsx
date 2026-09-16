import { useId, useState, type FormEvent } from 'react'
import styled, { keyframes } from 'styled-components'
import { PageContainer } from '../components/PageContainer'
import { calculatorFaqs } from '../data/calculatorFaqs'
import { usePageMeta } from '../hooks/usePageMeta'
import { ShopLayout } from '../layouts/ShopLayout'
import { calculatorPageMeta } from '../seo/calculatorPageMeta'
import {
  ACTIVITY_OPTIONS,
  calculateProfile,
  fmt,
  fmtIndex,
  type KalkulackaGoal,
  type KalkulackaResult,
  type KalkulackaSex,
} from '../utils/kalkulacka'

const DEFAULT_RESULT = calculateProfile({
  sex: 'female',
  age: 51,
  height: 156,
  weight: 95,
  waist: null,
  activity: 1.25,
  goal: 'lose',
})

const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
  padding-bottom: clamp(4rem, 10vw, 6rem);
`

const Inner = styled(PageContainer)`
  display: grid;
  gap: clamp(2rem, 5vw, 3rem);
`

const Hero = styled.header`
  display: grid;
  gap: 0.85rem;
  max-width: 42rem;
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.4rem, 7vw, 4rem);
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  text-wrap: balance;
`

const Lead = styled.p`
  margin: 0;
  font-size: clamp(1rem, 2.2vw, 1.125rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 38rem;
`

const PrivacyNote = styled.p`
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const CalcGrid = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
  }
`

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1.35rem, 3.5vw, 2rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const ResultPanel = styled(Panel)<{ $invalid?: boolean }>`
  border-color: ${({ theme, $invalid }) =>
    $invalid ? 'rgba(255, 120, 120, 0.45)' : theme.colors.border};
  background:
    linear-gradient(155deg, rgba(238, 220, 130, 0.12), rgba(238, 220, 130, 0.02) 50%),
    ${({ theme }) => theme.colors.surfaceRaised};
  opacity: ${({ $invalid }) => ($invalid ? 0.55 : 1)};
  transition:
    opacity 220ms cubic-bezier(0.23, 1, 0.32, 1),
    border-color 220ms ease-out;
`

const PanelTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.55rem, 3vw, 2rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Form = styled.form`
  display: grid;
  gap: 1.1rem;
`

const Fieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  display: grid;
  gap: 0.55rem;
`

const Legend = styled.legend`
  padding: 0;
  margin-bottom: 0.35rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Segmented = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
`

const Segment = styled.label<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.55rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.borderSubtle};
  background: ${({ $active }) =>
    $active ? 'rgba(238, 220, 130, 0.14)' : 'rgba(255, 255, 255, 0.03)'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.gold : theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
    border-color 160ms ease-out,
    background 160ms ease-out,
    color 160ms ease-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
  }

  &:active {
    transform: scale(0.97);
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
`

const FieldGrid = styled.div`
  display: grid;
  gap: 0.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Field = styled.label`
  display: grid;
  gap: 0.4rem;
`

const FieldLabel = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Hint = styled.span`
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: none;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.75;
`

const Input = styled.input`
  width: 100%;
  min-height: 2.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  font-variant-numeric: tabular-nums;
  transition: border-color 160ms ease-out;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }
`

const Select = styled.select`
  width: 100%;
  min-height: 2.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }

  option {
    background: #111;
    color: #fff;
  }
`

const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 3rem;
  margin-top: 0.25rem;
  padding: 0.75rem 1.25rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
    background 160ms ease-out;

  &:hover {
    background: #f5e7a0;
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`

const ErrorBox = styled.p`
  margin: 0;
  padding: 0.75rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid rgba(255, 120, 120, 0.4);
  background: rgba(255, 80, 80, 0.1);
  color: #ffc9c9;
  font-size: 0.9rem;
  line-height: 1.5;
`

const fadeUp = keyframes`
  from {
    opacity: 0.55;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ResultHero = styled.div<{ $animate: boolean }>`
  display: grid;
  gap: 0.35rem;
  animation: ${({ $animate }) => ($animate ? fadeUp : 'none')} 240ms
    cubic-bezier(0.23, 1, 0.32, 1);
`

const ResultEyebrow = styled.p`
  margin: 0;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const DailyKcal = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3rem, 8vw, 4.5rem);
  line-height: 0.9;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.colors.gold};
  font-variant-numeric: tabular-nums;
`

const DailyUnit = styled.span`
  font-size: 0.45em;
  letter-spacing: 0.08em;
  margin-left: 0.15em;
`

const ResultDesc = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};
`

const ResultExplain = styled.p`
  margin: 0.15rem 0 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const EnergyTrack = styled.div`
  margin-top: 0.5rem;
  height: 0.35rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
`

const EnergyFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: 100%;
  transform-origin: left center;
  transform: scaleX(${({ $pct }) => $pct / 100});
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.gold};
  transition: transform 280ms cubic-bezier(0.23, 1, 0.32, 1);
`

const DeficitLabel = styled.p`
  margin: 0.35rem 0 0;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const MetricGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 0.35rem 0 0;
`

const Metric = styled.div<{ $wide?: boolean }>`
  display: grid;
  gap: 0.2rem;
  padding: 0.75rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  ${({ $wide }) => ($wide ? 'grid-column: 1 / -1;' : '')}
`

const MetricLabel = styled.dt`
  margin: 0;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const MetricValue = styled.dd`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text};
`

const MetricHint = styled.span`
  font-size: 0.78rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMuted};
`

const IndicesNote = styled.p`
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const FaqSection = styled.section`
  display: grid;
  gap: 1rem;
`

const FaqTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.55rem, 3vw, 2rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const FaqList = styled.div`
  display: grid;
  gap: 0.45rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem 1rem;
  }
`

const FaqItem = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;

  &[open] summary {
    color: ${({ theme }) => theme.colors.gold};
  }

  summary {
    list-style: none;
    cursor: pointer;
    padding: 0.95rem 1.1rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    transition: color 160ms ease-out;

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      content: '+';
      float: right;
      color: ${({ theme }) => theme.colors.goldMuted};
      font-weight: 400;
    }
  }

  &[open] summary::after {
    content: '−';
  }

  > div {
    padding: 0 1.1rem 1rem;
    font-size: 0.9rem;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.textMuted};

    a {
      color: ${({ theme }) => theme.colors.gold};
      text-underline-offset: 0.15em;
    }
  }
`

type FormState = {
  sex: KalkulackaSex
  age: string
  height: string
  weight: string
  waist: string
  activity: string
  goal: KalkulackaGoal
}

export function CalculatorPage() {
  usePageMeta(calculatorPageMeta)
  const formId = useId()

  const [form, setForm] = useState<FormState>({
    sex: 'female',
    age: '51',
    height: '156',
    weight: '95',
    waist: '',
    activity: '1.25',
    goal: 'lose',
  })
  const [result, setResult] = useState<KalkulackaResult>(DEFAULT_RESULT)
  const [error, setError] = useState<string | null>(null)
  const [invalid, setInvalid] = useState(false)
  const [animateTick, setAnimateTick] = useState(0)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const waistRaw = form.waist.trim()
      const waist = waistRaw === '' ? null : Number(waistRaw.replace(',', '.'))
      const next = calculateProfile({
        sex: form.sex,
        age: Number(form.age),
        height: Number(form.height.replace(',', '.')),
        weight: Number(form.weight.replace(',', '.')),
        waist,
        activity: Number(form.activity),
        goal: form.goal,
      })
      setResult(next)
      setError(null)
      setInvalid(false)
      setAnimateTick((n) => n + 1)

      if (window.matchMedia('(max-width: 700px)').matches) {
        document.getElementById('kalkulacka-vysledek')?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'instant'
            : 'smooth',
          block: 'start',
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kontrola vstupů selhala.')
      setInvalid(true)
    }
  }

  const energyPct = result.actualGoal === 'lose' ? 85 : 100

  return (
    <ShopLayout
      breadcrumbs={[
        { label: 'Domů', to: '/' },
        { label: 'Kalkulačka' },
      ]}
    >
      <Section>
        <Inner>
          <Hero>
            <Title>Kolik jíst při hubnutí?</Title>
            <Lead>
              Začněte svými čísly. Získejte orientační denní příjem, BMI a BRI.
            </Lead>
            <PrivacyNote>Údaje se neukládají. Výpočet probíhá jen u vás.</PrivacyNote>
          </Hero>

          <CalcGrid>
            <Panel>
              <PanelTitle>Vaše čísla</PanelTitle>
              <Form id={formId} onSubmit={onSubmit} noValidate>
                <Fieldset>
                  <Legend>Pohlaví</Legend>
                  <Segmented>
                    {(
                      [
                        ['female', 'Žena'],
                        ['male', 'Muž'],
                      ] as const
                    ).map(([value, label]) => (
                      <Segment key={value} $active={form.sex === value}>
                        <input
                          type="radio"
                          name="sex"
                          value={value}
                          checked={form.sex === value}
                          onChange={() => setForm((f) => ({ ...f, sex: value }))}
                        />
                        {label}
                      </Segment>
                    ))}
                  </Segmented>
                </Fieldset>

                <FieldGrid>
                  <Field>
                    <FieldLabel>Věk (let)</FieldLabel>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={18}
                      max={100}
                      step={1}
                      required
                      value={form.age}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, age: e.target.value }))
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Výška (cm)</FieldLabel>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min={130}
                      max={230}
                      step={0.1}
                      required
                      value={form.height}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, height: e.target.value }))
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Hmotnost (kg)</FieldLabel>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min={35}
                      max={250}
                      step={0.1}
                      required
                      value={form.weight}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, weight: e.target.value }))
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel>
                      Obvod pasu (cm){' '}
                      <Hint>· nepovinné · pro BRI</Hint>
                    </FieldLabel>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min={40}
                      max={250}
                      step={0.1}
                      placeholder="např. 92"
                      value={form.waist}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, waist: e.target.value }))
                      }
                    />
                  </Field>
                </FieldGrid>

                <Field>
                  <FieldLabel>Kolik máte běžně pohybu?</FieldLabel>
                  <Select
                    value={form.activity}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, activity: e.target.value }))
                    }
                  >
                    {ACTIVITY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Fieldset>
                  <Legend>Cíl</Legend>
                  <Segmented>
                    {(
                      [
                        ['lose', 'Chci hubnout'],
                        ['maintain', 'Udržet váhu'],
                      ] as const
                    ).map(([value, label]) => (
                      <Segment key={value} $active={form.goal === value}>
                        <input
                          type="radio"
                          name="goal"
                          value={value}
                          checked={form.goal === value}
                          onChange={() => setForm((f) => ({ ...f, goal: value }))}
                        />
                        {label}
                      </Segment>
                    ))}
                  </Segmented>
                </Fieldset>

                {error ? <ErrorBox role="alert">{error}</ErrorBox> : null}

                <Submit type="submit">Spočítat příjem, BMI a BRI ↗</Submit>
              </Form>
            </Panel>

            <ResultPanel id="kalkulacka-vysledek" $invalid={invalid}>
              <ResultHero key={animateTick} $animate={animateTick > 0}>
                <ResultEyebrow>
                  {result.needsIndividualPlan
                    ? 'Orientační udržovací příjem'
                    : 'Váš orientační start'}
                </ResultEyebrow>
                <DailyKcal>
                  {fmt(result.intake)}
                  <DailyUnit>kcal</DailyUnit>
                </DailyKcal>
                <ResultDesc>
                  {result.needsIndividualPlan
                    ? 'Pro snížení příjmu zvolte individuální konzultaci'
                    : 'Denní příjem, od kterého můžete začít'}
                </ResultDesc>
                <ResultExplain>
                  {result.needsIndividualPlan
                    ? 'Při podváze nebo nízkém vypočteném příjmu nenavrhujeme automatický deficit.'
                    : result.actualGoal === 'lose'
                      ? 'Mírný deficit, který nechává prostor na normální jídlo.'
                      : 'Odhad příjmu pro udržení vaší současné hmotnosti.'}
                </ResultExplain>
                <EnergyTrack aria-hidden>
                  <EnergyFill $pct={energyPct} />
                </EnergyTrack>
                <DeficitLabel>
                  {result.actualGoal === 'lose'
                    ? 'Přibližně 15 % pod výdejem'
                    : 'Příjem odpovídá odhadu výdeje'}
                </DeficitLabel>
              </ResultHero>

              <MetricGrid>
                <Metric>
                  <MetricLabel>Cíl</MetricLabel>
                  <MetricValue>
                    {result.actualGoal === 'lose' ? 'Pro hubnutí' : 'Pro udržení'}
                  </MetricValue>
                </Metric>
                <Metric>
                  <MetricLabel>Klidový výdej</MetricLabel>
                  <MetricValue>{fmt(result.resting)} kcal</MetricValue>
                </Metric>
                <Metric>
                  <MetricLabel>Odhad výdeje</MetricLabel>
                  <MetricValue>{fmt(result.total)} kcal</MetricValue>
                </Metric>
                <Metric>
                  <MetricLabel>BMI</MetricLabel>
                  <MetricValue>
                    {fmtIndex(result.bmi)}{' '}
                    <MetricHint>{result.bmiCategory}</MetricHint>
                  </MetricValue>
                </Metric>
                <Metric $wide>
                  <MetricLabel>BRI</MetricLabel>
                  <MetricValue>
                    {result.bri === null ? '—' : fmtIndex(result.bri)}{' '}
                    <MetricHint>
                      {result.bri === null
                        ? 'Doplňte obvod pasu'
                        : `Index podle pasu ${fmt(result.waist!)} cm`}
                    </MetricHint>
                  </MetricValue>
                </Metric>
              </MetricGrid>

              <IndicesNote>
                Orientační ukazatele stavby těla. Co výsledky znamenají? Viz
                otázky níže.
              </IndicesNote>
            </ResultPanel>
          </CalcGrid>

          <FaqSection>
            <FaqTitle>Časté otázky</FaqTitle>
            <FaqList>
              {calculatorFaqs.map((item) => (
                <FaqItem key={item.question}>
                  <summary>{item.question}</summary>
                  <div>{item.answer}</div>
                </FaqItem>
              ))}
            </FaqList>
          </FaqSection>
        </Inner>
      </Section>
    </ShopLayout>
  )
}
