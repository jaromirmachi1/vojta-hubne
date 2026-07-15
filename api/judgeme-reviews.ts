import type { IncomingMessage, ServerResponse } from 'node:http'
import {
  fetchJudgeMeReviews,
  getJudgeMeConfigFromEnv,
} from '../lib/judgemeReviews'

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: Record<string, unknown>,
) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
}

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
) {
  if (request.method !== 'GET') {
    sendJson(response, 405, { ok: false, message: 'Method not allowed' })
    return
  }

  const config = getJudgeMeConfigFromEnv(process.env)

  if (!config) {
    sendJson(response, 503, {
      ok: false,
      message: 'Judge.me reviews are not configured',
    })
    return
  }

  try {
    const reviews = await fetchJudgeMeReviews(config)

    response.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=86400',
    )
    sendJson(response, 200, { ok: true, reviews })
  } catch (error) {
    console.error('Judge.me reviews request failed', error)
    sendJson(response, 502, {
      ok: false,
      message: 'Reviews are temporarily unavailable',
    })
  }
}
