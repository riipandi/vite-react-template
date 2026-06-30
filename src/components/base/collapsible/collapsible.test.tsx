import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from './collapsible.component'

describe('Collapsible', () => {
  it('renders trigger', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsiblePanel>Content</CollapsiblePanel>
      </Collapsible>
    )
    expect(screen.getByText('Toggle')).toBeDefined()
  })
})
