/**
 * Home Page Content
 *
 * All text content for the home page.
 * Update this file to rebrand or modify home page copy.
 */

export const homeContent = {
  hero: {
    badge: "Trusted by 10,000+ subscribers",
    headline: "Lower your operating costs with local community solar",
    subheadline: "Enroll your properties or business accounts to receive utility bill credits—no rooftop installs, no CapEx, month‑to‑month terms.",
    primaryButton: {
      text: "Get started",
      action: "openSignIn",
    },
    secondaryButton: {
      text: "Contact us",
      href: "/contact",
    },
    image: {
      src: "/assets/hero-solar.jpg",
      alt: "Community solar panels with residential and commercial buildings",
    },
  },

  stats: {
    items: [
      {
        label: "Total kWh",
        valueKey: "energyGeneratedShort", // References siteConfig.stats.energyGeneratedShort
      },
      {
        label: "CO₂ avoided",
        valueKey: "co2AvoidedShort",
        suffix: "tons",
      },
      {
        label: "Savings",
        valueKey: "savingsRange.display",
        highlight: true, // Makes this stat stand out with yellow color
      },
      {
        label: "Terms",
        valueKey: "terms.subscriptionType",
      },
    ],
  },
} as const;

// Type exports
export type HomeContent = typeof homeContent;
export type HomeStatItem = typeof homeContent.stats.items[number];
