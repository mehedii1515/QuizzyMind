# Free Database Options for QuizzyMind

## 🎯 Recommended: Supabase (PostgreSQL)

### Why Supabase?
- ✅ **Completely FREE** (no time limit)
- ✅ **500MB database** + 2GB total storage
- ✅ **Built-in dashboard** for database management
- ✅ **Easy setup** with great documentation

### Setup Steps:
1. Go to [supabase.com](https://supabase.com)
2. Create account → New Project
3. Choose region (closest to you)
4. Get connection string from Settings → Database
5. Use `prisma/schema-postgresql.prisma` instead of `schema.prisma`

### Switch to PostgreSQL:
```bash
# Rename current schema (backup)
mv prisma/schema.prisma prisma/schema-mysql.prisma

# Use PostgreSQL schema
mv prisma/schema-postgresql.prisma prisma/schema.prisma

# Generate Prisma client
npx prisma generate

# Push to database (after setting DATABASE_URL)
npx prisma db push
```

## 🚂 Alternative: Railway

### Why Railway?
- ✅ **$5 free credit** monthly (usually enough)
- ✅ **All-in-one** deployment (app + database)
- ✅ **MySQL or PostgreSQL** options
- ✅ **Simple deployment** from GitHub

### Setup Steps:
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Add database service (MySQL or PostgreSQL)
5. Copy connection string from Variables

## 🟢 Alternative: Neon (PostgreSQL)

### Why Neon?
- ✅ **Free tier** (no credit card required)
- ✅ **3GB storage**
- ✅ **100 compute hours/month**
- ✅ **Serverless PostgreSQL**

### Setup Steps:
1. Go to [neon.tech](https://neon.tech)
2. Sign up → Create Project
3. Copy connection string
4. Use PostgreSQL schema (same as Supabase)

## 📊 Comparison

| Provider | Database | Storage | Monthly Limit | Setup Difficulty |
|----------|----------|---------|---------------|------------------|
| Supabase | PostgreSQL | 500MB | None | Easy |
| Railway | MySQL/PostgreSQL | Varies | $5 credit | Very Easy |
| Neon | PostgreSQL | 3GB | 100h compute | Easy |

## 🔄 Quick Switch Commands

### From MySQL to PostgreSQL:
```bash
# Backup current schema
cp prisma/schema.prisma prisma/schema-mysql-backup.prisma

# Copy PostgreSQL schema
cp prisma/schema-postgresql.prisma prisma/schema.prisma

# Update environment
# Change DATABASE_URL to PostgreSQL format

# Generate and push
npx prisma generate
npx prisma db push
```

### Environment Variable Format:
```bash
# PostgreSQL (Supabase/Neon)
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# MySQL (Railway)
DATABASE_URL="mysql://user:pass@host:3306/db?sslaccept=strict"
```

## 💡 Recommendation

**Start with Supabase** - it's the most reliable free option with no time limits!
