import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createCheckoutSessionSchema } from '@/lib/validations'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const shopId = request.headers.get('x-shop-id')
    if (!shopId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createCheckoutSessionSchema.parse(body)

    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
      include: { shop: true },
    })

    if (!product || product.shopId !== shopId) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (!product.isActive) {
      return NextResponse.json({ error: 'Product is not available' }, { status: 400 })
    }

    let customer = await prisma.customer.findUnique({
      where: {
        shopId_email: {
          shopId,
          email: validatedData.customerEmail,
        },
      },
    })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          shopId,
          email: validatedData.customerEmail,
          name: validatedData.customerName,
        },
      })
    }

    const sessionId = nanoid()
    const checkoutUrl = `${process.env.NEXT_PUBLIC_APP_URL}/checkout/${sessionId}`

    const purchase = await prisma.purchase.create({
      data: {
        customerId: customer.id,
        productId: product.id,
        shopId,
        pricePaid: product.price,
        status: 'pending',
      },
    })

    await prisma.analyticsEvent.create({
      data: {
        shopId,
        type: 'checkout_initiated',
        metadata: JSON.stringify({
          productId: product.id,
          productName: product.name,
          purchaseId: purchase.id,
        }),
      },
    })

    return NextResponse.json({
      sessionId,
      checkoutUrl,
      purchaseId: purchase.id,
      amount: product.price,
      currency: 'USD',
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create checkout session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
