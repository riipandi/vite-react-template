import type { CheckboxGroupChangeEventDetails } from '@base-ui/react/checkbox-group'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CheckboxGroup } from './checkbox-group.component'
import { Checkbox } from './checkbox.component'

describe('CheckboxGroup', () => {
  it('manages a shared value across child checkboxes', () => {
    render(
      <CheckboxGroup defaultValue={['a']}>
        <Checkbox value='a'>Option A</Checkbox>
        <Checkbox value='b'>Option B</Checkbox>
      </CheckboxGroup>
    )

    const boxes = screen.getAllByRole('checkbox')
    const a = boxes[0]!
    const b = boxes[1]!
    expect(a).toHaveAttribute('aria-checked', 'true')
    expect(b).toHaveAttribute('aria-checked', 'false')

    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'))
    inputs[1]!.click()
    expect(b).toHaveAttribute('aria-checked', 'true')
    expect(a).toHaveAttribute('aria-checked', 'true')
  })

  it('reports value changes through onValueChange', () => {
    const handleValueChange =
      vi.fn<(value: string[], details: CheckboxGroupChangeEventDetails) => void>()
    render(
      <CheckboxGroup defaultValue={['a']} onValueChange={handleValueChange}>
        <Checkbox value='b'>Option B</Checkbox>
      </CheckboxGroup>
    )

    const input = document.querySelector<HTMLInputElement>('input[type="checkbox"]')!
    input.click()
    expect(handleValueChange).toHaveBeenCalledWith(
      ['a', 'b'],
      expect.objectContaining({ reason: 'none' })
    )
  })

  it('toggles all children from the parent checkbox', () => {
    render(
      <CheckboxGroup allValues={['a', 'b']}>
        <Checkbox parent>Select all</Checkbox>
        <Checkbox value='a'>Option A</Checkbox>
        <Checkbox value='b'>Option B</Checkbox>
      </CheckboxGroup>
    )

    const [parent, a, b] = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
    )
    parent!.click()
    expect(a!.checked).toBe(true)
    expect(b!.checked).toBe(true)
  })

  it('disables children and propagates hasError when the group is disabled', () => {
    render(
      <CheckboxGroup disabled hasError>
        <Checkbox>Child</Checkbox>
      </CheckboxGroup>
    )

    const input = document.querySelector<HTMLInputElement>('input[type="checkbox"]')!
    expect(input.disabled).toBe(true)
    input.click()
    expect(input.checked).toBe(false)
  })
})
