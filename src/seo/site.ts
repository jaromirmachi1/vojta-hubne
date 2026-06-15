/** Canonical marketing site URL (Vercel). */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ??
  'https://www.vojtahubne.cz'

export const SITE_NAME = 'Vojta Hubne'

export const SITE_LOCALE = 'cs_CZ'

/** Public path — file lives in public/og/ (source: src/assets/ogimage.png). */
export const DEFAULT_OG_IMAGE_PATH = '/og/ogimage.png'

export const DEFAULT_OG_IMAGE_ALT =
  'Vojta Hubne — GLP-1 Support, Lean Shake a prémiové doplňky pro transformaci'

export const DEFAULT_OG_IMAGE_WIDTH = 930
export const DEFAULT_OG_IMAGE_HEIGHT = 984

export function getAbsoluteUrl(path = ''): string {
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function getDefaultOgImageUrl(): string {
  return getAbsoluteUrl(DEFAULT_OG_IMAGE_PATH)
}
