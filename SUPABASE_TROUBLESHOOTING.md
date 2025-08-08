# 🔧 Supabase Connection Troubleshooting

## Issue: Can't reach database server

You're getting this error because either:
1. The database is paused (auto-pauses after 7 days)
2. Wrong connection string format
3. Network/SSL issues

## ✅ **Step 1: Wake Up Your Database**

1. **Go to**: [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Sign in** with your account
3. **Click on your project**: `quizmify` (or whatever you named it)
4. **If paused**: You'll see a "Resume" button - click it
5. **Wait 1-2 minutes** for the database to fully wake up

## ✅ **Step 2: Get the Correct Connection String**

In your Supabase dashboard:

1. **Go to Settings** (left sidebar)
2. **Click "Database"**
3. **Scroll down to "Connection string"**
4. **Select "Nodejs"** tab
5. **Copy the connection string** - it should look like:

```
postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

## ✅ **Step 3: Update Your Connection Strings**

The format might be different from what you have. Modern Supabase uses:

**Option A: Pooled Connection (Recommended)**
```bash
DATABASE_URL="postgresql://postgres.ygvfcirckuteldjjtfkc:[YOUR_PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.ygvfcirckuteldjjtfkc:[YOUR_PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
```

**Option B: Direct Connection**
```bash
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.ygvfcirckuteldjjtfkc.supabase.co:5432/postgres?sslmode=require"
DIRECT_URL="postgresql://postgres:[YOUR_PASSWORD]@db.ygvfcirckuteldjjtfkc.supabase.co:5432/postgres?sslmode=require"
```

## ✅ **Step 4: Test Connection**

After updating your connection strings:

```bash
# Test the connection
npx prisma db push

# If successful, start your app
npm run dev
```

## 🚨 **If Still Not Working**

### Check 1: Verify Project Status
- Is your Supabase project active/resumed?
- Is there a green dot next to your project name?

### Check 2: Reset Database Password
1. Go to **Settings** → **Database**
2. Click **"Reset database password"**
3. Set a new password (avoid special characters: use letters/numbers only)
4. Update your `.env` files with the new password

### Check 3: Try Alternative Connection Format
Some users need to use the pooler connection string instead of direct connection.

## 📞 **Quick Fix Commands**

```bash
# 1. First, make sure Supabase project is active in dashboard
# 2. Get correct connection string from Supabase dashboard
# 3. Update .env and .env.local files
# 4. Then run:

npx prisma db push
```

## 🎯 **Most Common Solution**

The most common fix is:
1. **Resume your paused Supabase project**
2. **Add `?sslmode=require` to the end of your DATABASE_URL**

Example:
```bash
DATABASE_URL="postgresql://postgres:mehedi1515@db.ygvfcirckuteldjjtfkc.supabase.co:5432/postgres?sslmode=require"
```

Try this first! 👆
