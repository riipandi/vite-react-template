import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Toggle } from './toggle.component'

describe('Toggle', () => {
  it('renders correctly', () => {
    const { container } = render(<Toggle />)
    expect(container.querySelector('[data-slot="toggle"]')).toBeDefined()
  })
})
