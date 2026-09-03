import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Outlet, redirect, useRouterState } from '@tanstack/react-router'
import * as Lucide from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSidebarOpen, useSidebarCollapsed } from '#/libraries/app.store'
import { toggleSidebar, toggleSidebarCollapsed } from '#/libraries/app.store'
import { isAuthenticated } from '#/libraries/auth.store'
import { styles } from '#/styles/element/root-layout.stylex'
import { SideNavbar } from './-sidebar'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
  staticData: {
    pageTitle: 'Dashboard'
  }
})

function RouteComponent() {
  const sidebarOpen = useSidebarOpen()
  const collapsed = useSidebarCollapsed()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (sidebarOpen) toggleSidebar()
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- sidebarOpen read is intentional; adding it re-triggers the effect
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
          <Lucide.Menu size={20} strokeWidth={1.8} />
        </button>
        <span {...stylex.props(styles.mobileHeaderTitle)}>Dashboard</span>
        <div {...stylex.props(atoms.width['2.25rem'])} />
      </div>

      {/* Body row: sidebar + content */}
      <div {...stylex.props(styles.body)}>
        <div {...stylex.props(styles.sidebarWrapper, sidebarOpen && styles.sidebarOpen)}>
          <SideNavbar
            collapsed={!isMobile && collapsed}
            onToggleCollapse={!isMobile ? toggleSidebarCollapsed : undefined}
          />
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
