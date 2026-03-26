import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const shopId = request.headers.get('x-shop-id')
    const userId = request.headers.get('x-user-id')

    if (!shopId && !userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const shopIdParam = searchParams.get('shop_id')
    const email = searchParams.get('email')

    const where: any = {}

    if (shopIdParam) {
      where.shopId = shopIdParam
    } else if (shopId) {
      where.shopId = shopId
    }

    if (email) {
      where.email = { contains: email, mode: 'insensitive' }
    }

    const customers = await prisma.customer.findMany({
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
            tickets: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ customers })
  } catch (error) {
    console.error('Get customers error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const shopId = request.headers.get('x-shop-id')
    if (!shopId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const existingCustomer = await prisma.customer.findUnique({
      where: {
        shopId_email: {
          shopId,
          email: body.email,
        },
      },
    })

    if (existingCustomer) {
      return NextResponse.json({ customer: existingCustomer })
    }

    const customer = await prisma.customer.create({
      data: {
        shopId,
        email: body.email,
        name: body.name,
      },
    })

    return NextResponse.json({ customer }, { status: 201 })
  } catch (error) {
    console.error('Create customer error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
