# Ôn Thượng Vĩ (Wen Shang Weei) — Personal Portfolio

[![CI](https://github.com/hermit9988/portfolio-web/actions/workflows/ci.yml/badge.svg)](https://github.com/hermit9988/portfolio-web/actions/workflows/ci.yml)
[![Deploy to Cloudflare Pages](https://github.com/hermit9988/portfolio-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/hermit9988/portfolio-web/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Personal portfolio website for **Ôn Thượng Vĩ** — *Educator & Academic Specialist · IELTS 8.0 · Published Researcher*.

---

## 🚀 Cloudflare Deployment

This repository is configured for both **Cloudflare Pages** (continuous Git deployment) and **Cloudflare Workers** (Workers Static Assets via Wrangler CLI).

### Option 1: Cloudflare Pages (Recommended for GitHub auto-deploy)

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Compute (Workers) > Workers & Pages > Create application > Pages > Connect to Git**.
3. Select this repository (`portfolio-web`).
4. Set the build settings:
   - **Framework preset:** `None`
   - **Build command:** `npm run build` *(or leave empty if deploying prebuilt `public/`)*
   - **Build output directory:** `public`
5. Click **Save and Deploy**. Any future `git push` to `main` will automatically build and publish your site with global CDN caching and free SSL.

### Option 2: Cloudflare Workers / Wrangler CLI

If you prefer deploying directly from your terminal using Wrangler:

```bash
# 1. Sync public static assets
npm run build

# 2. Preview locally with Wrangler
npx wrangler dev

# 3. Deploy to Cloudflare Workers
npx wrangler deploy
```

---

## 📂 Project Structure

```text
├── index.html                   # Primary production landing page (Ôn Thượng Vĩ portfolio)
├── build.js                     # Asset build pipeline (syncs to public/)
├── wrangler.jsonc               # Cloudflare Pages / Workers configuration
├── package.json                 # Project dependencies & deployment scripts
│
├── archive/                     # Preserved backups and legacy templates
│   ├── sample_tuannguyen.html
│   ├── index2.html
│   └── index_original_template.html
│
├── docs/                        # Project research notes and prompt specifications
│   ├── raw_text.md
│   └── prompt.md
│
├── scripts/                     # External and backend integration scripts
│   └── google_apps_script.js    # Google Sheets webhook & email notification handler
│
├── public/                      # Built distribution directory for Cloudflare deployment
│   ├── index.html
│   ├── _headers                 # Security, CSP & caching headers
│   └── _redirects               # Clean URL & legacy route redirects
│
├── template/                    # Original template zips and raw design assets
└── .github/                     # Issue forms, PR templates, and CI/CD workflows
```

---

## 🛠 Local Development

To view the site locally:

- **Using Node:** `npm run build` then `npx wrangler dev`
- **Using Python:** `python -m http.server 8000 --directory public`
- **Using VS Code:** Right-click `index.html` and choose **Open with Live Server**.
