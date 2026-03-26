import { RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'api_limit',
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
})

export async function checkRateLimit(identifier: string): Promise<{ success: boolean; remaining: number }> {
  try {
    const result = await rateLimiter.consume(identifier)
    return { success: true, remaining: result.remainingPoints }
  } catch (rateLimiterRes: any) {
    return { success: false, remaining: 0 }
  }
}

export async function resetRateLimit(identifier: string): Promise<void> {
  await rateLimiter.delete(identifier)
}
