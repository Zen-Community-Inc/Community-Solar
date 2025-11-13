import { Heart, Shield, Users, Zap } from "lucide-react";

/**
 * About Page Content
 *
 * All text content for the about page.
 * Update this file to rebrand or modify about page copy.
 */

export const aboutContent = {
  hero: {
    badge: "Trusted by 50,000+ subscribers across Illinois",
    title: "Powering Illinois with Clean, Affordable Energy",
    subtitle: "We're on a mission to make renewable energy accessible to everyone in Illinois, regardless of income, property type, or location.",
  },

  mission: {
    title: "Our Mission",
    paragraphs: [
      "Zen Community Solar is dedicated to making clean energy accessible to all Illinois residents. We believe everyone deserves the opportunity to save money while supporting renewable energy, regardless of their housing situation or financial circumstances.",
      "Through strategic partnerships with local solar farms, we provide guaranteed savings of 10-20% on electricity costs—with zero upfront investment, no equipment installation, and no long-term commitments.",
      "Our program specifically serves income-qualified households through Illinois' innovative community solar incentives, ensuring that the benefits of renewable energy reach those who need them most.",
    ],
  },

  values: {
    title: "Our Values",
    subtitle: "The principles that guide everything we do",
    items: [
      {
        title: "Accessibility",
        description: "Clean energy should be available to everyone, not just homeowners. We break down barriers to make solar accessible to all.",
        icon: Heart,
      },
      {
        title: "Transparency",
        description: "No hidden fees, no complicated contracts. We believe in straightforward pricing and honest communication.",
        icon: Shield,
      },
      {
        title: "Community First",
        description: "We prioritize local partnerships and community impact, ensuring our success benefits the neighborhoods we serve.",
        icon: Users,
      },
    ],
  },

  coverage: {
    title: "Serving All of Illinois",
    subtitle: "We partner with both major utility providers across the state",
    areas: [
      {
        title: "ComEd Territory",
        description: "Northern Illinois including Chicago, Aurora, Naperville, Joliet, Rockford, and surrounding suburbs throughout the greater Chicagoland area.",
        icon: Zap,
      },
      {
        title: "Ameren Territory",
        description: "Central and Southern Illinois including Springfield, Peoria, Champaign, Bloomington, and surrounding areas across the heart of the state.",
        icon: Zap,
      },
    ],
  },

  cta: {
    title: "Ready to Start Saving?",
    subtitle: "Join thousands of Illinois residents who are already saving money and supporting clean energy.",
    primaryButton: {
      text: "Get Started Today",
      action: "openSignIn", // This tells the component to open sign-in modal
    },
    secondaryButton: {
      text: "Contact Us",
      href: "/contact",
    },
  },
} as const;

// Type exports
export type AboutContent = typeof aboutContent;
export type AboutValue = typeof aboutContent.values.items[number];
export type AboutCoverageArea = typeof aboutContent.coverage.areas[number];
