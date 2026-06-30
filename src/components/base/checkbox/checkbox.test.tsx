import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Checkbox } from './checkbox.component'

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeDefined()
  })
})
