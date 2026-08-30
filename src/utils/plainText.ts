export function toPlainText(value: string | null | undefined, maxLength = 110): string {
  if (!value) return ''

  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

export function formatReviewCount(count: number): string {
  if (count === 1) return '1 recenze'
  if (count >= 2 && count <= 4) return `${count} recenze`
  return `${count} recenzí`
}
