import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import axiosInstance from "@/app/hooks/axiosInstance";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              if (!credentials?.username || !credentials?.password) {
                  throw new Error("Username and password are required");
              }
      
              try {
                const { data } = await axiosInstance.post("auth/login", {
                  username: credentials.username,
                  password: credentials.password,
                });
      
                if (data && data.token) {
                  return { id: data.user.uuid, username: data.user.username, token: data.token, role: data.user.role };
                }
      
                return null;
              } catch (error) {
                throw new Error("Invalid username or password");
              }
            },
          })
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin'
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" as const },  // Fix the type error by explicitly typing as 'jwt'
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
          token.email = user.email
        //   token.firstName = user.firstName
        //   token.lastName = user.lastName
        //   token.phone = user.phone
        }
        return token
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id
          session.user.email = token.email
          // session.user.firstName = token.firstName
          // session.user.lastName = token.lastName
          // session.user.phone = token.phone
        }
        return session
      },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}