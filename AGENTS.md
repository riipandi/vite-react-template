# Agent Instructions

React 19 + Vite 8 + TypeScript 6 SPA. StyleX styling. TanStack Router/Form/Query. Package manager: **pnpm**.

## Commands
Check `package.json` → `scripts` for all available commands. Key facts:
- `pnpm build` runs in sequence: `tsr generate` → `tsc -b` → `vite build`
- Never skip `tsr generate` — produces `src/routes.gen.ts` (router import)
- Never edit `routes.gen.ts` manually
- Pre-commit gate: `pnpm lint && pnpm typecheck && pnpm test`
- Pre-push: `pnpm audit --prod`

## Pre-commit Gate
- Run `pnpm lint && pnpm typecheck && pnpm test` before committing.
- Hook order: format → lint → typecheck → test (staged files). Pre-push: `pnpm audit --prod`.

## Critical: Build
- `pnpm build` must run `tsr generate` first — it produces `src/routes.gen.ts`.
- Never skip. Never edit `routes.gen.ts` manually.

## Path Aliases
- `#/*` → `./src/*`
- `~/*` → `./public/*`

## StyleX
- Token file: `src/styles/token.stylex.ts` (exports: `colors`, `darkTheme`, `font`, `space`, `radius`, `shadow`, `fontSize`, `fontWeight`)
- Theme/token definitions → `*.stylex.ts` files only
- Apply with `stylex.props()` — not `className`/`style`
- `stylex.defineVars()` for themable tokens; `stylex.defineConsts()` for non-themable
- Nest pseudo-classes/media queries inside property values (not top-level)
- Use longhand properties; `null` to unset
- Always add unique `id` to each HTML tag
- **Tests**: mock `@stylexjs/atoms` — setup in `tests/setup-test.ts` (Vitest skips Babel transform)
- Ref: https://stylexjs.com/docs/llm-resources#style-authoring-guide

## Linting & Formatting
- Linter: **oxlint** (not ESLint). Config: `.oxlintrc.json`
- Formatter: **oxfmt** (not Prettier). Config: `.oxfmtrc.json`
- No semicolons, single quotes, 100-char width, no trailing comma, LF
- `interface` enforced over `type` (`typescript/consistent-type-definitions`)
- `any` is a lint error

## Testing
- Framework: Vitest + `happy-dom`
- Test files: `tests/**/*.{test,spec}.{ts,tsx}` (not colocated)
- Setup: `tests/setup-test.ts`
- Coverage thresholds: 80% statements, 70% branches, 75% functions, 80% lines
- `globals: true` — no need to import `describe`/`it`/`expect`

## Routing
File-based routing in `src/routes/`. Route tree auto-generated to `src/routes.gen.ts` via `tsr generate`.

## Environment Variables
Prefix: `VITE_` or `PUBLIC_`. Loaded from project root. Example: `.env.example`.

## Key Constraints
- ESM only (`"type": "module"`), Strict Mode in dev
- `verbatimModuleSyntax: true` → use `import type` for type-only imports
- `noUncheckedIndexedAccess: true` → indexed access returns `T | undefined`
- `noUnusedLocals/Parameters: true` → unused = compile error
- Storybook stories: `stories/*.stories.tsx`
