import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to enforce HTTPS and add security headers
 * Note: This middleware is primarily for development and server environments
 * For static exports, security headers should be configured at the hosting level
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Check if the request is not HTTPS in production
  const isProduction = process.env.NODE_ENV === 'production';
  const isHTTPS = request.headers.get('x-forwarded-proto') === 'https' || 
                  request.url.startsWith('https://');
  
  // Redirect HTTP to HTTPS in production
  if (isProduction && !isHTTPS && !request.url.includes('localhost')) {
    const httpsUrl = request.url.replace('http://', 'https://');
    return NextResponse.redirect(httpsUrl, 301);
  }
  
  // Add security headers
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy to prevent mixed content
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data: https:",
    "connect-src 'self' https:",
    "media-src 'self' https:",
    "object-src 'none'",
    "frame-src 'none'",
    "upgrade-insecure-requests"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};