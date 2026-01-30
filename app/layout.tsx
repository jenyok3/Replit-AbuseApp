import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AbuseApp Desktop - Account Farm Management",
  description: "Account Farm Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
