# QuizzyMind - Deployment Guide

## Deploy to Vercel (Free)

### Prerequisites
1. GitHub account
2. Vercel account (free)
3. Database (PlanetScale, Neon, or other)
4. OpenAI or Google Gemini API key

### Step-by-Step Deployment

#### 1. Prepare Your Repository
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - QuizzyMind ready for deployment"

# Push to GitHub
git remote add origin https://github.com/yourusername/quizzymind.git
git branch -M main
git push -u origin main
```

#### 2. Database Setup (Choose one)

**Option A: PlanetScale (Recommended)**
1. Sign up at [PlanetScale](https://planetscale.com/)
2. Create a new database
3. Get connection string from dashboard

**Option B: Neon (Alternative)**
1. Sign up at [Neon](https://neon.tech/)
2. Create a new project
3. Copy the connection string

#### 3. Deploy to Vercel
1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click "New Project"
4. Import your QuizzyMind repository
5. Configure environment variables:

```
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=https://your-app-name.vercel.app
OPENAI_API_KEY=your_openai_api_key
# OR
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_key
```

#### 4. Generate NEXTAUTH_SECRET
Run this command locally:
```bash
openssl rand -base64 32
```

#### 5. Environment Variables in Vercel
- Go to your project settings in Vercel
- Navigate to "Environment Variables"
- Add each variable from your .env file
- Make sure to set the correct NEXTAUTH_URL to your Vercel domain

#### 6. Database Migration
After deployment, run Prisma migrations:
```bash
# In your Vercel project settings, add this build command:
npx prisma generate && npx prisma db push && next build
```

### Free Tier Limitations
- Vercel: 100GB bandwidth/month, 1000 serverless function invocations/day
- PlanetScale: 1 database, 1GB storage, 1 billion row reads/month
- OpenAI: $5 free credits (usually lasts long time for personal use)

### Optional: Custom Domain
1. Go to Vercel project settings
2. Navigate to "Domains" 
3. Add your custom domain
4. Update NEXTAUTH_URL environment variable

Your QuizzyMind app will be live at: `https://your-project-name.vercel.app`
