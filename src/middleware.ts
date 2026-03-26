import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/docs') ||
    pathname === '/'
  ) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('session')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  if (pathname.startsWith('/api/')) {
    const token = request.cookies.get('session')?.value

    if (token) {
      const payload = await verifyToken(token)

      if (payload) {
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-id', payload.userId)

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        })
      }
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
