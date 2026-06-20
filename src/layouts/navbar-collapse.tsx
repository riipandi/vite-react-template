import * as Lucide from 'lucide-react'
import { Link } from '@tanstack/react-router'

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

export function NavBarCollapse() {
  return (
    <div className="flex h-full min-h-screen w-16 flex-col items-center overflow-hidden rounded-r bg-white shadow-sm dark:border-r dark:border-zinc-800 dark:bg-zinc-900">
      <Link to="/" className="mt-3 flex items-center justify-center" aria-label="Home">
        <svg
          className="text-primary-600 dark:text-primary-400 h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
      </Link>

      <div className="mt-3 flex flex-col items-center border-t border-zinc-300 dark:border-zinc-700">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="mt-2 flex h-12 w-12 items-center justify-center rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
            aria-label={item.label}
          >
            <item.icon className="h-5 w-5 stroke-current" />
          </Link>
        ))}
      </div>

      <div className="mt-2 flex flex-col items-center border-t border-zinc-300 dark:border-zinc-700">
        {secondaryItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="relative mt-2 flex h-12 w-12 items-center justify-center rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
            aria-label={item.label}
          >
            <item.icon className="h-5 w-5 stroke-current" />
            {item.badge && (
              <span className="bg-destructive-500 absolute top-0 left-0 mt-2 ml-2 h-2 w-2 rounded-full" />
            )}
          </Link>
        ))}
      </div>

      <Link
        to="/"
        className="mt-auto flex h-16 w-16 items-center justify-center bg-zinc-200 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
        aria-label="Profile"
      >
        <Lucide.User className="h-5 w-5 stroke-current" />
      </Link>
    </div>
  )
}
