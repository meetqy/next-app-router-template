import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Next.js App Router Playground",
  description: "Interactively demonstrates the core features of Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geist.variable} ${inter.variable} font-sans`} lang="zh-CN">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
