import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./github-markdown.css";
import { Providers } from "@/components/provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poco Prep",
  description: "AI Enabled Interview Preparation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <Providers>
            {children}
            </Providers>
          </body>
    </html>
  );
}
