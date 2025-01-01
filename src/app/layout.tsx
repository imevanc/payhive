import type { Metadata } from "next";
import { Rufina } from "next/font/google";
import "./globals.css";
import { Header } from "@/components";

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
  children: React.ReactNode;
}>) {
  return (
    <html className={rufina.className}>
      <body>
        <Header />
        {children}
        <footer>footer</footer>
      </body>
    </html>
  );
}
