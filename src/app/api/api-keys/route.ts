import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateApiKey, hashApiKey } from '@/lib/api-keys'
import { createApiKeySchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const shopId = request.headers.get('x-shop-id')
    const userId = request.headers.get('x-user-id')

    if (!shopId && !userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const shopIdParam = searchParams.get('shop_id')

    const where: any = {}

    if (shopIdParam) {
      where.shopId = shopIdParam
    } else if (shopId) {
      where.shopId = shopId
    }

    const apiKeys = await prisma.apiKey.findMany({
      where,
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            subdomain: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const sanitizedKeys = apiKeys.map((key) => ({
      id: key.id,
      name: key.name,
      shop: key.shop,
      permissions: key.permissions,
      lastUsedAt: key.lastUsedAt,
      lastRotated: key.lastRotated,
      active: key.active,
      createdAt: key.createdAt,
    }))

    return NextResponse.json({ apiKeys: sanitizedKeys })
  } catch (error) {
    console.error('Get API keys error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createApiKeySchema.parse(body)

    const shop = await prisma.shop.findFirst({
      where: {
        id: body.shopId,
        ownerId: userId,
      },
    })

    if (!shop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 })
    }

    const apiKey = generateApiKey()
    const hashedKey = await hashApiKey(apiKey)

    const createdKey = await prisma.apiKey.create({
      data: {
        shopId: body.shopId,
        name: validatedData.name,
        hashedKey,
        permissions: JSON.stringify(validatedData.permissions || {}),
      },
    })

    return NextResponse.json(
      {
        apiKey: {
          id: createdKey.id,
          key: apiKey,
          name: createdKey.name,
          permissions: createdKey.permissions,
          createdAt: createdKey.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create API key error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
