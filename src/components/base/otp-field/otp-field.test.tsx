import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OTPField, OTPFieldInput } from './otp-field.component'

describe('OTPField', () => {
  it('renders inputs', () => {
    render(
      <OTPField>
        <OTPFieldInput />
      </OTPField>
    )
    expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0)
  })
})
