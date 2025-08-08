# Switch from PostgreSQL to MySQL - Complete Guide

## ✅ What I've Already Done For You

1. **Updated Prisma Schema**: Changed from `postgresql` to `mysql` with `relationMode = "prisma"`
2. **Updated Environment Files**: Prepared placeholders for your MySQL connection string

## 🔧 What You Need to Do Now

### Step 1: Update Your MySQL Connection String

Replace the placeholder in both `.env` and `.env.local` with your actual MySQL connection:

```bash
# Replace this placeholder:
DATABASE_URL="mysql://username:password@hostname:3306/database_name"

# With your actual MySQL connection, for example:
DATABASE_URL="mysql://root:yourpassword@localhost:3306/quizmind"
```

**Connection String Format:**
```
mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

### Step 2: Install MySQL Driver

Run this command to install the MySQL driver:

```bash
npm install mysql2
```

### Step 3: Reset and Generate Prisma

Since we switched databases, you need to reset Prisma:

```bash
# Generate new Prisma client for MySQL
npx prisma generate

# Push the schema to your MySQL database
npx prisma db push
```

### Step 4: Verify Local Setup

Test that everything works locally:

```bash
# Start your development server
npm run dev

# Visit http://localhost:3000/debug to verify database connection
```

## 🚀 Deploy to Vercel with MySQL

### Option 1: Use PlanetScale (Free MySQL)

**PlanetScale** offers a free MySQL database that's perfect for Vercel deployments:

1. **Sign up**: Go to [planetscale.com](https://planetscale.com) and create a free account
2. **Create database**: Create a new database (e.g., "quizmify")
3. **Get connection string**: Copy the connection string from PlanetScale dashboard
4. **Update Vercel**: Add the connection string to Vercel environment variables

### Option 2: Use Your Existing MySQL Host

If you have a MySQL server that's accessible from the internet:

1. **Ensure External Access**: Make sure your MySQL server accepts external connections
2. **Update Firewall**: Allow connections from Vercel's IP ranges
3. **Use Full Connection String**: Include SSL if your host requires it

```bash
# Example for hosted MySQL (like DigitalOcean, AWS RDS, etc.)
DATABASE_URL="mysql://username:password@your-host.com:3306/database_name?sslaccept=strict"
```

### Option 3: Use Railway MySQL (Free)

**Railway** also offers free MySQL databases:

1. **Sign up**: Go to [railway.app](https://railway.app)
2. **Create MySQL**: Add a MySQL database to your project
3. **Get connection**: Copy the MySQL connection URL
4. **Deploy**: Use the connection string in Vercel

## 🔄 Update Vercel Environment Variables

Go to your Vercel project dashboard and update these environment variables:

```bash
# Old PostgreSQL (REMOVE):
DATABASE_URL=postgresql://neondb_owner:npg_YBSoytk68UJr@ep-green-bread-afuup72q-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require

# New MySQL (ADD):
DATABASE_URL=mysql://your-username:your-password@your-host:3306/your-database

# Also update:
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=gyMFQGgGtuhuXe88SfO1xx/p56iXtthwm2cAIaXdOnc=
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
```

## 🗃️ Database Migration (If You Have Existing Data)

If you had data in your PostgreSQL database that you want to keep:

### Option 1: Manual Recreation
- The easiest approach is to just recreate your account and test data

### Option 2: Data Export/Import
1. **Export from PostgreSQL**: Use pgAdmin or pg_dump to export data
2. **Convert to MySQL**: Transform the SQL to MySQL-compatible format
3. **Import to MySQL**: Run the converted SQL on your MySQL database

## 🧪 Testing Your Setup

### Local Testing:
```bash
# 1. Install dependencies
npm install mysql2

# 2. Generate Prisma client
npx prisma generate

# 3. Push schema to database
npx prisma db push

# 4. Start development server
npm run dev

# 5. Test registration and login
# Visit http://localhost:3000/auth and create an account
```

### Production Testing:
```bash
# After updating Vercel environment variables:
# 1. Trigger a new deployment
git add .
git commit -m "Switch to MySQL database"
git push origin main

# 2. Visit your Vercel domain and test
# 3. Check /debug page to verify database connection
```

## 🚨 Common Issues & Solutions

### Issue 1: "Connection refused"
**Solution**: Make sure your MySQL server is running and accessible

### Issue 2: "Access denied"
**Solution**: Verify your username, password, and database name

### Issue 3: "SSL connection error"
**Solution**: Add SSL parameters to your connection string:
```bash
DATABASE_URL="mysql://username:password@host:3306/db?ssl={"rejectUnauthorized":true}"
```

### Issue 4: "relationMode error"
**Solution**: This is normal for MySQL with Prisma - the `relationMode = "prisma"` handles this

## 📋 Quick Checklist

- [ ] Install mysql2 package
- [ ] Update DATABASE_URL in .env and .env.local
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Test locally with `npm run dev`
- [ ] Update Vercel environment variables
- [ ] Deploy and test production

## 🆘 Need Help?

If you encounter issues:

1. **Check the /debug page** on both local and production
2. **Verify your MySQL connection** using a MySQL client
3. **Check Vercel function logs** for detailed error messages
4. **Ensure your MySQL version** is compatible (5.7+ or 8.0+)

Your QuizzyMind app will now use MySQL instead of PostgreSQL! 🎉
