import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt-ts";
import { getUser } from "@/auth/db";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await getUser(credentials.email);
        console.log("User found:", user);

        if (!user) return null;

        const passwordsMatch = await compare(
          credentials.password,
          user.password!,
        );
        if (passwordsMatch) {
          const { password: _, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: Session | null;
      request: { nextUrl: URL };
    }) {
      let isLoggedIn = !!auth?.user;
      let isOnDashboard = nextUrl.pathname.startsWith("/protected");

      if (isOnDashboard) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/protected", nextUrl));
      }

      return true;
    },
  },
};

// @ts-ignore
export const handler = NextAuth(authConfig);
