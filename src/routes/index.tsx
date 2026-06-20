import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { ThemeSwitcher } from '#/components/theme'
import { Alert, Button } from '#/components/ui-react-aria'
import { useAuthentication } from '#/context/auth/AuthProvider'
import { isAuthenticated } from '#/lib/auth'
import ViteLogo from '../assets/images/vite.svg'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: HomeComponent,
})

function HomeComponent() {
  const { user, loggedIn } = useAuthentication()

  return (
    <div className="mx-auto flex h-full min-h-screen w-full flex-col">
      <header className="mb-auto w-full p-4" aria-hidden>
        <ThemeSwitcher className="float-right size-9" />
      </header>
      <div className="mx-auto flex flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full items-center justify-center">
          <img src={ViteLogo} alt="Vite logo" className="h-28" />
        </div>
        <div className="text-center text-lg text-zinc-500 sm:mt-8 dark:text-zinc-400">
          <p className="leading-8">This is an example starter template React with Vite.</p>
          <p className="leading-8">
            Vite + React + Typescript + Tailwind CSS + TanStack Form + TanStack Router + Vitest
          </p>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <Link to="/dashboard" className="inline-flex items-center justify-center">
            <Button variant="primary">User Dashboard</Button>
          </Link>
          <a href="/admin" className="inline-flex items-center justify-center">
            <Button variant="destructive">Admin Dashboard</Button>
          </a>
          <a
            href="https://github.com/riipandi/vite-react-template"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="secondary">Get Source Code</Button>
          </a>
        </div>
        <div>
          <Alert variant={loggedIn ? 'info' : 'warning'} className="w-full text-center">
            {loggedIn ? `Welcome back ${user?.email} 👋` : 'You are not logged in!'}
          </Alert>
        </div>
      </div>
      <footer className="mt-auto py-5 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm tracking-wide text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} - Made by{' '}
            <a
              href="https://ripandis.com"
              className="text-primary-600 dark:text-primary-400 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Aris Ripandi
            </a>{' '}
            in 🇮🇩
          </p>
          <p className="mt-2 text-sm tracking-wide text-zinc-400 dark:text-zinc-500">
            v{import.meta.env.APP_VERSION}
          </p>
        </div>
      </footer>
    </div>
  )
}
