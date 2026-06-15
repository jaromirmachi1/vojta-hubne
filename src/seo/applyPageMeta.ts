import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
  getAbsoluteUrl,
  getDefaultOgImageUrl,
} from './site'

export type PageMetaInput = {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  noindex?: boolean
}

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
): void {
  let element = document.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.href = href
}

export function applyPageMeta({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  imageWidth = DEFAULT_OG_IMAGE_WIDTH,
  imageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  noindex = false,
}: PageMetaInput): void {
  const canonicalUrl = getAbsoluteUrl(path)
  const ogImage = image ?? getDefaultOgImageUrl()
  const ogImageAlt = imageAlt ?? DEFAULT_OG_IMAGE_ALT

  document.title = title

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:url', canonicalUrl)
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:locale', SITE_LOCALE)
  upsertMeta('property', 'og:image', ogImage)
  upsertMeta('property', 'og:image:alt', ogImageAlt)
  upsertMeta('property', 'og:image:width', String(imageWidth))
  upsertMeta('property', 'og:image:height', String(imageHeight))

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', ogImage)
  upsertMeta('name', 'twitter:image:alt', ogImageAlt)

  upsertLink('canonical', canonicalUrl)
}
