import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { colorVar } from '#/styles/tokens.stylex'

const spinKeyframes = stylex.keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

const styles = stylex.create({
  spinner: {
    display: 'inline-block',
    height: '0.75rem',
    width: '0.75rem',
    borderRadius: '9999px',
    borderWidth: '2px',
    borderColor: colorVar.bgPrimary,
    borderTopColor: 'transparent',
    animationName: spinKeyframes,
    animationDuration: '1s',
    animationIterationCount: 'infinite'
  },
  spinnerContainer: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: colorVar.bgPage,
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  }
})

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setVisible(true), 200)
      return () => clearTimeout(timer)
    }
    setVisible(false)
  }, [isLoading])

  if (!visible) return null

  return (
    <div {...stylex.props(styles.spinnerContainer)}>
      <span {...stylex.props(styles.spinner)} />
      Loading...
    </div>
  )
}

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
