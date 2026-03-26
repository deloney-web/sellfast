import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SellFast - Multi-Tenant Digital Product Platform",
  description: "Create and manage your digital product shop with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
