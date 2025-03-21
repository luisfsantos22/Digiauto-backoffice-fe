import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Example: checking credentials manually
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return { id: "1", name: "Admin User", email: "admin@example.com" };
        }
        return null; // Invalid login
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page URL
  },
});

export { handler as GET, handler as POST };