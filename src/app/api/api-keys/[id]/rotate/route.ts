import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateApiKey, hashApiKey } from '@/lib/api-keys'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existingKey = await prisma.apiKey.findUnique({
      where: { id: params.id },
      include: { shop: true },
    })

    if (!existingKey || existingKey.shop.ownerId !== userId) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 })
    }

    const newApiKey = generateApiKey()
    const hashedKey = await hashApiKey(newApiKey)

    const updatedKey = await prisma.apiKey.update({
      where: { id: params.id },
      data: {
        hashedKey,
        lastRotated: new Date(),
      },
    })

    return NextResponse.json({
      apiKey: {
        id: updatedKey.id,
        key: newApiKey,
        name: updatedKey.name,
        lastRotated: updatedKey.lastRotated,
      },
    })
  } catch (error) {
    console.error('Rotate API key error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
