/** Shared mock dataset for the data-grid stories. */
export interface IData {
  id: string
  name: string
  availability: 'online' | 'away' | 'busy' | 'offline'
  avatar: string
  initials: string
  status: 'active' | 'inactive'
  flag: string // Emoji flags
  email: string
  company: string
  role: string
  joined: string
  location: string
  balance: number
}

const AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80',
  'https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80'
]

const NAMES = [
  'Alex Johnson',
  'Sarah Chen',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Aron Thompson',
  'James Brown',
  'Maria Garcia',
  'Nick Johnson',
  'Liam Thompson'
]

const EMAILS = [
  'alex@example.com',
  'sarah@example.com',
  'michael@example.com',
  'emma@example.com',
  'david@example.com',
  'aron@example.com',
  'james@example.com',
  'maria@example.com',
  'nick@example.com',
  'liam@example.com'
]

export const users = NAMES.map((name, index) => ({
  id: String(index + 1),
  name,
  email: EMAILS[index]!,
  avatar: AVATARS[index]!,
  initials: name
    .split(' ')
    .map((n) => n[0])
    .join('')
}))

export const demoData: IData[] = users.map((user, index) => ({
  ...user,
  availability: (['online', 'away', 'busy', 'offline'] as const)[index % 4]!,
  status: (index % 2 === 0 ? 'active' : 'inactive') as 'active' | 'inactive',
  flag: (['us', 'gb', 'ca', 'au', 'de', 'my', 'es', 'jp', 'fr', 'it'] as const)[index % 10]!,
  company: (
    [
      'Apple',
      'OpenAI',
      'Meta',
      'Tesla',
      'SAP',
      'Keenthemes',
      'BBVA',
      'Sony',
      'LVMH',
      'ENI'
    ] as const
  )[index % 10]!,
  role: (
    [
      'CEO',
      'CTO',
      'Designer',
      'Developer',
      'Lawyer',
      'Director',
      'Product Manager',
      'Marketing Lead',
      'Data Scientist',
      'Engineer'
    ] as const
  )[index % 10]!,
  joined: 'Jan, 2024',
  location: (
    [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'Germany',
      'Malaysia',
      'Spain',
      'Japan',
      'France',
      'Italy'
    ] as const
  )[index % 10]!,
  balance: 5143.03 + index * 100
}))

/** Avatar status dot colors (availability). */
export const statusColors: Record<string, string> = {
  online: 'oklch(0.55 0.13 151.8)',
  away: 'oklch(0.82 0.22 80)',
  busy: 'oklch(0.59 0.205 20.28)',
  offline: 'oklch(0 0 89.88 / 0.3)'
}
