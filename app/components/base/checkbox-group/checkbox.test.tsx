import type { CheckboxRootChangeEventDetails } from '@base-ui/react/checkbox'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './checkbox.component'

function inputOf(): HTMLInputElement {
  return document.querySelector('input[type="checkbox"]') as HTMLInputElement
}

describe('Checkbox', () => {
  it('renders a checkbox role with its label', () => {
    render(<Checkbox>Accept terms</Checkbox>)

    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('toggles between checked states on activation', () => {
    render(<Checkbox>Accept terms</Checkbox>)

    const box = screen.getByRole('checkbox')
    // `input.click()` runs native activation behavior in happy-dom, which
    // happy-dom does not emulate for untrusted dispatched clicks.
    inputOf().click()
    expect(box).toHaveAttribute('aria-checked', 'true')
    inputOf().click()
    expect(box).toHaveAttribute('aria-checked', 'false')
  })

  it('supports controlled mode with onCheckedChange', () => {
    const handleChange =
      vi.fn<(checked: boolean, details: CheckboxRootChangeEventDetails) => void>()
    render(
      <Checkbox checked onCheckedChange={handleChange}>
        Controlled
      </Checkbox>
    )

    inputOf().click()
    expect(handleChange).toHaveBeenCalledWith(false, expect.objectContaining({ reason: 'none' }))
  })

  it('reflects the indeterminate state as mixed', () => {
    render(<Checkbox indeterminate>Indeterminate</Checkbox>)

    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed')
  })

  it('does not toggle when disabled', () => {
    render(
      <Checkbox disabled defaultChecked>
        Disabled
      </Checkbox>
    )

    const box = screen.getByRole('checkbox')
    inputOf().click()
    expect(box).toHaveAttribute('aria-checked', 'true')
  })

  it('submits its value with the form when checked', () => {
    const onSubmit = vi.fn<(data: FormDataEntryValue | null) => void>()
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit(new FormData(event.currentTarget).get('newsletter'))
        }}
      >
        <Checkbox name='newsletter' value='yes' defaultChecked>
          Subscribe
        </Checkbox>
        <button type='submit'>Send</button>
      </form>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(onSubmit).toHaveBeenCalledWith('yes')
  })

  it('skips the value when unchecked', () => {
    const onSubmit = vi.fn<(data: FormDataEntryValue | null) => void>()
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit(new FormData(event.currentTarget).get('newsletter'))
        }}
      >
        <Checkbox name='newsletter' value='yes'>
          Subscribe
        </Checkbox>
        <button type='submit'>Send</button>
      </form>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(onSubmit).toHaveBeenCalledWith(null)
  })
})
