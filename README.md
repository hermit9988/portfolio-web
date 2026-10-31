# Ôn Thượng Vĩ (Wen Shang Weei) — Personal Portfolio

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
├── index.html                   # Primary landing page (Ôn Thượng Vĩ portfolio)
├── sample_tuannguyen.html       # Direct link to Ôn Thượng Vĩ portfolio
├── index2.html                  # Michael Pumo style portfolio replica
├── index_original_template.html # Original Dr. Tuan Nguyen template backup
├── public/                      # Cloudflare deployment directory (Static Assets)
│   ├── index.html
│   ├── sample_tuannguyen.html
│   ├── index2.html
│   ├── index_original_template.html
│   ├── _headers                 # Security & caching headers
│   └── _redirects               # Clean URL & legacy route redirects
├── build.js                     # Syncs root HTML files to public/
├── wrangler.jsonc               # Cloudflare Workers Static Assets configuration
└── package.json                 # Project metadata & deployment scripts
```

---

## 🛠 Local Development

To view the site locally:

- **Using Node:** `npm run build` then `npx wrangler dev`
- **Using Python:** `python -m http.server 8000 --directory public`
- **Using VS Code:** Right-click `index.html` and choose **Open with Live Server**.
