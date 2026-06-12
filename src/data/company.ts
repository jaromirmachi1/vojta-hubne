/** Official business details — RM Solution Group s.r.o. */
export const companyInfo = {
  name: 'RM Solution Group s.r.o.',
  ico: '29615551',
  address: 'Žabeň 309',
  zipCity: '739 25 Žabeň',
  addressLine: 'Žabeň 309, 739 25 Žabeň',
  /** Public inbox + contact form delivery (Shopify Admin store email must match). */
  email: 'info@vojtahubne.cz',
} as const

/** Contact form submissions are emailed here via Shopify /contact. */
export const contactFormRecipientEmail = companyInfo.email
