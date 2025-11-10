import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy - SEO & Performance Optimizations
 * 
 * This replaces the deprecated middleware.ts pattern.
 * Adds security headers, resource hints, and caching strategies
 * for optimal SEO and performance.
 */
export function proxy(request: NextRequest) {
    const response = NextResponse.next();

    // ========================================
    // Security Headers (SEO & Best Practices)
    // ========================================

    // DNS Prefetch Control - Enable DNS prefetching for external resources
    response.headers.set('X-DNS-Prefetch-Control', 'on');

    // X-Frame-Options - Prevent clickjacking attacks
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');

    // X-Content-Type-Options - Prevent MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Referrer-Policy - Control referrer information
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

    // HSTS - Force HTTPS for 1 year
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
    );

    // Permissions-Policy - Disable unnecessary browser features
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=()'
    );

    // ========================================
    // Resource Hints (Performance Optimization)
    // ========================================

    // Preconnect to Google Fonts for faster font loading
    response.headers.set(
        'Link',
        '<https://fonts.googleapis.com>; rel=preconnect; crossorigin, <https://fonts.gstatic.com>; rel=preconnect; crossorigin'
    );

    // ========================================
    // Caching Strategy (SEO & Performance)
    // ========================================

    const { pathname } = request.nextUrl;

    // Images - Cache for 1 year (immutable)
    if (/\.(svg|jpg|jpeg|png|webp|avif|gif|ico)$/i.test(pathname)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    // Static assets from Next.js - Cache for 1 year (immutable)
    if (pathname.startsWith('/_next/static/')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    // Public images folder - Cache for 1 year (immutable)
    if (pathname.startsWith('/imgs/')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    // HTML pages - Cache with revalidation
    if (pathname === '/' || pathname.startsWith('/blog') || pathname.startsWith('/about') || pathname.startsWith('/projects')) {
        response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    return response;
}

/**
 * Matcher Configuration
 * 
 * Apply proxy to all routes except:
 * - API routes (handled separately)
 * - Next.js internal routes (_next/static, _next/image)
 * - Static metadata files (favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest)
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)',
    ],
};
