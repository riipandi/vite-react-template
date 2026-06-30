import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Toolbar, ToolbarButton } from './toolbar.component'

describe('Toolbar', () => {
  it('renders button', () => {
    render(
      <Toolbar>
        <ToolbarButton>Save</ToolbarButton>
      </Toolbar>
    )
    expect(screen.getByText('Save')).toBeDefined()
  })
})
