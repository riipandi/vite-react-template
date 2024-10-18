<p align="center"><img src="./src/assets/images/vite.svg" width="500" height="120" alt="Project Logo"></p>
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

A starter project for [React](https://reactjs.org/) with [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com),
and [Typescript](https://www.typescriptlang.org/). This starter kit is already pre-configured
with [absolute import](https://jsdev.org/env/nodejs/absolute-path-imports/), [React Router](https://reactrouter.com/),
and [other goodies](./package.json). This starter also provides basic authentication implementation, you can use
any authentication provider or your own.

## The Complete Stack

- [x] [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
- [x] [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [x] [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [x] [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons made by the community.
- [x] [Typescript](https://www.typescriptlang.org/) - Strongly typed programming language.
- [x] [React Router DOM](https://reactrouter.com/) - Declarative routing for React.
- [x] [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.
- [x] [React Testing Library](https://testing-library.com/) - Light-weight solution for testing React components.
- [x] [Vitest](https://vitest.dev/) - Blazing Fast Unit Test Framework.
- [x] [Biome](https://biomejs.dev/) - Format, lint, and more in a fraction of a second.
- [x] [Storybook](https://storybook.js.org/) - UI component explorer for frontend developers.

## Quick Start

### Installation

```bash
npx tiged riipandi/vite-react-template myapp-name
```

> Don't forget to change `myapp-name` with your real application name.

### Up and Running

| NPM               | Yarn           | PNPM           | Description              |
| ----------------- | -------------- | -------------- | ------------------------ |
| `npm install`     | `yarn`         | `pnpm install` | install the dependencies |
| `npm run dev`     | `yarn dev`     | `pnpm dev`     | serve with hot reload    |
| `npm run build`   | `yarn build`   | `pnpm build`   | build for production     |
| `npm run preview` | `yarn preview` | `pnpm preview` | launch generated build   |

Application will run at `http://localhost:3000`

For detailed explanation on how things work, check out [Vite documentation](https://vitejs.dev/guide).

## Deploy your own

You'll want to fork this repository and deploy your own Next.js website. Once you have an
image generator that sparks joy, you can setup [automatic GitHub](https://vercel.com/github)
deployments so that pushing to master will deploy to production! 🚀

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/riipandi/vite-react-template&project-name=vite-react-template&repo-name=my-vite-react-app&env=VITE_PUBLIC_SITE_URL)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/riipandi/vite-react-template)

#### Cloudflare Deployment

You need to add `NODE_VERSION` with value `18.17.1` or `20.9.0` on the environment variables setting.
Visit [Cloudflare pages docs](https://developers.cloudflare.com/pages/platform/build-configuration/)
for more information.

For the preview branch:

```env
VITE_PUBLIC_SITE_URL=${CF_PAGES_URL}
```

## Development

This project uses TypeScript for type checking, [Biome][biome] for code formatting
and linting which is configured in [`biome.json`](./biome.json). It's recommended
to get TypeScript set up for your editor and install an editor plugin (like the
[VSCode Biome plugin][vscode-biome]) to get auto-formatting on saving and get a
really great in-editor experience with type checking and auto-complete.

## Thanks to...

In general, I'd like to thank every single one who open-sources their
source code for their effort to contribute something to the open-source
community. Your work means the world! 🌍 ❤️

## License

Licensed under either of [Apache License 2.0][license-apache] or [MIT license][license-mit] at your option.

> Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in this project by you,
> as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.

Copyrights in this project are retained by their contributors.

See the [LICENSE-APACHE](./LICENSE-APACHE) and [LICENSE-MIT](./LICENSE-MIT) files for more information.

---

<sub>🤫 Psst! If you like my work you can support me via [GitHub sponsors](https://github.com/sponsors/riipandi).</sub>

<!-- link reference definition -->
[biome]: https://biomejs.dev
[license-mit]: https://choosealicense.com/licenses/mit/
[license-apache]: https://choosealicense.com/licenses/apache-2.0/
