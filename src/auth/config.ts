import NextAuth, { Account, AuthOptions, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { getUser } from "@/auth/db";
import { PrismaClient } from "../../generated/prisma";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authConfig: AuthOptions = {
  debug: true, // Enable NextAuth debug mode
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
        console.log(
          "🔐 AUTHORIZE: Starting authorization with credentials:",
          credentials,
        );
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ AUTHORIZE: Missing credentials");
          return null;
        }

        const user = await getUser(credentials.email);
        console.log("👤 AUTHORIZE: User fetched from database:", user);
        if (!user) {
          console.log("❌ AUTHORIZE: User not found");
          return null;
        }

        const passwordsMatch = await compare(
          credentials.password,
          user.password!,
        );
        console.log("🔑 AUTHORIZE: Passwords match:", passwordsMatch);
        if (passwordsMatch) {
          const { password: _, ...userWithoutPassword } = user;
          console.log(
            "✅ AUTHORIZE: Success! Returning user:",
            userWithoutPassword,
          );
          return userWithoutPassword;
        }
        console.log("❌ AUTHORIZE: Password mismatch");
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // @ts-ignore
    async jwt({
      token,
      user,
      account,
      trigger,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
      trigger?: string;
    }) {
      console.log("🎫 JWT CALLBACK START ===========================");
      console.log("Trigger:", trigger);
      console.log("Has User:", !!user);
      console.log("Has Account:", !!account);
      console.log("Current Time:", Math.floor(Date.now() / 1000));
      console.log("Token Exp:", token.exp);
      console.log("Token Contents:", {
        userId: token.userId,
        email: token.email,
        iat: token.iat,
        exp: token.exp,
        jti: token.jti,
      });

      // Check if this is a token refresh without user
      if (!user && !account) {
        if (token.userId) {
          console.log("🔄 JWT: Token refresh - keeping existing data");
          console.log("🔄 JWT: Existing userId:", token.userId);
          return token;
        } else {
          console.log("❌ JWT: Token refresh but NO userId found in token!");
          console.log("❌ JWT: This token is invalid - clearing it");
          // Return null to force re-authentication
          return null;
        }
      }

      // New sign in
      if (user) {
        console.log("🆕 JWT: New sign in - setting user data");
        console.log("User ID:", user.id);
        console.log("User Email:", user.email);
        token.userId = user.id;
        token.email = user.email;
      }

      if (account) {
        console.log("🔗 JWT: Account data available");
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      console.log("🎫 JWT CALLBACK END - Final Token:", {
        userId: token.userId,
        email: token.email,
        exp: token.exp,
      });
      console.log("=====================================");
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("🏠 SESSION CALLBACK START ===================");
      console.log("Token:", {
        userId: token.userId,
        email: token.email,
        exp: token.exp,
        currentTime: Math.floor(Date.now() / 1000),
      });

      // @ts-ignore
      const isExpired = token.exp && token.exp < Math.floor(Date.now() / 1000);
      console.log("Token expired?", isExpired);

      if (token && session && session.user) {
        if (token.userId) {
          // @ts-ignore
          session.user.id = token.userId as string;
          session.user.email = token.email as string;
          console.log("✅ SESSION: User data set successfully");
        } else {
          console.log("❌ SESSION: No userId in token!");
        }
      }

      console.log("🏠 SESSION CALLBACK END - Final Session:", session);
      console.log("=========================================");
      return session;
    },
  },

  events: {
    async signOut({ token, session }: { token: JWT; session: Session }) {
      console.log("🚪 SIGN OUT EVENT");
    },

    // @ts-ignore
    async signIn({ user, account }: { user: User; account: Account }) {
      console.log("🎉 SIGN IN EVENT - User:", user.email);
      console.log("🎉 SIGN IN EVENT - Provider:", account.provider);
      return true;
    },
  },
};

export const handler = NextAuth(authConfig);
