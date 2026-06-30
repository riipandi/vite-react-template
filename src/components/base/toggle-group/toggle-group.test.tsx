import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ToggleGroup } from './toggle-group.component'

describe('ToggleGroup', () => {
  it('renders correctly', () => {
    const { container } = render(<ToggleGroup />)
    expect(container.querySelector('[data-slot="toggle-group"]')).toBeDefined()
  })
})
