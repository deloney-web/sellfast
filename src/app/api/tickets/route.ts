import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createTicketSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const shopId = request.headers.get('x-shop-id')
    const userId = request.headers.get('x-user-id')

    if (!shopId && !userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const shopIdParam = searchParams.get('shop_id')
    const status = searchParams.get('status')

    const where: any = {}

    if (shopIdParam) {
      where.shopId = shopIdParam
    } else if (shopId) {
      where.shopId = shopId
    }

    if (status) {
      where.status = status
    }

    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            subdomain: true,
          },
        },
        customer: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        replies: {
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ tickets })
  } catch (error) {
    console.error('Get tickets error:', error)
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
    const validatedData = createTicketSchema.parse(body)

    let customer = await prisma.customer.findUnique({
      where: {
        shopId_email: {
          shopId,
          email: body.customerEmail,
        },
      },
    })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          shopId,
          email: body.customerEmail,
          name: body.customerName,
        },
      })
    }

    const ticket = await prisma.ticket.create({
      data: {
        shopId,
        customerId: customer.id,
        subject: validatedData.subject,
        message: validatedData.message,
      },
      include: {
        customer: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ ticket }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create ticket error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
