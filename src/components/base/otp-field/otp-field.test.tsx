import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OTPField, OTPFieldInput } from './otp-field.component'

describe('OTPField', () => {
  it('renders inputs', () => {
    render(
      <OTPField length={4}>
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
      </OTPField>
    )
    expect(screen.getAllByRole('textbox')).toHaveLength(4)
  })
})
