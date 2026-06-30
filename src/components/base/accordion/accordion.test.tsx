import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger
} from './accordion.component'

describe('Accordion', () => {
  it('renders with items', () => {
    render(
      <Accordion>
        <AccordionItem value='a'>
          <AccordionHeader>
            <AccordionTrigger>Title A</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>Content A</AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByText('Title A')).toBeDefined()
  })
})
