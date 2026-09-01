import { createFileRoute, Outlet } from '@tanstack/react-router'
import { RouterSpinner } from './-router-spinner'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      <RouterSpinner />
      <Outlet />
    </>
  )
}
