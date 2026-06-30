import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger
} from './navigation-menu.component'

describe('NavigationMenu', () => {
  it('renders trigger', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    expect(screen.getByText('Products')).toBeDefined()
  })
})
