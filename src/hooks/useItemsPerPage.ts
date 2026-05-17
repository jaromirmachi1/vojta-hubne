import { useEffect, useState } from 'react'

function getItemsPerPage(width: number) {
  if (width < 768) return 1
  if (width < 1440) return 2
  return 4
}

export function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    typeof window !== 'undefined' ? getItemsPerPage(window.innerWidth) : 4,
  )

  useEffect(() => {
    const onResize = () => setItemsPerPage(getItemsPerPage(window.innerWidth))
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return itemsPerPage
}
