import React from "react"
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LuxeMarket - Premium E-commerce Experience",
    template: "%s | LuxeMarket"
  },
  description: "Shop the finest products with our modern e-commerce platform. High quality, fast shipping, and secure payments.",
  keywords: ["e-commerce", "shopping", "premium products", "online store", "LuxeMarket"],
  authors: [{ name: "LuxeMarket Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luxemarket.example.com",
    title: "LuxeMarket - Premium E-commerce Experience",
    description: "Shop the finest products with our modern e-commerce platform.",
    siteName: "LuxeMarket",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LuxeMarket",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeMarket - Premium E-commerce Experience",
    description: "Shop the finest products with our modern e-commerce platform.",
    images: ["/og-image.png"],
    creator: "@luxemarket",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary`}
      >
        <Providers>
          <Header />
            <main className="flex-1">
              {children}
            </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
