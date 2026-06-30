import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card, CardBody, CardTitle } from './card.component'

describe('Card', () => {
  it('renders title and body', () => {
    render(
      <Card>
        <CardTitle>My Card</CardTitle>
        <CardBody>Content here</CardBody>
      </Card>
    )
    expect(screen.getByText('My Card')).toBeDefined()
    expect(screen.getByText('Content here')).toBeDefined()
  })
})
