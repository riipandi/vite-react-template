import * as stylex from '@stylexjs/stylex'
import { Link, useRouterState } from '@tanstack/react-router'
import * as Lucide from 'lucide-react'
import { ThemeSwitcher } from '#/routes/-theme'
import { radiusVar, shadowVar, spaceVar, colorVar } from '#/styles/tokens.stylex'

// ── Nav data ──────────────────────────────────────────────────────────────────

const navItems = [
  { icon: Lucide.LayoutDashboard, label: 'Overview', href: '/dashboard/overview' },
  { icon: Lucide.Search, label: 'Search', href: '#' },
  { icon: Lucide.BarChart3, label: 'Analytics', href: '#' },
  { icon: Lucide.FileText, label: 'Docs', href: '#' }
]

const secondaryItems = [
  { icon: Lucide.ShoppingCart, label: 'Products', href: '#' },
  { icon: Lucide.Settings, label: 'Settings', href: '#' },
  { icon: Lucide.Mail, label: 'Messages', href: '#', badge: true }
]

// ── Styles ────────────────────────────────────────────────────────────────────

const collapseStyles = stylex.create({
  container: {
    display: 'flex',
    height: '100%',
    width: '3.75rem',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: colorVar.borderNeutral,
    backgroundColor: colorVar.bgPage,
    boxShadow: shadowVar.sm,
    transitionProperty: 'background-color, box-shadow, border-color',
    transitionDuration: '200ms',
    flexShrink: 0,
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3]
  },

  // Logo
  logoLink: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radiusVar.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spaceVar[4],
    background: `linear-gradient(135deg, ${colorVar.bgPrimary}, ${colorVar.bgPrimary})`,
    flexShrink: 0
  },
  logoSvg: {
    height: '1.125rem',
    width: '1.125rem',
    fill: colorVar.onPrimary,
    color: colorVar.onPrimary
  },

  // Divider
  divider: {
    width: '2rem',
    height: '1px',
    backgroundColor: colorVar.bgNeutralFaded,
    marginBottom: spaceVar[2]
  },

  // Nav
  navSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingLeft: spaceVar[2],
    paddingRight: spaceVar[2],
    gap: spaceVar[1],
    marginBottom: spaceVar[3]
  },
  navLink: {
    display: 'flex',
    height: '2.375rem',
    width: '2.375rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radiusVar.lg,
    color: colorVar.fgNeutralFaded,
    textDecoration: 'none',
    position: 'relative',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms',
    ':hover': {
      backgroundColor: colorVar.bgNeutralFaded,
      color: colorVar.fgNeutral
    }
  },
  navLinkActive: {
    backgroundColor: colorVar.bgPrimaryFaded,
    color: colorVar.fgPrimary,
    ':hover': {
      backgroundColor: colorVar.bgPrimaryFaded,
      color: colorVar.fgPrimary
    }
  },
  activeAccent: {
    position: 'absolute',
    left: '0.125rem',
    top: '0.375rem',
    bottom: '0.375rem',
    width: '3px',
    borderRadius: '9999px',
    backgroundColor: colorVar.bgPrimary
  },
  navIcon: {
    height: '1rem',
    width: '1rem',
    stroke: 'currentColor'
  },
  badge: {
    position: 'absolute',
    top: '0.25rem',
    right: '0.25rem',
    height: '0.4rem',
    width: '0.4rem',
    borderRadius: '9999px',
    backgroundColor: colorVar.bgCritical
  },

  // Bottom
  bottomSection: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spaceVar[2],
    paddingTop: spaceVar[3],
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colorVar.bgNeutralFaded,
    width: '100%',
    paddingLeft: spaceVar[2],
    paddingRight: spaceVar[2]
  },
  userLink: {
    display: 'flex',
    height: '2.375rem',
    width: '2.375rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radiusVar.lg,
    color: colorVar.fgNeutralFaded,
    textDecoration: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms',
    ':hover': {
      backgroundColor: colorVar.bgNeutralFaded,
      color: colorVar.fgNeutral
    }
  },
  userIcon: {
    height: '1rem',
    width: '1rem',
    stroke: 'currentColor'
  }
})

// ── Component ──────────────────────────────────────────────────────────────────

export function NavBarCollapse() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isActiveRoute = (href: string) =>
    href !== '#' && (pathname === href || pathname.startsWith(href))

  return (
    <div {...stylex.props(collapseStyles.container)}>
      {/* Logo icon */}
      <Link to='/' {...stylex.props(collapseStyles.logoLink)} aria-label='Home'>
        <svg
          {...stylex.props(collapseStyles.logoSvg)}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z' />
        </svg>
      </Link>

      <div {...stylex.props(collapseStyles.divider)} />

      {/* Main nav */}
      <div {...stylex.props(collapseStyles.navSection)}>
        {navItems.map((item) => {
          const isActive = isActiveRoute(item.href)
          return (
            <Link
              key={item.label}
              to={item.href}
              {...stylex.props(collapseStyles.navLink, isActive && collapseStyles.navLinkActive)}
              aria-label={item.label}
            >
              {isActive && <span {...stylex.props(collapseStyles.activeAccent)} />}
              <item.icon {...stylex.props(collapseStyles.navIcon)} />
            </Link>
          )
        })}
      </div>

      <div {...stylex.props(collapseStyles.divider)} />

      {/* Secondary nav */}
      <div {...stylex.props(collapseStyles.navSection)}>
        {secondaryItems.map((item) => {
          const isActive = isActiveRoute(item.href)
          return (
            <Link
              key={item.label}
              to={item.href}
              {...stylex.props(collapseStyles.navLink, isActive && collapseStyles.navLinkActive)}
              aria-label={item.label}
            >
              {isActive && <span {...stylex.props(collapseStyles.activeAccent)} />}
              <item.icon {...stylex.props(collapseStyles.navIcon)} />
              {item.badge && <span {...stylex.props(collapseStyles.badge)} />}
            </Link>
          )
        })}
      </div>

      {/* Bottom */}
      <div {...stylex.props(collapseStyles.bottomSection)}>
        <Link to='/' {...stylex.props(collapseStyles.userLink)} aria-label='My Account'>
          <Lucide.User {...stylex.props(collapseStyles.userIcon)} />
        </Link>
        <ThemeSwitcher />
      </div>
    </div>
  )
}
