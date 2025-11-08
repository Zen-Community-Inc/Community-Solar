# Better Auth + Supabase Setup Guide

This guide will help you set up the complete authentication and lead generation system for the Zen Solar website.

## Overview

The system includes:
- **Better Auth** with Google and Microsoft SSO
- **Supabase** for PostgreSQL database and file storage
- **Multi-step onboarding** flow with form validation
- **Bill upload** system with Supabase Storage
- **Webhook integration** with Make.com and Zapier

## Prerequisites

1. Node.js 18+ installed
2. A Supabase account (free tier works)
3. Google Cloud Console account (for Google OAuth)
4. Microsoft Azure account (for Microsoft OAuth)
5. Make.com or Zapier account (optional, for webhooks)

---

## Step 1: Create Supabase Project

### 1.1 Sign up for Supabase
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email

### 1.2 Create a new project
1. Click "New Project"
2. Fill in:
   - **Name:** zen-solar-production
   - **Database Password:** (generate a strong password)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (or Pro if needed)
3. Click "Create new project" (takes ~2 minutes)

### 1.3 Get your Supabase credentials
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon public** key
   - **service_role** key (⚠️ Keep this secret!)

### 1.4 Get your database connection string
1. Go to **Settings** → **Database**
2. Scroll to **Connection string** → **URI**
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your database password

