import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Link, LinkIcon } from './link.component'

describe('Link', () => {
  it('renders link text', () => {
    render(<Link href='/about'>About</Link>)
    expect(screen.getByText('About')).toBeDefined()
  })

  it('renders with icon', () => {
    render(
      <Link href='/about'>
        About
        <LinkIcon />
      </Link>
    )
    expect(screen.getByText('About')).toBeDefined()
  })
})
