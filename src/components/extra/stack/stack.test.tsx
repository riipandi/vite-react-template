import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Stack } from './stack.component'

describe('Stack', () => {
  it('renders children in a stack', () => {
    render(
      <Stack>
        <div>First</div>
        <div>Second</div>
      </Stack>
    )
    expect(screen.getByText('First')).toBeDefined()
    expect(screen.getByText('Second')).toBeDefined()
  })
})
