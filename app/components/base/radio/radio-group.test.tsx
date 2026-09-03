import type { RadioGroupChangeEventDetails } from '@base-ui/react/radio-group'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RadioGroup } from './radio-group.component'
import { Radio } from './radio.component'

describe('RadioGroup', () => {
  it('manages a single selected value', () => {
    render(
      <RadioGroup defaultValue='a'>
        <Radio value='a'>Option A</Radio>
        <Radio value='b'>Option B</Radio>
      </RadioGroup>
    )

    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')
    expect(radios[1]).toHaveAttribute('aria-checked', 'false')

    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="radio"]'))
    inputs[1]!.click()
    expect(radios[0]).toHaveAttribute('aria-checked', 'false')
    expect(radios[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('reports value changes through onValueChange', () => {
    const handleValueChange =
      vi.fn<(value: string, details: RadioGroupChangeEventDetails) => void>()
    render(
      <RadioGroup defaultValue='a' onValueChange={handleValueChange}>
        <Radio value='b'>Option B</Radio>
      </RadioGroup>
    )

    const input = document.querySelector<HTMLInputElement>('input[type="radio"]')!
    input.click()
    expect(handleValueChange).toHaveBeenCalledWith('b', expect.objectContaining({ reason: 'none' }))
  })

  it('disables all children when the group is disabled', () => {
    render(
      <RadioGroup disabled defaultValue='a'>
        <Radio value='a'>Option A</Radio>
        <Radio value='b'>Option B</Radio>
      </RadioGroup>
    )

    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="radio"]'))
    expect(inputs[0]!.disabled).toBe(true)
    expect(inputs[1]!.disabled).toBe(true)
  })

  it('submits the selected value with the form', () => {
    const onSubmit = vi.fn<(data: FormDataEntryValue | null) => void>()
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit(new FormData(event.currentTarget).get('size'))
        }}
      >
        <RadioGroup name='size' defaultValue='medium'>
          <Radio value='small'>Small</Radio>
          <Radio value='medium'>Medium</Radio>
          <Radio value='large'>Large</Radio>
        </RadioGroup>
        <button type='submit'>Send</button>
      </form>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(onSubmit).toHaveBeenCalledWith('medium')
  })
})
