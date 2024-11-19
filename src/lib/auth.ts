import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your_username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        const loginResponse = await fetch("http://localhost:8080/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        if (!loginResponse.ok) {
          throw new Error("Invalid login credentials");
        }

        const { access_token } = await loginResponse.json();

        const decodedToken = JSON.parse(
          Buffer.from(access_token.split(".")[1], "base64").toString("utf-8")
        ) as {
          id: number;
          company_id: string;
          full_name: string;
          roles: string[];
          company_name: string;
          exp: number;
        };

        return {
          id: decodedToken.id,
          name: decodedToken.full_name,
          email: credentials.username, // Default username as email if not provided
          accessToken: access_token,
          company_id: decodedToken.company_id,
          roles: decodedToken.roles || [],
          company_name: decodedToken.company_name,
          exp: decodedToken.exp,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken as string;
        token.company_id = user.company_id as string;
        token.roles = Array.isArray(user.roles) ? user.roles : []; // Ensure roles is an array
        token.company_name = user.company_name as string;
        token.exp = user.exp as number;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as number,
        name: token.name || "Unknown User",
        email: token.email || "",
        accessToken: token.accessToken as string || "",
        company_id: token.company_id as string || "",
        roles: Array.isArray(token.roles) ? token.roles : [], // Ensure roles is an array
        company_name: token.company_name as string || "",
        exp: token.exp as number || 0,
      };

      return session;
    },
  },
};
