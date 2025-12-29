# Website Deployment Guide

## Option 1: GitHub Pages (Recommended - Free)

### Step 1: GitHub Repository তৈরি করুন

1. GitHub account তৈরি করুন (যদি না থাকে): https://github.com
2. New repository তৈরি করুন:
   - Repository name: `scent-of-sahara` (বা আপনার পছন্দমতো)
   - Public রাখুন (GitHub Pages free version এর জন্য)
   - Initialize with README check করুন

### Step 2: Files Upload করুন

**Method 1: GitHub Website ব্যবহার করে:**
1. Repository page এ যান
2. "Add file" > "Upload files" click করুন
3. সব files select করুন এবং upload করুন:
   - index.html
   - admin.html
   - সব HTML files (geography.html, history.html, etc.)
   - css/ folder
   - js/ folder
   - images/ folder
4. "Commit changes" click করুন

**Method 2: Git Command ব্যবহার করে:**
```bash
# Terminal/Command Prompt এ এই commands run করুন
cd "C:\Users\tonmo\OneDrive\Desktop\Sir personal project"

# Git initialize করুন (যদি না হয়ে থাকে)
git init

# GitHub repository add করুন
git remote add origin https://github.com/YOUR_USERNAME/scent-of-sahara.git

# সব files add করুন
git add .

# Commit করুন
git commit -m "Initial commit - Scent of Sahara website"

# GitHub এ push করুন
git branch -M main
git push -u origin main
```

### Step 3: GitHub Pages Enable করুন

1. Repository page এ যান
2. "Settings" tab এ click করুন
3. Left sidebar এ "Pages" option click করুন
4. Source dropdown থেকে "Deploy from a branch" select করুন
5. Branch: `main` select করুন
6. Folder: `/ (root)` select করুন
7. "Save" click করুন

### Step 4: Website URL পাওয়া

- কিছুক্ষণ পরে (2-5 minutes) আপনার website live হবে:
  `https://YOUR_USERNAME.github.io/scent-of-sahara/`

### Step 5: Custom Domain Add করুন (Optional)

1. GitHub Pages Settings এ "Custom domain" section এ যান
2. আপনার domain name লিখুন (যেমন: `scentofsahara.com`)
3. Save করুন

4. আপনার domain registrar এ (যেখানে domain কিনেছেন):
   - DNS settings এ যান
   - A Record add করুন:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     ```
   - আরেকটি A Record:
     ```
     Type: A
     Name: @
     Value: 185.199.109.153
     ```
   - আরেকটি A Record:
     ```
     Type: A
     Name: @
     Value: 185.199.110.153
     ```
   - আরেকটি A Record:
     ```
     Type: A
     Name: @
     Value: 185.199.111.153
     ```
   - CNAME Record add করুন:
     ```
     Type: CNAME
     Name: www
     Value: YOUR_USERNAME.github.io
     ```

## Option 2: Direct Domain Hosting

### Popular Hosting Providers:

1. **Netlify** (Free tier available)
   - https://netlify.com
   - Drag & drop deployment
   - Free SSL certificate
   - Custom domain support

2. **Vercel** (Free tier available)
   - https://vercel.com
   - Easy deployment
   - Free SSL
   - Custom domain

3. **Cloudflare Pages** (Free)
   - https://pages.cloudflare.com
   - Free hosting
   - Fast CDN
   - Custom domain

4. **Traditional Hosting** (Paid)
   - cPanel hosting
   - FTP upload
   - Direct domain connection

### Netlify Deployment (Easiest):

1. https://app.netlify.com এ account তৈরি করুন
2. "Add new site" > "Deploy manually"
3. সব files drag & drop করুন
4. Site deploy হবে
5. Custom domain add করুন Settings > Domain management

## Important Notes:

### Admin Panel Access:
- Admin panel URL হবে: `https://YOUR_DOMAIN/admin.html`
- Default login: `admin` / `admin123`
- Password change করতে পারেন Settings section এ

### Data Storage:
- Admin panel data browser এর localStorage এ save হয়
- প্রতিটি user এর নিজস্ব browser এ data থাকবে
- Production এর জন্য backend database ব্যবহার করা ভালো

### Security:
- Admin panel password change করুন
- Production এ strong password ব্যবহার করুন
- HTTPS enable রাখুন (GitHub Pages automatically করে)

## Quick Start (GitHub Pages):

1. ✅ GitHub repository তৈরি করুন
2. ✅ Files upload করুন
3. ✅ GitHub Pages enable করুন
4. ✅ Website live!
5. ✅ Custom domain add করুন (optional)

## Support:

যদি কোনো সমস্যা হয়:
- GitHub Pages documentation: https://docs.github.com/pages
- Check repository settings
- Verify file paths are correct
- Ensure all files are uploaded

