# NaseerStudio Market Website

[![Deploy to GitHub Pages](https://github.com/naseerstudio/naseerstudio.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/naseerstudio/naseerstudio.github.io/actions/workflows/deploy.yml)

Official website for NaseerStudio - showcasing our mobile games and applications.

🔗 **Live Site:** [https://naseerstudio.github.io](https://naseerstudio.github.io)

## 🎮 About

NaseerStudio is an independent mobile game studio creating premium digital experiences. Our portfolio includes puzzle games like Connect Ball, with more exciting apps coming soon.

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions auto-deployment
├── apps/
│   └── connect-ball/
│       ├── index.html          # App detail page
│       └── privacy-policy.html # App-specific privacy policy
├── css/
│   └── styles.css              # Main stylesheet
├── data/
│   └── apps.json               # Central app registry (dynamic loading)
├── js/
│   └── app-loader.js           # Dynamic app rendering
├── assets/
│   ├── apps/                   # App-specific assets
│   └── studio/                 # Studio branding assets
├── 404.html                    # Custom error page
├── app-ads.txt                 # AdMob verification
├── index.html                  # Homepage
├── privacy_policy.html         # Studio privacy policy
├── robots.txt                  # SEO crawler instructions
└── sitemap.xml                 # Search engine sitemap
```

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/naseerstudio/naseerstudio.github.io.git
cd naseerstudio.github.io
```

2. Serve locally (any static server works):
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

3. Open http://localhost:8000 in your browser

## 📝 Adding a New App

To add a new application to the website:

### 1. Update `data/apps.json`

Add your new app to the `apps` array:

```json
{
  "id": "your-app-id",
  "name": "Your App Name",
  "tagline": "Short catchy description",
  "category": "puzzle",
  "version": "1.0.0",
  "icon": "🎮",
  "playStoreUrl": "https://play.google.com/store/apps/details?id=com.naseerstudio.yourapp",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "privacyPolicy": "shared",
  "dataCollection": ["device_id", "ads", "approximate_location"],
  "contentRating": "Everyone",
  "status": "published",
  "releaseDate": "2026-02-06"
}
```

### 2. Create App Directory

```bash
mkdir -p apps/your-app-id
```

### 3. Create App Detail Page

Create `apps/your-app-id/index.html` (use existing apps as template).

### 4. Create Privacy Policy

Create `apps/your-app-id/privacy-policy.html` or use the shared policy.

### 5. Add Assets

```
assets/apps/your-app-id/
├── icon.png
└── screenshots/
    ├── screenshot1.png
    └── screenshot2.png
```

### 6. Update Sitemap

Add new URLs to `sitemap.xml`.

### 7. Commit and Deploy

```bash
git add .
git commit -m "Add new app: Your App Name"
git push origin main
```

GitHub Actions will automatically deploy to GitHub Pages!

## 🔍 SEO Features

- ✅ Structured data (Schema.org)
- ✅ Open Graph meta tags
- ✅ Twitter Cards
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Semantic HTML

## 📊 Analytics (Optional)

Google Analytics 4 tracking is currently **disabled** (commented out in `index.html`). 

To enable:
1. Get a GA4 tracking ID from https://analytics.google.com
2. Uncomment the GA4 code in `index.html`
3. Replace `GA_MEASUREMENT_ID` with your actual tracking ID

**Note:** The privacy policy currently states that no analytics are being collected. Update the privacy policy if you enable analytics.

## 🛡️ Privacy & Compliance

- ✅ GDPR compliant privacy policy
- ✅ CCPA compliance
- ✅ COPPA compliance for children's data
- ✅ AdMob verification (app-ads.txt)
- ✅ Google Play Store policy compliance

## 📱 AdMob Integration

The `app-ads.txt` file at the root enables AdMob verification. Ensure this file is accessible at:

```
https://naseerstudio.github.io/app-ads.txt
```

## 🎨 Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --bg-color: #0f172a;
    --accent-primary: #6366f1;
    --accent-secondary: #0ea5e9;
    /* ... */
}
```

### Fonts

The site uses Google Fonts (Outfit & Plus Jakarta Sans). Modify in HTML `<head>` sections.

## 🔧 Development Workflow

1. Make changes locally
2. Test using a local server
3. Commit and push to `main` branch
4. GitHub Actions automatically deploys
5. Verify deployment at the live URL

## 📄 License

© 2026 NaseerStudio. All rights reserved.

## 📞 Contact

- **Email:** naseer.studio.official@gmail.com
- **Website:** https://naseerstudio.github.io

---

Built with ❤️ by NaseerStudio
