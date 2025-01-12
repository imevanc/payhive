import { ReactNode } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Rufina } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";

const rufina = Rufina({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PayHive",
  description:
    "Split bills with friends, track memberships, and manage shared expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={`h-full bg-gray-50 ${rufina.className}`} lang="en">
      <body className="h-full">
        <SpeedInsights />
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
