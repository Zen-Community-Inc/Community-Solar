import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { UTMProvider } from "@/components/providers/UTMProvider";
import { FacebookPixelProvider } from "@/components/providers/FacebookPixelProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zen Community Solar - Affordable Clean Energy for Illinois",
  description: "Join 10,000+ Illinois residents saving 10-20% on electricity with community solar. No installation, no upfront costs. Enroll today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Suspense fallback={null}>
          <UTMProvider>
            <FacebookPixelProvider>
              {children}
              <Toaster />
            </FacebookPixelProvider>
          </UTMProvider>
        </Suspense>

        {/* GoHighLevel AI Chat Widget */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="690b8cab7907ec12811038fe"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
