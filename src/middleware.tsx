import { NextRequest, NextResponse } from 'next/server'
import { PublicPages } from './config/public-pages'
import { token } from './lib/token-service'

export function middleware(request: NextRequest) {
	const isLoggedIn = !!request.cookies.get(token.accessToken)

	if (!isLoggedIn) {
		return NextResponse.redirect(new URL(PublicPages.LOGIN, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/dashboard/:path*'
}
