import { siteConfig } from "@/lib/site-config";

export function LocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zencommunitysolar.com/#organization",
    name: siteConfig.company.name,
    description: siteConfig.company.description,
    url: siteConfig.urls.website,
    logo: "https://zencommunitysolar.com/logo.png",
    image: "https://zencommunitysolar.com/og-image.jpg",
    telephone: siteConfig.contact.phone.raw,
    email: siteConfig.contact.email.general,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.0,
      longitude: -89.2,
    },
    areaServed: {
      "@type": "State",
      name: "Illinois",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.stats.rating,
      bestRating: "5",
      worstRating: "1",
      ratingCount: "500",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      siteConfig.contact.social.facebook,
      siteConfig.contact.social.twitter,
      siteConfig.contact.social.linkedin,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://zencommunitysolar.com/#organization",
    name: siteConfig.company.name,
    url: siteConfig.urls.website,
    logo: {
      "@type": "ImageObject",
      url: "https://zencommunitysolar.com/logo.png",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone.raw,
      contactType: "Customer Service",
      email: siteConfig.contact.email.general,
      areaServed: "Illinois",
      availableLanguage: "English",
    },
    sameAs: [
      siteConfig.contact.social.facebook,
      siteConfig.contact.social.twitter,
      siteConfig.contact.social.linkedin,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ServiceStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Community Solar Subscription",
    provider: {
      "@id": "https://zencommunitysolar.com/#organization",
    },
    areaServed: {
      "@type": "State",
      name: "Illinois",
    },
    offers: {
      "@type": "Offer",
      description: "Save 10-20% on your electricity bill with community solar. No installation required.",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "0",
        priceCurrency: "USD",
        description: "No upfront costs",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
