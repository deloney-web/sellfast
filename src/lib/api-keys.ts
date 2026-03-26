import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

export function generateApiKey(): string {
  const prefix = 'sk_'
  const key = nanoid(32)
  return `${prefix}${key}`
}

export async function hashApiKey(apiKey: string): Promise<string> {
  return bcrypt.hash(apiKey, 12)
}

export async function verifyApiKey(apiKey: string, hashedKey: string): Promise<boolean> {
  return bcrypt.compare(apiKey, hashedKey)
}

export function extractApiKeyFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null
  
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null
  
  return parts[1]
}
