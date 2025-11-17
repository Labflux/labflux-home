# Netlify Deployment Guide - LabFlux

## ✅ Ready to Deploy!

Your site is now configured for Netlify with:
- ✓ Netlify Forms (automatic email notifications)
- ✓ Toast notifications (no browser alerts)
- ✓ Anti-spam protection (honeypot)
- ✓ Security headers
- ✓ Optimized caching

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: LabFlux landing page with Netlify Forms"

# Create repository on GitHub, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/labflux-home.git
git push -u origin main
```

### 2. Deploy to Netlify

**Option A: Via Netlify Dashboard (Recommended)**

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub
5. Select your `labflux-home` repository
6. Click "Deploy site"

**Done!** Your site will be live in ~30 seconds at: `https://random-name-12345.netlify.app`

**Option B: Via Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### 3. Configure Form Notifications

After deployment:

1. Go to your site dashboard on Netlify
2. Navigate to: **Site Settings** → **Forms** → **Form notifications**
3. Click "Add notification"
4. Choose "Email notification"
5. Enter your email: **luiz.ferreira.costa.carvalho@gmail.com**
6. Select the form: **interest-list**
7. Save

Now you'll receive an email every time someone signs up! 📧

### 4. Add Custom Domain (Optional)

1. Buy a domain (example: `labflux.com.br`)
2. In Netlify dashboard: **Domain Settings** → **Add custom domain**
3. Enter your domain
4. Update DNS records at your domain registrar (Netlify will show you exactly what to add)
5. Wait for DNS propagation (5 minutes - 48 hours)

**Free SSL certificate** is automatically provided!

## 📋 What Happens After Deployment

### Form Submissions
- User fills out the form → Clicks "Quero Ser Notificado"
- Form submits to Netlify
- User sees success toast notification
- You receive email with submission details
- You can view all submissions in Netlify Dashboard: **Forms** tab

### View Submissions
- Dashboard → Your Site → Forms
- See all email addresses submitted
- Export as CSV
- Set up Slack/Discord notifications if needed

## 🔧 Troubleshooting

### Forms not working?
1. Make sure the form has `data-netlify="true"` attribute (already added ✓)
2. Deploy to Netlify (forms only work on live site, not localhost)
3. Check Netlify Dashboard → Forms for submissions

### Not receiving emails?
1. Check spam folder
2. Verify email notification is configured in Netlify
3. Check Netlify Dashboard → Forms to see if submissions are being received

### Toast notifications not showing?
1. Open browser console (F12) to check for errors
2. Verify `toast-container` div exists in HTML (already added ✓)

## 📊 Monitoring

View analytics in Netlify Dashboard:
- Page views
- Bandwidth usage
- Form submissions
- Deploy history

## 🔄 Updating Your Site

After initial deployment, just push to GitHub:

```bash
git add .
git commit -m "Update content"
git push
```

Netlify automatically rebuilds and deploys! (~30 seconds)

## 💰 Pricing

**Free tier includes:**
- 100GB bandwidth/month
- 100 form submissions/month
- Unlimited sites
- SSL certificates
- Form notifications

Perfect for a landing page! 🎉

## 🆘 Need Help?

- Netlify Docs: https://docs.netlify.com
- Netlify Forms: https://docs.netlify.com/forms/setup/
- Community: https://answers.netlify.com
