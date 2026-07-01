import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { ScrollArea } from './scroll-area.component'

beforeAll(() => {
  // happy-dom doesn't implement getAnimations — BaseUI ScrollArea uses it internally
  if (typeof Element.prototype.getAnimations !== 'function') {
    Element.prototype.getAnimations = () => []
  }
})

describe('ScrollArea', () => {
  it('renders content', async () => {
    render(<ScrollArea>Content</ScrollArea>)
    expect(await screen.findByText('Content')).toBeDefined()
  })
})
