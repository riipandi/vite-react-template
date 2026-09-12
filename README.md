<p align="center"><img src="./public/images/vite.svg" width="500" height="120" alt="Project Logo"></p>
<p align="center">
    <a href="https://github.com/riipandi/vite-react-template/pulse">
        <img src="https://img.shields.io/badge/Contributions-welcome-blue.svg?style=flat-square" alt="Contribution welcome">
    </a>
    <a href="https://github.com/riipandi/vite-react-template">
        <img src="https://img.shields.io/github/languages/top/riipandi/vite-react-template?style=flat-square" alt="Top language">
    </a>
    <a href="https://aris.mit-license.org">
        <img src="https://img.shields.io/github/license/riipandi/vite-react-template?style=flat-square" alt="License">
    </a>
    <a href="https://app.netlify.com/sites/reactivite/deploys">
        <img src="https://api.netlify.com/api/v1/badges/47668315-f674-4560-8f83-52852dae2593/deploy-status" alt="Netlify Status">
    </a>
</p>

## Introduction

A starter project for [React](https://reactjs.org/) with [Vite](https://vitejs.dev/), [StyleX](https://stylexjs.com),
and [Typescript](https://www.typescriptlang.org/). This starter kit is already pre-configured
and [Typescript](https://www.typescriptlang.org/). This starter kit is already pre-configured
with [absolute import](https://jsdev.org/env/nodejs/absolute-path-imports/), [TanStack Router](https://tanstack.com/router),
[TanStack Form](https://tanstack.com/form), [TanStack Query](https://tanstack.com/query),
[TanStack Store](https://tanstack.com/store), [Oxlint](https://oxc.rs/docs/guide/usage/linter),
and [other goodies](./package.json). Authentication is implemented using [DummyJSON](https://dummyjson.com) API
with [ofetch](https://github.com/unjs/ofetch), easily replaceable with your own backend.

Browse the component library live in [Storybook](https://reactivite.netlify.app/storybook/).

> [!NOTE]
> This project just a template that I use for my personal use, so you may encounter bugs.
> Please review the release notes thoroughly before updating, as breaking changes can occur!

## The Complete Stack

- [x] [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
- [x] [React](https://reactjs.org) - A JavaScript library for building user interfaces.
- [x] [StyleX](https://stylexjs.com) - The styling system for ambitious user interfaces.
- [x] [Keyline Icons](https://github.com/keyline-icons/keyline-icons) - Consistent 24×24 stroke, duotone, and fill icons.
- [x] [Typescript](https://www.typescriptlang.org) - Strongly typed programming language.
- [x] [TanStack Router](https://tanstack.com/router) - Type-safe routing for React.
- [x] [TanStack Form](https://tanstack.com/form) - Headless, type-safe form state management.
- [x] [TanStack Query](https://tanstack.com/query) - Powerful asynchronous state management.
- [x] [TanStack Store](https://tanstack.com/store) - Lightweight, type-safe state management.
- [x] [TanStack Table](https://tanstack.com/table) - A powerful engine for building Data Grids.
- [x] [TanStack Virtual](https://tanstack.com/virtual) - A headless UI utility for virtualizing long lists of elements.
- [x] [TanStack Hotkeys](https://tanstack.com/hotkeys) - A type-safe, framework-agnostic library for handling keyboard shortcuts.
- [x] [TanStack Chart](https://tanstack.com/charts) - A typed, tree-shakable chart grammar for SVG and Canvas.
- [x] [React Testing Library](https://testing-library.com/) - Light-weight solution for testing React components.
- [x] [Vitest](https://vitest.dev/) - Blazing Fast Unit Test Framework.
- [x] [Oxlint](https://oxc.rs/docs/guide/usage/linter) - High-performance JavaScript linter.
- [x] [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) - High-performance code formatter.
- [x] [Storybook](https://storybook.js.org/) - UI component explorer for frontend developers.

## Quick Start

### Installation

```bash
npx tiged riipandi/vite-react-template myapp-name
```

> Don't forget to change `myapp-name` with your real application name.

### Up and Running

| NPM               | Yarn           | PNPM           | Description              |
|-------------------|----------------|----------------|--------------------------|
| `npm install`     | `yarn`         | `pnpm install` | install the dependencies |
| `npm run dev`     | `yarn dev`     | `pnpm dev`     | serve with hot reload    |
| `npm run build`   | `yarn build`   | `pnpm build`   | build for production     |
| `npm run preview` | `yarn preview` | `pnpm preview` | launch generated build   |

Application will run at `http://localhost:3000`

For detailed explanation on how things work, check out [Vite documentation](https://vitejs.dev/guide).

### Demo Account

Authentication hits the [DummyJSON](https://dummyjson.com) API through a same-origin proxy,
using HttpOnly cookie sessions. Use any valid [DummyJSON user](https://dummyjson.com/users) to sign in, e.g.:

| Username | Password     |
|----------|--------------|
| `emilys` | `emilyspass` |

Tick **Remember me** to extend the session lifetime to 30 days.

> [!IMPORTANT]
> Cookie auth needs a same-origin API. `pnpm dev`, `pnpm preview`, and `pnpm start`
> all ship with the same-origin proxy (`start`/`preview` serve the production
> build via Vite). See [Deploying the SPA](#deploying-the-spa).

## Deploy your own

Fork this repository, connect it to Netlify, and pushing to master will deploy to production! 🚀

<p>
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/riipandi/vite-react-template&project-name=vite-react-template&repo-name=my-vite-react-app&env=PUBLIC_SITE_URL">
    <img src="https://vercel.com/button" alt="Deploy to Vercel" height="32" />
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/riipandi/vite-react-template">
    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" height="32" />
  </a>
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/riipandi/vite-react-template">
    <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare" height="32" />
  </a>
</p>

### Deploying the SPA

The build output is a static SPA (`dist/`). Cookie-based auth requires a **same-site API** —
browsers do not send `SameSite=Lax` cookies on cross-site requests. Pick one:

- **Netlify** — works out of the box: [`netlify/functions/api.ts`](./netlify/functions/api.ts)
  transparently proxies every `/api/*` request (all HTTP methods) to the demo backend on the
  site's own origin, so the HttpOnly session cookies stick. The deploy also publishes
  Storybook under `/storybook/` (relative asset URLs, no extra base config needed).
- **Own backend** (recommended for production) — set `PUBLIC_API_URL` to your API on the same
  parent domain (e.g. `https://api.example.com`) and implement the auth endpoints
  (`POST /auth/login`, `GET /auth/me`, `POST /auth/refresh`, `POST /auth/logout`,
  `GET /auth/session`).
- **Reverse proxy** — map `/api` to your backend server-side (nginx, Caddy, …) and keep
  `PUBLIC_API_URL=/api`.

### Cloudflare Deployment

You need to add `NODE_VERSION` with value `18.17.1` or `20.9.0` on the environment variables setting.
Visit [Cloudflare pages docs](https://developers.cloudflare.com/pages/platform/build-configuration/)
for more information.

For the preview branch:

```env
PUBLIC_SITE_URL=${CF_PAGES_URL}
```

## Development

This project uses TypeScript for type checking, [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting
and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) for code formatting which are configured in
[`.oxlintrc.json`](./.oxlintrc.json) and [`.oxfmtrc.json`](./.oxfmtrc.json). It's recommended
to get TypeScript set up for your editor and install an editor plugin (like the
[VSCode Oxc plugin](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)) to get
auto-formatting on saving and get a really great in-editor experience with type checking and auto-complete.

## Thanks to

In general, I'd like to thank every single one who open-sources their source code for their effort
to contribute something to the open-source community. Your work means the world! 🌍 ❤️

### Attribution

- [MadeUI](https://madeui.com/) — the Base UI + StyleX components in this template are based on its components.
- [Reshaped](https://www.reshaped.so/) — the design system in this template is built on its design system.
- [ReUI](https://reui.io) — the Data Grid, Input Phone, Sortable, and Kanban components are ports of ReUI.
- [Flavio Copes](https://flaviocopes.com/stylex) - A deep dive into StyleX.

## Notice

Why using web workers for auth? [Keep React Responsive with Web Workers and useRef](https://reactdevelopment.substack.com/p/keep-react-responsive-with-web-workers)

## License

Licensed under either of [Apache License 2.0][license-apache] or [MIT license][license-mit] at your option.

> Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in this project by you,
> as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.

Copyrights in this project are retained by their contributors.

See the [LICENSE-APACHE](./LICENSE-APACHE) and [LICENSE-MIT](./LICENSE-MIT) files for more information.

---

<sub>🤫 Psst! If you like my work you can support me via [GitHub sponsors](https://github.com/sponsors/riipandi).</sub>

<!-- link reference definition -->

[license-mit]: https://choosealicense.com/licenses/mit/
[license-apache]: https://choosealicense.com/licenses/apache-2.0/
