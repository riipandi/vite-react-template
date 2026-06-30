import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Drawer, DrawerTrigger } from './drawer.component'

describe('Drawer', () => {
  it('renders trigger', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open drawer</DrawerTrigger>
      </Drawer>
    )
    expect(screen.getByText('Open drawer')).toBeDefined()
  })
})
