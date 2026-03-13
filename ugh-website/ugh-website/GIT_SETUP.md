# Git Setup Instructions

## Initialize Git and Push to GitHub

Run these commands in your terminal inside the `ugh-website` folder:

```
bash
# 1. Initialize Git repository
git init

# 2. Add the remote origin
git remote add origin https://github.com/okorod/ugh-web.git

# 3. Rename branch to main
git branch -M main

# 4. Add all files
git add .

# 5. Create initial commit
git commit -m "Initial commit - Ugh! Website"

# 6. Push to GitHub
git push -u origin main
```

## Neon Database Setup

### Step 1: Create Neon Account
1. Go to https://neon.tech and create an account
2. Create a new project named "ugh-bags"
3. Copy your connection string from the dashboard

### Step 2: Run Database Schema
1. In Neon dashboard, go to Query Editor
2. Copy contents from `server/schema.sql`
3. Run the SQL to create tables and insert sample products

### Step 3: Configure Environment
1. Copy `server/.env.example` to `server/.env`
2. Replace the DATABASE_URL with your Neon connection string

### Step 4: Install Dependencies and Run Server
```
bash
cd ugh-website/server
npm install
npm start
```

## Deploying to Netlify
1. Add `DATABASE_URL` in Netlify dashboard under Site Settings > Environment Variables
2. Connect your GitHub repository to Netlify
3. Set build command to empty and publish directory to `ugh-website`
