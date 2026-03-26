import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateProductSchema } from '@/lib/validations'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shopId = request.headers.get('x-shop-id')
    const userId = request.headers.get('x-user-id')

    if (!shopId && !userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
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
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await prisma.analyticsEvent.create({
      data: {
        shopId: product.shopId,
        type: 'product_viewed',
        metadata: JSON.stringify({
          productId: product.id,
          productName: product.name,
        }),
      },
    })

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateProductSchema.parse(body)

    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
      include: { shop: true },
    })

    if (!existingProduct || existingProduct.shop.ownerId !== userId) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json({ product })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Update product error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
      include: { shop: true },
    })

    if (!existingProduct || existingProduct.shop.ownerId !== userId) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
