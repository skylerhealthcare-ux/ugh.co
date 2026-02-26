# Complete Deployment Guide for Ugh! Bags Website

This guide will walk you through deploying your full-stack e-commerce website with:
- **Frontend**: Netlify (static hosting)
- **Backend API**: Railway/Render (Node.js server)
- **Database**: MongoDB Atlas (free cloud database)

---

## Step 1: Set Up MongoDB Atlas (Free Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free" → Create account
3. Verify email and log in

### 1.2 Create Free Cluster
1. Click "Create" → Select "Free" (M0 Sandbox)
2. Choose provider (AWS recommended)
3. Select region closest to you (e.g., eu-central-1 for Europe)
4. Click "Create Cluster" (wait 1-2 minutes)

### 1.3 Set Up Database User
1. Click "Database Access" → "Add New Database User"
2. Create username/password (remember these!)
3. Set权限 to "Read and Write to any database"
4. Click "Add User"

### 1.4 Configure Network Access
1. Click "Network Access" → "Add IP Address"
2. Select "Allow Access from Anywhere" (0.0.0.0/0)
3. Click "Confirm"

### 1.5 Get Connection String
1. Click "Database" → "Connect" → "Connect your application"
2. Copy the connection string:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ughbags?retryWrites=true&w=majority
```
3. Replace `<username>` and `<password>` with your credentials

---

## Step 2: Set Up Railway for Backend

### 2.1 Create Railway Account
1. Go to https://railway.app
2. Click "Login" → "GitHub" (authorize)
3. Click "New Project" → "Deploy from GitHub repo"

### 2.2 Connect Your Repository
1. Select your GitHub repository (ugh-web)
2. Railway will detect it's a Node.js project

### 2.3 Configure Environment Variables
1. In Railway dashboard, go to "Variables" tab
2. Add these variables:
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ughbags?retryWrites=true&w=majority
DATABASE_URL=<your-neon-connection-string>
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2.4 Deploy
1. Click "Deploy" 
2. Wait 2-3 minutes for deployment
3. Your backend will be live at: `https://your-project-name.up.railway.app`

---

## Step 3: Deploy Frontend to Netlify

### 3.1 Connect to Netlify
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Click "GitHub" → Select "ugh-web" repository

### 3.2 Configure Build Settings
Fill in these exact values:

| Setting | Value |
|---------|-------|
| Branch to deploy | `main` |
| Build command | (leave empty) |
| Publish directory | `ugh-website` |
| Functions directory | (leave empty) |

### 3.3 Deploy
1. Click "Deploy site"
2. Wait 1-2 minutes
3. Get your live URL: `https://your-site-name.netlify.app`

---

## Step 4: Connect Frontend to Backend

### 4.1 Update API URL
In your frontend code, update the API base URL:

In `ugh-website/app.js`, add at the top:
```
javascript
const API_BASE_URL = 'https://your-railway-app.up.railway.app/api';
```

### 4.2 Update Forms to Use Backend
Make checkout form submit to your API instead of localStorage.

---

## Step 5: Test Your Live Site

### Test These Flows:
1. ✅ Homepage loads correctly
2. ✅ Product categories filter works
3. ✅ Add to cart works
4. ✅ Checkout form submits to backend
5. ✅ Order is saved to MongoDB

### Common Issues:
- **CORS errors**: Ensure backend has `app.use(cors())`
- **API not responding**: Check Railway logs
- **Database connection**: Verify MONGODB_URI is correct

---

## Quick Commands

### Push Changes to Live:
```
bash
git add .
git commit -m "Update for production"
git push origin main
```

### Check Railway Logs:
```
bash
railway logs
```

---

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐
│   User Browser  │────▶│   Netlify        │────▶│   Railway      │
│  (Frontend)     │     │  (Static Files) │     │  (Node.js API) │
└─────────────────┘     └──────────────────┘     └────────────────┘
                                                           │
                                                           ▼
                                                    ┌────────────────┐
                                                    │  MongoDB Atlas │
                                                    │  (Database)    │
                                                    └────────────────┘
```

---

## Need Help?

- MongoDB Atlas docs: https://docs.atlas.mongodb.com/
- Railway docs: https://docs.railway.app/
- Netlify docs: https://docs.netlify.com/
