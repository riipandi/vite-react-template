import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ScrollArea } from './scroll-area.component'

describe('ScrollArea', () => {
  it('renders content', () => {
    render(<ScrollArea>Content</ScrollArea>)
    expect(screen.getByText('Content')).toBeDefined()
  })
})
