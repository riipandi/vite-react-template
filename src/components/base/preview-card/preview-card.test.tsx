import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PreviewCard, PreviewCardTrigger } from './preview-card.component'

describe('PreviewCard', () => {
  it('renders trigger', () => {
    render(
      <PreviewCard>
        <PreviewCardTrigger>Hover me</PreviewCardTrigger>
      </PreviewCard>
    )
    expect(screen.getByText('Hover me')).toBeDefined()
  })
})
