import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, purchaseId } = body

    if (!sessionId || !purchaseId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: {
        product: true,
        customer: true,
      },
    })

    if (!purchase) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 })
    }

    if (purchase.status !== 'pending') {
      return NextResponse.json(
        { error: 'Purchase already completed' },
        { status: 400 }
      )
    }

    const downloadKey = nanoid(16)
    const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/download/${downloadKey}`

    const updatedPurchase = await prisma.purchase.update({
      where: { id: purchaseId },
      data: {
        status: 'completed',
        downloadKey,
        downloadUrl,
      },
    })

    await prisma.analyticsEvent.create({
      data: {
        shopId: purchase.shopId,
        type: 'purchase_completed',
        metadata: JSON.stringify({
          productId: purchase.productId,
          productName: purchase.product.name,
          purchaseId: purchase.id,
          amount: purchase.pricePaid,
        }),
      },
    })

    return NextResponse.json({
      purchase: updatedPurchase,
      downloadUrl,
    })
  } catch (error) {
    console.error('Complete checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
