import type { IncomingMessage, ServerResponse } from 'node:http'
import { Resend } from 'resend'

type AffiliateRequestBody = {
  name?: unknown
  email?: unknown
  phone?: unknown
  instagram?: unknown
  tiktok?: unknown
  youtube?: unknown
  followers?: unknown
  avgLikes?: unknown
  gender?: unknown
  ageGroup?: unknown
  focus?: unknown
  message?: unknown
  honeypot?: unknown
}

type ResendConfig = {
  apiKey: string
  from: string
  to: string
}

function getRequestBody(request: IncomingMessage): Promise<AffiliateRequestBody> {
  return new Promise((resolve, reject) => {
    let body = ''
    request.on('data', (chunk) => { body += chunk })
    request.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}) }
      catch (error) { reject(error) }
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
  if (!apiKey || !from || !to) return null
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

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 12px 6px 0;font-weight:600;color:#7a6a1a;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#111111">${escapeHtml(value || '—')}</td>
  </tr>`
}

type AffiliateInput = {
  name: string
  email: string
  phone: string
  instagram: string
  tiktok: string
  youtube: string
  followers: string
  avgLikes: string
  gender: string
  ageGroup: string
  focus: string
  message: string
}

async function sendAffiliateEmail(config: ResendConfig, input: AffiliateInput) {
  const resend = new Resend(config.apiKey)

  const text = [
    'Nová přihláška ke spolupráci — vojtahubne.cz',
    '',
    `Jméno:          ${input.name || '—'}`,
    `E-mail:         ${input.email}`,
    `Telefon:        ${input.phone || '—'}`,
    '',
    'Sociální sítě:',
    `  Instagram:    ${input.instagram || '—'}`,
    `  TikTok:       ${input.tiktok || '—'}`,
    `  YouTube:      ${input.youtube || '—'}`,
    '',
    'Komunita:',
    `  Sledující:    ${input.followers || '—'}`,
    `  Průměr lajků: ${input.avgLikes || '—'}`,
    `  Pohlaví:      ${input.gender || '—'}`,
    `  Věk:          ${input.ageGroup || '—'}`,
    `  Zaměření:     ${input.focus || '—'}`,
    '',
    'Zpráva:',
    input.message || '—',
  ].join('\n')

  const html = `
    <!DOCTYPE html>
    <html lang="cs">
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,sans-serif">
      <div style="max-width:600px;margin:0 auto;padding:32px 16px">

        <!-- Header -->
        <div style="background:#111111;border-radius:10px 10px 0 0;padding:24px 28px">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#c9b56a">
            Vojta Hubne
          </p>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#eedc82">
            Nová přihláška ke spolupráci
          </h1>
        </div>

        <!-- Body -->
        <div style="background:#ffffff;border-radius:0 0 10px 10px;padding:28px;border:1px solid #e5e5e5;border-top:0">

          <!-- Kontakt -->
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7a6a1a;font-weight:600">
            Kontakt
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${row('Jméno', input.name)}
            ${row('E-mail', input.email)}
            ${row('Telefon', input.phone)}
          </table>

          <!-- Sociální sítě -->
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7a6a1a;font-weight:600">
            Sociální sítě
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${row('Instagram', input.instagram)}
            ${row('TikTok', input.tiktok)}
            ${row('YouTube', input.youtube)}
          </table>

          <!-- Komunita -->
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7a6a1a;font-weight:600">
            Komunita
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${row('Počet sledujících', input.followers)}
            ${row('Průměr lajků', input.avgLikes)}
            ${row('Pohlaví sledujících', input.gender)}
            ${row('Věková skupina', input.ageGroup)}
            ${row('Zaměření', input.focus)}
          </table>

          ${input.message ? `
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7a6a1a;font-weight:600">
            Zpráva
          </p>
          <p style="margin:0 0 24px;line-height:1.65;color:#111111">
            ${escapeHtml(input.message).replaceAll('\n', '<br>')}
          </p>
          ` : ''}

          <p style="margin:24px 0 0;font-size:12px;color:#999999">
            Odesláno přes formulář na vojtahubne.cz/spoluprace
          </p>
        </div>

      </div>
    </body>
    </html>
  `.trim()

  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: input.email,
    subject: `Spolupráce — přihláška od ${input.name || input.email}`,
    text,
    html,
  })

  if (error) throw new Error(error.message)
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

    // honeypot — silently accept but don't send
    if (normalizeText(body.honeypot, 200)) {
      sendJson(response, 200, { ok: true })
      return
    }

    const email = normalizeEmail(body.email)
    if (!email) {
      sendJson(response, 400, { ok: false, message: 'Enter a valid email' })
      return
    }

    const name = normalizeText(body.name, 120)
    if (!name) {
      sendJson(response, 400, { ok: false, message: 'Name is required' })
      return
    }

    await sendAffiliateEmail(resendConfig, {
      name,
      email,
      phone: normalizeText(body.phone, 40),
      instagram: normalizeText(body.instagram, 200),
      tiktok: normalizeText(body.tiktok, 200),
      youtube: normalizeText(body.youtube, 200),
      followers: normalizeText(body.followers, 60),
      avgLikes: normalizeText(body.avgLikes, 60),
      gender: normalizeText(body.gender, 40),
      ageGroup: normalizeText(body.ageGroup, 40),
      focus: normalizeText(body.focus, 80),
      message: normalizeText(body.message, 3000),
    })

    sendJson(response, 200, { ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Affiliate form failed'
    sendJson(response, 500, { ok: false, message })
  }
}
