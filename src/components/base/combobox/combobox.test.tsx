import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Combobox, ComboboxTrigger } from './combobox.component'

describe('Combobox', () => {
  it('renders trigger', () => {
    render(
      <Combobox>
        <ComboboxTrigger>Select fruit</ComboboxTrigger>
      </Combobox>
    )
    expect(screen.getByText('Select fruit')).toBeDefined()
  })
})
