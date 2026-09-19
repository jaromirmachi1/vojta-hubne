export type NewsletterOffer = 'discount' | 'herohero'
export type NewsletterSource = 'popup' | 'footer' | 'klub'

type SubscribeOptions = {
  offer?: NewsletterOffer
  source?: NewsletterSource
  name?: string
}

export async function subscribeToNewsletter(
  email: string,
  options: SubscribeOptions = {},
): Promise<void> {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name: options.name,
      offer: options.offer,
      source: options.source ?? 'footer',
    }),
  })

  if (!response.ok) {
    throw new Error('Newsletter signup failed')
  }
}
