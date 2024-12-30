import type { Metadata } from "next";
import "./globals.css";

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
    <html>
      <body>
        <header>header</header>
        {children}
        <footer>footer</footer>
      </body>
    </html>
  );
}
