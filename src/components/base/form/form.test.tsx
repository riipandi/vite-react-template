import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Form } from './form.component'

describe('Form', () => {
  it('renders correctly', () => {
    const { container } = render(<Form />)
    expect(container.querySelector('[data-slot="form"]')).toBeDefined()
  })
})
