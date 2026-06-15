import { useEffect } from 'react'

export function useJsonLd(id: string, data: Record<string, unknown> | null) {
  useEffect(() => {
    if (!data) return

    let script = document.getElementById(id) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(data)

    return () => {
      script?.remove()
    }
  }, [data, id])
}
