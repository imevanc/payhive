import { ReactNode } from "react";
import type { Metadata } from "next";
import { Footer, Header } from "@/components";
import { TABS } from "@/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayHive",
  description: "Updated version of PayHive",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-full w-full">
          <Header tabs={TABS} dataTestId="header" />
          {children}
          <Footer isUserSubscribed={false} dataTestId="payhive" />
        </div>
      </body>
    </html>
  );
}
