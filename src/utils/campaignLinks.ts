/** Append inbound campaign query params to internal/external URLs without overwriting existing keys. */
export function appendCampaignParams(url: string, search: string): string {
  if (!search || search === '?') return url

  const incoming = new URLSearchParams(
    search.startsWith('?') ? search.slice(1) : search,
  )
  if (![...incoming.keys()].length) return url

  if (/^https?:\/\//i.test(url)) {
    try {
      const absolute = new URL(url)
      incoming.forEach((value, key) => {
        if (!absolute.searchParams.has(key)) {
          absolute.searchParams.set(key, value)
        }
      })
      return absolute.toString()
    } catch {
      return url
    }
  }

  const hashIndex = url.indexOf('#')
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : ''
  const withoutHash = hashIndex >= 0 ? url.slice(0, hashIndex) : url
  const qIndex = withoutHash.indexOf('?')
  const pathname = qIndex >= 0 ? withoutHash.slice(0, qIndex) : withoutHash
  const existing = new URLSearchParams(
    qIndex >= 0 ? withoutHash.slice(qIndex + 1) : '',
  )

  incoming.forEach((value, key) => {
    if (!existing.has(key)) existing.set(key, value)
  })

  const query = existing.toString()
  return `${pathname}${query ? `?${query}` : ''}${hash}`
}
