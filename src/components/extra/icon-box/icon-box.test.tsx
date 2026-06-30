import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { IconBox } from './icon-box.component'

describe('IconBox', () => {
  it('renders children', () => {
    render(<IconBox>★</IconBox>)
    expect(screen.getByText('★')).toBeDefined()
  })
})
