import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Radio, RadioGroup } from './radio.component'

describe('Radio', () => {
  it('renders group with items', () => {
    const { container } = render(
      <RadioGroup>
        <Radio value='a' />
        <Radio value='b' />
      </RadioGroup>
    )
    expect(container.querySelector('[data-slot="radio-group"]')).toBeDefined()
  })
})
