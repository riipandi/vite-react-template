import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Popover, PopoverTrigger } from './popover.component'

describe('Popover', () => {
  it('renders trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
      </Popover>
    )
    expect(screen.getByText('Open popover')).toBeDefined()
  })
})
