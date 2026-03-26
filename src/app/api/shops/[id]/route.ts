import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateShopSchema } from '@/lib/validations'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const shop = await prisma.shop.findFirst({
      where: {
        id: params.id,
        ownerId: userId,
      },
      include: {
        _count: {
          select: {
            products: true,
            customers: true,
            purchases: true,
            apiKeys: true,
            tickets: true,
          },
        },
      },
    })

    if (!shop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 })
    }

    return NextResponse.json({ shop })
  } catch (error) {
    console.error('Get shop error:', error)
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
    const validatedData = updateShopSchema.parse(body)

    const existingShop = await prisma.shop.findFirst({
      where: {
        id: params.id,
        ownerId: userId,
      },
    })

    if (!existingShop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 })
    }

    const shop = await prisma.shop.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json({ shop })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Update shop error:', error)
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

    const existingShop = await prisma.shop.findFirst({
      where: {
        id: params.id,
        ownerId: userId,
      },
    })

    if (!existingShop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 })
    }

    await prisma.shop.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete shop error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
