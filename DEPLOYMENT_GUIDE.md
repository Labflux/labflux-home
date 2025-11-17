# Website Deployment Guide - FREE Options

## Recommended: GitHub Pages (100% FREE)

**Best for**: Static websites like yours
**Cost**: FREE forever
**Custom domain**: FREE (you only pay for domain registration ~$10-15/year)

### Setup Steps:

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - LabFlux landing page"
   git branch -M main
   git remote add origin https://github.com/yourusername/labflux-home.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from branch → main → root
   - Click Save

3. **Access Your Site**
   - Your site will be live at: `https://yourusername.github.io/labflux-home`
   - Usually takes 2-5 minutes to deploy

4. **Add Custom Domain (Optional)**
   - Buy domain from Namecheap, Google Domains, etc. (~$10-15/year)
   - In GitHub Pages settings, add your custom domain
   - Update DNS records with your domain provider
   - Your site will be available at `www.labflux.com.br`

---

## Alternative FREE Options

### 1. Netlify (Recommended Alternative)
- **Cost**: FREE
- **Deploy time**: ~30 seconds
- **Features**:
  - Automatic SSL certificate
  - Form handling (can replace EmailJS!)
  - Continuous deployment from Git
  - 100GB bandwidth/month

**Setup**:
1. Go to https://www.netlify.com
2. Drag and drop your folder (index.html, script.js, styles.css)
3. Site is live instantly!

**OR deploy via Git**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### 2. Vercel
- **Cost**: FREE
- **Deploy time**: ~1 minute
- **Features**:
  - Automatic SSL
  - Great performance
  - Edge network

**Setup**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### 3. Cloudflare Pages
- **Cost**: FREE
- **Features**:
  - Unlimited bandwidth
  - Fastest CDN
  - DDoS protection

**Setup**:
1. Go to https://pages.cloudflare.com
2. Connect your Git repository
3. Deploy automatically

### 4. Firebase Hosting
- **Cost**: FREE (10GB storage, 360MB/day bandwidth)
- **Features**: Google infrastructure

**Setup**:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## Cost Comparison

| Service | Cost | SSL | Custom Domain | Bandwidth | Best For |
|---------|------|-----|---------------|-----------|----------|
| **GitHub Pages** | FREE | ✓ | ✓ | 100GB/month | Simple sites |
| **Netlify** | FREE | ✓ | ✓ | 100GB/month | Form handling |
| **Vercel** | FREE | ✓ | ✓ | 100GB/month | Performance |
| **Cloudflare** | FREE | ✓ | ✓ | Unlimited | Large traffic |

---

## Recommended Stack for LabFlux

### OPTION A: Cheapest (100% Free)
1. **Hosting**: GitHub Pages (FREE)
2. **Email**: EmailJS free tier (200 emails/month)
3. **Domain**: Register .com.br (~R$40/year from Registro.br)

**Total cost**: ~R$40/year (just the domain)

### OPTION B: Best Features (Free)
1. **Hosting**: Netlify (FREE)
2. **Email**: Netlify Forms (FREE, 100 submissions/month)
3. **Domain**: Same as above

**Total cost**: ~R$40/year (just the domain)

**Advantage**: No need for EmailJS, Netlify handles forms natively!

---

## Quick Start: Deploy NOW (GitHub Pages)

```bash
# 1. Initialize git (if not already done)
cd /Users/luizcarvalho/labflux/labflux-home
git init

# 2. Create repository on GitHub.com
# Then run:
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/labflux-home.git
git push -u origin main

# 3. Enable GitHub Pages in repository settings
# Your site will be live at: https://YOUR_USERNAME.github.io/labflux-home
```

---

## Using Netlify Forms (No EmailJS needed!)

If you choose Netlify, update your form in `index.html`:

```html
<form class="signup-form" name="interest-list" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="interest-list">
    <div class="form-group">
        <input type="email" name="email" placeholder="seu.email@universidade.edu.br" required>
        <button type="submit" class="cta-primary">Quero Ser Notificado</button>
    </div>
</form>
```

Netlify will automatically send submissions to your email!

---

## My Recommendation

**For simplicity**: Use **GitHub Pages** + **EmailJS**
- Easiest setup
- No learning curve
- Both 100% free

**For better features**: Use **Netlify**
- Simpler form handling
- Better deployment experience
- Still 100% free
