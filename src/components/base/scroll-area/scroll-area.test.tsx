import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ScrollArea } from './scroll-area.component'

describe('ScrollArea', () => {
  it('renders content', async () => {
    render(<ScrollArea>Content</ScrollArea>)
    expect(await screen.findByText('Content')).toBeDefined()
  })
})
