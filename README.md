# Zen Community Solar - Next.js Website

A modern, full-featured community solar enrollment platform built with Next.js 14, TypeScript, and Tailwind CSS. This is a complete Next.js translation of the original React/Vite application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ✨ Features Implemented

### Public Pages
- ✅ Home page with hero, stats, features, and CTAs
- ✅ About page with mission and coverage areas
- ✅ Projects page with solar farm portfolio
- ✅ FAQs page with categorized accordion
- ✅ Contact page with form
- ✅ Privacy Policy and Terms & Conditions

### Authentication System
- ✅ ZIP code eligibility checker
- ✅ Sign in with email/password
- ✅ Sign up with full registration
- ✅ Mock authentication with localStorage
- ✅ Role-based access control (user/admin)

### User Features
- ✅ 2-step onboarding wizard (document upload + address)
- ✅ User dashboard with enrollment status
- ✅ Profile editing
- ✅ Admin notes display
- ✅ Color-coded status badges

### Admin Panel
- ✅ View all enrollments
- ✅ Review applications
- ✅ Approve/reject/request resubmit
- ✅ Statistics dashboard
- ✅ Admin notes management

## 🎨 Design System

- **Accent Color**: Yellow/gold (`hsl(48 96% 58%)`)
- **Font**: Inter from Google Fonts
- **Components**: 15+ shadcn/ui components
- **Responsive**: Mobile-first design
- **Accessibility**: Touch-friendly 44px minimum heights

## 🛠 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- React Context API
- Mock data with localStorage

## 🧪 Demo Accounts

**Regular User:**
- Email: john@example.com
- Password: any password

**Admin User:**
- Email: admin@zencommunity.solar
- Password: any password

## 📁 Key Files

- `app/` - All pages and routes
- `components/Layout.tsx` - Header/footer wrapper
- `lib/auth-context.tsx` - Authentication provider
- `lib/api.ts` - Mock API functions
- `lib/mock-data.ts` - Sample data
- `lib/types.ts` - TypeScript definitions

## 🚀 Deployment

Deploy to Vercel:
```bash
vercel deploy --prod
```

Or deploy to any platform supporting Next.js (Netlify, AWS Amplify, Railway, etc.)

## 📝 Next Steps

- [ ] Replace mock authentication with real Supabase
- [ ] Implement file upload to cloud storage
- [ ] Add email notifications
- [ ] Integrate Stripe for billing
- [ ] Add analytics tracking

## 📞 Support

The application is fully functional with mock data and ready for production database integration.

Built with Next.js, TypeScript, and Tailwind CSS ⚡
