import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Outlet, redirect, useRouter } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useIsMobile } from '#/hooks/use-media-query'
import { closeSidebar, useSidebarOpen, useSidebarCollapsed } from '#/libraries/app.store'
import { toggleSidebar, toggleSidebarCollapsed } from '#/libraries/app.store'
import { ensureSessionLoaded } from '#/libraries/guard/auth-session'
import { isAuthenticated } from '#/libraries/guard/auth-store'
import { styles } from '#/styles/element/root-layout.stylex'
import { SideNavbar } from './-sidebar'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    // Wait for the silent cookie-session bootstrap before deciding.
    await ensureSessionLoaded()
    if (!isAuthenticated()) {
      // Send the visitor back to the attempted path after signing in.
      throw redirect({ to: '/login', search: { return_to: location.href } })
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
  const isMobile = useIsMobile()

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
