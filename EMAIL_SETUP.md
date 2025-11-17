# Email Setup Guide for LabFlux

## EmailJS Configuration (FREE - 200 emails/month)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month)
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose Gmail (or your preferred email provider)
4. Connect your Gmail account: luiz.ferreira.costa.carvalho@gmail.com
5. Copy the **Service ID** (something like `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: Nova inscrição na lista de interesse - LabFlux

Olá!

Um novo usuário se cadastrou na lista de interesse do LabFlux:

Email: {{user_email}}

---
Esta mensagem foi enviada automaticamente do formulário do site LabFlux.
```

4. Save the template and copy the **Template ID** (something like `template_xxxxxxx`)

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (something like `aBcDeFgHiJkLmNo`)

### Step 5: Update script.js
Open `script.js` and replace:

```javascript
// Line 34:
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

// Line 46:
return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
// Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual IDs
```

### Example:
```javascript
emailjs.init("aBcDeFgHiJkLmNo");
return emailjs.send('service_abc123', 'template_xyz789', templateParams);
```

## Important Notes

- **Public Key is safe**: EmailJS public keys are designed to be used in client-side code
- **Free tier**: 200 emails/month (more than enough for a landing page)
- **No credit card required** for free tier
- **Email validation**: EmailJS only sends from verified email addresses

## Alternative: Formspree (Also Free)

If you prefer Formspree instead:
1. Create account at https://formspree.io
2. Create a form endpoint
3. Replace EmailJS code with a simple form POST to Formspree URL
4. Free tier: 50 submissions/month

## Testing

After setup:
1. Open index.html in a browser
2. Enter an email in the signup form
3. Click "Quero Ser Notificado"
4. Check your Gmail inbox for the notification
5. You should also see a success toast notification

## Troubleshooting

If emails aren't sending:
1. Check browser console for errors (F12)
2. Verify all IDs are correct in script.js
3. Ensure Gmail is connected in EmailJS dashboard
4. Check EmailJS dashboard for usage/errors
