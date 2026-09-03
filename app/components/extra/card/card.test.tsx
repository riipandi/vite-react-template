import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Card } from './card.component'

describe('Card', () => {
  it('renders a div card with its content', () => {
    const { container } = render(<Card>Content</Card>)

    const root = container.firstChild as HTMLElement
    expect(root.tagName).toBe('DIV')
    expect(root).toHaveAttribute('data-slot', 'card')
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders a button when onClick is provided', () => {
    render(<Card onClick={vi.fn<(event: React.MouseEvent<HTMLElement>) => void>()}>Action</Card>)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('fires onClick when the button card is clicked', () => {
    const handleClick = vi.fn<(event: React.MouseEvent<HTMLElement>) => void>()
    render(<Card onClick={handleClick}>Action</Card>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders a link when href is provided', () => {
    render(<Card href='https://reshaped.so'>Link</Card>)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://reshaped.so')
  })

  it('renders a custom tag via the render prop', () => {
    const { container } = render(<Card render={<span />}>Content</Card>)

    expect((container.firstChild as HTMLElement).tagName).toBe('SPAN')
  })

  it('merges className and attributes onto the root', () => {
    const { container } = render(
      <Card className='extra' attributes={{ id: 'card-id' }}>
        Content
      </Card>
    )

    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass('extra')
    expect(root).toHaveAttribute('id', 'card-id')
  })

  it('lays content out with layout props without throwing', () => {
    render(
      <Card direction='column' gap={4} align='center' justify='space-between' height='full'>
        <span>One</span>
        <span>Two</span>
      </Card>
    )

    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('renders the selected ring overlay', () => {
    const { container } = render(<Card selected>Content</Card>)

    const content = container.querySelector('[data-slot="card-content"]')!
    expect(content.querySelectorAll('span[aria-hidden="true"]').length).toBe(1)
  })
})
