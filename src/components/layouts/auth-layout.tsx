import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <main className="flex h-full min-h-screen items-center bg-gray-100 py-16 dark:bg-slate-900">
        <Outlet />
      </main>
    </Suspense>
  )
}
