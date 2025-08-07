# Authentication Deployment Fix Guide

## Why Authentication is Different Between Local and Production

### Root Causes:
1. **NEXTAUTH_URL mismatch**: Local uses `http://localhost:3000`, production needs your Vercel domain
2. **Environment variables**: Different configurations between local `.env` files and Vercel dashboard
3. **Database connections**: Local vs Neon PostgreSQL differences
4. **Cookie security**: HTTP vs HTTPS affects session cookies
5. **CORS and domain issues**: Cross-origin request handling

## 🚀 Step-by-Step Fix

### Step 1: Update Vercel Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com) → Your Project → Settings → Environment Variables
2. Update these variables:

```bash
# Replace with your actual Vercel URL
NEXTAUTH_URL=https://your-app-name.vercel.app

# Make sure these are set correctly
NEXTAUTH_SECRET=gyMFQGgGtuhuXe88SfO1xx/p56iXtthwm2cAIaXdOnc=
DATABASE_URL=postgresql://neondb_owner:npg_YBSoytk68UJr@ep-green-bread-afuup72q-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
```

### Step 2: Test Your Deployed App
1. Wait for the new deployment to complete
2. Visit your Vercel URL
3. Try registering a new account
4. Try logging in with the created account

### Step 3: Debug Authentication Issues
If you still have problems, check:

1. **Vercel Function Logs**: Go to Vercel Dashboard → Functions tab to see API logs
2. **Browser Network Tab**: Check for 4xx/5xx errors on auth requests
3. **Database Connection**: Verify users are being created in Neon dashboard

### Step 4: Common Issues and Solutions

#### Issue: "Unable to login" / "Invalid credentials"
- **Cause**: NEXTAUTH_URL mismatch or cookie domain issues
- **Fix**: Ensure NEXTAUTH_URL matches your exact Vercel domain

#### Issue: "Registration fails" / "Database error"
- **Cause**: Database connection or schema issues
- **Fix**: Check Neon database connection string and run migrations

#### Issue: "Session not persisting"
- **Cause**: Cookie security settings or domain mismatch
- **Fix**: Clear browser cookies and try again with correct NEXTAUTH_URL

#### Issue: "API routes not working"
- **Cause**: Serverless function timeout or memory limits
- **Fix**: Check Vercel function logs for detailed error messages

## 🔍 Debugging Commands

### Local Testing:
```bash
# Check if registration works locally
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"testpass123"}'

# Check if login works locally
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

### Production Testing:
```bash
# Replace with your Vercel URL
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"testpass123"}'
```

## 📝 What We Fixed

1. **Added production-ready NextAuth configuration**:
   - Custom cookie settings for HTTPS
   - Proper session configuration
   - Custom auth pages

2. **Enhanced registration API with debugging**:
   - Detailed console logging
   - Better error handling
   - Development vs production error responses

3. **Environment-specific configurations**:
   - Secure cookies in production
   - HTTP-only session tokens
   - Proper CORS handling

## ✅ Final Checklist

- [ ] Updated NEXTAUTH_URL in Vercel dashboard
- [ ] Confirmed all environment variables are set
- [ ] Tested registration on deployed app
- [ ] Tested login on deployed app
- [ ] Verified session persistence
- [ ] Checked database for created users

## 🆘 Still Having Issues?

If authentication still doesn't work after these fixes:

1. Check Vercel function logs for detailed error messages
2. Test API endpoints directly with curl/Postman
3. Verify database connection in Neon dashboard
4. Clear all browser cookies and try again
5. Compare network requests between local and production in browser dev tools

The authentication should now work consistently between local and production environments!
