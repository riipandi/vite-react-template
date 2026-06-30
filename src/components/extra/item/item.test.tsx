import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Item, ItemContent, ItemDescription, ItemTitle } from './item.component'

describe('Item', () => {
  it('renders with title and description', () => {
    render(
      <Item>
        <ItemContent>
          <ItemTitle>Wand</ItemTitle>
          <ItemDescription>Phoenix feather core</ItemDescription>
        </ItemContent>
      </Item>
    )
    expect(screen.getByText('Wand')).toBeDefined()
    expect(screen.getByText('Phoenix feather core')).toBeDefined()
  })
})
