import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Chip } from './chip.component'

describe('Chip', () => {
  it('renders label', () => {
    render(<Chip>React</Chip>)
    expect(screen.getByText('React')).toBeDefined()
  })
})
