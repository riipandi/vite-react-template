import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Autocomplete, AutocompleteTrigger } from './autocomplete.component'

describe('Autocomplete', () => {
  it('renders trigger', () => {
    render(
      <Autocomplete>
        <AutocompleteTrigger>Pick one</AutocompleteTrigger>
      </Autocomplete>
    )
    expect(screen.getByText('Pick one')).toBeDefined()
  })
})
