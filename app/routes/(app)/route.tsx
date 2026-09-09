import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Outlet, redirect, useRouter } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { closeSidebar, useSidebarOpen, useSidebarCollapsed } from '#/libraries/app.store'
import { toggleSidebar, toggleSidebarCollapsed } from '#/libraries/app.store'
import { isAuthenticated } from '#/libraries/auth.store'
import { ensureSessionLoaded } from '#/libraries/guard/auth-session'
import { styles } from '#/styles/element/root-layout.stylex'
import { SideNavbar } from './-sidebar'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
  beforeLoad: async () => {
    // Wait for the silent cookie-session bootstrap before deciding.
    await ensureSessionLoaded()
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
  staticData: {
    pageTitle: 'Dashboard'
  }
})

function RouteComponent() {
  const router = useRouter()
  const sidebarOpen = useSidebarOpen()
  const collapsed = useSidebarCollapsed()
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 659px)').matches)

  useEffect(() => {
    // Keep in sync with the `breakpoints.small` media queries in
    // root-layout/sidebar stylex files (token breakpoint: 660px).
    const mq = window.matchMedia('(max-width: 659px)')
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Close sidebar on route change (mobile). `onResolved` fires after every
  // navigation; closing an already-closed sidebar is a no-op state write.
  useEffect(() => router.subscribe('onResolved', closeSidebar), [router])

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
          <MenuIcon size={20} strokeWidth={1.8} />
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
