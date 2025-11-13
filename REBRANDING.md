# Rebranding Guide

This guide explains how to rebrand this template for different community solar projects.

## Overview

All site-wide branding, contact information, and configuration is centralized in `/lib/site-config.ts`. This makes it easy to deploy this template for multiple projects by simply updating one file.

---

## Quick Start

### 1. Update Site Configuration

Edit `/lib/site-config.ts` with your project's information:

```typescript
export const siteConfig = {
  company: {
    name: "Your Company Name",
    shortName: "Short Name",
    tagline: "Your tagline here",
    // ... other fields
  },
  contact: {
    email: {
      general: "hello@yourcompany.com",
      // ... other email addresses
    },
    // ... other contact info
  },
  // ... rest of configuration
}
```

### 2. Update Environment Variables

Copy `.env.example` to `.env.local` and update:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your project-specific values:
- Database URLs
- Supabase credentials
- Google OAuth credentials
- Webhook URLs
- App URL

### 3. Update Visual Assets

Replace these files with your branding:
- `/public/assets/hero-solar.jpg` - Hero section background image
- `/public/favicon.ico` - Browser favicon
- `/public/logo.svg` (if you add a logo)

### 4. Update Theme Colors (Optional)

If you want to change from the yellow accent theme:

1. Update `tailwind.config.ts`:
```typescript
colors: {
  // Change yellow to your brand color
  primary: colors.blue, // or any other color
}
```

2. Update `lib/site-config.ts`:
```typescript
theme: {
  primary: "#YOUR_COLOR",
  primaryHover: "#YOUR_HOVER_COLOR",
  accent: "#YOUR_ACCENT_COLOR",
}
```

3. Search and replace yellow classes across components:
   - `bg-yellow-` → `bg-yourcolor-`
   - `text-yellow-` → `text-yourcolor-`
   - `border-yellow-` → `border-yourcolor-`

---

## Configuration Reference

### Company Information

```typescript
company: {
  name: string;          // Full company name (used in headers, legal docs)
  shortName: string;     // Short name (used in navigation, casual references)
  tagline: string;       // Hero section tagline
  description: string;   // Meta description for SEO
}
```

### Contact Information

```typescript
contact: {
  email: {
    general: string;    // General inquiries
    support: string;    // Customer support
    privacy: string;    // Privacy inquiries
    legal: string;      // Legal inquiries
  },
  phone: {
    display: string;    // Formatted for display: "(312) 555-0100"
    raw: string;        // For tel: links: "+13125550100"
  },
  address: {
    city: string;
    state: string;      // Abbreviation: "IL"
    stateFullName: string; // Full name: "Illinois"
    full: string;       // For display: "Chicago, IL"
  },
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  }
}
```

### Service Configuration

```typescript
service: {
  utilities: string[];           // Supported utility providers
  territories: string[];         // Service territories (states)
  governmentPrograms: string[];  // Qualifying assistance programs
}
```

### Business Metrics

```typescript
stats: {
  subscribers: string;      // "50,000+"
  energyGenerated: string;  // "18.9 million kWh"
  co2Avoided: string;       // "13,400 metric tons"
  reviewCount: string;      // "1,200+"
  rating: number;           // 4.8
  savingsRange: {
    min: number;            // 10 (%)
    max: number;            // 20 (%)
  }
}
```

### Program Terms

```typescript
terms: {
  subscriptionType: string;      // "Month-to-Month"
  cancellationNoticeDays: number; // 30
  enrollmentTimeDays: string;     // "3-5 business days"
  activationTimeDays: string;     // "30-60 days"
  paymentTermsDays: number;       // 15
  minAge: number;                 // 18
}
```

### Feature Flags

```typescript
features: {
  maxBillUploads: number;          // 3
  enablePartialFormCapture: boolean; // true
  enableWebhooks: boolean;          // true
  enableGoogleAuth: boolean;        // true
}
```

---

## Where Configuration is Used

The site configuration is imported and used throughout the application:

### Components That Use Config:
- `/components/Footer.tsx` - Contact info, social links
- `/components/home/HeroSection.tsx` - Tagline, stats
- `/components/home/StatsSection.tsx` - Business metrics
- `/app/privacy/page.tsx` - Legal info, contact details
- `/app/terms/page.tsx` - Legal info, terms, contact details
- `/app/contact/page.tsx` - Contact form, company info
- `/app/about/page.tsx` - Company description

### Example Usage:

```typescript
import { siteConfig } from "@/lib/site-config";

// Access company name
<h1>{siteConfig.company.name}</h1>

// Access contact email
<a href={`mailto:${siteConfig.contact.email.general}`}>
  {siteConfig.contact.email.general}
</a>

// Access stats
<p>{siteConfig.stats.subscribers} subscribers</p>

// Access service info
{siteConfig.service.utilities.map(utility => (
  <li key={utility}>{utility}</li>
))}
```

---

## Database Configuration

The Prisma schema is located at `/prisma/schema.prisma`. You typically won't need to change this unless you're adding new features.

If you need to modify the database:

1. Update `/prisma/schema.prisma`
2. Run migrations:
```bash
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

---

## Deployment Checklist

Before deploying a rebranded site:

- [ ] Update all values in `/lib/site-config.ts`
- [ ] Configure all environment variables in `.env.local`
- [ ] Replace hero image `/public/assets/hero-solar.jpg`
- [ ] Update favicon `/public/favicon.ico`
- [ ] Update theme colors (if changing from yellow)
- [ ] Test all contact forms with real email addresses
- [ ] Configure Supabase project and storage bucket
- [ ] Set up Google OAuth credentials
- [ ] Configure Zapier/Make webhook URLs
- [ ] Update DNS and domain settings
- [ ] Test onboarding flow end-to-end
- [ ] Verify bill upload functionality
- [ ] Check all legal pages (Privacy, Terms)

---

## Support

For questions or issues with this template:
- Create an issue in the repository
- Contact the development team
- Review the main README.md for technical setup

---

## License

This template is designed for reuse across multiple community solar projects. Ensure you have proper licensing rights before deployment.
