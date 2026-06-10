export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = 'smooth',
) {
  const element = document.getElementById(sectionId)
  if (!element) return false

  element.scrollIntoView({ behavior, block: 'start' })
  return true
}
