import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hotkey, HotkeyGroup } from './hotkey.component'

describe('Hotkey', () => {
  it('renders hotkey and group', () => {
    render(
      <div>
        <Hotkey>Ctrl+S</Hotkey>
        <HotkeyGroup>
          <Hotkey>Ctrl</Hotkey>
          <Hotkey>S</Hotkey>
        </HotkeyGroup>
      </div>
    )
    expect(screen.getByText('Ctrl+S')).toBeDefined()
    expect(screen.getByText('Ctrl')).toBeDefined()
  })
})
