import * as stylex from '@stylexjs/stylex'
import { Link, useRouterState } from '@tanstack/react-router'
import * as Lucide from 'lucide-react'
import { ThemeSwitcher } from '#/routes/-theme'
import { ui, fontSize, fontWeight, radius, shadow, space } from '#/styles/token.stylex'

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

const sidebarStyles = stylex.create({
  container: {
    display: 'flex',
    height: '100%',
    width: '15rem',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: ui.border,
    backgroundColor: ui.bg,
    boxShadow: shadow.sm,
    transitionProperty: 'background-color, box-shadow, border-color',
    transitionDuration: '200ms',
    flexShrink: 0
  },

  // Logo area
  logoSection: {
    paddingLeft: space[4],
    paddingRight: space[4],
    paddingTop: space[4],
    paddingBottom: space[4],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: ui.bgNeutralFaded
  },
  logoLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space[2],
    textDecoration: 'none',
    borderRadius: radius.md,
    paddingTop: space[1],
    paddingBottom: space[1]
  },
  logoIconWrap: {
    width: '2rem',
    height: '2rem',
    borderRadius: radius.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${ui.bgPrimary}, ${ui.bgPrimary})`,
    flexShrink: 0
  },
  logoSvg: {
    height: '1.125rem',
    width: '1.125rem',
    fill: ui.onPrimary,
    color: ui.onPrimary
  },
  logoText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: ui.fg,
    letterSpacing: '-0.01em'
  },
  logoVersion: {
    fontSize: fontSize.xs,
    color: ui.fgFaded,
    letterSpacing: '0'
  },

  // Nav sections
  navContent: {
    flex: 1,
    paddingTop: space[3],
    paddingBottom: space[3],
    paddingLeft: space[3],
    paddingRight: space[3],
    display: 'flex',
    flexDirection: 'column',
    gap: space[1],
    overflowY: 'auto'
  },
  sectionLabel: {
    paddingLeft: space[3],
    paddingTop: space[3],
    paddingBottom: space[1],
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: ui.fgFaded,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    userSelect: 'none'
  },

  // Nav items with left accent bar
  navItem: {
    display: 'flex',
    height: '2.5rem',
    width: '100%',
    alignItems: 'center',
    gap: space[3],
    borderRadius: radius.lg,
    paddingLeft: space[3],
    paddingRight: space[3],
    textDecoration: 'none',
    color: {
      default: ui.fgFaded,
      ':hover': ui.fg
    },
    position: 'relative',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    backgroundColor: {
      default: 'transparent',
      ':hover': ui.bgNeutralFaded
    }
  },
  navItemActive: {
    backgroundColor: {
      default: ui.bgPrimaryFaded,
      ':hover': ui.bgPrimaryFaded
    },
    color: {
      default: ui.fgPrimary,
      ':hover': ui.fgPrimary
    }
  },
  activeAccent: {
    position: 'absolute',
    left: 0,
    top: '0.375rem',
    bottom: '0.375rem',
    width: '3px',
    borderRadius: '9999px',
    backgroundColor: ui.bgPrimary
  },
  navIcon: {
    height: '1rem',
    width: '1rem',
    stroke: 'currentColor',
    flexShrink: 0
  },
  navLabel: {
    flex: 1,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium
  },
  badge: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: ui.bgCritical,
    flexShrink: 0
  },

  // Bottom area: account link + theme switcher
  bottomSection: {
    paddingLeft: space[3],
    paddingRight: space[3],
    paddingTop: space[2],
    paddingBottom: space[2],
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: ui.border
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  accountLink: {
    gap: space[2],
    borderWidth: 0,
    cursor: 'pointer',
    fontFamily: 'inherit'
  }
})

// ── Component ──────────────────────────────────────────────────────────────────

export function NavBarExpand() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isActiveRoute = (href: string) =>
    href !== '#' && (pathname === href || pathname.startsWith(href))

  return (
    <div {...stylex.props(sidebarStyles.container)}>
      {/* Logo */}
      <div {...stylex.props(sidebarStyles.logoSection)}>
        <Link to='/' {...stylex.props(sidebarStyles.logoLink)}>
          <div {...stylex.props(sidebarStyles.logoIconWrap)}>
            <svg
              {...stylex.props(sidebarStyles.logoSvg)}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z' />
            </svg>
          </div>
          <div>
            <div {...stylex.props(sidebarStyles.logoText)}>ReactiVite</div>
            <div {...stylex.props(sidebarStyles.logoVersion)}>
              {import.meta.env.PUBLIC_APP_VERSION}
            </div>
          </div>
        </Link>
      </div>

      {/* Main nav */}
      <div {...stylex.props(sidebarStyles.navContent)}>
        <p {...stylex.props(sidebarStyles.sectionLabel)}>Main</p>
        {navItems.map((item) => {
          const isActive = isActiveRoute(item.href)
          return (
            <Link
              key={item.label}
              to={item.href}
              {...stylex.props(sidebarStyles.navItem, isActive && sidebarStyles.navItemActive)}
            >
              {isActive && <span {...stylex.props(sidebarStyles.activeAccent)} />}
              <item.icon {...stylex.props(sidebarStyles.navIcon)} />
              <span {...stylex.props(sidebarStyles.navLabel)}>{item.label}</span>
            </Link>
          )
        })}

        <p {...stylex.props(sidebarStyles.sectionLabel)}>Workspace</p>
        {secondaryItems.map((item) => {
          const isActive = isActiveRoute(item.href)
          return (
            <Link
              key={item.label}
              to={item.href}
              {...stylex.props(sidebarStyles.navItem, isActive && sidebarStyles.navItemActive)}
            >
              {isActive && <span {...stylex.props(sidebarStyles.activeAccent)} />}
              <item.icon {...stylex.props(sidebarStyles.navIcon)} />
              <span {...stylex.props(sidebarStyles.navLabel)}>{item.label}</span>
              {item.badge && <span {...stylex.props(sidebarStyles.badge)} />}
            </Link>
          )
        })}
      </div>

      {/* Bottom: account + theme */}
      <div {...stylex.props(sidebarStyles.bottomSection)}>
        <div {...stylex.props(sidebarStyles.bottomRow)}>
          <button type='button' {...stylex.props(sidebarStyles.navItem, sidebarStyles.accountLink)}>
            <Lucide.User {...stylex.props(sidebarStyles.navIcon)} />
            <span {...stylex.props(sidebarStyles.navLabel)}>My Account</span>
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
