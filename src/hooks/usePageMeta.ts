import { useEffect } from 'react'
import { applyPageMeta, type PageMetaInput } from '../seo/applyPageMeta'

export function usePageMeta(meta: PageMetaInput) {
  const {
    title,
    description,
    path = '/',
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    noindex,
  } = meta

  useEffect(() => {
    applyPageMeta({
      title,
      description,
      path,
      image,
      imageAlt,
      imageWidth,
      imageHeight,
      noindex,
    })
  }, [
    title,
    description,
    path,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    noindex,
  ])
}
