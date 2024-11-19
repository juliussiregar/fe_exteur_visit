/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth";

// eslint-disable-next-line no-unused-vars
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      accessToken?: string;
    };
  }
}
