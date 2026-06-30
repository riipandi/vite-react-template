import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Code, Heading, Lead, Strong, Text } from './typography.component'

describe('Typography', () => {
  it('renders heading', () => {
    render(<Heading>Chapter One</Heading>)
    expect(screen.getByText('Chapter One')).toBeDefined()
  })

  it('renders text', () => {
    render(<Text>Once upon a time</Text>)
    expect(screen.getByText('Once upon a time')).toBeDefined()
  })

  it('renders lead', () => {
    render(<Lead>In a magical world</Lead>)
    expect(screen.getByText('In a magical world')).toBeDefined()
  })

  it('renders strong', () => {
    render(<Strong>Important!</Strong>)
    expect(screen.getByText('Important!')).toBeDefined()
  })

  it('renders code', () => {
    render(<Code>npm install</Code>)
    expect(screen.getByText('npm install')).toBeDefined()
  })
})
