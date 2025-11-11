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

        {/* Zapier AI Chat Widget */}
        <Script
          src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"
          type="module"
          strategy="lazyOnload"
        />
        <div
          dangerouslySetInnerHTML={{
            __html: `<zapier-interfaces-chatbot-embed is-popup="true" chatbot-id="cmhun8v2b001a137m30aybwqv"></zapier-interfaces-chatbot-embed>`,
          }}
        />
      </body>
    </html>
  );
}
