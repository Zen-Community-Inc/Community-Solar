import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Middleware
 *
 * Handles:
 * 1. Authentication redirects for protected routes
 * 2. UTM parameter tracking and persistence (first-touch and last-touch attribution)
 *
 * This middleware runs on every request (except static assets) and:
 * - Captures UTM parameters from URL query strings
 * - Stores them in cookies for 30 days
 * - Tracks first-touch attribution (never overwrites)
 * - Tracks last-touch attribution (always updates)
 */

// UTM parameters to track
const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'gclid',    // Google Click ID
  'fbclid',   // Facebook Click ID
  'ref',      // Referral code
] as const;

// Cookie configuration for UTM tracking
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds
const COOKIE_OPTIONS = {
  maxAge: COOKIE_MAX_AGE,
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
};

export default async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Initialize response
  let response = NextResponse.next();

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/onboarding", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check for Better Auth session cookie
    const sessionToken = request.cookies.get("better-auth.session_token");

    if (!sessionToken) {
      // Redirect to signin with return URL
      const url = new URL("/signin", request.url);
      url.searchParams.set("redirect", pathname);
      response = NextResponse.redirect(url);
    }
  }

  // Auth routes (signin) - redirect to dashboard if already authenticated
  const authRoutes = ["/signin"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute) {
    const sessionToken = request.cookies.get("better-auth.session_token");

    if (sessionToken) {
      response = NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // UTM Parameter Tracking
  // Extract UTM parameters from URL and store in cookies
  const utmData: Record<string, string> = {};
  let hasUtmParams = false;

  UTM_PARAMS.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      utmData[param] = value;
      hasUtmParams = true;
    }
  });

  // Only process if UTM parameters are present
  if (hasUtmParams) {
    const timestamp = Date.now().toString();

    if (process.env.NODE_ENV === 'development') {
      console.log('[Proxy] UTM parameters detected:', utmData);
      console.log('[Proxy] Setting UTM cookies with 30-day expiration');
    }

    // Set individual UTM cookies for easy access
    Object.entries(utmData).forEach(([key, value]) => {
      response.cookies.set(key, value, COOKIE_OPTIONS);
    });

    // First-touch attribution: Only set if not already exists
    if (!request.cookies.get('utm_first_touch')) {
      response.cookies.set(
        'utm_first_touch',
        JSON.stringify({ params: utmData, timestamp }),
        COOKIE_OPTIONS
      );
      if (process.env.NODE_ENV === 'development') {
        console.log('[Proxy] First-touch attribution set:', { params: utmData, timestamp });
      }
    }

    // Last-touch attribution: Always update with latest UTMs
    response.cookies.set(
      'utm_last_touch',
      JSON.stringify({ params: utmData, timestamp }),
      COOKIE_OPTIONS
    );
    if (process.env.NODE_ENV === 'development') {
      console.log('[Proxy] Last-touch attribution updated:', { params: utmData, timestamp });
    }
  }

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
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
