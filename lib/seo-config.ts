import { Metadata } from "next";

const baseUrl = "https://zencommunitysolar.com";

export const seoConfig = {
  baseUrl,
  siteName: "Zen Community Solar",
  defaultTitle: "Zen Community Solar - Affordable Clean Energy for Illinois",
  defaultDescription:
    "Join 50,000+ Illinois residents saving 10-20% on electricity with community solar. No installation, no upfront costs. Enroll today!",
  ogImage: "/og-image.jpg",
};

interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  ogImage?: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path,
  ogImage = seoConfig.ogImage,
}: PageSEO): Metadata {
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: seoConfig.siteName,
      title: `${title} | ${seoConfig.siteName}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${seoConfig.siteName}`,
      description,
      images: [ogImage],
    },
  };
}

// Page-specific metadata
export const pageMetadata = {
  home: {
    title: "Affordable Clean Energy for Illinois",
    description:
      "Join 50,000+ Illinois residents saving 10-20% on electricity with community solar. No installation, no upfront costs. Enroll today!",
    keywords: [
      "community solar Illinois",
      "solar energy savings",
      "ComEd solar",
      "Ameren solar",
      "renewable energy",
      "no installation solar",
    ],
    path: "/",
  },
  about: {
    title: "About Us - Leading Community Solar Provider in Illinois",
    description:
      "Learn about Zen Community Solar's mission to make clean energy accessible to all Illinois residents. 50,000+ subscribers, 15+ MW capacity.",
    keywords: [
      "community solar company",
      "Illinois solar provider",
      "renewable energy mission",
      "solar energy values",
    ],
    path: "/about",
  },
  contact: {
    title: "Contact Us - Get Your Free Solar Savings Quote",
    description:
      "Contact Zen Community Solar for a free consultation. Get answers about community solar and see how much you can save on electricity bills.",
    keywords: [
      "solar quote Illinois",
      "contact solar company",
      "solar consultation",
      "community solar questions",
    ],
    path: "/contact",
  },
  projects: {
    title: "Our Solar Projects - 15+ MW Across Illinois",
    description:
      "Explore Zen Community Solar's portfolio of solar farms across Illinois. 3 active projects, 12.7 MW capacity, serving 2,600+ subscribers.",
    keywords: [
      "Illinois solar farms",
      "community solar projects",
      "solar farm locations",
      "renewable energy portfolio",
    ],
    path: "/projects",
  },
  faqs: {
    title: "Frequently Asked Questions - Community Solar Guide",
    description:
      "Get answers to common questions about community solar in Illinois. Learn about savings, enrollment, billing, and more.",
    keywords: [
      "community solar FAQ",
      "solar questions",
      "how community solar works",
      "solar enrollment help",
    ],
    path: "/faqs",
  },
  checkEligibility: {
    title: "Check Your Eligibility - See If You Qualify",
    description:
      "Check if your location qualifies for Zen Community Solar. Serving ComEd and Ameren customers across Illinois.",
    keywords: [
      "solar eligibility Illinois",
      "ComEd solar qualify",
      "Ameren solar qualify",
      "check solar availability",
    ],
    path: "/check-eligibility",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "Learn how Zen Community Solar collects, uses, and protects your personal information. Your privacy matters to us.",
    keywords: ["privacy policy", "data protection", "personal information"],
    path: "/privacy",
  },
  terms: {
    title: "Terms and Conditions",
    description:
      "Read Zen Community Solar's terms and conditions for community solar subscription services in Illinois.",
    keywords: ["terms of service", "subscription terms", "solar agreement"],
    path: "/terms",
  },
};
