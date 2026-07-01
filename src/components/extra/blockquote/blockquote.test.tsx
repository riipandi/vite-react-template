import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Blockquote, BlockquoteAuthor } from './blockquote.component'

describe('Blockquote', () => {
  it('renders quote and author', () => {
    render(
      <Blockquote>
        The only way to do great work is to love what you do.
        <BlockquoteAuthor>Steve Jobs</BlockquoteAuthor>
      </Blockquote>
    )
    expect(screen.getByText('Steve Jobs')).toBeDefined()
    expect(screen.getByText(/great work/)).toBeDefined()
  })
})
