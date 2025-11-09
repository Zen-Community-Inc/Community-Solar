/**
 * Site Configuration
 *
 * Central configuration file for branding, contact information, and site-wide settings.
 * Update these values to rebrand the site for different community solar projects.
 */

export const siteConfig = {
  // Company Information
  company: {
    name: "Zen Community Solar",
    shortName: "Zen Solar",
    tagline: "Lower your operating costs with local community solar",
    description: "Community solar subscription service providing guaranteed savings on energy bills with no upfront costs or installation required.",
  },

  // Contact Information
  contact: {
    email: {
      general: "hinfo@mx.zencommunitysolar.com",
    },
    phone: {
      display: "(+1) 917-764-3897",
      raw: "+19177643897", // For tel: links
    },
    address: {
      city: "Miramar",
      state: "FL",
      stateFullName: "Florida",
      full: "Miramar, FL", // For display purposes
    },
    social: {
      facebook: "https://web.facebook.com/profile.php?id=61582442685007",
      instagram: "https://www.instagram.com/zendirect2025/",
      linkdn:"",
      twitter: "",
    },
  },

  // Service Area & Utilities
  service: {
    utilities: [
      "ComEd (Commonwealth Edison)",
      "Ameren Illinois",
    ],
    territories: [
      "Illinois",
    ],
    governmentPrograms: [
      "SNAP (Supplemental Nutrition Assistance Program)",
      "Medicaid",
      "SSI (Supplemental Security Income)",
      "LIHEAP (Low Income Home Energy Assistance Program)",
      "Housing Assistance (Section 8, Public Housing)",
    ],
  },

  // Business Metrics & Stats
  stats: {
    subscribers: "10,000+",
    energyGenerated: "18.9 million kWh",
    co2Avoided: "13,400 metric tons",
    reviewCount: "1,200+",
    rating: 4.8,
    savingsRange: {
      min: 10,
      max: 20,
    },
  },

  // Program Terms
  terms: {
    subscriptionType: "Month-to-Month",
    cancellationNoticeDays: 30,
    enrollmentTimeDays: "3-5 business days",
    activationTimeDays: "30-60 days",
    paymentTermsDays: 15,
    minAge: 18,
  },

  // URLs
  urls: {
    website: "https://zencommunitysolar.com",
    privacyPolicy: "/privacy",
    termsOfService: "/terms",
    faq: "/faqs",
    about: "/about",
    contact: "/contact",
    onboarding: "/onboarding",
    dashboard: "/dashboard",
  },

  // Legal
  legal: {
    lastUpdated: "January 2025",
    jurisdiction: "Illinois",
    arbitrationRequired: true,
  },

  // Theme Colors (for reference)
  theme: {
    primary: "#FFD700", // Yellow-300
    primaryHover: "#FFC700",
    accent: "#FBBF24", // Yellow-400
  },

  // Feature Flags
  features: {
    maxBillUploads: 3,
    enablePartialFormCapture: true,
    enableWebhooks: true,
    enableGoogleAuth: true,
  },
} as const;

// Type exports for TypeScript
export type SiteConfig = typeof siteConfig;
export type CompanyInfo = typeof siteConfig.company;
export type ContactInfo = typeof siteConfig.contact;
export type ServiceInfo = typeof siteConfig.service;
