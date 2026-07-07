import type { IncomingMessage, ServerResponse } from 'node:http'
import { Resend } from 'resend'

type ContactRequestBody = {
  name?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
  website?: unknown
}

type ResendConfig = {
  apiKey: string
  from: string
  to: string
}

function getRequestBody(request: IncomingMessage): Promise<ContactRequestBody> {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: Record<string, unknown>,
) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(payload))
}

function getResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  const to = process.env.INQUIRY_TO_EMAIL?.trim()

  if (!apiKey || !from || !to) {
    return null
  }

  return { apiKey, from, to }
}

function normalizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function sendContactEmail(
  config: ResendConfig,
  input: {
    name: string
    email: string
    phone: string
    message: string
  },
) {
  const resend = new Resend(config.apiKey)
  const subjectName = input.name || input.email
  const text = [
    'Nová zpráva z kontaktního formuláře na vojtahubne.cz',
    '',
    `Jméno: ${input.name || '—'}`,
    `E-mail: ${input.email}`,
    `Telefon: ${input.phone || '—'}`,
    '',
    'Zpráva:',
    input.message,
  ].join('\n')

  const html = `
    <p>Nová zpráva z kontaktního formuláře na <strong>vojtahubne.cz</strong>.</p>
    <p><strong>Jméno:</strong> ${escapeHtml(input.name || '—')}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(input.phone || '—')}</p>
    <p><strong>Zpráva:</strong></p>
    <p>${escapeHtml(input.message).replaceAll('\n', '<br>')}</p>
  `.trim()

  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: input.email,
    subject: `Kontakt — Vojta Hubne (${subjectName})`,
    text,
    html,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
) {
  if (request.method !== 'POST') {
    sendJson(response, 405, { ok: false, message: 'Method not allowed' })
    return
  }

  const resendConfig = getResendConfig()
  if (!resendConfig) {
    sendJson(response, 503, { ok: false, message: 'not configured' })
    return
  }

  try {
    const body = await getRequestBody(request)

    if (normalizeText(body.website, 200)) {
      sendJson(response, 200, { ok: true })
      return
    }

    const email = normalizeEmail(body.email)
    const message = normalizeText(body.message, 5000)

    if (!email) {
      sendJson(response, 400, { ok: false, message: 'Enter a valid email' })
      return
    }

    if (message.length < 10) {
      sendJson(response, 400, {
        ok: false,
        message: 'Message is too short',
      })
      return
    }

    await sendContactEmail(resendConfig, {
      name: normalizeText(body.name, 120),
      email,
      phone: normalizeText(body.phone, 40),
      message,
    })

    sendJson(response, 200, { ok: true })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Contact form failed'

    sendJson(response, 500, { ok: false, message })
  }
}
