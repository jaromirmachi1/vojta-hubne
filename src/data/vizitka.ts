/** Digital business card — QR → /vizitka */

export const VIZITKA_PATH = '/vizitka'

export const vizitkaContact = {
  firstName: 'Roman',
  lastName: 'Krymlák',
  fullName: 'Roman Krymlák',
  /** Shown under the name */
  role: 'B2B · RM Solution Group s.r.o.',
  organization: 'Vojta Hubne',
  orgLegal: 'RM Solution Group s.r.o.',
  phone: '+420603799722',
  phoneDisplay: '+420 603 799 722',
  email: 'info@vojtahubne.cz',
  website: 'https://www.vojtahubne.cz',
} as const

/** Build a vCard 3.0 string for “Add to contacts”. */
export function buildVizitkaVCard(): string {
  const c = vizitkaContact
  const tel = c.phone.replace(/\s+/g, '')

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCard(c.lastName)};${escapeVCard(c.firstName)};;;`,
    `FN:${escapeVCard(c.fullName)}`,
    `ORG:${escapeVCard(c.organization)};${escapeVCard(c.orgLegal)}`,
    `TITLE:${escapeVCard(c.role)}`,
    `TEL;TYPE=CELL,VOICE:${tel}`,
    `EMAIL;TYPE=INTERNET:${c.email}`,
    `URL:${c.website}`,
    'END:VCARD',
  ].join('\r\n')
}

function escapeVCard(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

export function downloadVizitkaVCard(): void {
  const blob = new Blob([buildVizitkaVCard()], {
    type: 'text/vcard;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'roman-krymlak-vojta-hubne.vcf'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
