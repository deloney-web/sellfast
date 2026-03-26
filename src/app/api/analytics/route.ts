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
    const type = searchParams.get('type')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    const where: any = {}

    if (shopIdParam) {
      where.shopId = shopIdParam
    } else if (shopId) {
      where.shopId = shopId
    }

    if (type) {
      where.type = type
    }

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate)
      }
    }

    const events = await prisma.analyticsEvent.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 1000,
    })

    const summary = {
      totalEvents: events.length,
      productViews: events.filter((e) => e.type === 'product_viewed').length,
      purchases: events.filter((e) => e.type === 'purchase_completed').length,
      apiCalls: events.filter((e) => e.type === 'api_call').length,
    }

    return NextResponse.json({ events, summary })
  } catch (error) {
    console.error('Get analytics error:', error)
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

    const event = await prisma.analyticsEvent.create({
      data: {
        shopId,
        type: body.type,
        metadata: JSON.stringify(body.metadata || {}),
      },
    })

    return NextResponse.json({ event }, { status: 201 })
  } catch (error) {
    console.error('Create analytics event error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
