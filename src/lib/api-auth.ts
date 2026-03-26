import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { extractApiKeyFromHeader, verifyApiKey } from '@/lib/api-keys'
import { checkRateLimit } from '@/lib/rate-limit'

export async function verifyApiKeyAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const apiKey = extractApiKeyFromHeader(authHeader)
  
  if (!apiKey) {
    return {
      success: false,
      error: 'API key required',
      status: 401,
    }
  }

  const apiKeys = await prisma.apiKey.findMany({
    where: { active: true },
  })

  let matchedApiKey = null
  for (const key of apiKeys) {
    if (await verifyApiKey(apiKey, key.hashedKey)) {
      matchedApiKey = key
      break
    }
  }

  if (!matchedApiKey) {
    return {
      success: false,
      error: 'Invalid API key',
      status: 401,
    }
  }

  await prisma.apiKey.update({
    where: { id: matchedApiKey.id },
    data: { lastUsedAt: new Date() },
  })

  const rateLimitResult = await checkRateLimit(`api:${matchedApiKey.id}`)
  if (!rateLimitResult.success) {
    return {
      success: false,
      error: 'Rate limit exceeded',
      status: 429,
    }
  }

  return {
    success: true,
    apiKey: matchedApiKey,
    shopId: matchedApiKey.shopId,
  }
}

export async function verifySessionAuth(request: NextRequest) {
  const token = request.cookies.get('session')?.value
  
  if (!token) {
    return {
      success: false,
      error: 'Unauthorized',
      status: 401,
    }
  }

  const { verifyToken } = await import('@/lib/auth')
  const payload = await verifyToken(token)
  
  if (!payload) {
    return {
      success: false,
      error: 'Invalid token',
      status: 401,
    }
  }

  const rateLimitResult = await checkRateLimit(`user:${payload.userId}`)
  if (!rateLimitResult.success) {
    return {
      success: false,
      error: 'Rate limit exceeded',
      status: 429,
    }
  }

  return {
    success: true,
    userId: payload.userId,
  }
}

export function createAuthResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}
