# Deployment Checklist for Vercel + PlanetScale

## Prerequisites
- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub)
- [ ] PlanetScale account
- [ ] Google Gemini API key

## Phase 1: Database Setup (Choose One FREE Option)

### Option A: Supabase (PostgreSQL - Recommended)
1. **Create Supabase Database**:
   - [ ] Go to [supabase.com](https://supabase.com)
   - [ ] Create account and new project
   - [ ] Name: `quizzymind` (or your preference)
   - [ ] Choose region closest to you

2. **Get Connection String**:
   - [ ] Project Settings → Database → Connection String
   - [ ] Copy the connection string (starts with `postgresql://`)
   - [ ] Note: You'll need to update Prisma schema for PostgreSQL

### Option B: Railway (MySQL/PostgreSQL)
1. **Deploy to Railway**:
   - [ ] Go to [railway.app](https://railway.app)
   - [ ] Sign up with GitHub
   - [ ] Create new project from GitHub repo
   - [ ] Add MySQL or PostgreSQL database service
   - [ ] Copy connection string from Variables tab

### Option C: Neon (PostgreSQL)
1. **Create Neon Database**:
   - [ ] Go to [neon.tech](https://neon.tech)
   - [ ] Create account and new project
   - [ ] Copy connection string
   - [ ] Note: You'll need to update Prisma schema for PostgreSQL

## Phase 2: Get Gemini API Key

1. **Google AI Studio**:
   - [ ] Go to [aistudio.google.com](https://aistudio.google.com)
   - [ ] Create/login to Google account
   - [ ] Get API key from "Get API key" section
   - [ ] Save the key for later

## Phase 3: Deploy to Vercel

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - [ ] Go to [vercel.com](https://vercel.com)
   - [ ] Sign in with GitHub
   - [ ] Click "New Project"
   - [ ] Import your `QuizzyMind` repository

3. **Configure Environment Variables**:
   Add these in Vercel dashboard → Settings → Environment Variables:
   
   ```
   DATABASE_URL=your_planetscale_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   NEXTAUTH_URL=https://your-project-name.vercel.app
   NEXTAUTH_SECRET=random_32_char_string
   ```

4. **Generate NEXTAUTH_SECRET**:
   Run this command locally and copy the result:
   ```bash
   openssl rand -base64 32
   ```
   Or use: https://generate-secret.vercel.app/32

5. **Deploy**:
   - [ ] Click "Deploy" in Vercel
   - [ ] Wait for deployment to complete

## Phase 4: Database Migration

1. **Run Prisma Migration**:
   After deployment, go to Vercel dashboard → Functions → View Function Logs
   Or run locally with production DATABASE_URL:
   ```bash
   npx prisma db push
   ```

## Phase 5: Test Your App

1. **Visit Your App**:
   - [ ] Go to your Vercel URL
   - [ ] Test user registration
   - [ ] Test quiz creation
   - [ ] Test AI quiz generation

## Troubleshooting Tips

- **Build Errors**: Check Vercel function logs
- **Database Errors**: Verify DATABASE_URL is correct
- **AI Errors**: Verify GEMINI_API_KEY is valid
- **Auth Errors**: Check NEXTAUTH_URL and NEXTAUTH_SECRET

## Cost Breakdown (Free Tiers)

- **Vercel**: Free for hobby projects (unlimited deployments)
- **Supabase**: Free tier (500MB database, 2GB storage)
- **Railway**: $5 free credit monthly (usually sufficient)
- **Neon**: Free tier (3GB storage, 100 hours compute)
- **Google Gemini**: Free tier (60 requests/minute)

**Total Monthly Cost: $0** 🎉
