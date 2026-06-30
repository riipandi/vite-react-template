import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from './spinner.component'

describe('Spinner', () => {
  it('renders correctly', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('[data-slot="spinner"]')).toBeDefined()
  })
})
