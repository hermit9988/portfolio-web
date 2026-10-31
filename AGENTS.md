# AGENTS.md

Telegraph style. Root rules only. Guidance for AI coding agents (Claude Code, Cursor, Copilot, Antigravity, etc.) working in this repository.

## Start

- Repo: `https://github.com/hermit9988/portfolio-web`
- Primary Tech: Static HTML/CSS/JS, Node.js build pipeline (`build.js`), Cloudflare Pages / Workers.
- Replies: repo-root refs only (e.g. `index.html:45`). No machine-local absolute paths.
- Read `README.md`, `CONTRIBUTING.md`, and `LABELS.md` first.
- Live-verify build before proposing commits: `node build.js`.
- Never hardcode or print secret credentials (e.g. `CLOUDFLARE_API_TOKEN`).

## Development Commands

- Build public directory: `node build.js` (or `npm run build`)
- Local Cloudflare Pages preview: `npm run pages:dev` (runs `wrangler pages dev public`)
- Deploy via Wrangler: `npm run deploy`

## Repair & Styling Doctrine

- Mobile-first responsiveness is mandatory; verify on both viewport extremes.
- Static assets live in root / `template/` and are built into `public/` by `build.js`.
- Maintain clean semantic HTML and accessibility standards (`aria-*` tags, alt texts).
- Always verify that `node build.js` runs cleanly without errors before committing.

## Conventions

- Commit style: `type(scope): description` (see `CONTRIBUTING.md`).
- Label taxonomy & rating order: see `LABELS.md`.

