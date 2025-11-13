import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { UTMProvider } from "@/components/providers/UTMProvider";
import { FacebookPixelProvider } from "@/components/providers/FacebookPixelProvider";
import { OrganizationStructuredData } from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zencommunitysolar.com'),
  title: {
    default: "Zen Community Solar - Affordable Clean Energy for Illinois",
    template: "%s | Zen Community Solar",
  },
  description: "Join 50,000+ Illinois residents saving 10-20% on electricity with community solar. No installation, no upfront costs. Enroll today!",
  keywords: [
    "community solar",
    "Illinois solar energy",
    "solar savings",
    "renewable energy Illinois",
    "ComEd solar",
    "Ameren solar",
    "clean energy",
    "solar subscription",
    "no installation solar",
    "electric bill savings",
  ],
  authors: [{ name: "Zen Community Solar" }],
  creator: "Zen Community Solar",
  publisher: "Zen Community Solar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zencommunitysolar.com",
    siteName: "Zen Community Solar",
    title: "Zen Community Solar - Affordable Clean Energy for Illinois",
    description: "Join 50,000+ Illinois residents saving 10-20% on electricity with community solar. No installation, no upfront costs. Enroll today!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zen Community Solar - Clean Energy for Illinois",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zen Community Solar - Affordable Clean Energy for Illinois",
    description: "Join 50,000+ Illinois residents saving 10-20% on electricity with community solar. No installation, no upfront costs.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationStructuredData />
      </head>
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
