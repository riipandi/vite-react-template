import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Outlet, redirect, useRouterState } from '@tanstack/react-router'
import * as Lucide from 'lucide-react'
import { useEffect } from 'react'
import { isAuthenticated } from '#/guards/auth-store'
import { useSidebarOpen, toggleSidebar } from '#/stores/app.store'
import { radius, space, color } from '#/styles/tokens.stylex'
import { SideNavbar } from './-sidebar'

export const Route = createFileRoute('/(app)/dashboard')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
  component: DashboardLayout
})

const styles = stylex.create({
  layout: {
    backgroundColor: color.bgPage,
    transitionProperty: 'background-color',
    transitionDuration: '200ms',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  body: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden'
  },
  mobileHeader: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '3.5rem',
    paddingLeft: space[4],
    paddingRight: space[4],
    backgroundColor: color.bgPage,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: color.borderNeutral,
    '@media (max-width: 767px)': {
      display: 'flex'
    }
  },
  mobileHeaderTitle: {
    fontSize: '0.875rem',
    fontWeight: 700,
    color: color.fgNeutral
  },
  hamburger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radius.md,
    border: 'none',
    backgroundColor: 'transparent',
    color: color.fgNeutralFaded,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: color.bgNeutralFaded
    }
  },
  sidebarWrapper: {
    flexShrink: 0,
    '@media (max-width: 767px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 40,
      transform: 'translateX(-100%)',
      transitionProperty: 'transform',
      transitionDuration: '200ms'
    }
  },
  sidebarOpen: {
    '@media (max-width: 767px)': {
      transform: 'translateX(0)'
    }
  },
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  contentArea: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
    minWidth: 0
  }
})

function DashboardLayout() {
  const sidebarOpen = useSidebarOpen()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (sidebarOpen) toggleSidebar()
    // ponytail: dep on pathname only, toggleSidebar is a stable store action
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sidebarOpen read is intentional; adding it re-triggers the effect
  }, [pathname])

  return (
    <main {...stylex.props(styles.layout)}>
      {/* Mobile header — full width on mobile, hidden on desktop */}
      <div {...stylex.props(styles.mobileHeader)}>
        <button
          type='button'
          onClick={toggleSidebar}
          {...stylex.props(styles.hamburger)}
          aria-label='Toggle navigation'
        >
          <Lucide.Menu size={20} />
        </button>
        <span {...stylex.props(styles.mobileHeaderTitle)}>Dashboard</span>
        <div {...stylex.props(x.width['2.25rem'])} />
      </div>

      {/* Body row: sidebar + content */}
      <div {...stylex.props(styles.body)}>
        <div {...stylex.props(styles.sidebarWrapper, sidebarOpen && styles.sidebarOpen)}>
          <SideNavbar collapsed={false} />
        </div>

        {sidebarOpen && (
          <div {...stylex.props(styles.backdrop)} onClick={toggleSidebar} aria-hidden />
        )}

        <div {...stylex.props(styles.contentArea)}>
          <Outlet />
        </div>
      </div>
    </main>
  )
}
