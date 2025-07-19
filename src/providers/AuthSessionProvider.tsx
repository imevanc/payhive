"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export const AuthSessionProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => <SessionProvider session={session}>{children}</SessionProvider>;
