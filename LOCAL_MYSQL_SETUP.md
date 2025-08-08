# 🎯 Local MySQL Setup for QuizzyMind (Offline)

## ✅ What I've Set Up For You:

1. **Updated Prisma Schema** → MySQL with `relationMode = "prisma"`
2. **Environment Files** → Local MySQL connection string
3. **Installed mysql2** → MySQL driver package

## 🔧 Update Your Connection String

I've set up a default connection string, but you need to update it with your actual MySQL details:

**Current placeholder:**
```bash
DATABASE_URL="mysql://root:password@localhost:3306/quizmind"
```

**Update to your actual MySQL details:**
```bash
DATABASE_URL="mysql://YOUR_USERNAME:YOUR_PASSWORD@localhost:3306/YOUR_DATABASE_NAME"
```

### Common Examples:
```bash
# If your MySQL username is 'root' and password is 'admin123'
DATABASE_URL="mysql://root:admin123@localhost:3306/quizmind"

# If you use XAMPP (usually no password for root)
DATABASE_URL="mysql://root:@localhost:3306/quizmind"

# If you have a different username
DATABASE_URL="mysql://myuser:mypass@localhost:3306/quizmind_db"
```

## 🚀 Setup Steps:

### Step 1: Make sure MySQL is running
- **XAMPP**: Start MySQL service
- **WAMP**: Start MySQL service  
- **Standalone MySQL**: Make sure MySQL server is running

### Step 2: Create the database (if it doesn't exist)
Open MySQL command line or phpMyAdmin and run:
```sql
CREATE DATABASE quizmind;
```

### Step 3: Update your connection string
Update both `.env` and `.env.local` with your actual MySQL credentials.

### Step 4: Generate and push the schema
```bash
# Generate Prisma client
npx prisma generate

# Create tables in your MySQL database
npx prisma db push

# Start your app
npm run dev
```

## 🎯 Your Complete Local Setup:
- ✅ **Database**: Local MySQL (offline)
- ✅ **Frontend**: Next.js (localhost:3000)  
- ✅ **Authentication**: NextAuth.js (local sessions)
- ✅ **AI**: Google Gemini API (for quiz generation)

## 🔍 Troubleshooting:

### Issue: "Access denied for user"
**Solution**: Check your username/password in the connection string

### Issue: "Database 'quizmind' doesn't exist"  
**Solution**: Create the database first:
```sql
CREATE DATABASE quizmind;
```

### Issue: "Can't connect to MySQL server"
**Solution**: Make sure MySQL service is running (XAMPP/WAMP)

### Issue: "Connection refused"
**Solution**: Check if MySQL is running on port 3306

## 🎉 Once Working:

Your QuizzyMind app will be completely offline and local:
- Visit `http://localhost:3000`
- Register/login (stored in local MySQL)  
- Create quizzes (stored locally)
- Play quizzes (all data local)
- No internet required (except for AI quiz generation)

Perfect for development and local use! 🚀
