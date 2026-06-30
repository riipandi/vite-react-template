import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Label } from './label.component'

describe('Label', () => {
  it('renders label text', () => {
    render(<Label>Wizard Name</Label>)
    expect(screen.getByText('Wizard Name')).toBeDefined()
  })
})
