/**
 * Contact Page Content
 *
 * All text content for the contact page.
 * Update this file to rebrand or modify contact page copy.
 */

export const contactContent = {
  hero: {
    badge: "We typically respond within 24 hours",
    title: "Get in Touch",
    subtitle: "Have questions? Want a personalized quote? We're here to help you save with community solar.",
  },

  form: {
    title: "Send Us a Message",
    subtitle: "Fill out the form below and we'll get back to you soon.",
    successTitle: "Message Sent!",
    successMessage: "Thank you for contacting us. We've received your message and will respond within 24 hours.",
    successButton: "Send Another Message",
    submitButton: "Send Message",
    submittingButton: "Sending...",
  },

  sidebar: {
    enterprise: {
      title: "Enterprise Solutions",
      description: "Looking to bring community solar to your multifamily property, business, or nonprofit? We offer custom solutions for:",
      items: [
        "Apartment buildings & HOAs",
        "Commercial properties",
        "Nonprofits & places of worship",
        "Municipal buildings",
      ],
    },
    quickResponse: {
      title: "Quick Response",
      description: "We typically respond to all inquiries within 24 hours during business days.",
    },
  },
} as const;

// Type exports
export type ContactContent = typeof contactContent;
