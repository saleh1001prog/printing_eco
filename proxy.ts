import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// 🔒 SECURITY: Protect admin routes at the server level
export default withAuth(
  function middleware(req) {
    // Additional custom logic can go here
    return NextResponse.next()
  },
  {
    pages: {
      signIn: '/admin/login', // ✅ Must match NextAuth pages.signIn
    },
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl

        // ✅ Always allow the login page itself (prevents redirect loop)
        if (pathname === '/admin/login') {
          return true
        }

        // Protect all /admin routes
        if (pathname.startsWith('/admin')) {
          // Only allow if authenticated and email matches ADMIN_EMAIL
          return token?.email === process.env.ADMIN_EMAIL
        }

        // Allow all other routes
        return true
      },
    },
  }
)

// Configure which routes to protect
export const config = {
  matcher: [
    /*
     * Match /admin routes but EXCLUDE:
     * - /admin/login (the sign-in page itself)
     * - /api/auth (NextAuth internal API routes)
     */
    '/admin/:path*',
  ],
}
