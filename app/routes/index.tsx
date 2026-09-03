import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { Text } from '#/components/extra/text'
import { ThemeSwitcher } from '#/components/theme'
import { isAuthenticated } from '#/libraries/auth.store'
import { homeStyles as s } from '#/styles/pages/home.stylex'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/overview' })
    }
  },
  staticData: {
    pageTitle: 'Home'
  }
})

const FEATURES: Array<[title: string, description: string]> = [
  ['Type-Safe Routing', 'Routes and links stay in sync across every page.'],
  ['StyleX Tokens', 'Styling compiles at build time from reusable design tokens.'],
  ['Dark Mode Built-In', 'Theme switching with system preference support.'],
  ['Testing Ready', 'Vitest and Storybook interaction tests out of the box.']
]

function RouteComponent() {
  return (
    <div
      {...stylex.props(
        atoms.display.flex,
        atoms.flexDirection.column,
        atoms.minHeight['100vh'],
        atoms.width['100%']
      )}
    >
      <header {...stylex.props(s.header)}>
        <ThemeSwitcher />
      </header>

      <main {...stylex.props(s.content, s.contentPadMedium, s.contentPadLarge, s.contentPadXLarge)}>
        <section {...stylex.props(s.hero, s.heroPadMedium, s.heroPadLarge, s.heroPadXLarge)}>
          <div aria-hidden {...stylex.props(s.heroBlobA)} />
          <div aria-hidden {...stylex.props(s.heroBlobB)} />
          <Text
            render={<p />}
            variant='caption-2'
            weight='semibold'
            color='primary'
            style={s.kicker}
          >
            Vite React Template
          </Text>
          <Text
            render={<h1 />}
            variant={{ s: 'featured-1', m: 'headline-3', xl: 'headline-2' }}
            weight='bold'
            style={s.heroTitle}
          >
            Start simple, ship quickly.
          </Text>
          <Text
            render={<p />}
            variant={{ s: 'body-1', m: 'featured-6' }}
            color='neutral-faded'
            style={s.heroDescription}
          >
            This starter keeps things light: typed routes, StyleX design tokens, and the essentials
            you need to build from scratch.
          </Text>
          <div {...stylex.props(s.heroActions)}>
            <Link to='/overview' {...stylex.props(s.pill, s.pillPrimary)}>
              Open Dashboard
            </Link>
            <a
              href='https://github.com/riipandi/vite-react-template'
              target='_blank'
              rel='noreferrer'
              {...stylex.props(s.pill, s.pillNeutral)}
            >
              Get Source Code
            </a>
          </div>
        </section>

        <section
          {...stylex.props(
            s.features,
            s.featuresColsMedium,
            s.featuresColsLarge,
            s.featuresColsXLarge
          )}
        >
          {FEATURES.map(([title, description], index) => (
            <article
              key={title}
              {...stylex.props(s.featureCard)}
              style={{ animationDelay: `${index * 90 + 80}ms` }}
            >
              <Text render={<h2 />} variant='body-1' weight='semibold' style={s.featureTitle}>
                {title}
              </Text>
              <Text variant='body-2' color='neutral-faded'>
                {description}
              </Text>
            </article>
          ))}
        </section>

        <section {...stylex.props(s.quickStart)}>
          <Text
            render={<p />}
            variant='caption-2'
            weight='semibold'
            color='primary'
            style={s.kicker}
          >
            Quick Start
          </Text>
          <ul {...stylex.props(s.quickStartList)}>
            <li>
              Edit <code {...stylex.props(s.code)}>app/routes/index.tsx</code> to customize the home
              page.
            </li>
            <li>
              Add routes in <code {...stylex.props(s.code)}>app/routes</code> and tweak visual
              tokens in <code {...stylex.props(s.code)}>app/styles/core</code>.
            </li>
          </ul>
        </section>
      </main>

      <footer {...stylex.props(s.footer)}>
        <div {...stylex.props(s.footerInner)}>
          <Text render={<p />} variant='body-2' color='neutral-faded' style={s.footerText}>
            &copy; {new Date().getFullYear()}
            {' - '}
            <span {...stylex.props(s.footerSubText)}>v{import.meta.env.PUBLIC_APP_VERSION}</span>
          </Text>
        </div>
      </footer>
    </div>
  )
}
