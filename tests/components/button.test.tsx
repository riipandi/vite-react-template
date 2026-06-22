import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '#/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeDefined()
  })
})
