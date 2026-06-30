import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Field, FieldLabel } from './field.component'

describe('Field', () => {
  it('renders label', () => {
    render(
      <Field>
        <FieldLabel>Name</FieldLabel>
      </Field>
    )
    expect(screen.getByText('Name')).toBeDefined()
  })
})
