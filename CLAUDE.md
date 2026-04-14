# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PrivateAIM website — a Vue 3 + TypeScript single-page application built with Vite. Requires Node.js >= 22.

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check (`vue-tsc`) then build (`vite build`)
- `npm run build-only` — build without type-check
- `npm run type-check` — run `vue-tsc --build --noEmit`
- `npm run lint` — ESLint with auto-fix
- `npm run format` — Prettier on `src/`

## Architecture

**Stack:** Vue 3 (Composition API, `<script setup>`), Vue Router, vue-i18n, Pinia, Bootstrap (grid + utilities only), Vite, TypeScript strict mode.

**Path alias:** `@` → `src/` (configured in both `tsconfig.json` and `vite.config.ts`).

**Key directories:**
- `src/views/` — page-level components, one per route (Home, BlogList, BlogPost, News, Team, Partners, Publications, Imprint, Privacy, NotFound)
- `src/components/` — reusable components; `home/` has homepage sections, `blog/` has blog-specific components, `shared/` has generic components like LinkText and LocalizedLink
- `src/data/blogs/` — blog post content as TypeScript modules organized by category (generalIntroduction, privateaimInsights, technicalDeepDives), aggregated in `index.ts`
- `src/i18n/locales/` — `en.json` and `de.json` translation files; news items are embedded directly in locale JSON under `news.items.<year>`
- `src/types/` — shared TypeScript interfaces (`BlogPost`, `NewsItem`)
- `src/assets/` — CSS (dark-mode, fonts), SVG logo, flag icons

**Routing:** All routes use lazy-loaded components. The router scrolls to top on navigation. A session-storage-based redirect mechanism in `main.ts` handles SPA redirect after 404 pages on static hosting.

**i18n:** vue-i18n in Composition API mode (`legacy: false`). Default locale is `en`, available locales are `en` and `de`. The `LanguageProvider` component wraps the entire app.

**Theming:** Dark mode via CSS custom properties defined in `src/assets/dark-mode.css`, toggled by `ThemeToggle` component.

**Blog system:** Blog posts are defined as typed objects (`BlogPost` interface) in `src/data/blogs/` files with markdown content strings. They are sorted by date in the index. Categories are a union type in `src/types/BlogPost.ts`.

**News system:** News items live directly in the i18n locale JSON files under `news.items`, grouped by year. The News view reads them from the i18n messages object at runtime.

**Static assets:** Images go in `public/images/` with subdirectories per content type (blog, news, team, partners, authors). Markdown files are included as assets via Vite config (`assetsInclude: ['**/*.md']`); privacy policy content is in `src/data/privacy/`.

## Preferences

- **No co-authorship:** Never include `Co-Authored-By` or any other attribution to Claude/AI in commit messages.
- **No commits to master:** Always create and commit to a separate feature branch. Never commit directly to `master`.
- **Human testing before commit:** Before committing any changes, prompt the user to test locally first. Provide the relevant testing checklist from the templates below so the user knows what to verify.

## Local Testing Templates

Use the appropriate template when prompting the user to test before committing.

### General Changes
```
Please test locally before I commit:
- [ ] `npm run build` passes (type-check + build)
- [ ] `npm run lint` passes
- [ ] `npm run dev` — verify the change visually in the browser
- [ ] Check both light and dark mode
- [ ] Check both EN and DE locale
```

### Component / View Changes
```
Please test locally before I commit:
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `npm run dev` — open the affected page(s): <list URLs>
- [ ] Verify layout on desktop and mobile (responsive)
- [ ] Check both light and dark mode
- [ ] Check both EN and DE locale
- [ ] Verify navigation to/from the page works
```

### Blog / News Content Changes
```
Please test locally before I commit:
- [ ] `npm run build` passes
- [ ] `npm run dev` — open /blog or /news
- [ ] Verify the new/updated content renders correctly
- [ ] Check markdown rendering (if blog post)
- [ ] Check both EN and DE locale
- [ ] Verify images load correctly (if any)
```

### i18n / Translation Changes
```
Please test locally before I commit:
- [ ] `npm run build` passes
- [ ] `npm run dev` — switch between EN and DE
- [ ] Verify all affected pages show correct translations
- [ ] Check for missing keys or fallback text
```

### Styling / CSS Changes
```
Please test locally before I commit:
- [ ] `npm run build` passes
- [ ] `npm run dev` — open the affected page(s)
- [ ] Check light and dark mode
- [ ] Check desktop, tablet, and mobile viewports
- [ ] Verify no visual regressions on adjacent sections
```
