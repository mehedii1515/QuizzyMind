# 🔧 Supabase Connection String Formats to Try

## After resuming your Supabase project, try these connection formats:

### Format 1: Modern Pooled Connection (Most Common)
```bash
DATABASE_URL="postgresql://postgres.ygvfcirckuteldjjtfkc:mehedi1515@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.ygvfcirckuteldjjtfkc:mehedi1515@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
```

### Format 2: Direct Connection with SSL
```bash
DATABASE_URL="postgresql://postgres:mehedi1515@db.ygvfcirckuteldjjtfkc.supabase.co:5432/postgres?sslmode=require"
DIRECT_URL="postgresql://postgres:mehedi1515@db.ygvfcirckuteldjjtfkc.supabase.co:5432/postgres?sslmode=require"
```

### Format 3: Alternative SSL Parameters
```bash
DATABASE_URL="postgresql://postgres:mehedi1515@db.ygvfcirckuteldjjtfkc.supabase.co:5432/postgres?sslmode=require&sslcert=&sslkey=&sslrootcert="
DIRECT_URL="postgresql://postgres:mehedi1515@db.ygvfcirckuteldjjtfkc.supabase.co:5432/postgres?sslmode=require&sslcert=&sslkey=&sslrootcert="
```

## 🎯 Steps to Fix:

1. **Resume Supabase Project**: Go to dashboard and click "Resume"
2. **Wait 2 minutes**: For project to fully start
3. **Try Format 1**: Update your .env files with the pooled connection
4. **Test**: Run `npx prisma db push`
5. **If fails, try Format 2**: The direct connection
6. **If still fails**: Get exact connection string from Supabase dashboard

## 📍 Get Exact Connection String:

In Supabase Dashboard:
1. Settings → Database
2. Connection string section
3. Copy the "URI" (not the individual components)
4. Replace the placeholder password with "mehedi1515"

This should be your exact connection string format!
