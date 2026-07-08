const DAY_MS = 24 * 60 * 60 * 1000
const DISMISS_COOLDOWN_DAYS = 3
const IMPRESSION_WINDOW_DAYS = 7
const MAX_IMPRESSIONS_PER_WINDOW = 2

const DISMISSED_UNTIL_KEY = 'vh-newsletter-popup-dismissed-until'
const SUBSCRIBED_KEY = 'vh-newsletter-popup-subscribed'
const IMPRESSIONS_KEY = 'vh-newsletter-popup-impressions'
const SESSION_SHOWN_KEY = 'vh-newsletter-popup-shown-session'

function readTimestamp(key: string): number {
  const value = localStorage.getItem(key)
  return value ? Number(value) : 0
}

function writeTimestamp(key: string, value: number): void {
  localStorage.setItem(key, String(value))
}

function getRecentImpressions(now = Date.now()): number[] {
  const windowStart = now - IMPRESSION_WINDOW_DAYS * DAY_MS

  try {
    const impressions = JSON.parse(
      localStorage.getItem(IMPRESSIONS_KEY) || '[]',
    ) as unknown

    if (!Array.isArray(impressions)) return []

    return impressions
      .filter((value): value is number => typeof value === 'number')
      .filter((timestamp) => timestamp >= windowStart)
  } catch {
    return []
  }
}

export function shouldShowNewsletterPopup(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const now = Date.now()

    if (sessionStorage.getItem(SESSION_SHOWN_KEY) === 'true') return false
    if (localStorage.getItem(SUBSCRIBED_KEY) === 'true') return false
    if (readTimestamp(DISMISSED_UNTIL_KEY) > now) return false

    return getRecentImpressions(now).length < MAX_IMPRESSIONS_PER_WINDOW
  } catch {
    return true
  }
}

export function markNewsletterPopupShown(): void {
  if (typeof window === 'undefined') return

  try {
    const now = Date.now()
    const impressions = [...getRecentImpressions(now), now]

    sessionStorage.setItem(SESSION_SHOWN_KEY, 'true')
    localStorage.setItem(IMPRESSIONS_KEY, JSON.stringify(impressions))
  } catch {
    // Ignore storage failures — popup can still be shown.
  }
}

export function markNewsletterPopupDismissed(): void {
  if (typeof window === 'undefined') return

  try {
    writeTimestamp(
      DISMISSED_UNTIL_KEY,
      Date.now() + DISMISS_COOLDOWN_DAYS * DAY_MS,
    )
  } catch {
    // Ignore storage failures — popup may reappear on refresh.
  }
}

export function markNewsletterPopupSubscribed(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(SUBSCRIBED_KEY, 'true')
  } catch {
    // Ignore storage failures — popup may reappear later.
  }
}
