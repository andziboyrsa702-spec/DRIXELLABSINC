import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Cybersecurity HTTP Headers Enforcement
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Content Security Policy (CSP)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: blob: https:;
    font-src 'self' https://fonts.gstatic.com data:;
    connect-src 'self' https:;
    frame-ancestors 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  // 2. Protect Mutation API Routes (/api/cms POST and /api/upload POST)
  if (request.method === 'POST' && (request.nextUrl.pathname.startsWith('/api/cms') || request.nextUrl.pathname.startsWith('/api/upload'))) {
    const authCookie = request.cookies.get('drixel_admin_session')?.value;
    const authHeader = request.headers.get('x-admin-passcode');

    // Verify token or passcode header
    if (authCookie !== 'authenticated_drixel_session' && authHeader !== 'drixel2026') {
      return NextResponse.json(
        { error: 'Unauthorized: Cyber Security Access Denied' },
        { status: 401 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
