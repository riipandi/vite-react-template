import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Slider, SliderControl } from './slider.component'

describe('Slider', () => {
  it('renders control', () => {
    const { container } = render(
      <Slider>
        <SliderControl />
      </Slider>
    )
    expect(container.querySelector('[data-slot="slider"]')).toBeDefined()
  })
})
