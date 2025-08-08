# QuizzyMind Deployment Commands

## 1. Prepare for deployment
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## 2. Generate NextAuth Secret (Windows)
```cmd
# If you have Git Bash or WSL, use:
openssl rand -base64 32

# Otherwise, visit: https://generate-secret.vercel.app/32
```

## 3. Environment Variables for Vercel
Copy these to Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=mysql://your-planetscale-connection-string
GEMINI_API_KEY=your-gemini-api-key-here
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=your-generated-32-char-secret
```

## 4. After Deployment - Database Setup
```bash
# Option 1: Use Vercel CLI (install with: npm i -g vercel)
vercel env pull .env.local
npx prisma db push

# Option 2: Manual - Set your DATABASE_URL locally and run:
npx prisma db push
```

## 5. Test Your Deployment
- Visit your Vercel URL
- Try registering a new user
- Create and take a quiz
- Check if AI generation works
