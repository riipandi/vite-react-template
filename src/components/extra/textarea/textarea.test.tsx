import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Textarea } from './textarea.component'

describe('Textarea', () => {
  it('renders correctly', () => {
    const { container } = render(<Textarea />)
    expect(container.querySelector('[data-slot="textarea"]')).toBeDefined()
  })
})
