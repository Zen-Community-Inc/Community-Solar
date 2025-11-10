# Quick Start Guide

## 🚀 Rebranding in 3 Steps

### Step 1: Company Information (5 minutes)

Edit [`lib/site-config.ts`](lib/site-config.ts):

```typescript
company: {
  name: "Your Company Name",        // Change this
  shortName: "YourCo",               // Short version
  tagline: "Your tagline",           // Main tagline
},

contact: {
  email: { general: "your@email.com" },
  phone: {
    display: "(555) 123-4567",
    raw: "+15551234567",
  },
  address: {
    city: "Your City",
    state: "YS",
    full: "Your City, YS",
  },
  social: {
    facebook: "https://facebook.com/yourpage",
    instagram: "https://instagram.com/yourpage",
  },
},

stats: {
  subscribers: "5,000+",             // Your numbers
  energyGeneratedShort: "10M",
  co2AvoidedShort: "8K",
  // ... update all stats
},
```

### Step 2: Page Content (10 minutes)

Edit [`lib/content/home-content.ts`](lib/content/home-content.ts):
```typescript
hero: {
  headline: "Your Main Headline",
  subheadline: "Your value proposition",
}
```

Edit [`lib/content/about-content.ts`](lib/content/about-content.ts):
```typescript
hero: {
  title: "About Your Company",
  subtitle: "Your mission statement",
}
```

Edit [`lib/content/contact-content.ts`](lib/content/contact-content.ts):
```typescript
hero: {
  title: "Get in Touch",
  subtitle: "How to reach us",
}
```

### Step 3: Images & Theme (5 minutes)

1. Replace images in `public/assets/`:
   - `hero-solar.jpg` → Your hero image

2. (Optional) Update theme colors in [`lib/site-config.ts`](lib/site-config.ts):
   ```typescript
   theme: {
     primary: "#YOUR_COLOR",
     accent: "#YOUR_ACCENT",
   }
   ```

3. Test your changes:
   ```bash
   npm run dev
   ```

---

## 📦 Common Components

Quick reference for reusable components:

### PageHero - Hero Sections
```tsx
<PageHero
  badge="Trust Badge"
  title="Page Title"
  subtitle="Subtitle text"
  variant="gradient"
/>
```

### StatsGrid - Statistics
```tsx
<StatsGrid
  stats={[
    { label: "Users", value: "10K", icon: Users },
    { label: "Rating", value: "4.8" }
  ]}
  columns={4}
/>
```

### FeatureCard - Features
```tsx
<FeatureCard
  icon={Heart}
  title="Feature Name"
  description="Feature description"
/>
```

### CTASection - Call to Action
```tsx
<CTASection
  title="Ready?"
  subtitle="Get started today"
  primaryButton={{ text: "Sign Up", href: "/signup" }}
/>
```

---

## 📁 File Structure

```
Where to find things:

Company Info     → lib/site-config.ts
Page Content     → lib/content/*.ts
Reusable UI      → components/common/*.tsx
Page Components  → app/*/page.tsx
```

---

## 🎯 Common Tasks

### Change Company Name
**File:** `lib/site-config.ts` → `company.name`

### Change Contact Info
**File:** `lib/site-config.ts` → `contact.*`

### Update Statistics
**File:** `lib/site-config.ts` → `stats.*`

### Edit Page Copy
**Files:** `lib/content/*.ts` (one file per page)

### Add New Page
1. Create `app/yourpage/page.tsx`
2. Use common components
3. (Optional) Create `lib/content/yourpage-content.ts`

---

## 🛠️ Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Check for errors
npm run start    # Start production server
```

---

## 📚 Full Documentation

See [ARCHITECTURE.md](ARCHITECTURE.md) for:
- Complete component API reference
- Architecture details
- Step-by-step examples
- Best practices

---

## 💡 Tips

1. **Always use common components** instead of creating new ones
2. **Centralize content** in `lib/content/*.ts` files
3. **Test after changes** with `npm run build`
4. **Check ARCHITECTURE.md** for component examples

---

**Need Help?** Check [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation.
