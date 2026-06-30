import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Menu, MenuTrigger } from './menu.component'

describe('Menu', () => {
  it('renders trigger', () => {
    render(
      <Menu>
        <MenuTrigger>Open menu</MenuTrigger>
      </Menu>
    )
    expect(screen.getByText('Open menu')).toBeDefined()
  })
})
