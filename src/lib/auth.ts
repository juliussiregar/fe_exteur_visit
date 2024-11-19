import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your_username" }, // Menggunakan username
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Missing username or password");
          }

          const loginResponse = await fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Format URL-encoded
            body: new URLSearchParams({
              username: credentials.username, // Gunakan username
              password: credentials.password,
            }),
          });

          if (!loginResponse.ok) {
            throw new Error("Invalid login credentials");
          }

          const { access_token } = await loginResponse.json(); // Backend mengembalikan access_token

          const meResponse = await fetch("http://localhost:8080/api/v1/auth/me", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          if (!meResponse.ok) {
            throw new Error("Failed to fetch user data");
          }

          const userData = await meResponse.json();

          return {
            id: userData.id,
            name: userData.full_name,
            email: userData.email,
            accessToken: access_token, // Simpan access_token
          };
        } catch (error) {
          if (error instanceof Error) {
            // eslint-disable-next-line no-console
            console.error("Error in authorize:", error.message);
          } else {
            // eslint-disable-next-line no-console
            console.error("Unexpected error:", error);
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = (user as any).accessToken; // Pastikan accessToken disimpan
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: typeof token.id === "string" ? token.id : "",
        name: typeof token.name === "string" ? token.name : "Unknown User",
        email: typeof token.email === "string" ? token.email : "No Email",
        accessToken: typeof token.accessToken === "string" ? token.accessToken : "",
      };
      return session;
    },
  },
};
