# Agent Instructions

React 19 + Vite 8 + TypeScript 6 SPA. StyleX styling. TanStack Router/Form/Query. Package manager: **pnpm**.

## Commands

Check `package.json` → `scripts` for all available commands. Key facts:

- `pnpm build` runs in sequence: `tsr generate` → `tsc -b` → `vite build`
- Never skip `tsr generate` — produces `app/routes.gen.ts` (router import)
- Never edit `routes.gen.ts` manually
- Pre-commit gate: `pnpm lint && pnpm typecheck && pnpm test`
- Pre-push: `pnpm audit --prod`

## Pre-commit Gate

- Run `pnpm lint && pnpm typecheck && pnpm test` before committing.
- Hook order: format → lint → typecheck → test (staged files). Pre-push: `pnpm audit --prod`.

## Critical: Build

- `pnpm build` must run `tsr generate` first — it produces `app/routes.gen.ts`.
- Never skip. Never edit `routes.gen.ts` manually.
- Path Aliases: `#/*` → `./app/*`

## StyleX

- Token file: `app/styles/token.stylex.ts` (exports: `colors`, `darkTheme`, `font`, `space`, `radius`, `shadow`, `fontSize`, `fontWeight`)
- Theme/token definitions → `*.stylex.ts` files only
- Apply with `stylex.props()` — not `className`/`style`
- `stylex.defineVars()` for themable tokens; `stylex.defineConsts()` for non-themable
- Nest pseudo-classes/media queries inside property values (not top-level)
- Use longhand properties; `null` to unset
- Always add unique `id` to each HTML tag
- **Tests**: mock `@stylexjs/atoms` — setup in `tests/setup-test.ts` (Vitest skips Babel transform)
- Ref: <https://stylexjs.com/docs/llm-resources#style-authoring-guide>

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

## Storybook

When working on UI components, always use the `your-project-sb-mcp` MCP tools to access Storybook's component and documentation knowledge before answering or taking any action.

- **CRITICAL: Never hallucinate component properties!** Before using ANY property on a component from a design system (including common-sounding ones like `shadow`, etc.), you MUST use the MCP tools to check if the property is actually documented for that component.
- Query `list-all-documentation` to get a list of all components
- Query `get-documentation` for that component to see all available properties and examples
- Only use properties that are explicitly documented or shown in example stories
- If a property isn't documented, do not assume properties based on naming conventions or common patterns from other libraries. Check back with the user in these cases.
- Use the `get-storybook-story-instructions` tool to fetch the latest instructions for creating or updating stories. This will ensure you follow current conventions and recommendations.
- Check your work by running `run-story-tests`.

Remember: A story name might not reflect the property name correctly, so always verify properties through documentation or example stories before using them.

## Routing

File-based routing in `app/routes/`. Route tree auto-generated to `app/routes.gen.ts` via `tsr generate`.

## Environment Variables

Prefix: `VITE_` or `PUBLIC_`. Loaded from project root. Example: `.env.example`.

## Key Constraints

- ESM only (`"type": "module"`), Strict Mode in dev
- `verbatimModuleSyntax: true` → use `import type` for type-only imports
- `noUncheckedIndexedAccess: true` → indexed access returns `T | undefined`
- `noUnusedLocals/Parameters: true` → unused = compile error
- Storybook stories: `stories/*.stories.tsx`
