import * as Lucide from 'lucide-react'
import { Link } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'

import { colors, fontSize, fontWeight, radius, shadow, space } from '../assets/styles/tokens.stylex'

const navItems = [
  { icon: Lucide.Home, label: 'Dashboard', href: '/dashboard/overview' },
  { icon: Lucide.Search, label: 'Search', href: '#' },
  { icon: Lucide.BarChart3, label: 'Analytics', href: '#' },
  { icon: Lucide.FileText, label: 'Docs', href: '#' },
]

const secondaryItems = [
  { icon: Lucide.ShoppingCart, label: 'Products', href: '#' },
  { icon: Lucide.Settings, label: 'Settings', href: '#' },
  { icon: Lucide.Mail, label: 'Messages', href: '#', badge: true },
]

const bottomItems = [{ icon: Lucide.User, label: 'My Account', href: '#' }]

const sidebarStyles = stylex.create({
  container: {
    display: 'flex',
    height: '100%',
    minHeight: '100vh',
    width: '14rem',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    borderTopRightRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    backgroundColor: colors.white,
    boxShadow: shadow.sm,
  },
  logoLink: {
    marginTop: space[3],
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: space[2],
    paddingLeft: space[4],
    paddingRight: space[4],
    textDecoration: 'none',
  },
  logoSvg: {
    height: '2rem',
    width: '2rem',
    fill: 'currentColor',
    color: colors.primary600,
  },
  logoText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.zinc800,
  },
  navSection: {
    width: '100%',
    paddingLeft: space[2],
    paddingRight: space[2],
  },
  navDivider: {
    marginTop: space[3],
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.zinc200,
  },
  navItem: {
    marginTop: space[2],
    display: 'flex',
    height: '3rem',
    width: '100%',
    alignItems: 'center',
    gap: space[3],
    borderRadius: radius.base,
    paddingLeft: space[3],
    paddingRight: space[3],
    textDecoration: 'none',
    color: 'inherit',
    transitionProperty: 'background-color',
    transitionDuration: '150ms',
    ':hover': {
      backgroundColor: colors.zinc100,
    },
  },
  navIcon: {
    height: '1.25rem',
    width: '1.25rem',
    stroke: 'currentColor',
  },
  navLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: '2rem',
    marginTop: space[2],
    height: '0.5rem',
    width: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: colors.destructive500,
  },
  bottomSection: {
    marginTop: 'auto',
    marginBottom: space[2],
    width: '100%',
    paddingLeft: space[2],
    paddingRight: space[2],
  },
})

export function NavBarExpand() {
  return (
    <div {...stylex.props(sidebarStyles.container)}>
      <Link to="/" {...stylex.props(sidebarStyles.logoLink)}>
        <svg
          {...stylex.props(sidebarStyles.logoSvg)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <span {...stylex.props(sidebarStyles.logoText)}>ReactiVite</span>
      </Link>

      <div {...stylex.props(sidebarStyles.navSection)}>
        <div {...stylex.props(sidebarStyles.navDivider)}>
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} {...stylex.props(sidebarStyles.navItem)}>
              <item.icon {...stylex.props(sidebarStyles.navIcon)} />
              <span {...stylex.props(sidebarStyles.navLabel)}>{item.label}</span>
            </Link>
          ))}
        </div>

        <div {...stylex.props(sidebarStyles.navDivider)}>
          {secondaryItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              {...stylex.props(sidebarStyles.navItem)}
              style={{ position: 'relative' }}
            >
              <item.icon {...stylex.props(sidebarStyles.navIcon)} />
              <span {...stylex.props(sidebarStyles.navLabel)}>{item.label}</span>
              {item.badge && <span {...stylex.props(sidebarStyles.badge)} />}
            </Link>
          ))}
        </div>
      </div>

      <div {...stylex.props(sidebarStyles.bottomSection)}>
        <div {...stylex.props(sidebarStyles.navDivider)}>
          {bottomItems.map((item) => (
            <Link key={item.label} to={item.href} {...stylex.props(sidebarStyles.navItem)}>
              <item.icon {...stylex.props(sidebarStyles.navIcon)} />
              <span {...stylex.props(sidebarStyles.navLabel)}>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
