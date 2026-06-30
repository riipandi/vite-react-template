import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContextMenu, ContextMenuTrigger } from './context-menu.component'

describe('ContextMenu', () => {
  it('renders trigger', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
      </ContextMenu>
    )
    expect(screen.getByText('Right click')).toBeDefined()
  })
})
