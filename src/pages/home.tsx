import { Link } from 'react-router-dom'

import { Alert, Button } from '@/components/ui-react-aria'
import { useAuthentication } from '@/hooks/AuthProvider'

// Assets in public directory cannot be imported from JavaScript.
// Instead, we use `src/assets` directory.
import ViteLogo from '../assets/images/vite.svg'

export default function Home() {
  const { user, loggedIn } = useAuthentication()

  return (
    <div className='mx-auto flex h-full min-h-screen w-full flex-col dark:bg-neutral-900'>
      <header className='mb-auto w-full' aria-hidden></header>
      <div className='mx-auto flex flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8'>
        <div className='mx-auto flex w-full border-collapse items-center justify-center'>
          <img src={ViteLogo} alt='Vite logo' className='h-28' />
        </div>
        <div className='text-center text-lg text-gray-600 dark:text-gray-400 sm:mt-8'>
          <p className='leading-8'>This is an example starter template React with Vite.</p>
          <p className='leading-8'>
            Vite + React + Typescript + Tailwind CSS + React Hook Form + Vitest
          </p>
        </div>
        <div className='mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3'>
          <Link to='/dashboard' className='inline-flex items-center justify-center'>
            <Button variant='primary'>User Dashboard</Button>
          </Link>
          <Link to='/admin' className='inline-flex items-center justify-center'>
            <Button variant='destructive'>Admin Dashboard</Button>
          </Link>
          <a href='https://github.com/riipandi/vite-react-template'>
            <Button className='inline-flex items-center justify-center'>Get Source Code</Button>
          </a>
        </div>
        <div>
          <Alert variant={loggedIn ? 'info' : 'warning'} className='w-full text-center'>
            {loggedIn ? `Welcome back ${user?.email} 👋` : 'You are not logged in!'}
          </Alert>
        </div>
      </div>
      <footer className='mt-auto py-5 text-center'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <p className='text-sm tracking-wide text-gray-600 dark:text-gray-400'>
            &copy; {new Date().getFullYear()} - Made by{' '}
            <Link to='https://ripandis.com' className='hover:underline'>
              Aris Ripandi
            </Link>{' '}
            in 🇮🇩
          </p>
          <p className='mt-2 text-sm tracking-wide text-gray-600 dark:text-gray-400'>
            v{import.meta.env.APP_VERSION}
          </p>
        </div>
      </footer>
    </div>
  )
}
