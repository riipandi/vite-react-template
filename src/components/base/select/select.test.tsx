import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Select, SelectTrigger } from './select.component'

describe('Select', () => {
  it('renders trigger', () => {
    render(
      <Select>
        <SelectTrigger>Pick option</SelectTrigger>
      </Select>
    )
    expect(screen.getByText('Pick option')).toBeDefined()
  })
})
