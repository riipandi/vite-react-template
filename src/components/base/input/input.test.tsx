import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from './input.component'

describe('Input', () => {
  it('renders correctly', () => {
    const { container } = render(<Input />)
    expect(container.querySelector('[data-slot="input"]')).toBeDefined()
  })
})
