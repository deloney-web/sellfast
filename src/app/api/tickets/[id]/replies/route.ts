import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createTicketReplySchema } from '@/lib/validations'

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

    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    const replies = await prisma.ticketReply.findMany({
      where: { ticketId: params.id },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({ replies })
  } catch (error) {
    console.error('Get ticket replies error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shopId = request.headers.get('x-shop-id')
    const userId = request.headers.get('x-user-id')

    if (!shopId && !userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createTicketReplySchema.parse(body)

    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    const isFromOwner = !!userId

    const reply = await prisma.ticketReply.create({
      data: {
        ticketId: params.id,
        message: validatedData.message,
        isFromOwner,
      },
    })

    if (isFromOwner) {
      await prisma.ticket.update({
        where: { id: params.id },
        data: { status: 'in_progress' },
      })
    }

    return NextResponse.json({ reply }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create ticket reply error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
