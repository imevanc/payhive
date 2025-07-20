import { ReactNode } from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Footer, Header } from "@/components";
import { TABS } from "@/constants";
import { AuthSessionProvider } from "@/providers";
import { authConfig } from "@/auth/config";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayHive",
  description: "Updated version of PayHive",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider session={session}>
          <div className="flex flex-col h-full w-full">
            <Header tabs={TABS} dataTestId="header" />
            {children}
            <Footer isUserSubscribed={false} dataTestId="payhive" />
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
