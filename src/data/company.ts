/** Official business details — RM Solution Group s.r.o. */
export const companyInfo = {
  name: 'RM Solution Group s.r.o.',
  ico: '29615551',
  dic: 'CZ29615551',
  vatStatus: 'Nejsme plátci DPH.',
  dataBoxId: 'cyauddd',
  address: 'Žabeň 309',
  zipCity: '739 25 Žabeň',
  addressLine: 'Žabeň 309, 739 25 Žabeň',
  /** Public inbox for contact form and site display. */
  email: 'info@vojtahubne.cz',
} as const

/** Contact form inbox — should match INQUIRY_TO_EMAIL on Vercel. */
export const contactFormRecipientEmail = companyInfo.email
