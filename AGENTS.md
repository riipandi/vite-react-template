# AGENTS.md

Starter template for a React 19 + Vite 8 + TypeScript SPA using TanStack Router/Query/Form/Store, StyleX, and Base UI.
You are helping maintain this template for its author.

## Tooling

- React 19 (**React Compiler enabled**) + Vite 8 + TypeScript; Node >= 24.12 and pnpm 12 (`engines`/`packageManager`).
- Styling: StyleX everywhere (+ `@stylexjs/atoms` for one-off utilities), Base UI headless primitives, Lucide icons, ofetch for HTTP.
- Lint/format: Oxc tools (`oxlint`, `oxfmt`) — no ESLint/Prettier. Storybook 10 (`@storybook/tanstack-react`) with a11y, docs, links, mcp, vitest, performance addons.

## Commands (pnpm)

- `pnpm dev` — prebuild typecheck + dev server, port 3000 (strict; fails if busy).
- `pnpm build` — `tsr generate && tsc -b` + app build + Storybook build → `dist/` and `dist/storybook/` (what Netlify deploys, see `netlify.toml`).
- `pnpm start` — serve `dist/` via `vite preview` (build first or you serve stale output).
- `pnpm test` — unit tests (Vitest, project `unit`); `pnpm test:storybook` — Storybook interaction tests (real Chromium via Playwright); `pnpm test:coverage` — with coverage (thresholds in `vitest.config.ts`); `pnpm test:ui` — open the tokened URL printed in the terminal.
- `pnpm lint` / `pnpm format` — write fixes in place; `pnpm check` verifies formatting only.
- `pnpm typecheck` — `tsc -b --noEmit`.
- `pnpm storybook` — dev server, port 6006. `pnpm knip` — unused exports/files check. `pnpm pre-commit` — full lefthook suite (format, lint, typecheck, unit tests).

## Architecture

- Source root is `app/`, imported via the `#/*` alias (`#/components/...`); relative imports stay within a directory.
  - `routes/` — file-based TanStack Router routes (groups `(app)`, `(auth)`). The `(app)` guard redirects anonymous visitors to `/login?return_to=…`; `(auth)` sends already-signed-in visitors to `return_to` or `/overview`.
  - `components/` — shared components (`base/`, `charts/`, `extra/`, `icons/`, `theme/`).
  - `styles/` — StyleX design tokens and styling (`core/`, `element/`, `pages/`).
  - `schemas/` — Zod schemas (shared with TanStack Form validation); `hooks/` — shared React hooks; `libraries/` — `api-client.ts` (QueryClient + ofetch), `app.store.ts` (TanStack Store), `guard/` (cookie-session auth via a Comlink token worker), `utils/`.
  - `tests/` — unit tests for non-component code only (pages in `tests/page/`, guard in `tests/guard/`).
- `app/routes.gen.ts` and `.tanstack/` are generated (`tsr generate`; also runs inside `pnpm build`) — never hand-edit; implement routes in `app/routes/` and regenerate.

### Component structure & testing

- Folder layout in `app/components/<area>/<name>/`: `<name>.component.tsx`, `<name>.stylex.ts` (exports `<name>Styles`), `<name>.stories.tsx` (colocated), `index.ts`.
- **No unit tests for components.** Stories are the component's tests — run via `pnpm test:storybook` (browser mode, a11y checks via `@storybook/addon-a11y`). Add stories for every meaningful UI state. Unit tests are for pages, libraries, and utilities only.

## React 19 & Performance

- **React Compiler is active** in the app build: `react({ compiler: true })` with `oxc-transform-react` (native oxc path — do not switch to the Babel/`babel-plugin-react-compiler` route). Defaults: `compilationMode: 'infer'`, `panicThreshold: 'none'` — components that violate the Rules of React are skipped, never broken. Storybook intentionally compiles WITHOUT the compiler (uncompiled reference).
- **Purity is a hard rule.** Render functions and state updater functions must be side-effect free — no storage writes, DOM mutations, or fetches. StrictMode double-invokes updaters and the compiler assumes purity. Move side effects into effects/handlers (see the `setTheme` persistence effect in `theme.tsx`).
- Don't add `useMemo`/`useCallback`/`memo` by default — the compiler memoizes. Keep existing manual memo (removal is gradual — profile first). Escape hatch: the `"use no memo"` directive.
- `ref` is a plain prop — no `forwardRef` in React 19.
- Use `useId()` for element ids referenced in `url(#…)` or the DOM (see `icons/`) — sanitize before interpolation.
- Subscribe narrowly: TanStack Store `useSelector(store, narrowSelector)`; prefer scoped hooks (e.g. `useAuthUser`) over whole-store reads to avoid redundant re-renders.
- `use(promise)` requires a cached promise (e.g. a deferred router-loader result) plus a Suspense boundary; never call it inside try/catch; never read `promise.status` manually.
- TanStack Query v5.9x+: use `queryClient.query()` / `infiniteQuery()` (with `staleTime: 'static'` for fetch-once semantics) — `fetchQuery`/`ensureQueryData`/`prefetchQuery` are deprecated.
- Router: `defaultPreload: 'intent'` and `scrollRestoration` are set; loaders may return unawaited promises consumed via `use()` (non-blocking deferral).
- `ThemeProvider` runs with `disableTransitionOnChange` — theme swaps snap in one frame (mixed-speed color transitions read as a flash). Don't remove it.

