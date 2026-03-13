# How to Connect Netlify to GitHub

## Step 1: Push Your Code to GitHub
If you haven't already, run these commands in your terminal inside the `ugh-website` folder:

```
git init
git remote add origin https://github.com/okorod/ugh-web.git
git branch -M main
git add .
git commit -m "Initial commit - Ugh! Website"
git push -u origin main
```

## Step 2: Connect Netlify to GitHub
1. Go to https://netlify.com and log in
2. Click "Add new site" → "Import an existing project"
3. Click "GitHub" to authorize
4. Select "ugh-web" repository

## Step 3: Fill in Build Settings

**IMPORTANT - Fill in these exact values:**

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Build command** | (leave empty) |
| **Publish directory** | `ugh-website` |
| **Functions directory** | (leave empty) |

## Step 4: Click "Deploy"
- Wait 1-2 minutes for deployment

## Step 5: Verify
- Get your live URL at `.netlify.app`

## Note
The `server/` folder requires separate backend hosting. Your frontend works with local products.
