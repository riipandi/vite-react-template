import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from './scroll-area.component'

describe('ScrollArea', () => {
  it('renders a viewport with its content', () => {
    const { container } = render(<ScrollArea>Content</ScrollArea>)

    expect(container.querySelector('[data-slot="scroll-area"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="scroll-area-viewport"]')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies height and className to the root', () => {
    const { container } = render(
      <ScrollArea height={3} className='tall'>
        Content
      </ScrollArea>
    )

    const root = container.querySelector('[data-slot="scroll-area"]')!
    expect(root).toHaveClass('tall')
  })

  it('skips scrollbars when scrollbarDisplay is hidden', () => {
    const { container } = render(<ScrollArea scrollbarDisplay='hidden'>Content</ScrollArea>)

    expect(container.querySelector('[data-slot="scroll-area-corner"]')).not.toBeInTheDocument()
  })

  it('merges attributes onto the root', () => {
    const { container } = render(<ScrollArea attributes={{ id: 'scroll-id' }}>Content</ScrollArea>)

    expect(container.querySelector('[data-slot="scroll-area"]')).toHaveAttribute('id', 'scroll-id')
  })

  it('supports custom composition with individual parts', () => {
    const { container } = render(
      <BaseScrollArea.Root>
        <ScrollAreaViewport>
          <ScrollAreaContent>Composed</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation='vertical'>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </BaseScrollArea.Root>
    )

    expect(screen.getByText('Composed')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="scroll-area-viewport"]')).toBeInTheDocument()
  })
})
