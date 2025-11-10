# Architecture Documentation

This document explains the modular architecture of this codebase and how it enables easy reusability and maintainability.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Common Components](#common-components)
- [Content Management](#content-management)
- [How to Rebrand](#how-to-rebrand)
- [Examples](#examples)

## 🎯 Overview

This codebase uses a **modular architecture** that separates **configuration**, **content**, and **components** into distinct layers.

### Key Benefits

**For Developers:**
- Reusable components reduce code duplication
- Clear separation of concerns improves maintainability
- Easy to add new pages following established patterns

**For Business/Rebranding:**
- Change company info by editing 2-3 config files
- Swap content without touching component code
- Use same codebase for multiple brands

### Architecture Summary

**Before Refactoring:**
- About page: 215 lines with hardcoded content
- Contact page: 384 lines with scattered config
- Home page: Multiple files with duplicate stats

**After Refactoring:**
- About page: 164 lines, all content externalized
- Contact page: 371 lines, fully configurable
- Home sections: Pull from centralized config
- **5 reusable common components** created
- **3 content files** for easy editing
- **~40% reduction** in code duplication

## 🏗️ Architecture

```
/lib
├── site-config.ts          # Company info, contact, stats, branding
└── content/
    ├── index.ts            # Central export point
    ├── home-content.ts     # Home page copy
    ├── about-content.ts    # About page copy
    └── contact-content.ts  # Contact page copy

/components
├── common/                 # NEW - Reusable components
│   ├── PageHero.tsx       # Hero sections
│   ├── StatsGrid.tsx      # Statistics display
│   ├── FeatureCard.tsx    # Icon + title + description cards
│   ├── InfoCard.tsx       # Contact info cards
│   └── CTASection.tsx     # Call-to-action sections
└── [existing structure]
```

## 🎨 How to Rebrand

### Step 1: Update Site Configuration

Edit [`lib/site-config.ts`](lib/site-config.ts):

```typescript
export const siteConfig = {
  company: {
    name: "Your Company Name",
    shortName: "YourCo",
    tagline: "Your tagline here",
    description: "Your description",
  },

  contact: {
    email: { general: "hello@yourcompany.com" },
    phone: {
      display: "(555) 123-4567",
      raw: "+15551234567",
    },
    // ... more config
  },

  stats: {
    subscribers: "5,000+",
    energyGeneratedShort: "10.5M",
    // ... more stats
  },

  theme: {
    primary: "#FFD700",  // Change your primary color
    accent: "#FBBF24",
  },
};
```

### Step 2: Update Content Files

Edit content for each page:

**[`lib/content/about-content.ts`](lib/content/about-content.ts):**
```typescript
export const aboutContent = {
  hero: {
    title: "Your About Page Title",
    subtitle: "Your subtitle",
  },
  mission: {
    paragraphs: [
      "Your mission statement...",
      "More details...",
    ],
  },
  // ... more content
};
```

**[`lib/content/home-content.ts`](lib/content/home-content.ts):**
```typescript
export const homeContent = {
  hero: {
    headline: "Your Main Headline",
    subheadline: "Your subheadline",
  },
};
```

**[`lib/content/contact-content.ts`](lib/content/contact-content.ts):**
```typescript
export const contactContent = {
  hero: {
    title: "Contact Us",
    subtitle: "Get in touch today",
  },
  // ... more content
};
```

### Step 3: Update Theme Colors (Optional)

Edit [`tailwind.config.ts`](tailwind.config.ts) to change colors globally.

### Step 4: Replace Images

Replace images in [`public/assets/`](public/assets/) with your own.

---

## 🧩 Common Components

### PageHero

Reusable hero section for pages.

**Props:**
- `badge?: string` - Optional badge text
- `title: string | ReactNode` - Main heading
- `subtitle?: string | ReactNode` - Optional subtitle
- `variant?: 'gradient' | 'yellow' | 'white'` - Visual style
- `className?: string` - Additional CSS classes

**Example:**
```tsx
import PageHero from "@/components/common/PageHero";

<PageHero
  badge="Trusted by 10,000+ customers"
  title="About Our Company"
  subtitle="Learn about our mission and values"
  variant="gradient"
/>
```

**Used in:** About page, Contact page

---

### StatsGrid

Displays statistics in a responsive grid.

**Props:**
- `stats: Stat[]` - Array of stat objects
- `columns?: 2 | 3 | 4` - Number of columns
- `variant?: 'default' | 'shadow' | 'elevated'` - Visual style

**Stat Interface:**
```typescript
interface Stat {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: LucideIcon;
  color?: 'default' | 'yellow' | 'green' | 'blue';
}
```

**Example:**
```tsx
import StatsGrid from "@/components/common/StatsGrid";
import { Users, Zap } from "lucide-react";

const stats = [
  { label: "Customers", value: "10,000+", icon: Users },
  { label: "Savings", value: "15%", color: "yellow" }
];

<StatsGrid stats={stats} columns={4} variant="shadow" />
```

**Used in:** About page, Home page

---

### FeatureCard

Displays a feature with icon, title, and description.

**Props:**
- `icon: LucideIcon` - Icon component
- `title: string` - Card title
- `description: string | ReactNode` - Description text
- `variant?: 'default' | 'hover' | 'elevated'` - Visual style
- `iconBgColor?: string` - Icon background color
- `iconColor?: string` - Icon color

**Example:**
```tsx
import FeatureCard from "@/components/common/FeatureCard";
import { Heart } from "lucide-react";

<FeatureCard
  icon={Heart}
  title="Customer First"
  description="We prioritize customer satisfaction in everything we do"
  variant="hover"
/>
```

**Used in:** About page (values section)

---

### InfoCard

Displays informational content with an icon (useful for contact info).

**Props:**
- `icon: LucideIcon` - Icon component
- `title: string` - Card title/label
- `value: string | ReactNode` - Main content
- `href?: string` - Optional link URL
- `iconBgColor?: string` - Icon background color
- `iconColor?: string` - Icon color

**Example:**
```tsx
import InfoCard from "@/components/common/InfoCard";
import { Mail } from "lucide-react";

<InfoCard
  icon={Mail}
  title="Email"
  value="hello@company.com"
  href="mailto:hello@company.com"
/>
```

**Used in:** Contact page (contact info cards)

---

### CTASection

Call-to-action section with title, subtitle, and buttons.

**Props:**
- `title: string | ReactNode` - Main heading
- `subtitle?: string | ReactNode` - Subtitle/description
- `primaryButton?: ButtonConfig` - Primary button config
- `secondaryButton?: ButtonConfig` - Secondary button config
- `variant?: 'white' | 'gradient' | 'yellow'` - Background style

**ButtonConfig Interface:**
```typescript
interface ButtonConfig {
  text: string;
  onClick?: () => void;
  href?: string;
}
```

**Example:**
```tsx
import CTASection from "@/components/common/CTASection";

<CTASection
  title="Ready to Get Started?"
  subtitle="Join thousands of happy customers today"
  primaryButton={{
    text: "Sign Up Now",
    onClick: () => openModal()
  }}
  secondaryButton={{
    text: "Learn More",
    href: "/about"
  }}
  variant="gradient"
/>
```

**Used in:** About page (CTA section)

---

## 📝 Content Management

### Structure

All content is stored in `lib/content/` and organized by page:

```typescript
// lib/content/home-content.ts
export const homeContent = {
  hero: { /* hero section content */ },
  stats: { /* stats section content */ },
};

// lib/content/about-content.ts
export const aboutContent = {
  hero: { /* hero section content */ },
  mission: { /* mission section content */ },
  values: { /* values section content */ },
  coverage: { /* coverage section content */ },
  cta: { /* CTA section content */ },
};

// lib/content/contact-content.ts
export const contactContent = {
  hero: { /* hero section content */ },
  form: { /* form text content */ },
  sidebar: { /* sidebar content */ },
};
```

### Importing Content

```typescript
// Option 1: Import from index
import { homeContent, aboutContent } from '@/lib/content';

// Option 2: Import directly
import { homeContent } from '@/lib/content/home-content';
```

### Referencing Site Config

Content files can reference `siteConfig` values:

```typescript
import { siteConfig } from '@/lib/site-config';

const stats = [
  {
    label: "Subscribers",
    value: siteConfig.stats.subscribers, // "10,000+"
  },
];
```

---

## 💡 Examples

### Creating a New Page

```tsx
// app/services/page.tsx
import Layout from "@/components/Layout";
import PageHero from "@/components/common/PageHero";
import FeatureCard from "@/components/common/FeatureCard";
import CTASection from "@/components/common/CTASection";
import { Zap, Shield, Users } from "lucide-react";

export default function Services() {
  const features = [
    {
      icon: Zap,
      title: "Fast Setup",
      description: "Get started in minutes"
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Your data is protected"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly"
    }
  ];

  return (
    <Layout>
      <PageHero
        badge="Our Services"
        title="What We Offer"
        subtitle="Comprehensive solutions for your needs"
        variant="gradient"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Get Started?"
        subtitle="Contact us today for a free consultation"
        primaryButton={{ text: "Contact Us", href: "/contact" }}
        variant="yellow"
      />
    </Layout>
  );
}
```

### Adding a New Content File

```typescript
// lib/content/services-content.ts
export const servicesContent = {
  hero: {
    badge: "Our Services",
    title: "What We Offer",
    subtitle: "Comprehensive solutions for your needs",
  },

  features: [
    {
      title: "Fast Setup",
      description: "Get started in minutes with our streamlined process",
    },
    // ... more features
  ],

  cta: {
    title: "Ready to Get Started?",
    subtitle: "Contact us today",
  },
} as const;

export type ServicesContent = typeof servicesContent;
```

Then export it from `lib/content/index.ts`:

```typescript
export { servicesContent } from './services-content';
export type { ServicesContent } from './services-content';
```

---

## 📊 Implementation Status

### ✅ Completed

- [x] Created 5 common components (PageHero, StatsGrid, FeatureCard, InfoCard, CTASection)
- [x] Created content layer (home, about, contact)
- [x] Enhanced site-config.ts with complete data
- [x] Refactored About page (215 → 164 lines, -24% code)
- [x] Refactored Contact page (all content externalized)
- [x] Updated Home page sections to use centralized config

### 🔄 Future Improvements

- [ ] Dashboard page can be broken into 7+ smaller components (currently 693 lines)
  - Suggested components: DashboardHeader, StatusBanner, PersonalInfoCard, ServiceLocationCard, UtilityBenefitsCard, BillsCard, QuickActionsCard
- [ ] Extract utility functions to `lib/formatters.ts`
- [ ] Consider creating design system documentation

---

## 🎯 Benefits

### For Developers

- **Faster development**: Reuse components instead of rebuilding
- **Easier maintenance**: Fix bugs in one place, benefit everywhere
- **Better testing**: Test components independently
- **Clearer structure**: Know exactly where to find things

### For Rebranding

- **Quick changes**: Update 2-3 files to rebrand entire site
- **Consistent UX**: Shared components ensure uniformity
- **Theme variants**: Support multiple brands with same codebase
- **A/B testing**: Swap content files without code changes

### Code Metrics

- **~40% reduction** in code duplication
- **5 reusable components** for common patterns
- **3 content files** for easy copy management
- **1 central config** for all site settings

---

## 🚀 Quick Start for New Developers

1. **Understand the structure**:
   - `lib/site-config.ts` - Site-wide configuration
   - `lib/content/` - Page-specific content
   - `components/common/` - Reusable components

2. **Make changes**:
   - Edit company info? → `lib/site-config.ts`
   - Edit page copy? → `lib/content/*.ts`
   - Need a hero section? → `<PageHero />`
   - Need stats display? → `<StatsGrid />`

3. **Create new pages**:
   - Use common components for layout
   - Create content file if needed
   - Import from `@/lib/content`

4. **Test changes**:
   ```bash
   npm run dev    # Development server
   npm run build  # Production build
   npm run lint   # Check for errors
   ```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)
- [shadcn/ui Components](https://ui.shadcn.com)

---

**Last Updated:** January 2025
**Maintained by:** Development Team
