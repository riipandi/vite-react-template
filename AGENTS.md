# AGENTS.md

Starter template for a React 19 + Vite + TypeScript SPA using TanStack Router, TanStack Query/Form/Store, StyleX, and Base UI.
You are helping maintain this template for its author.

## Project Overview

- React 19 + TypeScript 7 SPA with file-based routing (TanStack Router).
- Styling: StyleX with Base UI components, following Reshaped-inspired patterns.
- Authentication via DummyJSON API with ofetch.
- Key entry points: `app/routes/` for pages, `app/components/` for shared UI.

## Tech Stack & Tooling

- Package manager: **pnpm** (`packageManager` pins `pnpm@11.25.0`). Never use npm/yarn.
- React 19, TypeScript 7 (strict, `tsc -b`), Vite 8, Vitest 4, Storybook 10.
- Styling: StyleX (`@stylexjs/stylex` + unplugin, `useCSSLayers: true`).
- UI components: Base UI (`@base-ui/react`) for headless primitives.
- Lint/format: **Oxc toolchain only** — `oxlint` + `oxfmt`. There is no ESLint or Prettier config; do not add one.
- Git hooks: Lefthook (`lefthook.yml`), runs format/lint/typecheck/unit tests on pre-commit.
- Import alias: `#/*` → `./app/*` (also accepted by oxfmt sort groups: `#/`, `~/`).

## Build / Test / Lint

| Task | Command |
|------|---------|
| Dev server (port 3000, strict) | `pnpm dev` |
| Build (`tsr generate && tsc -b && vite build`) | `pnpm build` |
| Unit tests (happy-dom, fast) | `pnpm test` |
| Storybook tests (Playwright/Chromium, slow) | `pnpm test:storybook` |
| Coverage (thresholds 80/70/75/80) | `pnpm test:coverage` |
| Lint with autofix | `pnpm lint` |
| Format with autofix | `pnpm format` |
| Format check | `pnpm check` |
| Typecheck | `pnpm typecheck` |
| Force pre-commit hooks | `pnpm pre-commit` |
| Outdated-dep report | `pnpm knip` |

Run `pnpm exec playwright install chromium` once if storybook tests fail with a missing browser.

## Architecture

- `app/routes/` — file-based routes (TanStack Router). Route groups: `(app)` (auth-guarded app), `(auth)` (login etc). `__root.tsx` is the root route; `-boundaries.tsx` holds error/not-found boundaries; `-devtools.tsx` mounts TanStack devtools panels (Query/Router).
- `app/routes.gen.ts` — **generated** route tree. Never edit by hand; `pnpm build` regenerates it (or `pnpm exec tsr generate`).
- `app/components/` — shared UI components, each with co-located `*.stories.tsx` and `*.test.tsx`.
- `app/components/base/` — Base UI components (headless primitives) styled with StyleX.
- `app/hooks/`, `app/libraries/`, `app/schemas/`, `app/styles/`, `app/assets/` — hooks, utility libs, zod schemas, StyleX global styles, static assets.
- `tests/` — root-level test setup: `setup-test.ts`, `helpers.tsx` (render helpers), `stylex-cleanup.ts` (StyleX test cleanup). Use `tests/helpers.tsx` instead of raw `@testing-library/react` in new tests.
- Vitest 4 has two projects (`vitest.config.ts`): `unit` (happy-dom) and `storybook` (Playwright via `@storybook/addon-vitest`). Vite plugins are configured per-project, not at root.
- `llms/` — AI agent reference docs: `stylex-authoring.md` (StyleX conventions), `stylex-installation.md`.

## Conventions

- Style with StyleX: `stylex.create(...)` per component; global tokens live in `app/styles/`. Match existing patterns before using `@stylexjs/atoms` or `defineVars`.
- StyleX variant pattern: use `keyof typeof` for type safety, not manual `Record<>` types. See `app/components/base/button/button.stylex.ts` for canonical example.
- StyleX authoring rules (from `llms/stylex-authoring.md`):
  - Use longhand properties and single-value shorthands over multi-value shorthands (e.g. `paddingBlock` + `paddingInline` instead of `padding: '4px 8px'`).
  - Property-level conditions for pseudo-classes: `backgroundColor: { default: 'x', ':hover': 'y' }`. Never top-level pseudo-classes.
  - Don't mix `style`/`className` props with `stylex.props()` spread — pass them INTO `stylex.props()`.
  - Use `null` to unset properties.
  - Length properties are in pixels by default.
- Components: functional components, co-located stories + tests for anything visual or reusable.
- Base UI components: use `@base-ui/react` headless primitives, apply StyleX via `stylex.props()` spread.
- Don't hand-format or hand-sort imports — `pnpm format` (oxfmt) sorts them. JSON files use 4-space indent, TS/JS 2-space, no semicolons, single quotes.
- Follow `tsc -b --noEmit` + `pnpm test` as the minimum validation before finishing; hooks/CI enforce more.
- Auth uses the DummyJSON API via `ofetch` (see `app/libraries/`); `PUBLIC_API_URL` and `PUBLIC_SITE_URL` come from env — client env vars must use the `VITE_` or `PUBLIC_` prefix.
- Public env vars set at build time: `PUBLIC_APP_VERSION` is defined in `vite.config.ts`; do not define it again.

## Common Tasks

- **Add a route**: create the file in `app/routes/` (inside `(app)` or `(auth)` as appropriate), then run `pnpm exec tsr generate`. Route definitions come from `createFileRoute` in each file — keep them in sync.
- **Add a component**: create it in `app/components/` with a co-located `*.stories.tsx` and `*.test.tsx`; verify with `pnpm test` and `pnpm test:storybook`.
- **Add a Base UI component**: create in `app/components/base/` with StyleX styles following the Reshaped-inspired pattern (see `button.stylex.ts` for reference).
- **Update dependencies**: `pnpm update-deps` (ncu) and review `.ncurc.json` policy first; keep `packageManager` field in sync.
- **Cut a release**: bump version in `package.json` and update `CHANGELOG.md` (keep both licenses in `LICENSE-APACHE` / `LICENSE-MIT` untouched).

## Gotchas / Anti-patterns

- Never edit `app/routes.gen.ts` manually — it is overwritten by the router plugin on every `tsr generate`/build.
- Never bypass pre-commit hooks (`pnpm pre-commit` mirrors the CI checks; `--no-verify` is not acceptable).
- Don't disable oxlint rules ad hoc in files — `any` types, array index keys, and focused tests are errors by policy in `.oxlintrc.json`.
- Storybook story index and tests depend on `.storybook/main.ts`; StyleX and the `#/*` alias are only wired for Vitest there — keep new components within `app/**` globs.
- Coverage thresholds are enforced globally; keep new code covered rather than relaxing them.
- The vite devtools/router plugins are disabled under CI/Vitest (`isTestOrCI`) — test-only failures around router code are usually config, not product code.
- Don't use `& > *` or arbitrary CSS selectors in StyleX — use actual elements with `stylex.props()` instead.
- Don't use `::before`/`::after` pseudo-elements in StyleX — prefer actual HTML elements for bundle size and accessibility.

## Related Agent Instructions

- `AGENTS.md` (this file) — canonical source for all AI agents.
- `llms/stylex-authoring.md` — StyleX authoring conventions and anti-patterns.
- `llms/stylex-installation.md` — StyleX setup and configuration guide.
