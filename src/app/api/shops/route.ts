import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createShopSchema, updateShopSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const shops = await prisma.shop.findMany({
      where: { ownerId: userId },
      include: {
        _count: {
          select: {
            products: true,
            customers: true,
            purchases: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ shops })
  } catch (error) {
    console.error('Get shops error:', error)
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
    const validatedData = createShopSchema.parse(body)

    const existingShop = await prisma.shop.findUnique({
      where: { subdomain: validatedData.subdomain },
    })

    if (existingShop) {
      return NextResponse.json(
        { error: 'Subdomain already taken' },
        { status: 400 }
      )
    }

    const shop = await prisma.shop.create({
      data: {
        ownerId: userId,
        name: validatedData.name,
        subdomain: validatedData.subdomain,
        description: validatedData.description,
      },
    })

    return NextResponse.json({ shop }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create shop error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
