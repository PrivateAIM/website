# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PrivateAIM website — a Vue 3 + TypeScript single-page application built with Vite. Requires Node.js >= 22.

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check (`vue-tsc`) then build (`vite build`)
- `npm run build-only` — prerender with `vite-ssg build`, without type-check
- `npm run type-check` — run `vue-tsc --build --noEmit`
- `npm run lint` — ESLint check (non-mutating; this is the CI gate; also reports formatting — no separate Prettier step)
- `npm run lint:fix` — ESLint with auto-fix (use locally)

## Architecture

**Stack:** Vue 3 (Composition API, `<script setup>`), Vue Router, ilingo (`@ilingo/vue`), Pinia, Bootstrap (grid + utilities only), Vite, TypeScript strict mode.

**Lint & formatting:** ESLint flat config via [`@tada5hi/eslint-config`](https://github.com/tada5hi/javascript) (`eslint.config.ts`). It bundles `@stylistic` formatting (4-space indent, single quotes, semicolons, comma-dangle multiline, max-len 150) and replaces Prettier. `eslint.config.ts` adds browser globals, disables `vue/no-v-html` (markdown is rendered via `v-html` by design), and turns off `@stylistic/max-len` for `.vue` files (inline SVG paths). TypeScript config extends [`@tada5hi/tsconfig`](https://github.com/tada5hi/javascript) in `tsconfig.json`, layering Vite bundler-mode overrides on top. The base enables `noUncheckedIndexedAccess` and `verbatimModuleSyntax`, so index access is `T | undefined` and type-only imports must use `import type`.

**Path alias:** `@` → `src/` (configured in both `tsconfig.json` and `vite.config.ts`).

**Key directories:**
- `src/views/` — page-level components, one per route (Home, News, Team, Partners, Publications, Imprint, Privacy, NotFound)
- `src/components/` — reusable components; `home/` has homepage sections, `shared/` has generic components like LinkText and LocalizedLink
- `src/data/news/` — news content as TypeScript modules per locale (`en.ts`, `de.ts`), grouped by year and keyed by locale in `index.ts`
- `src/i18n/locales/` — `en.ts` and `de.ts` ilingo catalogs built with `defineLocale`/`defineNamespace`/`defineTranslations`
- `src/types/` — shared TypeScript interfaces (`NewsItem`)
- `src/assets/` — CSS (dark-mode, fonts), SVG logo, flag icons

**Routing:** All routes use lazy-loaded components. The router scrolls to top on navigation.

**Prerendering:** `vite-ssg` renders the allowlist in `scripts/prerender.ts` to flat files (`dist/news.html`, because GitHub Pages would 301 `news/index.html` to `/news/`), writes per-route head tags, and generates `dist/sitemap.xml` and a `noindex` `dist/404.html`. Add new indexable routes to that list. Code that runs during setup must be SSR-safe: no `window`/`document` outside `onMounted` or an `import.meta.env.SSR` guard.

**i18n:** ilingo via `@ilingo/vue`. `src/i18n/index.ts` assembles a catalog with `defineCatalog` from the per-locale definitions in `src/i18n/locales/{en,de}.ts` (each top-level section is an ilingo *namespace*; nested objects extend the dotted *key* path), holds it in a `MemoryStore`, and exposes `installTranslator(app)` (called in `main.ts`). Lookups are synchronous (ilingo's own `get()` is async and would prerender raw keys). Translations are consumed via the globally-registered `<ITranslate path="namespace.key" />` component for inline text, or the `useTranslation('namespace.key')` composable (returns a reactive `Ref<string>`) for attributes/props/script. `useLocale()` returns the writable active-locale ref; assign `.value` to switch language. Interpolation uses `{{var}}` with a `:data` object. Default locale is `en`, available locales are `en` and `de`. The `LanguageProvider` component wraps the entire app.

**Theming:** Dark mode via CSS custom properties defined in `src/assets/dark-mode.css`, toggled by `ThemeToggle` component.

**News system:** News items are typed `NewsEntry` objects in `src/data/news/{en,de}.ts`, grouped by year and exported per-locale from `index.ts`. The News view (and the homepage "Latest News" card) select the array for the active locale via `useLocale()`. They live outside the i18n catalog because ilingo holds only string/plural leaves, not arrays of objects.

**Static assets:** Images go in `public/images/` with subdirectories per content type (news, team, partners). Markdown files are included as assets via Vite config (`assetsInclude: ['**/*.md']`); privacy policy content is in `src/data/privacy/`.

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

### News Content Changes
```
Please test locally before I commit:
- [ ] `npm run build` passes
- [ ] `npm run dev` — open /news
- [ ] Verify the new/updated content renders correctly
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
