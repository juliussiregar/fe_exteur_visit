import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      accessToken: string;
      company_id: string;
      roles: string[];
      company_name: string;
      exp: number;
    };
  }

  interface User {
    id: number;
    name: string;
    email: string;
    accessToken: string;
    company_id: string;
    roles: string[];
    company_name: string;
    exp: number;
  }

  interface JWT {
    id: number;
    name: string;
    email: string;
    accessToken: string;
    company_id: string;
    roles: string[];
    company_name: string;
    exp: number;
  }
}
