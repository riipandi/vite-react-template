import { Outlet } from 'react-router-dom'

import { NavBarCollapseLight } from '../Navbar'

export function AppLayout() {
  return (
    <main className='flex h-full min-h-screen items-center bg-gray-100 dark:bg-slate-900'>
      <NavBarCollapseLight />
      <Outlet />
    </main>
  )
}
