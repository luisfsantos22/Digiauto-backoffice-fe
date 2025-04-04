declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      username: string
      role: string
      firstName?: string
      lastName?: string
    }
    expires: string
    accessToken: string
    refreshToken: string
  }
}
