import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Fieldset, FieldsetLegend } from './fieldset.component'

describe('Fieldset', () => {
  it('renders legend', () => {
    const { container } = render(
      <Fieldset>
        <FieldsetLegend>Details</FieldsetLegend>
      </Fieldset>
    )
    expect(container.querySelector('[data-slot="fieldset"]')).toBeDefined()
  })
})
