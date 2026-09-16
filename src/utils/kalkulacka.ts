export type KalkulackaSex = 'female' | 'male'
export type KalkulackaGoal = 'lose' | 'maintain'

export type KalkulackaProfile = {
  sex: KalkulackaSex
  age: number
  height: number
  weight: number
  waist: number | null
  activity: number
  goal: KalkulackaGoal
}

export type KalkulackaResult = KalkulackaProfile & {
  resting: number
  total: number
  intake: number
  bmi: number
  bmiCategory: string
  bri: number | null
  needsIndividualPlan: boolean
  actualGoal: KalkulackaGoal
  deficitPercent: number
}

export const ACTIVITY_OPTIONS = [
  { value: 1.25, label: 'Málo pohybu · převážně sedím' },
  { value: 1.4, label: 'Lehký pohyb · chodím, občas cvičím' },
  { value: 1.55, label: 'Pravidelný pohyb · cvičím 3–4× týdně' },
  { value: 1.7, label: 'Hodně pohybu · aktivní práce i sport' },
] as const

export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Podváha'
  if (bmi < 25) return 'Běžné rozmezí'
  if (bmi < 30) return 'Nadváha'
  if (bmi < 35) return 'Obezita I. stupně'
  if (bmi < 40) return 'Obezita II. stupně'
  return 'Obezita III. stupně'
}

export function calculateBri(waist: number | null | undefined, height: number): number | null {
  if (waist === undefined || waist === null || Number.isNaN(waist as number)) return null
  if (!Number.isFinite(waist) || waist < 40 || waist > 250) {
    throw new Error('Zadejte obvod pasu od 40 do 250 cm, nebo pole nechte prázdné.')
  }
  if (!Number.isFinite(height) || height < 130 || height > 230) {
    throw new Error('Zadejte výšku od 130 do 230 cm.')
  }
  const squaredRatio = (waist / (Math.PI * height)) ** 2
  if (squaredRatio >= 1) {
    throw new Error('Zkontrolujte výšku a obvod pasu.')
  }
  const bri = 364.2 - 365.5 * Math.sqrt(1 - squaredRatio)
  if (bri < 0) {
    throw new Error(
      'Zkontrolujte výšku a obvod pasu. Tato kombinace je mimo rozmezí kalkulačky BRI.',
    )
  }
  return bri
}

export function calculateProfile(profile: KalkulackaProfile): KalkulackaResult {
  const { sex, age, height, weight, activity, goal } = profile

  if (!['female', 'male'].includes(sex) || !['lose', 'maintain'].includes(goal)) {
    throw new Error('Vyberte pohlaví a cíl pro výpočet.')
  }
  if (!Number.isFinite(age) || age < 18 || age > 100 || !Number.isInteger(age)) {
    throw new Error('Zadejte věk od 18 do 100 let.')
  }
  if (!Number.isFinite(height) || height < 130 || height > 230) {
    throw new Error('Zadejte výšku od 130 do 230 cm.')
  }
  if (!Number.isFinite(weight) || weight < 35 || weight > 250) {
    throw new Error('Zadejte hmotnost od 35 do 250 kg.')
  }
  if (![1.25, 1.4, 1.55, 1.7].includes(activity)) {
    throw new Error('Vyberte svou běžnou pohybovou aktivitu.')
  }

  const resting = 10 * weight + 6.25 * height - 5 * age + (sex === 'female' ? -161 : 5)
  const total = resting * activity
  const bmi = weight / (height / 100) ** 2
  const bri = calculateBri(profile.waist, height)
  const desired = goal === 'lose' ? total * 0.85 : total
  const floor = sex === 'female' ? 1200 : 1500
  const needsIndividualPlan = bmi < 18.5 || desired < floor
  const actualGoal: KalkulackaGoal = needsIndividualPlan ? 'maintain' : goal
  const intake = Math.round((actualGoal === 'lose' ? desired : total) / 50) * 50

  return {
    ...profile,
    waist: profile.waist ?? null,
    resting: Math.round(resting / 10) * 10,
    total: Math.round(total / 10) * 10,
    intake,
    bmi,
    bmiCategory: bmiCategory(bmi),
    bri,
    needsIndividualPlan,
    actualGoal,
    deficitPercent: actualGoal === 'lose' ? 15 : 0,
  }
}

export const fmt = (n: number) => new Intl.NumberFormat('cs-CZ').format(n)

export const fmtIndex = (n: number) =>
  new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(n)
