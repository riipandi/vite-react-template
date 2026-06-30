import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NumberField, NumberFieldInput } from './number-field.component'

describe('NumberField', () => {
  it('renders input', () => {
    render(
      <NumberField>
        <NumberFieldInput />
      </NumberField>
    )
    expect(screen.getByRole('textbox')).toBeDefined()
  })
})
