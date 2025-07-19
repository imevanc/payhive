import NextAuth, {
  Account,
  AuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { getUser } from "@/auth/db";
import { PrismaClient } from "../../generated/prisma";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authConfig: AuthOptions = {
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
        console.log("Authorizing user with credentials:", credentials);
        if (!credentials?.email || !credentials?.password) return null;

        const user = await getUser(credentials.email);
        console.log("User fetched from database:", user);
        if (!user) return null;

        const passwordsMatch = await compare(
          credentials.password,
          user.password!,
        );
        console.log("Passwords match:", passwordsMatch);
        if (passwordsMatch) {
          const { password: _, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  callbacks: {
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
      console.log("JWT callback triggered:", {
        trigger,
        hasUser: !!user,
        hasAccount: !!account,
      });

      if (user) {
        console.log("User signing in:", user);
        token.userId = user.id;
        token.email = user.email;
      }

      if (account) {
        console.log("Account details:", account);
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback - token:", token);

      if (token && session && session.user) {
        // @ts-ignore
        session.user.id = token.userId as string;
        session.user.email = token.email as string;
      }

      console.log("Final session:", session);
      return session;
    },
  },
  events: {
    async signOut({ token, session }: { token: JWT; session: Session }) {
      console.log("SignOut event triggered");
      console.log("Token being cleared:", token);
      console.log("Session being cleared:", session);
    },
    // @ts-ignore
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account;
      profile: Profile;
    }) {
      console.log("SignIn event triggered");
      console.log("User:", user);
      console.log("Account:", account.provider);
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session event - session retrieved");
    },
  },
};

export const handler = NextAuth(authConfig);