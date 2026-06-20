import * as Lucide from 'lucide-react'
import { Link } from '@tanstack/react-router'

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

export function NavBarExpand() {
  return (
    <div className="flex h-full min-h-screen w-56 flex-col items-center overflow-hidden rounded-r bg-white shadow-sm dark:border-r dark:border-zinc-800 dark:bg-zinc-900">
      <Link to="/" className="mt-3 flex w-full items-center gap-2 px-4">
        <svg
          className="text-primary-600 dark:text-primary-400 h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">ReactiVite</span>
      </Link>

      <div className="w-full px-2">
        <div className="mt-3 flex w-full flex-col items-center border-t border-zinc-200 dark:border-zinc-700">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="mt-2 flex h-12 w-full items-center gap-3 rounded px-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <item.icon className="h-5 w-5 stroke-current" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-2 flex w-full flex-col items-center border-t border-zinc-200 dark:border-zinc-700">
          {secondaryItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="relative mt-2 flex h-12 w-full items-center gap-3 rounded px-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <item.icon className="h-5 w-5 stroke-current" />
              <span className="text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="bg-destructive-500 absolute top-0 left-8 mt-2 h-2 w-2 rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto mb-2 w-full px-2">
        <div className="flex w-full flex-col items-center border-t border-zinc-200 dark:border-zinc-700">
          {bottomItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="mt-2 flex h-12 w-full items-center gap-3 rounded px-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <item.icon className="h-5 w-5 stroke-current" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
