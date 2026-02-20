import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            // 🔒 SECURITY: Only allow specific admin email
            if (user.email === process.env.ADMIN_EMAIL) {
                return true
            }
            return false
        },
        async session({ session, token }) {
            // Add additional security info to session
            if (session?.user) {
                session.user.email = token.email
            }
            return session
        },
    },
    session: {
        // 🔒 SECURITY: Session expires after 7 days
        maxAge: 7 * 24 * 60 * 60, // 7 days
        updateAge: 24 * 60 * 60, // Update session every 24 hours
    },
    pages: {
        signIn: '/admin', // Redirect to admin page for sign-in
        error: '/auth/error',
    },
    // 🔒 SECURITY: Use secure cookies in production
    cookies: {
        sessionToken: {
            name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
