# CLAUDE.md

Telegraph style. Root rules only. Guidance for Claude Code working in this repository.

## Start

- Repo: `https://github.com/hermit9988/portfolio-web`
- Stack: HTML5, CSS3, JavaScript, Node.js (`build.js`), Cloudflare Pages & Workers.
- File references: repo-relative only (`index.html:120`). Never print host-local paths or secrets.
- Read `README.md` and `CONTRIBUTING.md` before edits.

## Build & Test Commands

- Build: `node build.js` (or `npm run build`)
- Wrangler Pages local server: `npm run pages:dev`
- Wrangler deploy: `npm run deploy`

## Architecture & Conventions

- Source files (`index.html`, etc.) are processed by `build.js` into the `public/` folder.
- Ensure all styling modifications respect dark/light theme tokens and responsive breakpoints.
- Commit conventions: `type(scope): description` (e.g. `feat(cv): update publications list`).
