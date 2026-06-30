import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Switch } from './switch.component'

describe('Switch', () => {
  it('renders correctly', () => {
    const { container } = render(<Switch />)
    expect(container.querySelector('[data-slot="switch"]')).toBeDefined()
  })
})
