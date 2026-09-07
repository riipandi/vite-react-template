/** Shared mock dataset for the data-grid stories: novels by Dan Brown and J.K. Rowling. */
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { AU, CA, DE, ES, FR, GB, IT, JP, MY, US } from 'country-flag-icons/react/1x1'

export interface IBook {
  id: string
  title: string
  author: string
  publisher: string
  genre: string
  country: string
  flag: string // Lowercase ISO 3166-1 alpha-2 code
  price: number
  published: string
  status: 'inPrint' | 'outOfPrint'
  availability: 'available' | 'low stock' | 'reserved' | 'archived'
  initials: string
}

/** Novels from Dan Brown's Robert Langdon series and the Harry Potter series. */
export const demoData: IBook[] = [
  {
    id: '1',
    title: 'Angels & Demons',
    author: 'Dan Brown',
    publisher: 'Pocket Books',
    genre: 'Thriller',
    country: 'United States',
    flag: 'us',
    price: 9.99,
    published: 'Apr, 2000',
    status: 'inPrint',
    availability: 'available',
    initials: 'AD'
  },
  {
    id: '2',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    publisher: 'Doubleday',
    genre: 'Thriller',
    country: 'United States',
    flag: 'us',
    price: 12.99,
    published: 'Sep, 2003',
    status: 'inPrint',
    availability: 'low stock',
    initials: 'DC'
  },
  {
    id: '3',
    title: 'The Lost Symbol',
    author: 'Dan Brown',
    publisher: 'Doubleday',
    genre: 'Thriller',
    country: 'United States',
    flag: 'us',
    price: 11.99,
    published: 'Sep, 2009',
    status: 'outOfPrint',
    availability: 'reserved',
    initials: 'LS'
  },
  {
    id: '4',
    title: 'Inferno',
    author: 'Dan Brown',
    publisher: 'Doubleday',
    genre: 'Thriller',
    country: 'United States',
    flag: 'us',
    price: 10.99,
    published: 'May, 2013',
    status: 'inPrint',
    availability: 'archived',
    initials: 'IN'
  },
  {
    id: '5',
    title: 'Origin',
    author: 'Dan Brown',
    publisher: 'Doubleday',
    genre: 'Thriller',
    country: 'United States',
    flag: 'us',
    price: 13.99,
    published: 'Oct, 2017',
    status: 'inPrint',
    availability: 'available',
    initials: 'OR'
  },
  {
    id: '6',
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury',
    genre: 'Fantasy',
    country: 'United Kingdom',
    flag: 'gb',
    price: 8.99,
    published: 'Jun, 1997',
    status: 'inPrint',
    availability: 'low stock',
    initials: 'PS'
  },
  {
    id: '7',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury',
    genre: 'Fantasy',
    country: 'United Kingdom',
    flag: 'gb',
    price: 9.99,
    published: 'Jul, 1998',
    status: 'inPrint',
    availability: 'reserved',
    initials: 'CS'
  },
  {
    id: '8',
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury',
    genre: 'Fantasy',
    country: 'United Kingdom',
    flag: 'gb',
    price: 10.99,
    published: 'Jul, 1999',
    status: 'outOfPrint',
    availability: 'archived',
    initials: 'PA'
  },
  {
    id: '9',
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury',
    genre: 'Fantasy',
    country: 'United Kingdom',
    flag: 'gb',
    price: 11.99,
    published: 'Jul, 2000',
    status: 'inPrint',
    availability: 'available',
    initials: 'GF'
  },
  {
    id: '10',
    title: 'Harry Potter and the Order of the Phoenix',
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury',
    genre: 'Fantasy',
    country: 'United Kingdom',
    flag: 'gb',
    price: 12.99,
    published: 'Jun, 2003',
    status: 'inPrint',
    availability: 'low stock',
    initials: 'OP'
  }
]

/** Named flag components for the mock dataset (no barrel namespace import). */
const FLAGS = { US, GB, CA, AU, DE, MY, ES, JP, FR, IT } as const

interface CountryFlagProps {
  code: string
  title: string
  style?: StyleXStyles
}

/** Circular 16px country flag rendered inline from the ISO code (no CDN). */
export function CountryFlag({ code, title, style }: CountryFlagProps) {
  const Flag = FLAGS[code.toUpperCase() as keyof typeof FLAGS]
  if (!Flag) return null
  return <Flag title={title} {...stylex.props(style)} />
}

/** Availability status dot colors. */
export const statusColors: Record<string, string> = {
  available: 'oklch(0.55 0.13 151.8)',
  'low stock': 'oklch(0.82 0.22 80)',
  reserved: 'oklch(0.59 0.205 20.28)',
  archived: 'oklch(0 0 89.88 / 0.3)'
}
