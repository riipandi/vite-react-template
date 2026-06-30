import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Separator } from './separator.component'

describe('Separator', () => {
  it('renders with label', () => {
    render(<Separator>Or</Separator>)
    expect(screen.getByText('Or')).toBeDefined()
  })
})
