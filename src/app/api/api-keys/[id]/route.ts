import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateApiKey, hashApiKey } from '@/lib/api-keys'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiKey = await prisma.apiKey.findUnique({
      where: { id: params.id },
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            subdomain: true,
            ownerId: true,
          },
        },
      },
    })

    if (!apiKey || apiKey.shop.ownerId !== userId) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 })
    }

    return NextResponse.json({
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        shop: apiKey.shop,
        permissions: apiKey.permissions,
        lastUsedAt: apiKey.lastUsedAt,
        lastRotated: apiKey.lastRotated,
        active: apiKey.active,
        createdAt: apiKey.createdAt,
      },
    })
  } catch (error) {
    console.error('Get API key error:', error)
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

    const existingKey = await prisma.apiKey.findUnique({
      where: { id: params.id },
      include: { shop: true },
    })

    if (!existingKey || existingKey.shop.ownerId !== userId) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 })
    }

    const apiKey = await prisma.apiKey.update({
      where: { id: params.id },
      data: {
        name: body.name,
        permissions: JSON.stringify(body.permissions),
        active: body.active,
      },
    })

    return NextResponse.json({
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        permissions: apiKey.permissions,
        active: apiKey.active,
        updatedAt: apiKey.updatedAt,
      },
    })
  } catch (error) {
    console.error('Update API key error:', error)
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

    const existingKey = await prisma.apiKey.findUnique({
      where: { id: params.id },
      include: { shop: true },
    })

    if (!existingKey || existingKey.shop.ownerId !== userId) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 })
    }

    await prisma.apiKey.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete API key error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
