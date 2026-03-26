import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createProductSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const shopId = request.headers.get('x-shop-id')
    const userId = request.headers.get('x-user-id')

    if (!shopId && !userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const shopIdParam = searchParams.get('shop_id')
    const category = searchParams.get('category')
    const isActive = searchParams.get('is_active')

    const where: any = {}

    if (shopIdParam) {
      where.shopId = shopIdParam
    } else if (shopId) {
      where.shopId = shopId
    }

    if (category) {
      where.category = category
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            subdomain: true,
          },
        },
        _count: {
          select: {
            purchases: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Get products error:', error)
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
    const validatedData = createProductSchema.parse(body)

    const shop = await prisma.shop.findFirst({
      where: {
        id: body.shopId,
        ownerId: userId,
      },
    })

    if (!shop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 })
    }

    const product = await prisma.product.create({
      data: {
        shopId: body.shopId,
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        category: validatedData.category,
        digitalFileUrl: validatedData.digitalFileUrl,
      },
    })

    await prisma.analyticsEvent.create({
      data: {
        shopId: body.shopId,
        type: 'product_created',
        metadata: JSON.stringify({
          productId: product.id,
          productName: product.name,
        }),
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
