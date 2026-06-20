import { createFileRoute } from '@tanstack/react-router'
import Error404 from '#/pages/404'

export const Route = createFileRoute('/$')({
  component: Error404,
})
