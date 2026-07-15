import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import {
  fetchJudgeMeReviews,
  getJudgeMeConfigFromEnv,
} from './api/_lib/judgemeReviews'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'judgeme-reviews-dev-api',
        configureServer(server) {
          server.middlewares.use(async (request, response, next) => {
            if (
              request.method !== 'GET' ||
              !request.url?.startsWith('/api/judgeme-reviews')
            ) {
              next()
              return
            }

            const config = getJudgeMeConfigFromEnv(env)

            if (!config) {
              response.statusCode = 503
              response.setHeader('Content-Type', 'application/json')
              response.end(
                JSON.stringify({
                  ok: false,
                  message:
                    'Add JUDGEME_PRIVATE_API_TOKEN to .env for local reviews',
                }),
              )
              return
            }

            try {
              const reviews = await fetchJudgeMeReviews(config)
              response.statusCode = 200
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ ok: true, reviews }))
            } catch (error) {
              console.error('Judge.me dev API failed', error)
              response.statusCode = 502
              response.setHeader('Content-Type', 'application/json')
              response.end(
                JSON.stringify({
                  ok: false,
                  message: 'Reviews are temporarily unavailable',
                }),
              )
            }
          })
        },
      },
    ],
  }
})
