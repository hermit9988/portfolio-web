# Contributing to Portfolio Website

Thanks for your interest in contributing! Please take a moment to read this guide so your contribution goes smoothly.

## Getting Started

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Make your changes and verify the build locally:
   ```bash
   node build.js
   # or
   npm run build
   ```
4. Commit your changes using conventional commits:
   ```bash
   git commit -m "feat(ui): update hero banner layout"
   ```
5. Push to your fork and open a pull request against `main`.

## Pull Request Checklist

- [ ] The PR description explains what and why.
- [ ] Build passes locally (`node build.js`).
- [ ] Mobile and desktop responsiveness verified.
- [ ] Documentation updated if relevant.

## Commit Style

Use conventional commits with a scope: `type(scope): description`

```text
feat(hero): add responsive typography
fix(nav): correct mobile toggle behavior
docs(readme): update build instructions
chore(deps): update wrangler package
```

Common types: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `ci`, `perf`.

## Issue Conventions

- Use the official issue forms for bug reports, feature requests, or questions.
- Tag issues with the matching priority (`🔴 P0` – `🟢 P3`) and area (`area: ui-ux`, `area: content`, etc.).

## Questions?

Open a discussion or open a `❓ question` issue.
