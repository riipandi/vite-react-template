import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tooltip, TooltipTrigger } from './tooltip.component'

describe('Tooltip', () => {
  it('renders trigger', () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
      </Tooltip>
    )
    expect(screen.getByText('Hover me')).toBeDefined()
  })
})
