import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Meter, MeterLabel } from './meter.component'

describe('Meter', () => {
  it('renders label', () => {
    const { container } = render(
      <Meter value={50}>
        <MeterLabel>Progress</MeterLabel>
      </Meter>
    )
    expect(container.querySelector('[data-slot="meter"]')).toBeDefined()
  })
})
