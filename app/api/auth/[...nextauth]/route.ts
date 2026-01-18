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
            if (user.email === process.env.ADMIN_EMAIL) {
                return true
            }
            return false
        },
    },
    pages: {
        error: '/auth/error', // New: Custom error page
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