## Conventions

- Everything is styled with StyleX — follow `llms/stylex-authoring.md` (authoring rules and antipatterns; setup in `llms/stylex-installation.md`). Compiled by `@stylexjs/unplugin` with `useCSSLayers: true`; tokens live in `app/styles/core/*.stylex.ts` (light defaults + a single dark `createTheme` in `themes.ts`; theme class on `documentElement`).
- `@stylexjs/atoms` for one-off layout in stories/routes: static styles via property access (`atoms.display.flex`), dynamic values via bracket strings (`atoms.gap['8px']`) — numeric calls like `atoms.gap(8)` emit invalid unitless CSS.
- **Lucide icons — never barrel-import.** Named imports with the `Icon` suffix only (`import { UploadIcon } from 'lucide-react'`); the barrel executes ~1.5k icon modules at runtime and has shipped to prod that way before. Type-only namespace imports are fine.
- HTTP goes through the same-origin `/api` proxy (Vite dev proxies to `dummyjson.com`; Netlify routes `/api/*` to `netlify/functions/api.ts`). Cookie sessions depend on it — never call the backend host directly.
- Use Zod schemas from `app/schemas/` for form validation, never inline. Reuse page-level shared styles from `app/styles/pages/page.stylex.ts`.
- Surface conventions (keep components in sync): radius by role — tooltip/kbd/small chips `radius.small`; buttons/inputs/popups/menus `radius.medium`; cards/toolbars/empty states `radius.large`; modals/drawers/command dialog `radius.xlarge`. Title tiers — modal surfaces `fontSize.body1` + `semibold`; inline titled surfaces `fontSize.body2` + `medium`. Focus rings — form inputs draw an inset outline (`outlineOffset: calc(-1 * stroke.ring1)`), standalone controls outside (`stroke.ring2`), slider thumbs/OTP a `stroke.ring3` shadow; never `outline: 'none'` without a visible focus replacement. Disabled controls = `opacity: 0.5`, never a per-component value.
- Media queries: raw string keys in `stylex.create` conditionals are fine; `defineConsts` media keys must be exported and declared in the same file that uses them (babel limitation). Align boundaries to token breakpoints (660/900/1280), not raw 640px.

## Common Tasks

- **Add a route**: create a file in `app/routes/` → `npx tsr generate` (or `pnpm build`) to refresh `app/routes.gen.ts`.
- **Add a component**: four-file layout above; stories are the tests — verify with `pnpm test:storybook`.
- **Change design tokens**: edit `app/styles/core/*.stylex.ts` — consumers pick up compile-time constants.

## Gotchas

- `lint`/`format` write in place; `pnpm check` verifies only. `.npmrc` sets `min-release-age`: brand-new package versions can be rejected on implicit installs — pin older or wait out the window.
- The `devtools()` Vite plugin must run on CI builds (gate on `!isVitest`, not `!isTestOrCI`): its `removeDevtoolsOnBuild` transform strips `@tanstack/*-devtools` code — plus the devtools package's bundled fonts — from the production bundle.
- `index.html` carries an inline static loader for the client-only SPA (oxfmt ignores the file on purpose). React 19 clears the `#root` children — including the loader — on first commit; `app/main.tsx` must not guard mounting on `rootElement.innerHTML`. Keep the loader self-contained: no token or class values duplicated with `app/styles`.
- StyleX: `stylex.props()` must receive compiled styles (never a plain object or module-level array). A `virtual:stylex.css` 404 usually means a syntax slip (missing comma) in the last-edited style file; restart Storybook — stale transform state keeps 404-ing after the fix.
- Base UI: `CardTitle`/`CardDescription` have no `render` prop (use `Text render={<h1/>}` for headings); in a `render` prop, put content inside the render element itself, not the component's children, or oxlint flags an empty anchor/control.
- Layout: `ButtonGroup` root is `width: fit-content` (full-width joined buttons need `width: '100%'` on the group and each child Button); `CardHeader` is a left-aligned `1fr/auto` grid (for a centered header use a flex column and pin `CardAction` with `position: absolute` + `position: relative` on the Card); `FieldSeparator`'s background must match its surrounding surface (`backgroundElevationBase` inside a Card), not `backgroundPage`.

## Related Docs

- `llms/stylex-authoring.md` — read before writing styles. `llms/stylex-installation.md` — StyleX setup.
