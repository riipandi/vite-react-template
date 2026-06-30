import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Menubar } from './menubar.component'

describe('Menubar', () => {
  it('renders correctly', () => {
    const { container } = render(<Menubar />)
    expect(container.querySelector('[data-slot="menubar"]')).toBeDefined()
  })
})
