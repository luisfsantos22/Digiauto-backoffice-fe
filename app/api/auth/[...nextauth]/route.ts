import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import axiosInstance from '@/app/hooks/axiosInstance'
import { translateRole } from '@/utils'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required')
        }

        try {
          const { data } = await axiosInstance.post('auth/login', {
            username: credentials.username,
            password: credentials.password,
          })

          if (data && data.token) {
            return {
              id: data.user.uuid,
              username: data.user.username,
              token: data.token,
              role: data.user.role,
            }
          }

          return null
        } catch (error) {
          throw new Error('Invalid username or password')
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' as const }, // Fix the type error by explicitly typing as 'jwt'
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.firstName = user.first_name
        token.lastName = user.last_name
        token.role = translateRole(user.role)
        token.accessToken = user.token
        token.refreshToken = user.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.username = token.username
        session.user.firstName = token.first_name
        session.user.lastName = token.last_name
        session.user.role = token.role
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
