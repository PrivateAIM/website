# PrivateAIM Website

[![main](https://github.com/PrivateAim/website/actions/workflows/main.yml/badge.svg)](https://github.com/PrivateAim/website/actions/workflows/main.yml)

Source of [privateaim.de](https://privateaim.de), the website of PrivateAIM (Privacy-Preserving Analytics in Medicine) and its federated analysis platform FLAME. The site is available in English and German (`/de/...`).

## Stack

- [Vue 3](https://vuejs.org/) with TypeScript and `<script setup>`
- [Vite](https://vite.dev/) and [vite-ssg](https://github.com/antfu-collective/vite-ssg): every page is prerendered to static HTML
- [Vue Router](https://router.vuejs.org/) with one route per page and locale
- [ilingo](https://github.com/tada5hi/ilingo) for translations
- ESLint via [`@tada5hi/eslint-config`](https://github.com/tada5hi/javascript), which also handles formatting
- Hosted on GitHub Pages

## Getting started

Requires Node.js 24.3 or newer and npm.

```bash
git clone https://github.com/PrivateAim/website
cd website
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and prerender the site to `dist/` |
| `npm run build-only` | Prerender without type-check |
| `npm run preview` | Serve the build output locally |
| `npm run type-check` | Run `vue-tsc` |
| `npm run lint` | Lint and check formatting (the CI gate) |
| `npm run lint:fix` | Lint with auto-fix |
| `npm run check-dist` | Check the build output: sitemap, head tags, hreflang |
| `npm run check-links` | Check all external links in `dist/` |

## Project structure

```
src/
  views/          one component per page
  components/     shared and page section components
  data/news/      news entries per locale (en.ts, de.ts)
  data/privacy/   privacy policy (Markdown)
  data/references/ predecessor projects (/references/...)
  i18n/locales/   UI translations (en.ts, de.ts)
  router/         routes, page titles and descriptions, scroll handling
  seo/            structured data (JSON-LD)
  assets/         colour tokens (dark-mode.css), fonts
scripts/          prerender, sitemap, avatars, thumbnails, build checks
public/           static files: images, PDFs, robots.txt, llms.txt
```

## Editing content

- **News:** Add an entry to `src/data/news/en.ts` and `src/data/news/de.ts`, and put the images in `public/images/news/`. Thumbnails are generated at build time.
- **Texts and labels:** `src/i18n/locales/en.ts` and `de.ts`. Every key needs both languages.
- **New page:** Add the view, add the route with title and description in `src/router/index.ts`, and add the path to the prerender list in `scripts/prerender.ts`.
- **Colours:** Only use the tokens from `src/assets/dark-mode.css`, which has a light and a dark palette.
- **Team avatars:** These are fetched from GitHub at build time.

## Deployment

- **Deploy:** Every push to `master` builds the site and deploys it to GitHub Pages. A daily scheduled build picks up changed team avatars.
- **CI:** Lint and build run on every pull request.
- **Links:** A weekly job checks all external links.

## Contributing

- **Branches:** Work on a feature branch and open a pull request against `master`.
- **Before pushing:** Run `npm run lint` and `npm run build`.
- **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`). Releases are created by release-please.