### 1.5 Create Storage Bucket for Bills
1. Go to **Storage** in the sidebar
2. Click "New bucket"
3. Name: `bills`
4. Make it **Public** (we'll use row-level security)
5. Click "Create bucket"

### 1.6 Set up Storage Policies
Go to **Storage** → Select **bills** bucket → Click **Policies** tab

**Policy 1: Allow authenticated users to upload**
1. Click "New Policy"
2. Select "Custom" (or "For full customization")
3. Fill in:
   - **Policy name:** `Users can upload their own bills`
   - **Allowed operation:** `INSERT`
   - **Target roles:** `authenticated`
   - **WITH CHECK expression:**
     ```sql
     bucket_id = 'bills'
     ```
4. Click "Save"

**Policy 2: Allow users to read their own bills**
1. Click "New Policy" again
2. Select "Custom"
3. Fill in:
   - **Policy name:** `Users can read their own bills`
   - **Allowed operation:** `SELECT`
   - **Target roles:** `authenticated`
   - **USING expression:**
     ```sql
     bucket_id = 'bills'
     ```
4. Click "Save"

**Note:** For now, we're allowing all authenticated users to read all bills in the bucket. In production, you may want to restrict this to only the user's own files by adding user-specific path checks.

---

## Step 2: Set up Google OAuth

### 2.1 Create Google OAuth App
1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure consent screen if prompted:
   - User Type: External
   - App name: Zen Solar
   - User support email: your email
   - Developer contact: your email
6. Application type: **Web application**
7. Name: Zen Solar Production
8. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://your-domain.com/api/auth/callback/google` (production)
9. Click **Create**
10. Copy **Client ID** and **Client Secret**

---

## Step 3: Set up Microsoft OAuth (Optional)

### 3.1 Create Microsoft App Registration
1. Go to https://portal.azure.com
2. Search for **App registrations**
3. Click **New registration**
4. Fill in:
   - Name: Zen Solar
   - Supported account types: Accounts in any organizational directory and personal Microsoft accounts
   - Redirect URI: Web → `http://localhost:3000/api/auth/callback/microsoft`
5. Click **Register**
6. Copy **Application (client) ID**
7. Go to **Certificates & secrets**
8. Click **New client secret**
9. Description: Production
10. Expires: 24 months
11. Click **Add**
12. Copy the **Value** (client secret)

---

## Step 4: Configure Environment Variables

### 4.1 Copy the example file
```bash
cp .env.example .env.local
```

### 4.2 Fill in your values
```env
# Supabase Database URL (from Step 1.4)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"

# Supabase (from Step 1.3)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth (from Step 2)
GOOGLE_CLIENT_ID="123456789-abc.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-..."

# Microsoft OAuth (from Step 3)
MICROSOFT_CLIENT_ID="12345678-1234-1234-1234-123456789abc"
MICROSOFT_CLIENT_SECRET="abc~123..."

# Webhooks (optional - skip for now)
WEBHOOK_SECRET="your-random-secret-key"
# MAKE_WEBHOOK_URL=""
# ZAPIER_WEBHOOK_URL=""
```

---

## Step 5: Run Database Migrations

### 5.1 Generate Prisma Client
```bash
npx prisma generate
```

### 5.2 Push schema to database
```bash
npx prisma db push
```

This will create the `Lead` and `Bill` tables in your Supabase database.

### 5.3 Verify in Supabase
1. Go to **Table Editor** in Supabase
2. You should see:
   - `Lead` table
   - `Bill` table
   - Better Auth tables (user, session, account, verification)

---

## Step 6: Test the Application

### 6.1 Install dependencies (if not done)
```bash
npm install
```

### 6.2 Run the development server
```bash
npm run dev
```

### 6.3 Test the flow
1. Go to http://localhost:3000
2. Click "Get Started" or "Sign In"
3. Click "Continue with Google"
4. Complete Google OAuth
5. You'll be redirected to `/onboarding`
6. Complete all 5 steps:
   - Step 1: Basic Info (First Name and Last Name pre-filled from Google, Email pre-filled, Phone Number required)
   - Step 2: Service Location
   - Step 3: Utility & Benefits
   - Step 4: Bill Upload
   - Step 5: Confirmation
7. Submit the form
8. Check Supabase:
   - **Table Editor** → `Lead` should have your data
   - **Table Editor** → `Bill` should have your uploaded bills
   - **Storage** → `bills` should have your files

---

## Step 7: Set up Webhooks (Optional)

### 7.1 Create Make.com Webhook
1. Go to https://www.make.com
2. Create a new scenario
3. Add **Webhooks** → **Custom webhook**
4. Copy the webhook URL
5. Add it to `.env.local`:
   ```env
   MAKE_WEBHOOK_URL="https://hook.us1.make.com/xxx"
   ```

### 7.2 Create Zapier Webhook
1. Go to https://zapier.com
2. Create a new Zap
3. Trigger: **Webhooks by Zapier** → **Catch Hook**
4. Copy the webhook URL
5. Add it to `.env.local`:
   ```env
   ZAPIER_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/xxx"
   ```

### 7.3 Webhook Payload
When a lead submits the onboarding form, this JSON is sent:
```json
{
  "event": "lead.submitted",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "userId": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "5551234567",
    "serviceAddress": "123 Main St",
    "city": "Chicago",
    "state": "IL",
    "electricUtilityProvider": "ComEd",
    "governmentBenefitProgram": "SNAP",
    "billCount": 3
  }
}
```

---

## Troubleshooting

### Database connection errors
- Check your `DATABASE_URL` has the correct password
- Verify your IP is allowed in Supabase (Settings → Database → Connection pooling)

### OAuth errors
- Verify redirect URIs match exactly (including `/api/auth/callback/google`)
- Check OAuth consent screen is configured
- Make sure credentials are copied correctly

### File upload errors
- Check Supabase Storage policies are set up
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check file size limits (10MB max by default)

### Prisma errors
- Run `npx prisma generate` after schema changes
- Run `npx prisma db push` to sync schema

---

## Production Deployment

### Update environment variables for production:
1. `NEXT_PUBLIC_APP_URL` → Your production domain
2. `DATABASE_URL` → Use connection pooling URL for better performance
3. Add production redirect URIs to Google/Microsoft OAuth
4. Set up Supabase production project (recommended)

### Deploy to Vercel:
```bash
vercel
```

Or push to GitHub and connect to Vercel dashboard.

---

## Need Help?

- **Supabase Docs:** https://supabase.com/docs
- **Better Auth Docs:** https://www.better-auth.com/docs
- **Prisma Docs:** https://www.prisma.io/docs

## Summary

You now have:
✅ Better Auth with Google & Microsoft SSO
✅ Supabase Postgres database
✅ Supabase Storage for bill uploads
✅ Multi-step onboarding flow
✅ Webhook integration for Make/Zapier
✅ Protected routes with middleware
✅ Type-safe database with Prisma

Your lead generation system is ready to go!
