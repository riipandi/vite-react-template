import * as stylex from '@stylexjs/stylex'
import { Link, useRouterState } from '@tanstack/react-router'
import * as Lucide from 'lucide-react'
import { ThemeSwitcher } from '#/components/theme'
import { useAuthentication } from '#/libraries/guard/auth-provider'
import {
  fontSizeVar,
  fontWeightVar,
  radiusVar,
  shadowVar,
  spaceVar,
  colorVar
} from '#/styles/core/tokens.stylex'

// ── Nav data ──────────────────────────────────────────────────────────────────

interface NavItem {
  icon: Lucide.LucideIcon
  label: string
  href: string
  badge?: boolean
}

const navItems: NavItem[] = [
  { icon: Lucide.LayoutDashboard, label: 'Overview', href: '/dashboard/overview' },
  { icon: Lucide.Search, label: 'Search', href: '#' },
  { icon: Lucide.BarChart3, label: 'Analytics', href: '#' },
  { icon: Lucide.FileText, label: 'Docs', href: '#' }
]

const secondaryItems: NavItem[] = [
  { icon: Lucide.ShoppingCart, label: 'Products', href: '#' },
  { icon: Lucide.Settings, label: 'Settings', href: '#' },
  { icon: Lucide.Mail, label: 'Messages', href: '#', badge: true }
]

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = stylex.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: colorVar.borderNeutral,
    backgroundColor: colorVar.bgPage,
    boxShadow: shadowVar.sm,
    transitionProperty: 'background-color, box-shadow, border-color, width',
    transitionDuration: '200ms',
    flexShrink: 0
  },
  containerExpanded: { width: '15rem', alignItems: 'stretch' },
  containerCollapsed: {
    width: '3.75rem',
    alignItems: 'center',
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3]
  },

  // Logo
  logoSection: {
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    paddingTop: spaceVar[4],
    paddingBottom: spaceVar[4],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colorVar.bgNeutralFaded,
    width: '100%'
  },
  logoSectionCollapsed: {
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: spaceVar[4],
    display: 'flex',
    justifyContent: 'center'
  },
  logoLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spaceVar[2],
    textDecoration: 'none',
    borderRadius: radiusVar.md,
    paddingTop: spaceVar[1],
    paddingBottom: spaceVar[1]
  },
  logoLinkCollapsed: {
    width: '2.25rem',
    height: '2.25rem',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0
  },
  logoIconWrap: {
    width: '2rem',
    height: '2rem',
    borderRadius: radiusVar.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${colorVar.bgPrimary}, ${colorVar.bgPrimary})`,
    flexShrink: 0
  },
  logoSvg: {
    height: '1.125rem',
    width: '1.125rem',
    fill: colorVar.onPrimary,
    color: colorVar.onPrimary
  },
  logoText: {
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.bold,
    color: colorVar.fgNeutral,
    letterSpacing: '-0.01em'
  },
  logoVersion: {
    fontSize: fontSizeVar.xs,
    color: colorVar.fgNeutralFaded,
    letterSpacing: '0'
  },

  // Nav content
  navContent: {
    flex: 1,
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3],
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[3],
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[1],
    overflowY: 'auto',
    width: '100%'
  },
  navContentCollapsed: {
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: 'center',
    gap: spaceVar[1],
    flex: '0 0 auto'
  },
  sectionLabel: {
    paddingLeft: spaceVar[3],
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[1],
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgNeutralFaded,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    userSelect: 'none'
  },
  divider: {
    width: '2rem',
    height: '1px',
    backgroundColor: colorVar.bgNeutralFaded,
    marginTop: spaceVar[1],
    marginBottom: spaceVar[2],
    flexShrink: 0
  },

  // Nav item
  navItem: {
    display: 'flex',
    height: '2.5rem',
    width: '100%',
    alignItems: 'center',
    gap: spaceVar[3],
    borderRadius: radiusVar.lg,
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[3],
    textDecoration: 'none',
    color: {
      default: colorVar.fgNeutralFaded,
      ':hover': colorVar.fgNeutral
    },
    position: 'relative',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms',
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    backgroundColor: {
      default: 'transparent',
      ':hover': colorVar.bgNeutralFaded
    }
  },
  navItemCollapsed: {
    height: '2.375rem',
    width: '2.375rem',
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0
  },
  navItemActive: {
    backgroundColor: {
      default: colorVar.bgPrimaryFaded,
      ':hover': colorVar.bgPrimaryFaded
    },
    color: {
      default: colorVar.fgPrimary,
      ':hover': colorVar.fgPrimary
    }
  },
  activeAccent: {
    position: 'absolute',
    left: 0,
    top: '0.375rem',
    bottom: '0.375rem',
    width: '3px',
    borderRadius: '9999px',
    backgroundColor: colorVar.bgPrimary
  },
  activeAccentCollapsed: { left: '0.125rem' },
  navIcon: {
    height: '1rem',
    width: '1rem',
    stroke: 'currentColor',
    flexShrink: 0
  },
  navLabel: {
    flex: 1,
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    whiteSpace: 'nowrap'
  },
  badge: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: colorVar.bgCritical,
    flexShrink: 0
  },
  badgeCollapsed: {
    position: 'absolute',
    top: '0.375rem',
    right: '0.375rem',
    height: '0.4rem',
    width: '0.4rem',
    borderRadius: '9999px',
    backgroundColor: colorVar.bgCritical
  },

  // Bottom: sign out + theme switcher
  bottomSection: {
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[3],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colorVar.borderNeutral,
    width: '100%'
  },
  bottomSectionCollapsed: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spaceVar[2],
    paddingTop: spaceVar[3],
    width: '100%',
    paddingLeft: spaceVar[2],
    paddingRight: spaceVar[2],
    borderTopWidth: 0
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  signOutButton: {
    gap: spaceVar[2],
    borderWidth: 0,
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
})

// ── Logo mark ─────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <svg
      {...stylex.props(styles.logoSvg)}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z' />
    </svg>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

interface SideNavbarProps {
  collapsed?: boolean
}

export function SideNavbar({ collapsed = false }: SideNavbarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { logout } = useAuthentication()

  const isActive = (href: string) =>
    href !== '#' && (pathname === href || pathname.startsWith(href))

  const renderNavItems = (items: NavItem[]) =>
    items.map((item) => {
      const itemActive = isActive(item.href)
      const Icon = item.icon
      return (
        <Link
          key={item.label}
          to={item.href}
          aria-label={item.label}
          {...stylex.props(
            styles.navItem,
            collapsed && styles.navItemCollapsed,
            itemActive && styles.navItemActive
          )}
        >
          {itemActive && (
            <span
              {...stylex.props(styles.activeAccent, collapsed && styles.activeAccentCollapsed)}
            />
          )}
          <Icon {...stylex.props(styles.navIcon)} />
          {!collapsed && <span {...stylex.props(styles.navLabel)}>{item.label}</span>}
          {item.badge && (
            <span {...stylex.props(collapsed ? styles.badgeCollapsed : styles.badge)} aria-hidden />
          )}
        </Link>
      )
    })

  return (
    <nav
      aria-label='Sidebar'
      {...stylex.props(
        styles.container,
        collapsed ? styles.containerCollapsed : styles.containerExpanded
      )}
    >
      {/* Logo */}
      <div {...stylex.props(styles.logoSection, collapsed && styles.logoSectionCollapsed)}>
        <Link
          to='/'
          aria-label='Home'
          {...stylex.props(styles.logoLink, collapsed && styles.logoLinkCollapsed)}
        >
          <div {...stylex.props(styles.logoIconWrap)}>
            <LogoMark />
          </div>
          {!collapsed && (
            <div>
              <div {...stylex.props(styles.logoText)}>ReactiVite</div>
              <div {...stylex.props(styles.logoVersion)}>{import.meta.env.PUBLIC_APP_VERSION}</div>
            </div>
          )}
        </Link>
      </div>

      {/* Main nav */}
      <div {...stylex.props(styles.navContent, collapsed && styles.navContentCollapsed)}>
        {!collapsed && <p {...stylex.props(styles.sectionLabel)}>Main</p>}
        {renderNavItems(navItems)}
        {collapsed && <div {...stylex.props(styles.divider)} />}
        {!collapsed && <p {...stylex.props(styles.sectionLabel)}>Workspace</p>}
        {renderNavItems(secondaryItems)}
      </div>

      {/* Bottom: sign out + theme switcher */}
      <div {...stylex.props(styles.bottomSection, collapsed && styles.bottomSectionCollapsed)}>
        <div {...stylex.props(styles.bottomRow)}>
          <button
            type='button'
            onClick={logout}
            aria-label='Sign Out'
            title={collapsed ? 'Sign Out' : undefined}
            {...stylex.props(
              styles.navItem,
              collapsed && styles.navItemCollapsed,
              styles.signOutButton
            )}
          >
            <Lucide.LogOut {...stylex.props(styles.navIcon)} />
            {!collapsed && <span {...stylex.props(styles.navLabel)}>Sign Out</span>}
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}
