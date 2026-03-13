# Step-by-Step Deployment Guide for Ugh! Bags

---

## Prerequisites
Before starting, make sure you have:
- ✅ GitHub account
- ✅ Netlify account (sign up at netlify.com)
- ✅ Railway account (sign up at railway.app) 
- ✅ MongoDB Atlas account (sign up at mongodb.com)

---

## STEP 1: Set Up MongoDB (15 minutes)

### 1.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free" → Create account with Google or Email
3. Verify your email

### 1.2 Create Free Database
1. After login, click "Create" button
2. Select "Free" (M0 Sandbox)
3. Provider: AWS (or default)
4. Region: Choose closest to you
5. Click "Create Cluster" (wait 1-2 minutes)

### 1.3 Create Database User
1. Click "Database" → "Database Access" → "Add New User"
2. Username: `ughadmin`
3. Password: Create a strong password (SAVE THIS!)
4. privileges: "Read and Write to any database"
5. Click "Add User"

### 1.4 Allow All Connections
1. Click "Network Access" → "Add IP Address"
2. Select "Allow Access from Anywhere" (0.0.0.0/0)
3. Click "Confirm"

### 1.5 Get Connection String
1. Click "Database" → "Connect" → "Drivers"
2. Copy the connection string:
```
mongodb+srv://ughadmin:<YOUR-PASSWORD>@cluster0.xxxxx.mongodb.net/ughbags?retryWrites=true&w=majority
```
3. Replace `<YOUR-PASSWORD>` with the password you created

**SAVE THIS STRING - You'll need it later!**

---

## STEP 2: Deploy Backend on Railway (10 minutes)

### 2.1 Create Railway Project
1. Go to https://railway.app
2. Click "Login with GitHub"
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `ugh-web` repository
5. Click "Deploy"

### 2.2 Add Environment Variables
1. In Railway dashboard, go to "Variables" tab
2. Click "Add Variable" and add these one by one:

```
MONGODB_URI=mongodb+srv://ughadmin:<YOUR-PASSWORD>@cluster0.xxxxx.mongodb.net/ughbags?retryWrites=true&w=majority
NODE_ENV=production
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

3. Click "Deploy" again after adding variables

### 2.3 Get Your Backend URL
1. Wait for deployment to complete (green checkmark)
2. Click the URL shown (e.g., `https://ugh-web.up.railway.app`)
3. Copy this URL - You'll need it!

---

## STEP 3: Deploy Frontend on Netlify (10 minutes)

### 3.1 Connect to Netlify
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Click "GitHub" → Select your `ugh-web` repository

### 3.2 Configure Settings
In the form, enter exactly:

| Setting | Value |
|---------|-------|
| Branch to deploy | `main` |
| Build command | (leave empty) |
| Publish directory | `ugh-website` |

### 3.3 Deploy
1. Click "Deploy site"
2. Wait 1-2 minutes
3. You'll see your live URL (e.g., `https://random-name.netlify.app`)

**COPY THIS URL - You'll need it!**

---

## STEP 4: Update Code with Your URLs

### 4.1 Update app.js
Replace the API calls to point to your Railway backend:

```
javascript
// Add this at the top of app.js
const API_BASE_URL = 'https://YOUR-RAILWAY-URL.up.railway.app/api';
```

Then update checkout function to use the API:

```
javascript
// Replace processOrder function to use backend
async function processOrder(formData) {
    const totals = getTotalWithVAT();
    
    const orderData = {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            zipCode: formData.get('zipCode')
        },
        items: cart,
        paymentMethod: formData.get('payment'),
        subtotal: totals.subtotal,
        vat: totals.vat,
        total: totals.total,
        notes: formData.get('orderNotes')
    };
    
    // Send to backend
    const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    
    const result = await response.json();
    return result.data;
}
```

### 4.2 Push Changes to GitHub
```bash
git add .
git commit -m "Added backend API integration"
git push origin main
```

Netlify will automatically redeploy!

---

## STEP 5: Test Your Live Site

Visit your Netlify URL and test:
1. ✅ Homepage loads
2. ✅ Click on categories (Coach Teri, Tabby, etc.)
3. ✅ Add item to cart
4. ✅ Fill checkout form and submit
5. ✅ Check your MongoDB - order should appear there!

---

## Quick Reference

| What You Need | Where to Find |
|--------------|---------------|
| MongoDB Connection String | MongoDB Atlas → Connect → Drivers |
| Backend API URL | Railway → Your Project URL |
| Frontend URL | Netlify → Your Site URL |

---

## Troubleshooting

**Problem**: "Cannot connect to database"
→ Check MongoDB URI is correct in Railway variables

**Problem**: "CORS error" 
→ Ensure backend has cors() middleware enabled

**Problem**: "Page not found" on routes
→ Check _redirects file is in ugh-website folder

**Problem**: "Netlify build failed"
→ Make sure publish directory is `ugh-website` not `/ugh-website`
