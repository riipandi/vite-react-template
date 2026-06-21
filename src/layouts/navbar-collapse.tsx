import * as Lucide from 'lucide-react'
import { Link } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'

import { colors, radius, shadow, space } from '../assets/styles/tokens.stylex'

const navItems = [
  { icon: Lucide.Home, label: 'Dashboard', href: '/dashboard/overview' },
  { icon: Lucide.Search, label: 'Search', href: '#' },
  { icon: Lucide.BarChart3, label: 'Analytics', href: '#' },
  { icon: Lucide.FileText, label: 'Docs', href: '#' },
]

const secondaryItems = [
  { icon: Lucide.ShoppingCart, label: 'Cart', href: '#' },
  { icon: Lucide.Settings, label: 'Settings', href: '#' },
  { icon: Lucide.Mail, label: 'Messages', href: '#', badge: true },
]

const collapseStyles = stylex.create({
  container: {
    display: 'flex',
    height: '100%',
    minHeight: '100vh',
    width: '4rem',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    borderTopRightRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    backgroundColor: colors.white,
    boxShadow: shadow.sm,
    transitionProperty: 'background-color, box-shadow',
    transitionDuration: '200ms',
  },
  logoLink: {
    marginTop: space[3],
    marginBottom: space[2],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSvg: {
    height: '2rem',
    width: '2rem',
    fill: 'currentColor',
    color: colors.primary600,
  },
  navSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  sectionDivider: {
    marginTop: space[3],
    marginBottom: space[1],
    width: '2rem',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.zinc200,
  },
  navLink: {
    marginTop: space[1],
    display: 'flex',
    height: '2.75rem',
    width: '2.75rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.base,
    color: 'inherit',
    textDecoration: 'none',
    position: 'relative',
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
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '0.5rem',
    width: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: colors.destructive500,
  },
  profileSection: {
    marginTop: 'auto',
    marginBottom: space[2],
    display: 'flex',
    height: '2.75rem',
    width: '2.75rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.base,
    color: 'inherit',
    transitionProperty: 'background-color',
    transitionDuration: '150ms',
    ':hover': {
      backgroundColor: colors.zinc100,
    },
  },
  profileIcon: {
    height: '1.25rem',
    width: '1.25rem',
    stroke: 'currentColor',
  },
})

export function NavBarCollapse() {
  return (
    <div {...stylex.props(collapseStyles.container)}>
      <Link to="/" {...stylex.props(collapseStyles.logoLink)} aria-label="Home">
        <svg
          {...stylex.props(collapseStyles.logoSvg)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
      </Link>

      <div {...stylex.props(collapseStyles.navSection)}>
        <div {...stylex.props(collapseStyles.sectionDivider)} />
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            {...stylex.props(collapseStyles.navLink)}
            aria-label={item.label}
          >
            <item.icon {...stylex.props(collapseStyles.navIcon)} />
          </Link>
        ))}
      </div>

      <div {...stylex.props(collapseStyles.navSection)}>
        <div {...stylex.props(collapseStyles.sectionDivider)} />
        {secondaryItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            {...stylex.props(collapseStyles.navLink)}
            aria-label={item.label}
          >
            <item.icon {...stylex.props(collapseStyles.navIcon)} />
            {item.badge && <span {...stylex.props(collapseStyles.badge)} />}
          </Link>
        ))}
      </div>

      <Link to="/" {...stylex.props(collapseStyles.profileSection)} aria-label="Profile">
        <Lucide.User {...stylex.props(collapseStyles.profileIcon)} />
      </Link>
    </div>
  )
}
