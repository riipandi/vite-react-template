import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RadioGroup } from './radio-group.component'
import { Radio } from './radio.component'

describe('Radio', () => {
  it('renders a radio role with its label', () => {
    render(
      <RadioGroup defaultValue='a'>
        <Radio value='a'>Option A</Radio>
      </RadioGroup>
    )

    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByText('Option A')).toBeInTheDocument()
  })

  it('reflects the group selection state', () => {
    render(
      <RadioGroup defaultValue='b'>
        <Radio value='a'>Option A</Radio>
        <Radio value='b'>Option B</Radio>
      </RadioGroup>
    )

    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toHaveAttribute('aria-checked', 'false')
    expect(radios[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('is disabled when the group is disabled', () => {
    render(
      <RadioGroup disabled>
        <Radio value='a'>Option A</Radio>
      </RadioGroup>
    )

    const input = document.querySelector<HTMLInputElement>('input[type="radio"]')!
    expect(input.disabled).toBe(true)
    input.click()
    expect(input.checked).toBe(false)
  })

  it('merges className and attributes onto the root', () => {
    const { container } = render(
      <RadioGroup>
        <Radio className='extra' attributes={{ id: 'radio-id' }} value='a'>
          Option A
        </Radio>
      </RadioGroup>
    )

    const root = container.querySelector('[data-slot="radio"]')!
    expect(root).toHaveClass('extra')
    expect(root).toHaveAttribute('id', 'radio-id')
  })

  it('renders with hasError without throwing', () => {
    render(
      <RadioGroup hasError>
        <Radio value='a'>Option A</Radio>
      </RadioGroup>
    )

    expect(screen.getByRole('radio')).toBeInTheDocument()
  })
})
